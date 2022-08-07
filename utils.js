import _ from "lodash";
import fs from "fs";

function countOccurences(substr, str) {
  let counter = 0;
  for (let char of str) {
    if (char === substr) {
      counter++;
    }
  }
  return counter;
}

function generateChildren(parent) {
  const children = [];
  for (let i = 0; i < parent.state.length; i++) {
    if (parent.state[i] === "0") {
      let childState = _.cloneDeep(parent.state);
      childState[i] = parent.turn;
      const child = new gameNode(
        parent.level + 1,
        childState,
        null,
        parent.turn === "1" ? "2" : "1"
      );

      children.push(child);
    }
  }
  return children;
}

function isFinalState(node) {
  return countOccurences("0", node.state) === 0 ? true : false;
}

function generateGameTree(root, depth = 10) {
  const visited = [];
  const queue = [root];
  let i = 0;
  let j = 0;
  while (queue.length != 0) {
    const node = queue.shift();
    const state = node.state.join("");
    j++;
    if (
      !isFinalState(node) &&
      node.level < depth &&
      visited.indexOf(state) == -1
    ) {
      const children = generateChildren(node);
      queue.push(...children);
      visited.push(state);
      node.next = children;
      i++;
    }
  }
  console.log(j);
  console.log(i);
  const gameTree = root;
  const gameTreeString = JSON.stringify(gameTree);
  fs.writeFile("./gameTree.json", gameTreeString, (err) => {
    console.log("file written in directory");
  });
}

class gameNode {
  constructor(level, state, next, turn) {
    this.level = level;
    this.state = state;
    this.next = null;
    this.turn = turn;
  }
}

const root = new gameNode(
  0,
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  null,
  "1"
);

// generateGameTree(root);

const exports = {
  countOccurences,
};
export default exports;
