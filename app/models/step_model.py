from app.models.db import db

class Step(db.Model):
  __tablename__ = "steps"

  id = db.Column(db.Integer, primary_key=True)
  cheatsheet_id = db.Column(db.Integer, db.ForeignKey("cheatsheets.id"), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  content = db.Column(db.Text, nullable=False)
  media_url = db.Column(db.String(255), nullable=False)

  # # one to many with cheatsheets
  cheatsheets = db.relationship("Cheatsheet", back_populates="steps")

  def to_dict(self):
    return {
      "id": self.id,
      "cheatsheet_id": self.cheatsheet_id,
      "title": self.title,
      "content": self.content,
      "media_url": self.media_url,
    }
