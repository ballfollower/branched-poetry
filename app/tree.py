class Tree:
    def __init__(self, data, children = []):
        # self.level = level
        self.children = children
        self.data = data

    def printPretty(self, indent, last):
        """
        Code adapted from Stack Overflow's post by Will and Groo:
        https://stackoverflow.com/a/1649223
        """
    
        print(indent, end='')
        if (last):
            print("\\-", end='')
            indent += "  "
        else:
            print("|-", end='')
            indent += "| "
        print(self.data)
        for i in range(len(self.children)):
            self.children[i].printPretty(indent, i == len(self.children) - 1)

if __name__ == "__main__":
    wordTree = Tree('A',[
        Tree("L", [
            Tree("L"),
            Tree("T")
        ]),
        Tree("N", [
            Tree("A"),
            Tree("Y")
        ])
    ])

    wordTree.printPretty('', True)