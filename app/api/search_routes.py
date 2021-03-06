from flask import Blueprint
from app.models import Cheatsheet

search_route = Blueprint('search', __name__)

@search_route.route('/<keyword>')
def do_search(keyword):
    cheatsheets = Cheatsheet.query.filter(Cheatsheet.title.ilike(f'%{keyword}%')).all()
    cheatsheet_list = [cheatsheet.to_dict() for cheatsheet in cheatsheets]

    return {'cheatsheet_by_title': cheatsheet_list}
