from app.models import db, Cheatsheet


# Adds a demo user, you can add other cheatsheets here if you want
def seed_cheatsheets():
    python_itself = Cheatsheet(
        owner_id=1,
        title='Install Python itself',
        description='We will be installing Python version 3.9.4.',
        dependencies='Have pyenv pre-installed.',
        media_url='https://portswigger.net/cms/images/cc/df/f173-article-211203-python-body-text.png'
        )

    db.session.add(python_itself)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the cheatsheets table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cheatsheets():
    db.session.execute('TRUNCATE cheatsheets RESTART IDENTITY CASCADE;')
    db.session.commit()
