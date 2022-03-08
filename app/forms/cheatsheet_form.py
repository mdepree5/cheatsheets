from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def title_max_length(form, field):
  title = field.data
  # title = form.data['title']
  if len(title) > 50:
    raise ValidationError('Please use a shorter title for your cheatsheet (50 chars or less).')

def description_max_length(form, field):
  description = field.data
  # description = form.data['description']
  if len(description) > 255:
    raise ValidationError('Please write a shorter description (255 chars or less).')

def dependencies_max_length(form, field):
  dependencies = field.data
  # dependencies = form.data['dependencies']
  if len(dependencies) > 255:
    raise ValidationError('Please write a shorter thing about your dependencies (255 chars or less).')

class CheatsheetForm(FlaskForm):
  owner_id = IntegerField('owner_id')
  title = StringField('title', validators=[DataRequired(), title_max_length])
  description = StringField('description', validators=[description_max_length])
  dependencies = StringField('dependencies', validators=[dependencies_max_length])
  media_url = StringField('media_url')
  
  submit = SubmitField("submit")
