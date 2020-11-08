from app import app, db

from app.models import Verse

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Verse': Verse}