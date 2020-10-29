from app import app

@app.route('/')
@app.route('/index')
def index():
    return """
<h1>Branched poetry</h1> hey, hey
"""
