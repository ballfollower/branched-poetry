from app import db

class Verse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    text = db.Column(db.String(200))
    
    parentId = db.Column(db.Integer, db.ForeignKey('verse.id'))
    
    parent = db.relationship('Verse', backref='descendants',
        remote_side=[id])

    def __repr__(self):
        return '<Verse: {}>'.format(self.text)  