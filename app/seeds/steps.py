from app.models import db, Step


# Adds a demo user, you can add other steps here if you want
def seed_steps():
    python_itself_step_1 = Step(
        cheatsheet_id=1,
        title='Step 1',
        content='Run this command: pyenv install 3.9.4',
        media_url=''
        )
    python_itself_step_2 = Step(
        cheatsheet_id=1,
        title='Step 2',
        content='Run this command: pyenv global 3.9.4',
        media_url=''
        )
    python_itself_step_3 = Step(
        cheatsheet_id=1,
        title='Step 3',
        content='Run this command: python --version',
        media_url=''
        )
    python_itself_step_4 = Step(
        cheatsheet_id=1,
        title='Step 4',
        content='Run this command: python3 --version',
        media_url=''
        )
    python_itself_step_5 = Step(
        cheatsheet_id=1,
        title='Step 5',
        content='Both of these commands should show 3.9.4',
        media_url=''
        )
    

    db.session.add(python_itself_step_1)
    db.session.add(python_itself_step_2)
    db.session.add(python_itself_step_3)
    db.session.add(python_itself_step_4)
    db.session.add(python_itself_step_5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the steps table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
