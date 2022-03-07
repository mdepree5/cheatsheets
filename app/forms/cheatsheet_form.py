from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class CheatsheetForm(FlaskForm):
  owner_id = IntegerField('owner_id')
  title = StringField('title', v)
  description = StringField('description')
  dependencies = StringField('dependencies')
  media_url = StringField('media_url')
  
  submit = SubmitField("submit")
