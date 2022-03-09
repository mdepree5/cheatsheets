from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.cheatsheet_form import CheatsheetForm
from app.models import Cheatsheet, Comment, User, db
from datetime import datetime

cheatsheet_routes = Blueprint('cheatsheets', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Cheatsheet Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/new", methods=["POST"])
@login_required
def create_cheatsheet():
  form = CheatsheetForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if (request.headers.get('Content-Type') == 'multipart/form-data'):
    print(f"debugger the header type is: {request.headers.get('Content-Type')}")  
    
  print('debugger Printing the REQUEST', request)

  image = request.files["image"]
  print('debugger print image', image)
  # thing = request.data # => b''
  # thing = request.form # => ImmutableMultiDict([])
  # thing = request.args # => ImmutableMultiDict([])
  # thing = request.json # => None
  # thing = request.get_json() # => None
  # thing = request.headers.get('Content-Type') # => multipart/form-data
  # thing = request.form.to_dict() # => {}
  
  # thing = request.form['title']
  
  thing = request.headers #*** => STUFF!
  
  print('debugger REQUEST: ======>', thing)
  print(thing)

  
  if form.validate_on_submit():
    new_cheatsheet = Cheatsheet(
      owner_id = form.data['owner_id'],
      title = form.data['title'],
      description = form.data['description'],
      dependencies = form.data['dependencies'],
      media_url = form.data['media_url'],
      created_at = datetime.now(),
      updated_at = datetime.now()
    )

    db.session.add(new_cheatsheet)
    db.session.commit()
    return {**new_cheatsheet.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}

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
  comments = Comment.query.filter(Comment.cheatsheet_id == cheatsheetId).all()


  return {**one_cheatsheet.to_dict(),
          'comments': [comment.to_dict() for comment in comments]
          }




# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/<int:cheatsheetId>", methods=['PUT'])
@login_required
def update_cheatsheet(cheatsheetId):
  form = CheatsheetForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    cheatsheet = Cheatsheet.query.get(cheatsheetId)
    cheatsheet.title = form.data['title']
    cheatsheet.description = form.data['description']
    cheatsheet.dependencies = form.data['dependencies']
    cheatsheet.media_url = form.data['media_url']
    cheatsheet.updated_at = datetime.now()
    db.session.commit()

    return {**cheatsheet.to_dict()}

  print({'errors': validation_errors_to_error_messages(form.errors)})
  return {'errors': validation_errors_to_error_messages(form.errors)}
# todo ——————————————————————————————————————————————————————————————————————————————————
@cheatsheet_routes.route("/<int:cheatsheetId>", methods=['DELETE'])
@login_required
def delete_cheatsheet(cheatsheetId):
  cheatsheet = Cheatsheet.query.get(cheatsheetId)
  # comments = Comment.query.filter_by(cheatsheet_id=cheatsheetId).all()
  # comments = [comment for comment in Comment.query.filter(Comment.cheatsheet_id == cheatsheetId).all()]
  db.session.delete(cheatsheet)
  db.session.commit()

  return {'id': cheatsheetId}







# todo ——————————————————————————————————————————————————————————————————————————————————
# todo ——————————————————————————————————————————————————————————————————————————————————
# todo ——————————————————————————————————————————————————————————————————————————————————
#   if form.validate_on_submit():
#     new_cheatsheet = Cheatsheet(
#       owner_id = form.data['owner_id'],
#       title = form.data['title'],
#       description = form.data['description'],
#       dependencies = form.data['dependencies'],
#       media_url = form.data['media_url'],
#       created_at = datetime.now(),
#       updated_at = datetime.now()
#     )

#     db.session.add(new_cheatsheet)
#     db.session.commit()
#     return {**new_cheatsheet.to_dict()}

#   return {'errors': validation_errors_to_error_messages(form.errors)}

# # todo ——————————————————————————————————————————————————————————————————————————————————
# @cheatsheet_routes.route("/all", methods=["GET"])
# def get_all_cheatsheets():
#   all_cheatsheets = Cheatsheet.query.all()
#   print(f'all cheatsheets: {all_cheatsheets}')                                   # * print

#   # * ———————————————————————————————
#   # ? my_cheatsheets = Cheatsheet.query.filter(Cheatsheet.owner_id == current_user.id).all()
#   # * ———————————————————————————————

#   return {"all_cheatsheets": [cheatsheet.to_dict() for cheatsheet in all_cheatsheets]}
# # todo ——————————————————————————————————————————————————————————————————————————————————
# @cheatsheet_routes.route("/<int:cheatsheetId>", methods=["GET"])
# def get_one_cheatsheet(cheatsheetId):
#   one_cheatsheet = Cheatsheet.query.get(cheatsheetId)
#   comments = Comment.query.filter(Comment.cheatsheet_id == cheatsheetId).all()


#   return {**one_cheatsheet.to_dict(),
#           'comments': [comment.to_dict() for comment in comments]
#           }




# # todo ——————————————————————————————————————————————————————————————————————————————————
# @cheatsheet_routes.route("/<int:cheatsheetId>", methods=['PUT'])
# @login_required
# def update_cheatsheet(cheatsheetId):
#   form = CheatsheetForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     cheatsheet = Cheatsheet.query.get(cheatsheetId)
#     cheatsheet.title = form.data['title']
#     cheatsheet.description = form.data['description']
#     cheatsheet.dependencies = form.data['dependencies']
#     cheatsheet.media_url = form.data['media_url']
#     cheatsheet.updated_at = datetime.now()
#     db.session.commit()

#     return {**cheatsheet.to_dict()}

#   print({'errors': validation_errors_to_error_messages(form.errors)})
#   return {'errors': validation_errors_to_error_messages(form.errors)}
# # todo ——————————————————————————————————————————————————————————————————————————————————
# @cheatsheet_routes.route("/<int:cheatsheetId>", methods=['DELETE'])
# @login_required
# def delete_cheatsheet(cheatsheetId):
#   cheatsheet = Cheatsheet.query.get(cheatsheetId)
#   # comments = Comment.query.filter_by(cheatsheet_id=cheatsheetId).all()
#   # comments = [comment for comment in Comment.query.filter(Comment.cheatsheet_id == cheatsheetId).all()]
#   db.session.delete(cheatsheet)
#   db.session.commit()

#   return {'id': cheatsheetId}
