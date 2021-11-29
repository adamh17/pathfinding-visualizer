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
      } else if (cell.className === "target-cell") {
        targetCell = cell;
        cell.g = 0;
        cell.f = 0;
        cell.h = 0;
        cell.parent = null;
      } else {
        cell.g = 0;
        cell.f = 0;
        cell.h = 0;
        cell.parent = null;
      }
    }
  }

  var openList = [];
  var closedList = [];
  openList.push(startCell);

  while (openList.length > 0) {
    var lowInd = 0;
    for (var i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) {
        lowInd = i;
      }
    }

    var currentNode = openList[lowInd];

    if (currentNode.id === targetCell.id) {
      var ret = [];
      while (currentNode.parent) {
        currentNode.className = "visited";
        ret.push(currentNode);
        currentNode = currentNode.parent;
      }

      for (cell of ret.reverse()) {
        await sleep(100);
        cell.className = "shortest";
      }
    }

    var index = openList.indexOf(currentNode);
    openList.splice(index, 1);
    closedList.push(currentNode);

    var neighborss = neighbors(grid, currentNode);
    for (var j = 0; j < neighbors.length; j++) {
      var neighbor = neighborss[j];
      if (closedList.includes(neighbor)) {
        continue;
      }

      var gScore = currentNode.g + 1;
      var gScoreIsBest = false;

      if (!openList.includes(neighbor)) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor.id, targetCell.id);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  function neighbors(grid, currentCell) {
    let rowUp = parseInt(currentCell.id.split("-")[0]);
    let rowDown = parseInt(currentCell.id.split("-")[0]);

    let r = currentCell.id.split("-")[0];
    let c = currentCell.id.split("-")[1];
    let currentRow = grid.rows[r];

    let nextCellRight = currentRow.cells[r + "-" + String(parseInt(c) + 1)];
    let nextCellLeft = currentRow.cells[r + "-" + String(parseInt(c) - 1)];

    let nextRowUp = undefined;
    if (rowUp - 1 >= 0) {
      nextRowUp =
        grid.rows[(rowUp - 1).toString()].cells[
          (rowUp - 1).toString() + "-" + c
        ];
    }
    rowUp = rowUp - 1;

    let nextRowDown = undefined;
    if (rowDown + 1 <= 24) {
      nextRowDown =
        grid.rows[(rowDown + 1).toString()].cells[
          (rowDown + 1).toString() + "-" + c
        ];
    }
    rowDown = rowDown + 1;

    var ret = [];

    if (nextCellLeft !== undefined) {
      ret.push(nextCellLeft);
    }

    if (nextCellRight !== undefined) {
      ret.push(nextCellRight);
    }

    if (nextRowUp !== undefined) {
      ret.push(nextRowUp);
    }

    if (nextRowDown !== undefined) {
      ret.push(nextRowDown);
    }

    return ret;
  }

  function heuristic(pos0, pos1) {
    var x = parseInt(pos0.split("-")[0]);
    var y = parseInt(pos0.split("-")[1]);

    var a = parseInt(pos1.split("-")[0]);
    var b = parseInt(pos1.split("-")[1]);

    var d1 = Math.abs(x - a);
    var d2 = Math.abs(y - b);
    return d1 + d2;
  }

  return [];
}
