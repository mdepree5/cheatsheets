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

    deploy_heroku_step_1 = Step(
        cheatsheet_id=2,
        title='Step 1',
        content='Log into Heroku',
        media_url=''
        )
    deploy_heroku_step_2 = Step(
        cheatsheet_id=2,
        title='Step 2',
        content='After creating your Heroku app, navigate to the Resources tab and set up a Heroku Postgres database for your application. Select Hobby Dev - Free plan.',
        media_url=''
        )
    deploy_heroku_step_3 = Step(
        cheatsheet_id=2,
        title='Step 3',
        content='Go to settings, click `Reveal Config Vars`, and input in JWT_SECRET in the key then input in your secret key into the value.',
        media_url=''
        )
    deploy_heroku_step_4 = Step(
        cheatsheet_id=2,
        title='Step 4',
        content='Configure your app to use the Heroku Postgres database',
        media_url=''
        )
    deploy_heroku_step_5 = Step(
        cheatsheet_id=2,
        title='Step 5',
        content='In your root directory of your app, run `heroku login` -> `heroku git:remote -a «your-app-name»` -> `git commit -am <<your commit message>>` -> `git push heroku`',
        media_url=''
        )
    deploy_heroku_step_6 = Step(
        cheatsheet_id=2,
        title='Step 6',
        content='Run migrations on Heroku with `heroku run npx sequelize-cli db:migrate` -> `heroku run npx sequelize-cli db:seed:all`',
        media_url=''
        )
    
    install_postgresql_12_mac_step_1 = Step(
        cheatsheet_id=2,
        title='Step 1',
        content="Update Homebrew installation with 'brew update'",
        media_url=''
        )
    install_postgresql_12_mac_step_2 = Step(
        cheatsheet_id=2,
        title='Step 2',
        content="Run 'brew info postgresql' and verify the output displays some version of 'postgresql 12.'",
        media_url=''
        )
    install_postgresql_12_mac_step_3 = Step(
        cheatsheet_id=2,
        title='Step 3',
        content="Install by running 'brew install postgresql'",
        media_url=''
        )
    
    
    db.session.add(python_itself_step_1)
    db.session.add(python_itself_step_2)
    db.session.add(python_itself_step_3)
    db.session.add(python_itself_step_4)
    db.session.add(python_itself_step_5)

    db.session.add(deploy_heroku_step_1)
    db.session.add(deploy_heroku_step_2)
    db.session.add(deploy_heroku_step_3)
    db.session.add(deploy_heroku_step_4)
    db.session.add(deploy_heroku_step_5)
    db.session.add(deploy_heroku_step_6)

    db.session.add(install_postgresql_12_mac_step_1)
    db.session.add(install_postgresql_12_mac_step_2)
    db.session.add(install_postgresql_12_mac_step_3)
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the steps table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
