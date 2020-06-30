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
    bfs_path = maze.solution()
    print(bfs_path)
    path_dict = []
    for node in bfs_path: 
        tmp = dict((name, getattr(node, name)) for name in dir(node) if not name.startswith('__'))
        del tmp['parent']
        path_dict.append(tmp)

    print("")
    print(path_dict)
    response = make_response(jsonify({"path": path_dict}), 200)
    return response 

if __name__ == "__main__":
    app.run(debug=True)