from app.models.db import db

class Cheatsheet(db.Model):
  __tablename__ = "cheatsheets"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  dependencies = db.Column(db.Text, nullable=False)
  mediaURL = db.Column(db.String(255), nullable=False)

  # one to many with users
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  owner = db.relationship("User", back_populates="cheatsheets")

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "title": self.title,
      "description": self.description,
      "dependencies": self.dependencies,
      "mediaURL": self.mediaURL,
    }