from flask import Flask, jsonify, render_template, request
from flask.helpers import make_response
from search import *


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bfs', methods=["POST"])
def bfs():
    #solve maze using bfs
    req = request.get_json()
    print(req)
    start= tuple(req.get('start'))
    goal = tuple(req.get('end'))
    maze = Maze(req.get('width'), req.get('height'), start , goal , req.get('wall'))
    maze.solution()
    res = make_response(jsonify({"message": "success"}), 200)
    return res

if __name__ == "__main__":
    app.run(debug=True)