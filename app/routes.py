from flask import render_template
from app import app
from tree import Tree

@app.route('/')
@app.route('/index')
def index():
    verseTree = Tree("")

    return render_template('index.html')
