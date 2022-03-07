"""empty message

Revision ID: 0d6546b73f40
Revises: 15736e78192e
Create Date: 2022-03-07 11:38:44.729487

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d6546b73f40'
down_revision = '15736e78192e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('cheatsheets', 'media_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    op.alter_column('steps', 'media_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('steps', 'media_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    op.alter_column('cheatsheets', 'media_url',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    # ### end Alembic commands ###
