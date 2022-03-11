from app.models import db, Cheatsheet


# Adds a demo user, you can add other cheatsheets here if you want
def seed_cheatsheets():
    python_itself = Cheatsheet(
        owner_id=1,
        title='Install Python itself',
        description='We will be installing Python version 3.9.4.',
        dependencies='Have pyenv pre-installed.',
        media_url='https://i.pinimg.com/564x/0f/60/19/0f6019e15f1d8ae07e7e8ea16d242676.jpg'
        )
    deploy_heroku = Cheatsheet(
        owner_id=2,
        title='Deploying to Heroku',
        description='We will be deploying an app with an Express backend',
        dependencies='Have Heroku CLI installed, and a heroku account',
        media_url='https://www.fullstackpython.com/img/logos/heroku.png'
        )
    install_postgresql_12_mac = Cheatsheet(
        owner_id=3,
        title='Installing PostgreSQL 12',
        description='We will install PostgreSQL 12 on macOS',
        dependencies='Own a machine capable of running macOS',
        media_url='https://s3-us-east-2.amazonaws.com/blog-ghost-prod/2021/02/why-use-postgresql-database68__1_.jpg'
        )
    simple_git = Cheatsheet(
        owner_id=3,
        title='Simple Git',
        description='Here is a simple Git',
        dependencies='Have a GitHub account',
        media_url='https://miro.medium.com/max/1400/1*jxvFpD7E00qsfY7PQzd5aA.png'
        )
    # simple_git = Cheatsheet(
    #     owner_id=3,
    #     title='Install Docker',
    #     description='We will install docker.',
    #     dependencies='Know what your operating system is.',
    #     media_url='http://testbucket4561.s3.amazonaws.com/a90a04687b73454a8b9b54480d0ed1d8.jpg'
    #     )
    # pug = Cheatsheet(
    #     owner_id=2,
    #     title='Set up Pug',
    #     description='How to set up Pug templating engine',
    #     dependencies='Before going any further, ask yourself: "Do I really want to use Pug?"',
    #     media_url='http://testbucket4561.s3.amazonaws.com/f9ea15503cba4dfcb669d682b8ee38e8.png'
    #     )


    db.session.add(python_itself)
    db.session.add(deploy_heroku)
    db.session.add(install_postgresql_12_mac)
    db.session.add(simple_git)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the cheatsheets table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cheatsheets():
    db.session.execute('TRUNCATE cheatsheets RESTART IDENTITY CASCADE;')
    db.session.commit()
