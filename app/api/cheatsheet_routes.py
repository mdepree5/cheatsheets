from flask import Blueprint, render_template, redirect
from flask_login import login_required, current_user
import psycopg2
from app.forms.cheatsheet_form import CheatsheetForm
from app.models import Cheatsheet, Comment, User, db

cheatsheet_routes = Blueprint('cheatsheets', __name__)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Cheatsheet Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/new_cheatsheet", methods=["POST"])
@login_required
def create_cheatsheet():
  form = CheatsheetForm()
  print(f'form: {form}')                                                         # * print
  if form.validate_on_submit():
    print(f'form data: {form.data}')
    new_cheatsheet = Cheatsheet(
      owner_id = form.data['owner_id'],
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
@cheatsheet_routes.route("/all", methods=["GET"])
def get_all_cheatsheets():
  all_cheatsheets = Cheatsheet.query.all()
  print(f'all cheatsheets: {all_cheatsheets}')                                   # * print

  # * ———————————————————————————————
  # ? my_cheatsheets = Cheatsheet.query.filter(Cheatsheet.owner_id == current_user.id).all()
  # * ———————————————————————————————

  return {"all_cheatsheets": [cheatsheet.to_dict() for cheatsheet in all_cheatsheets]}
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/<int:cheatsheetId>", methods=["GET"])
def get_one_cheatsheet(cheatsheetId):
  one_cheatsheet = Cheatsheet.query.get(cheatsheetId)


  return {**one_cheatsheet.to_dict()}
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/<int:cheatsheetId>", methods=['PUT'])
@login_required
def update_cheatsheet(id):
  form = CheatsheetForm()

  if form.validate_on_submit():
    cheatsheet = Cheatsheet.query.get(id)
    # cheatsheet.owner_id = form.data['owner_id']
    cheatsheet.title = form.data['title']
    cheatsheet.description = form.data['description']
    cheatsheet.dependencies = form.data['dependencies']
    cheatsheet.media_url = form.data['media_url']
    db.session.commit()

    print(f'updated cheatsheet: {cheatsheet}')                                   # * print
    return {cheatsheet.to_dict()}

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/<int:cheatsheetId>", methods=['DELETE'])
@login_required
def delete_cheatsheet(id):
  cheatsheet = Cheatsheet.query.get(id)
  db.session.delete(cheatsheet)
  db.session.commit()

  return 'Deleted cheatsheet.'
