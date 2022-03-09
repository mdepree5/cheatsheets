from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError

v = [DataRequired()]

def title_max_length(form, field):
  title = field.data
  if len(title) > 50:
    raise ValidationError('Please use a shorter title for your step (255 chars or less).')


class StepForm(FlaskForm):
  cheatsheet_id = IntegerField('cheatsheet_id')
  title = StringField('title', validators=[DataRequired(), title_max_length])
  content = StringField('content', v)
  media_url = StringField('media_url')

  submit = SubmitField("Submit")
