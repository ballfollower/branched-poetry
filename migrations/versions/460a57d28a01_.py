"""empty message

Revision ID: 460a57d28a01
Revises: 774be39a1536
Create Date: 2020-11-18 16:31:55.014371

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '460a57d28a01'
down_revision = '774be39a1536'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('verse', 'parentId',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
    op.alter_column('verse', 'text',
               existing_type=mysql.VARCHAR(length=200),
               nullable=False)
    op.create_unique_constraint('_text_parent_uc', 'verse', ['text', 'parentId'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('_text_parent_uc', 'verse', type_='unique')
    op.alter_column('verse', 'text',
               existing_type=mysql.VARCHAR(length=200),
               nullable=True)
    op.alter_column('verse', 'parentId',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
    # ### end Alembic commands ###
