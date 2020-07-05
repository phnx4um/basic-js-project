
# node keep tracks of a state, the parent of the state(the previus state) 
# and the action we took to transition from the previous state to current state
class Node():
    def __init__(self, state, parent, action):
        # state in this problem is the current position (x,y) coordiate in the maze 
        self.state = state
        self.parent = parent
        self.action = action

# this frontier is used for implementing DFS
class StackFrontier():
    def __init__(self):
        self.frontier = []

    def add(self, node):
        self.frontier.append(node)

    def contains_state(self, state):
        return any(node.state == state for node in self.frontier)

    def empty(self):
        return len(self.frontier) == 0

    def remove(self):
        if self.empty():
            raise Exception("empty frontier")
        else:
            node = self.frontier[-1]
            self.frontier = self.frontier[:-1]
            return node

    def frontier_states(self):
        states = []
        for node in self.frontier:
            states.append(node.state)
        # list of node tuples
        return states

# this frontier is used for implementing BFS
class QueueFrontier(StackFrontier):
    def remove(self):
        if self.empty():
            raise Exception("empty frontier")
        else:
            node = self.frontier[0]
            self.frontier = self.frontier[1:]
            return node