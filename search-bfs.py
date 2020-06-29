# dummy data for now.. 
# this will be replaced by the data from the javascript application
from helper import QueueFrontier
from helper import Node

class Maze:
    
    def __init__(self):
        self.visited = []
        ## get these values from the JS
        self.maze_width = 6   # number of columns
        self.maze_height = 4  # number of rows
        self.start = (4,2)
        self.goal = (1,5)
        self.walls = [[0,1,0,0,0,1], 
                      [1,0,1,0,1,0],
                      [1,0,1,0,0,0],
                      [0,0,0,0,1,0]]
        ## till here 
        self.frontier = QueueFrontier()
        start_node = Node(self.start, None, None)
        self.frontier.add(start_node)

    def bfs(self):
        if self.frontier.empty():
            return 0
        while(not self.frontier.empty()):
            node = self.frontier.remove()
            if node.state == self.goal:
                return node # solution found

            self.visited.append(node.state) 
            print(f'NODE: {node.state}')
            # expand nodes
            neighbours = self.find_neighbours(node)
            for neighbour in neighbours:
                # if the neighbour node is not already in the frontier
                # or in the visited list
                # then only add the node in the frontier....
                if neighbour.state not in self.visited and not self.frontier.contains_state(neighbour):
                    print(f'neighbour: {neighbour.state}')
                    self.frontier.add(neighbour)

    def find_neighbours(self, n):
        neighbour_list = []
        row,column = n.state
        # not looking at the diagonal neighbours
        neighbour_options = [( (row,column+1),"RIGHT" ),    # neighbour right
                             ( (row-1,column),"TOP"   ),    # neighbour top
                             ( (row,column-1),"LEFT"  ),    # neighbour left
                             ( (row+1,column),"BOTTOM")]    # neighbiut bottom

        for option in neighbour_options:
            new_pos, action = option
            # new_pos[0] -> row    ->  (height)
            # new_pos[1] -> column ->  (width)
            if (
                (new_pos[0] <= self.maze_height and new_pos[1] <= self.maze_width) and 
                (new_pos[0] > 0 and new_pos[1] > 0) and 
                not self.walls[new_pos[0]-1][new_pos[1]-1]
               ): 
                neighbour_list.append(Node(new_pos, n, action))  #neighbour right
    
        return neighbour_list

    def solution(self):
        path = []
        sol_node = self.bfs()
        node = sol_node
        # make the BFS path
        while(node is not None):
            path.append(node)
            node = node.parent
        # print the resutl
        path.reverse()
        for node in path:
            print(f'{node.action} {node.state}', end=" ")  

maze = Maze()
maze.solution()