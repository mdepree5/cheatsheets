from flask import Blueprint, render_template, redirect, request
import psycopg2
from app.forms.comment_form import CommentForm
from app.models import Comment, User, db

comment_routes = Blueprint('comments', __name__)

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Comments Routes
# todo ——————————————————————————————————————————————————————————————————————————————————

@comment_routes.route('/<int:cheatsheetId>', methods=['GET'])
def get_steps(cheatsheetId):
  all_steps = Comment.query.filter(Comment.cheatsheet_id == int(cheatsheetId)).all()

  return {"cheetsheet_comments": [comment.to_dict() for comment in all_steps]}

# @comment_routes.route("/new_comment", methods=["GET", "POST"])
# def new_comment():
#   form = CommentForm()
#   print(f'form: {form}')                                                         # * print
#   if form.validate_on_submit():
#     print(f'form data: {form.data}')
#     new_comment = Comment(
#       writer_id = form.data['writer_id'],                    #! => request Json userId????
#       cheatsheet_id = form.data['cheatsheet_id'],
#       content = form.data['content'],
#     )

#     db.session.add(new_comment)
#     db.session.commit()

#     return {new_comment.to_dict()}

#   if form.errors:
#     return form.errors

@comment_routes.route('/new_comment', methods=['POST'])
def get_comments():
  data = request.json

  comment = Comment(
    writer_id = data['writer_id'],
    cheatsheet_id = data['cheatsheet_id'],
    content = data['content'],
  )

  db.session.add(comment)
  db.session.commit()

  return {'comment': comment.to_dict()}



# todo ——————————————————————————————————————————————————————————————————————————————————
# @comment_routes.route("/<int:commentId>", methods=['PUT'])
# def update_comment(id):
#   form = CommentForm()

#   if form.validate_on_submit():
#     comment = Comment.query.get(id)
#     comment.writer_id = form.data['writer_id']
#     comment.cheatsheet_id = form.data['cheatsheet_id']
#     comment.content = form.data['content']
#     db.session.commit()

#     print(f'updated comment: {comment}')                                      # * print
#     return {comment.to_dict()}

#   return form.errors

@comment_routes.route("/<int:id>", methods=['PUT'])
def update_comment(id):
  data = request.json
  print(data)

  comment = Comment.query.get(id)
  comment.content = data['content']

  db.session.commit()

  return comment.to_dict()


# todo ——————————————————————————————————————————————————————————————————————————————————
@comment_routes.route("/<int:id>", methods=['DELETE'])
def delete_comment(id):
  comment = Comment.query.get(id)
  db.session.delete(comment)
  db.session.commit()

  return {'message': 'successful delete'}
