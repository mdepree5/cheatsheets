from flask import Blueprint, render_template, redirect, request
import psycopg2
from app.forms.step_form import StepForm
from flask_login import login_required, current_user
from app.models import Step, User, db

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
  if form.validate_on_submit():
    new_step = Step(
      cheatsheet_id = form.data['cheatsheet_id'],
      title = form.data['title'],
      content = form.data['content'],
      media_url = form.data['media_url']

      )


    db.session.add(new_step)
    db.session.commit()


    return {new_step.to_dict()}


  if form.errors:
    return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route("/<int:stepId>", methods=['PUT'])
@login_required
def update_step(stepId):
  form = StepForm()

  if form.validate_on_submit():
    step = Step.query.get(stepId)
    step.cheatsheet_id = form.data['cheatsheet_id']
    step.title = form.data['title']
    step.content = form.data['content']
    step.media_url = form.data['media_url']
    db.session.commit()

    print(f'updated step: {step}')                                               # * print
    return {step.to_dict()}

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route("/<int:stepId>", methods=['DELETE'])
@login_required
def delete_step(stepId):
  step = Step.query.get(stepId)
  db.session.delete(step)
  db.session.commit()

  return {'message': 'Deleted step.'}
