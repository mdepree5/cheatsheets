from flask import Blueprint, render_template, redirect
import psycopg2
from app.forms.step_form import StepForm
from app.models import Step, User, db

step_routes = Blueprint('steps', __name__)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               steps Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@step_routes.route("/new_step", methods=["GET", "POST"])
def create_step():
  form = StepForm()
  print(f'form: {form}')                                                         # * print
  if form.validate_on_submit():
    print(f'form data: {form.data}')
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
def update_step(id):
  form = StepForm()

  if form.validate_on_submit():
    step = Step.query.get(id)
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
def delete_step(id):
  step = Step.query.get(id)
  db.session.delete(step)
  db.session.commit()

  return 'Deleted step.'
