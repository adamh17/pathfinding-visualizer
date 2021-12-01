const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function aStar() {
  let grid = document.getElementById("table");

  let targetCell = null;
  let startCell = null;

  for (var x = 0, row; (row = grid.rows[x]); x++) {
    for (var y = 0, cell; (cell = row.cells[y]); y++) {
      if (cell.className === "start-cell") {
        startCell = cell;
        cell.g = 0;
        cell.f = 0;
        cell.h = 0;
        cell.parent = null;
        cell.x = x;
        cell.y = y;
      } else if (cell.className === "target-cell") {
        targetCell = cell;
        cell.g = 0;
        cell.f = 0;
        cell.h = 0;
        cell.parent = null;
        cell.x = x;
        cell.y = y;
      } else {
        cell.g = 0;
        cell.f = 0;
        cell.h = 0;
        cell.x = x;
        cell.y = y;
        cell.parent = null;
      }
    }
  }

  var openList = [];
  var closedList = [];
  openList.push(startCell);

  while (openList.length > 0) {
    var low = 0;
    for (var i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[low].f) {
        low = i;
      }
    }

    var currentNode = openList[low];
    currentNode.className = "visited";

    if (currentNode.id === targetCell.id) {
      var curr = currentNode;
      var ret = [];
      while (curr.parent) {
        ret.push(curr);
        curr = curr.parent;
      }

      for (cell of ret.reverse()) {
        await sleep(100);
        cell.className = "shortest";
      }
      return;
    }

    var index = openList.indexOf(currentNode);
    openList.splice(index, 1);
    closedList.push(currentNode);

    var neighboursList = neighbours(grid, currentNode);
    for (var j = 0; j < neighboursList.length; j++) {
      var neighbour = neighboursList[j];
      if (closedList.includes(neighbour) || neighbour.className == "wall") {
        continue;
      }

      var gValue = currentNode.g + 1;
      var bestGValue = false;

      if (!openList.includes(neighbour)) {
        bestGValue = true;
        neighbour.h = heuristic(neighbour, targetCell);
        openList.push(neighbour);
      } else if (gValue < neighbour.g) {
        bestGValue = true;
      }

      if (bestGValue) {
        neighbour.parent = currentNode;
        neighbour.g = gValue;
        neighbour.f = neighbour.g + neighbour.h;
      }
    }
    await sleep(0);
  }
  return [];
}

function neighbours(grid, currentCell) {
  var ret = [];
  var x = currentCell.x;
  var y = currentCell.y;

  if (grid.rows[x - 1] && grid.rows[x - 1].cells[y]) {
    ret.push(grid.rows[x - 1].cells[y]);
  }
  if (grid.rows[x + 1] && grid.rows[x + 1].cells[y]) {
    ret.push(grid.rows[x + 1].cells[y]);
  }
  if (grid.rows[x] && grid.rows[x].cells[y - 1]) {
    ret.push(grid.rows[x].cells[y - 1]);
  }
  if (grid.rows[x] && grid.rows[x].cells[y + 1]) {
    ret.push(grid.rows[x].cells[y + 1]);
  }
  return ret;
}

function heuristic(pos0, pos1) {
  var d1 = Math.abs(pos1.x - pos0.x);
  var d2 = Math.abs(pos1.y - pos0.y);
  return d1 + d2;
}
