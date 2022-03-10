from flask import Blueprint
from app.models import Cheatsheet

search_route = Blueprint('search', __name__)

@search_route.route('/<keyword>')
def do_search(keyword):
    print('is this working?')
    title_keyword = Cheatsheet.query.filter(Cheatsheet.title.ilike(f'%{keyword}%')).all()

    title_list = [cheatsheet.to_dict() for cheatsheet in title_keyword]

    return {'title_keyword': title_list}
