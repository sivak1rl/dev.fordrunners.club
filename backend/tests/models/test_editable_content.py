import pytest
from frc.models.editable_content import EditableContent
from frc.models.user import User
from frc.extensions import db
from datetime import datetime

# Basic pytest setup assumes a Flask app context and db session management (e.g., rollback)
# are handled by fixtures, possibly in a conftest.py in a higher directory or root.

def test_create_editable_content(test_app): # Assuming test_app fixture provides app context
    # Create a dummy user
    user = User(username='testuser', email='test@example.com', password='password')
    db.session.add(user)
    db.session.commit()

    # Create an EditableContent instance
    page_name = "about"
    section_name = "mission"
    content_text = "Our mission is to test effectively."
    
    editable_item = EditableContent(
        page_name=page_name,
        section_name=section_name,
        content=content_text,
        last_modified_by=user.id
    )
    db.session.add(editable_item)
    db.session.commit()

    # Assertions
    assert editable_item.id is not None
    assert editable_item.page_name == page_name
    assert editable_item.section_name == section_name
    assert editable_item.content == content_text
    assert editable_item.last_modified_by == user.id
    assert editable_item.modifier == user
    assert editable_item.last_modified_on is not None
    assert isinstance(editable_item.last_modified_on, datetime)

    # Clean up (important if transactions are not automatically rolled back)
    # db.session.delete(editable_item)
    # db.session.delete(user)
    # db.session.commit()

def test_editable_content_user_relationship(test_app):
    # Create a user
    user1 = User(username='editor1', email='editor1@example.com', password='password')
    db.session.add(user1)
    db.session.commit()

    # Create content modified by user1
    content1 = EditableContent(
        page_name="home", 
        section_name="welcome", 
        content="Welcome content by user1", 
        modifier=user1
    )
    db.session.add(content1)
    
    content2 = EditableContent(
        page_name="about", 
        section_name="history", 
        content="History content by user1", 
        last_modified_by=user1.id # Alternate way of setting relationship
    )
    db.session.add(content2)
    db.session.commit()

    # Create another user and content not by user1
    user2 = User(username='editor2', email='editor2@example.com', password='password')
    db.session.add(user2)
    content3 = EditableContent(
        page_name="contact", 
        section_name="address", 
        content="Address content by user2", 
        modifier=user2
    )
    db.session.add(content3)
    db.session.commit()

    # Refresh user1 to ensure relationship is loaded
    db.session.refresh(user1)
    
    # Assertions
    assert len(user1.modified_content) == 2
    assert content1 in user1.modified_content
    assert content2 in user1.modified_content
    assert content3 not in user1.modified_content
    
    retrieved_content1 = EditableContent.query.get(content1.id)
    assert retrieved_content1.modifier == user1

    # Clean up
    # db.session.delete(content1)
    # db.session.delete(content2)
    # db.session.delete(content3)
    # db.session.delete(user1)
    # db.session.delete(user2)
    # db.session.commit()

def test_editable_content_repr(test_app):
    page_name = "test_page"
    section_name = "test_section"
    item = EditableContent(page_name=page_name, section_name=section_name, content="Test")
    db.session.add(item)
    db.session.commit() # Commit to get an ID for some db setups, though repr doesn't need it

    expected_repr = f'<EditableContent {page_name}/{section_name}>'
    assert repr(item) == expected_repr

    # db.session.delete(item)
    # db.session.commit()
