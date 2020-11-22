from app import db

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    text = db.Column(db.String(200), nullable=False)

    parentId = db.Column(db.Integer, db.ForeignKey('verse.id'))

    # parent = db.relationship('Verse', backref='descendants',
    #     remote_side=[id])

    __table_args__ = (db.UniqueConstraint('text', 'parentId', name='_text_parent_uc'),
        )

    def __repr__(self):
        return 'Verse {}({}): {}'.format(
            self.id, self.parentId, self.text)