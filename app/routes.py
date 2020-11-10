from flask import render_template, flash, redirect, url_for, request
from app import app
from app.tree import Tree
# from app.models import Verse

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

@app.route('/ajax/programme', methods=['POST'])
def retrieve_programme():
    if request.method == 'POST':
        # shows_list = Shows.query.all()
    #     result = []
    #     for i in shows_list:
    #         result.append(i.serialize(['id', 'date', 'title']))
        return "Response to Ajax here!"
        # pass
