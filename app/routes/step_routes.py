from flask import Blueprint, render_template, redirect
import psycopg2
from app.forms.step_form import NewStepForm
from app.models import Step, User, db

steps_router = Blueprint('steps', __name__, url_prefix='/steps')

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               steps Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@steps_router.route("/new_step", methods=["GET", "POST"])
def create_step():
  form = NewStepForm()
  print(f'form: {form}')                                                         # * print
  if form.validate_on_submit():
    print(f'form data: {form.data}')
    new_step = Step(
      writer_id = form.data['writer_id'],                    #! => request Json userId????
      cheatsheet_id = form.data['cheatsheet_id'],
      title = form.data['title'],
      content = form.data['content']
      )
    
    db.session.add(new_step)
    db.session.commit()
    
    return new_step.to_dict()

  if form.errors:
    return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
# => access steps via GET cheatsheet
# @steps_router.route("/all", methods=["GET"])
# def get_all_steps():
#   all_steps = Step.query.all()
#   print(f'all steps: {all_steps}')                                         # * print
  
#   return {"all_steps": [step.to_dict() for step in all_steps]}
# todo ——————————————————————————————————————————————————————————————————————————————————
# => get one step possibly unrealistic

# @steps_router.route("/<int:id>", methods=["GET"])
# def get_one_step(id):
#   one_step = Step.query.get(id)
#   print(f'get one step: {one_step}')                                        #* print

#   # ! ———————————————————————————————
#   step_dict = {
#     "id": one_step.id,
#     "writerId": one_step.writerId,
#     "cheatsheetId": one_step.cheatsheetId,
#     "content": one_step.content,
#   }
#   # ! ———————————————————————————————

#   return {"step": step_dict}
# todo ——————————————————————————————————————————————————————————————————————————————————
@steps_router.route("/<int:stepId>", methods=['PUT'])
def update_step(id):
  form = NewStepForm()
  
  if form.validate_on_submit():
    step = Step.query.get(id)
    step.writer_id = form.data['writer_id']
    step.cheatsheet_id = form.data['cheatsheet_id']
    step.title = form.data['title']
    step.content = form.data['content']
    db.session.commit()
    
    print(f'updated step: {step}')                                               # * print
    return step.to_dict()

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@steps_router.route("/<int:stepId>", methods=['DELETE'])
def delete_step(id):
  step = Step.query.get(id)
  db.session.delete(step)
  db.session.commit()
  
  return 'Deleted step.'

