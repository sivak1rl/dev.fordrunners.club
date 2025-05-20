import json
import pytest
from frc.models.editable_content import EditableContent
from frc.models.user import User
from frc.extensions import db

# Helper function to create content entries
def create_content_entry(page_name, section_name, content_text, user_id=None):
    entry = EditableContent(
        page_name=page_name,
        section_name=section_name,
        content=content_text,
        last_modified_by=user_id
    )
    db.session.add(entry)
    db.session.commit()
    return entry

# --- GET /api/content/<page_name> Tests ---

def test_get_content_for_page(test_client, init_database, admin_user):
    # Setup: Create content for a specific page
    create_content_entry("test_page", "section1", "Content for section 1", admin_user.id)
    create_content_entry("test_page", "section2", "Content for section 2", admin_user.id)
    create_content_entry("other_page", "sectionA", "Content for another page", admin_user.id)

    # Action: Make a GET request
    response = test_client.get("/api/content/test_page")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) == 2
    
    # Check for presence of sections (order might vary)
    section_names_in_response = {item['section_name'] for item in data}
    contents_in_response = {item['content'] for item in data}
    
    assert "section1" in section_names_in_response
    assert "section2" in section_names_in_response
    assert "Content for section 1" in contents_in_response
    assert "Content for section 2" in contents_in_response

def test_get_content_for_empty_page(test_client, init_database):
    # Action: Make a GET request to a page with no content
    response = test_client.get("/api/content/non_existent_page")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) == 0

# --- PUT /api/content/<page_name>/<section_name> Tests (Updating) ---

def test_update_existing_content_as_admin(test_client, init_database, admin_user, admin_auth_headers):
    # Setup: Create initial content
    entry = create_content_entry("update_page", "section_to_update", "Initial content", admin_user.id)
    
    updated_text = "This is the updated content."
    payload = {"content": updated_text}

    # Action: Make PUT request as admin
    response = test_client.put(
        f"/api/content/{entry.page_name}/{entry.section_name}",
        headers=admin_auth_headers,
        data=json.dumps(payload),
        content_type="application/json"
    )

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["section_name"] == entry.section_name
    assert data["content"] == updated_text
    assert data["last_modified_by"] == admin_user.id

    # Verify in DB
    updated_entry = EditableContent.query.get(entry.id)
    assert updated_entry.content == updated_text
    assert updated_entry.last_modified_by == admin_user.id

def test_update_content_as_normal_user_forbidden(test_client, init_database, admin_user, normal_user, normal_user_auth_headers):
    # Setup: Create initial content by admin
    entry = create_content_entry("update_page_auth", "section1", "Content by admin", admin_user.id)
    
    payload = {"content": "Attempted update by normal user"}

    # Action: Make PUT request as normal user
    response = test_client.put(
        f"/api/content/{entry.page_name}/{entry.section_name}",
        headers=normal_user_auth_headers,
        data=json.dumps(payload),
        content_type="application/json"
    )

    # Assertions
    assert response.status_code == 403 # Forbidden
    # Check that content was not changed
    db_entry = EditableContent.query.get(entry.id)
    assert db_entry.content == "Content by admin"

def test_update_content_no_token_unauthorized(test_client, init_database, admin_user):
    # Setup: Create initial content
    entry = create_content_entry("update_page_no_auth", "section1", "Initial content", admin_user.id)
    payload = {"content": "Attempted update without token"}

    # Action: Make PUT request without token
    response = test_client.put(
        f"/api/content/{entry.page_name}/{entry.section_name}",
        data=json.dumps(payload),
        content_type="application/json"
    )

    # Assertions
    assert response.status_code == 401 # Unauthorized

# --- PUT /api/content/<page_name>/<section_name> Tests (Creating) ---

def test_create_new_content_as_admin(test_client, init_database, admin_user, admin_auth_headers):
    page_name = "new_page_creation"
    section_name = "new_section"
    new_content_text = "This is brand new content."
    payload = {"content": new_content_text}

    # Action: Make PUT request to a non-existent page/section
    response = test_client.put(
        f"/api/content/{page_name}/{section_name}",
        headers=admin_auth_headers,
        data=json.dumps(payload),
        content_type="application/json"
    )

    # Assertions
    assert response.status_code == 201 # Created
    data = json.loads(response.data)
    assert data["section_name"] == section_name
    assert data["content"] == new_content_text
    assert data["last_modified_by"] == admin_user.id

    # Verify in DB
    created_entry = EditableContent.query.filter_by(page_name=page_name, section_name=section_name).first()
    assert created_entry is not None
    assert created_entry.content == new_content_text
    assert created_entry.last_modified_by == admin_user.id

def test_create_content_missing_payload_bad_request(test_client, init_database, admin_auth_headers):
    # Action: Make PUT request with missing 'content'
    response = test_client.put(
        "/api/content/bad_request_page/section",
        headers=admin_auth_headers,
        data=json.dumps({}), # Empty payload
        content_type="application/json"
    )
    # Assertions
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "error" in data
    assert data["error"] == "Missing content in request"

def test_create_content_as_normal_user_forbidden(test_client, init_database, normal_user_auth_headers):
    payload = {"content": "Attempted creation by normal user"}
    # Action: Make PUT request as normal user
    response = test_client.put(
        "/api/content/create_attempt_normal/section_new",
        headers=normal_user_auth_headers,
        data=json.dumps(payload),
        content_type="application/json"
    )
    # Assertions
    assert response.status_code == 403

def test_create_content_no_token_unauthorized(test_client, init_database):
    payload = {"content": "Attempted creation without token"}
    # Action: Make PUT request without token
    response = test_client.put(
        "/api/content/create_attempt_no_token/section_new",
        data=json.dumps(payload),
        content_type="application/json"
    )
    # Assertions
    assert response.status_code == 401
