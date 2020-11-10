from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import LoginForm
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

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data
        ))
        return redirect(url_for('index'))

    return render_template('login.html', title='Sign In', form=form)

@app.route('/ajax/programme', methods=['POST'])
def retrieve_programme():
    if request.method == 'POST':
        # shows_list = Shows.query.all()
    #     result = []
    #     for i in shows_list:
    #         result.append(i.serialize(['id', 'date', 'title']))
        return "Response to Ajax here!"
        # pass
