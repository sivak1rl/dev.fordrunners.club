from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from frc.db import db
from datetime import datetime

class EditableContent(db.Model):
    __tablename__ = 'editable_content'

    id = Column(Integer, primary_key=True, autoincrement=True)
    page_name = Column(String(100), nullable=False)
    section_name = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    last_modified_by = Column(Integer, ForeignKey('user.id'), nullable=True)
    last_modified_on = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<EditableContent {self.page_name}/{self.section_name}>'
