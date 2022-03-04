from app.models import db, Step


# Adds a demo user, you can add other steps here if you want
def seed_steps():
    python_itself_step_1 = Step(
        writer_id=2,
        cheatsheet_id=1,
        content='This was a great tutorial. I would like to hire the engineers who made this.',
        )
    python_itself_step_2 = Step(
        writer_id=3,
        cheatsheet_id=1,
        content='Now I know how to set up python.',
        )

    db.session.add(python_itself_step_1)
    db.session.add(python_itself_step_2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the steps table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
