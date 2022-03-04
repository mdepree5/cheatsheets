from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class StepForm(FlaskForm):
  cheatsheet_id = IntegerField('cheatsheet_id')
  title = StringField('title', v)
  content = StringField('content', v)
  media_url = StringField('media_url')

  submit = SubmitField("Submit")
