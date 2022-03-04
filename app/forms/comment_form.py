from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

v = [DataRequired()]

class CommentForm(FlaskForm):
  writer_id = IntegerField('writer_id')
  cheatsheet_id = IntegerField('cheatsheet_id')
  content = StringField('content', v)
  
  submit = SubmitField("Submit")
