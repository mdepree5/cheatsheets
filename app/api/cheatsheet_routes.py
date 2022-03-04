from flask import Blueprint, render_template, redirect
import psycopg2
from app.forms.cheatsheet_form import CheatsheetForm
from app.models import Cheatsheet, Comment, User, db

cheatsheets_router = Blueprint('cheatsheets', __name__, url_prefix='/cheatsheets')

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Cheatsheet Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheets_router.route("/new_cheatsheet", methods=["GET", "POST"])
def create_cheatsheet():
  form = CheatsheetForm()
  print(f'form: {form}')                                                         # * print
  if form.validate_on_submit():
    print(f'form data: {form.data}')
    new_cheatsheet = Cheatsheet(
      owner_id = form.data['owner_id'],                      #! => request Json userId????
      title = form.data['title'],
      description = form.data['description'],
      dependencies = form.data['dependencies'],
      media_url = form.data['media_url']
    )
    
    db.session.add(new_cheatsheet)
    db.session.commit()
    
    return {new_cheatsheet.to_dict()}

  if form.errors:
    return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheets_router.route("/all", methods=["GET"])
def get_all_cheatsheets():
  all_cheatsheets = Cheatsheet.query.all()
  print(f'all cheatsheets: {all_cheatsheets}')                                   # * print
  
  # * ———————————————————————————————
  # ? my_cheatsheets = Cheatsheet.query.filter(Cheatsheet.owner_id == current_user.id).all()
  # * ———————————————————————————————
  
  return {"all_cheatsheets": [cheatsheet.to_dict() for cheatsheet in all_cheatsheets]}
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheets_router.route("/<int:id>", methods=["GET"])
def get_one_cheatsheet(cheatsheetId):
  one_cheatsheet = Cheatsheet.query.get(cheatsheetId)
  # all_comments_by_cheatsheet_id = Comment.query.get(id)
  # all_steps_by_cheatsheet_id = Step.query.get(id)
  
  print(f'get one cheatsheet: {one_cheatsheet}')                                  #* print
  # print(f'get all comments for one cheatsheet: {all_comments_by_cheatsheet_id}')  #* print                                  #* print
  # print(f'get all steps for one cheatsheet: {all_steps_by_cheatsheet_id}')        #* print                                  #* print

  return {"cheatsheet": one_cheatsheet.to_dict()}
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheets_router.route("/<int:cheatsheetId>", methods=['PUT'])
def update_cheatsheet(id):
  form = CheatsheetForm()

  if form.validate_on_submit():
    cheatsheet = Cheatsheet.query.get(id)
    cheatsheet.owner_id = form.data['owner_id']
    cheatsheet.title = form.data['title']
    cheatsheet.description = form.data['description']
    cheatsheet.dependencies = form.data['dependencies']
    cheatsheet.media_url = form.data['media_url']
    db.session.commit()
    
    print(f'updated cheatsheet: {cheatsheet}')                                   # * print
    return {cheatsheet.to_dict()}

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheets_router.route("/<int:cheatsheetId>", methods=['DELETE'])
def delete_cheatsheet(id):
  cheatsheet = Cheatsheet.query.get(id)
  db.session.delete(cheatsheet)
  db.session.commit()
  
  return 'Deleted cheatsheet.'
