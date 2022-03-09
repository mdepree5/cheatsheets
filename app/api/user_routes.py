from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Cheatsheet

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/cheatsheets', methods=['GET'])
@login_required
def get_my_cheatsheets():
    my_cheatsheets = Cheatsheet.query.filter(Cheatsheet.owner_id == current_user.id).all()

    return {"all_cheatsheets": [cheatsheet.to_dict() for cheatsheet in my_cheatsheets]}