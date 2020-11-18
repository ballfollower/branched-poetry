from flask import render_template, flash, redirect, url_for, request, \
    jsonify
from app import app, db
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
    firstVerses = Verse.query.filter(Verse.parentId == None).all()

    return jsonifyVerses(firstVerses)

@app.route('/ajax/existingVerseHandler', methods=['POST'])
def processExistingVerse():
    receivedVerseId = request.json['id']

    nextVerses = Verse.query.filter(Verse.parentId == receivedVerseId).all()

    return jsonify({
        "ids":[verse.id for verse in nextVerses],
        "texts":[verse.text for verse in nextVerses]
    })

@app.route('/ajax/newVerseHandler', methods=['POST'])
def processNewVerse():
    parentId = request.json['parentId']
    text = request.json['text']

    newVerse = Verse(parentId=parentId, text=text)

    db.session.add(newVerse)
    db.session.flush()

    idAssigned = newVerse.id

    db.session.commit()

    return jsonify({'id': idAssigned})