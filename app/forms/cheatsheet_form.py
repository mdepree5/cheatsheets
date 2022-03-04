from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class CheatsheetForm(FlaskForm):
  owner_id = IntegerField('owner_id')
  title = StringField('Title', v)
  description = StringField('Description')
  dependencies = StringField('Dependencies')
  media_url = StringField('media_url')
  
  submit = SubmitField("Submit")
