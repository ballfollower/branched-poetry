from app import db

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # TODO: Make this not-null
    text = db.Column(db.String(200))
    
    # TODO: Make this not-null
    parentId = db.Column(db.Integer, db.ForeignKey('verse.id'))
    
    parent = db.relationship('Verse', backref='descendants',
        remote_side=[id])

    # TODO: Add this constraint (requires migration)
    # __table_args__ = (UniqueConstraint('customer_id', 'location_code', name='_customer_location_uc'),
    #     )

    def __repr__(self):
        return '<Verse: {}>'.format(self.text)  