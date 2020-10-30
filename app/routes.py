from flask import render_template
from app import app
from .tree import Tree

@app.route('/')
@app.route('/index')
def index():
    verseTree = Tree('',[
        Tree("This poem", [
            Tree("I am writing to you"),
            Tree("is extraordinary")
        ]),
        Tree("I like", [
            Tree("jogging"),
            Tree("cycling")
        ])
    ])

    return render_template('index.html', verses = verseTree)

@app.route('/instruction')
def instruction():
    return render_template('instruction.html')