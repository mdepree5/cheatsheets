from flask import Blueprint, render_template, redirect, request
from flask_login import login_required
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

@comment_routes.route('/new_comment', methods=['POST'])
@login_required
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
@comment_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_comment(id):
  data = request.json

  comment = Comment.query.get(id)
  comment.content = data['content']

  db.session.commit()

  return { 'comment': comment.to_dict()}



# todo ——————————————————————————————————————————————————————————————————————————————————
@comment_routes.route("/<int:commentId>", methods=['DELETE'])
@login_required
def delete_comment(commentId):
  comment = Comment.query.get(commentId)
  db.session.delete(comment)
  db.session.commit()

  return {'commentId': commentId}
