from app.models.db import db

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)

  # one to many with users
  writer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  writer = db.relationship("User", back_populates="comments")
  
  # # one to many with cheatsheets
  cheatsheet_id = db.Column(db.Integer, db.ForeignKey("cheatsheets.id"), nullable=False)
  cheatsheet = db.relationship("Cheatsheet", back_populates="comments")

  def to_dict(self):
    return {
      "id": self.id,
      "writer_id": self.writer_id,
      "cheatsheet_id": self.cheatsheet_id,
      "content": self.content,
    }