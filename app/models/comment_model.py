from app.models.db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  writer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  cheatsheet_id = db.Column(db.Integer, db.ForeignKey("cheatsheets.id"), nullable=False)
  content = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  # one to many with users
  users = db.relationship("User", back_populates="comments")

  # # one to many with cheatsheets
  cheatsheets = db.relationship("Cheatsheet", back_populates="comments")

  def to_dict(self):
    return {
      "id": self.id,
      "writer_id": self.writer_id,
      "cheatsheet_id": self.cheatsheet_id,
      "content": self.content,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
    }
