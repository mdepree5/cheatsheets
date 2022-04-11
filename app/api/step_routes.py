from flask import Blueprint, render_template, redirect, request
import psycopg2
from app.forms.step_form import StepForm
from flask_login import login_required, current_user
from app.models import Step, User, db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

step_routes = Blueprint('steps', __name__)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               steps Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route('/<int:cheatsheetId>', methods=['GET'])
def get_steps(cheatsheetId):
  all_steps = Step.query.filter(Step.cheatsheet_id == int(cheatsheetId)).all()

  return {"all_steps": [step.to_dict() for step in all_steps]}


@step_routes.route("/new", methods=["POST"])
@login_required
def create_step():
  form = StepForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  # print(f'form: {form}')                                                         # * print
  
  url = 'no data provided'
  if type(form.data['media_url']) is not str:
    image = form.data['media_url']
    
    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
      return upload, 400
    url = upload["url"]
  
  if form.validate_on_submit():
    new_step = Step(
      cheatsheet_id = form.data['cheatsheet_id'],
      title = form.data['title'],
      content = form.data['content'],
      media_url = url
      )


    db.session.add(new_step)
    db.session.commit()

    return {'step':new_step.to_dict()}
    # return {new_step.to_dict()}


  if form.errors:
    return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_step(id):
  form = StepForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  url = form.data['media_url']
  
  if type(form.data['media_url']) is str and form.data['media_url'] == 'remove-image':
    url = 'no data provided'

  if type(form.data['media_url']) is not str:
    image = form.data['media_url']
    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
      return upload, 400
    url = upload["url"]
    
  if form.validate_on_submit():
    step = Step.query.get(id)
    step.cheatsheet_id = form.data['cheatsheet_id']
    step.title = form.data['title']
    step.content = form.data['content']
    step.media_url = url
    db.session.commit()
    return {'step': step.to_dict()}

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route("/<int:stepId>", methods=['DELETE'])
@login_required
def delete_step(stepId):
  step = Step.query.get(stepId)
  db.session.delete(step)
  db.session.commit()

  return {'stepId': stepId}
