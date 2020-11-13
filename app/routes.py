from flask import render_template, flash, redirect, url_for, request, \
    jsonify
from app import app
from app.tree import Tree
from app.models import Verse

@app.route('/')
@app.route('/index')
def index():
    # verseTree = Tree('',[
    #     Tree("This poem", [
    #         Tree("I am writing to you"),
    #         Tree("is extraordinary")
    #     ]),
    #     Tree("I like", [
    #         Tree("jogging"),
    #         Tree("cycling")
    #     ])
    # ])

    return render_template('index.html')

@app.route('/instruction')
def instruction():
    return render_template('instruction.html')

def jsonifyVerses(verses):
    return jsonify({
        "ids":[verse.id for verse in verses],
        "texts":[verse.text for verse in verses]
    })

@app.route('/ajax/initialVersesProvider', methods=['POST'])
def provideInitialVerses():
    firstVerses = Verse.query.filter(Verse.parent == None).all()

    return jsonifyVerses(firstVerses)

@app.route('/ajax/existingVerseHandler', methods=['POST'])
def processExistingVerse():
    # verseToReturn = Verse.query.get(4)
    receivedVerseId = request.json['id']

    nextVerses = Verse.query.filter(Verse.parentId == receivedVerseId).all()

    # print(nextVerses)
        
    return jsonify({
        "ids":[verse.id for verse in nextVerses],
        "texts":[verse.text for verse in nextVerses]
    })