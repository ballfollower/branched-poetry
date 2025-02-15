"""empty message

Revision ID: d0190320a3c4
Revises: 77397c9d342e
Create Date: 2020-11-14 20:58:20.642471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0190320a3c4'
down_revision = '77397c9d342e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('_text_parent_uc', 'verse', ['text', 'parentId'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('_text_parent_uc', 'verse', type_='unique')
    # ### end Alembic commands ###
