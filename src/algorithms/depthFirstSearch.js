const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function depthFirstSearch() {
  let table = document.getElementById("table");

  let stack = [];
  let parent = {};
  let explored = new Set();

  let targetCell = null;
  let startCell = null;

  for (var x = 0, row; (row = table.rows[x]); x++) {
    for (var y = 0, cell; (cell = row.cells[y]); y++) {
      if (cell.className === "start-cell") {
        startCell = cell;
        cell.x = x;
        cell.y = y;
        stack.push(cell);
      } else if (cell.className === "target-cell") {
        targetCell = cell;
        cell.x = x;
        cell.y = y;
      } else {
        cell.x = x;
        cell.y = y;
      }
    }
  }

  while (!stack.length == 0) {
    var currentCell = stack.pop();
    currentCell.className = "visited";

    if (!explored.has(currentCell)) {
      // If the current cell has NOT been explored, then we add it to the set and continue on
      explored.add(currentCell);
    } else {
      // If it has been explored, then we skip this iteration of the loop. This saves on a LOT of runtime.
      continue;
    }

    var x = currentCell.x;
    var y = currentCell.y;

    var nextRowUp = table.rows[x - 1] && table.rows[x - 1].cells[y];
    var nextRowDown = table.rows[x + 1] && table.rows[x + 1].cells[y];
    var nextCellLeft = table.rows[x] && table.rows[x].cells[y - 1];
    var nextCellRight = table.rows[x] && table.rows[x].cells[y + 1];

    try {
      if (currentCell.id === targetCell.id) {
        let path = [targetCell.id];
        while (path.at(-1) !== startCell.id) {
          path.push(parent[path.at(-1)]);
        }
        path.reverse();
        shortestPath(path);
        return;
      }

      if (
        table.rows[x - 1] &&
        table.rows[x - 1].cells[y] &&
        !explored.has(nextRowUp) &&
        nextRowUp.className !== "wall"
      ) {
        parent[nextRowUp.id] = currentCell.id;
        stack.push(nextRowUp);
      } else if (
        table.rows[x] &&
        table.rows[x].cells[y + 1] &&
        !explored.has(nextCellRight) &&
        nextCellRight.className !== "wall"
      ) {
        parent[nextCellRight.id] = currentCell.id;
        stack.push(nextCellRight);
      } else if (
        table.rows[x + 1] &&
        table.rows[x + 1].cells[y] &&
        !explored.has(nextRowDown) &&
        nextRowDown.className !== "wall"
      ) {
        parent[nextRowDown.id] = currentCell.id;
        stack.push(nextRowDown);
      } else if (
        table.rows[x] &&
        table.rows[x].cells[y - 1] &&
        !explored.has(nextCellLeft) &&
        nextCellLeft.className !== "wall"
      ) {
        parent[nextCellLeft.id] = currentCell.id;
        stack.push(nextCellLeft);
      }

      await sleep(0);
    } catch (e) {
      console.log(e);
    }
  }

  async function shortestPath(path) {
    let allTableCells = [];
    let allTableCellsIDs = [];
    for (var x = 0, row; (row = table.rows[x]); x++) {
      for (var y = 0, cell; (cell = row.cells[y]); y++) {
        allTableCells.push(cell);
        allTableCellsIDs.push(cell.id);
      }
    }

    for (var a = 0, item; (item = path[a]); a++) {
      if (allTableCellsIDs.includes(item)) {
        var index = allTableCellsIDs.indexOf(item);
        allTableCells[index].className = "shortest";
        await sleep(25);
      }
    }
  }
}
