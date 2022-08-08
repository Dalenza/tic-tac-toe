// import _ from "lodash";
// import fs from "fs";
const winningConfigs = ["123", "456", "789", "147", "258", "369", "159", "357"];
function checkForWin(arr, winConfig) {
  const n = arr.length;
  for (let i = 0; i < n - 2; i++) {
    let sub = arr[i];
    for (let k = i + 1; k < n - 1; k++) {
      sub = arr[i] + arr[k];
      for (let j = k + 1; j < n; j++) {
        sub += arr[j];
        if (sub === winConfig) {
          return true;
        }
        sub = arr[i] + arr[k];
      }
    }
    sub = arr[i];
  }
  return false;
}

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
  let arrX = [];
  let arrO = [];
  for (let i = 0; i < node.state.length; i++) {
    if (node.state[i] == "1") {
      arrX.push(String(i + 1));
    } else if (node.state[i] == "2") {
      arrO.push(String(i + 1));
    }
  }
  for (let win of winningConfigs) {
    if (checkForWin(arrX, win)) {
      return true;
    }
    if (checkForWin(arrO, win)) {
      return true;
    }
  }
  return false;
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
// const node = new gameNode(
//   5,
//   ["1", "1", "1", "2", "2", "0", "0", "0", "0"],
//   null,
//   "2"
// );
// const node2 = new gameNode(
//   6,
//   ["1", "0", "0", "2", "2", "0", "1", "2", "1"],
//   null,
//   "2"
// );
// console.log(isFinalState(node2));

const root = new gameNode(
  0,
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  null,
  "1"
);

// generateGameTree(root);

const exports = {
  countOccurences,
  checkForWin,
  winningConfigs,
};
export default exports;
