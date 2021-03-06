from app.models.db import db
from datetime import datetime

class Cheatsheet(db.Model):
  __tablename__ = "cheatsheets"

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  dependencies = db.Column(db.Text, nullable=False)
  media_url = db.Column(db.String(255), nullable=True)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  # one to many with users, steps, comments
  users = db.relationship("User", back_populates="cheatsheets")
  steps = db.relationship("Step", back_populates="cheatsheets", cascade="all, delete")
  comments = db.relationship("Comment", back_populates="cheatsheets", cascade="all, delete")

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "title": self.title,
      "description": self.description,
      "dependencies": self.dependencies,
      "media_url": self.media_url,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      # 'comments': {comment.id: comment.to_dict() for comment in self.comments},
      # 'steps': {step.id: step.to_dict() for step in self.steps},
      'owner': self.users.username
    }
