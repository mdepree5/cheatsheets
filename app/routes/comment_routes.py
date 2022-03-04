from flask import Blueprint, render_template, redirect
import psycopg2
from app.forms.comment_form import CommentForm
from app.models import Comment, User, db

comments_router = Blueprint('comments', __name__, url_prefix='/comments')

# todo ——————————————————————————————————————————————————————————————————————————————————
# todo                               Comments Routes
# todo ——————————————————————————————————————————————————————————————————————————————————
@comments_router.route("/new_comment", methods=["GET", "POST"])
def new_comment():
  form = CommentForm()
  print(f'form: {form}')                                                         # * print
  if form.validate_on_submit():
    print(f'form data: {form.data}')
    new_comment = Comment(
      writer_id = form.data['writer_id'],                    #! => request Json userId????
      cheatsheet_id = form.data['cheatsheet_id'],
      content = form.data['content'],
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return new_comment.to_dict()

  if form.errors:
    return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
# => We might need to access Comments via GET cheatsheet so we can pass in the cheatsheet id

# @comments_router.route("/all", methods=["GET"])
# def all_comments():
#   all_comments = Comment.query.all()
#   print(f'all comments: {all_comments}')                                         # * print
  
#   return {"all_comments": [comment.to_dict() for comment in all_comments]}
# todo ——————————————————————————————————————————————————————————————————————————————————
# => Get one comment might not be realistic/functional

# @comments_router.route("/<int:id>", methods=["GET"])
# def get_comment_by_id(id):
#   one_comment = Comment.query.get(id)
#   print(f'get one comment: {one_comment}')                                        #* print

#   # ! ———————————————————————————————
#   comment_dict = {
#     "id": one_comment.id,
#     "writerId": one_comment.writerId,
#     "cheatsheetId": one_comment.cheatsheetId,
#     "content": one_comment.content,
#   }
#   # ! ———————————————————————————————

#   return {"comment": comment_dict}
# todo ——————————————————————————————————————————————————————————————————————————————————
@comments_router.route("/<int:commentId>", methods=['PUT'])
def update_comment(id):
  form = CommentForm()

  if form.validate_on_submit():
    comment = Comment.query.get(id)
    comment.writer_id = form.data['writer_id']
    comment.cheatsheet_id = form.data['cheatsheet_id']
    comment.content = form.data['content']
    db.session.commit()
    
    print(f'updated comment: {comment}')                                      # * print  
    return comment.to_dict()

  return form.errors
# todo ——————————————————————————————————————————————————————————————————————————————————
@comments_router.route("/<int:commentId>", methods=['DELETE'])
def delete_comment(id):
  comment = Comment.query.get(id)
  db.session.delete(comment)
  db.session.commit()
  
  return 'Deleted comment.'



