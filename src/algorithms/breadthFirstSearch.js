const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function breadthFirstSearch() {
  let table = document.getElementById("table");

  let queue = [];
  let targetCell = null;
  let startCell = null;

  for (var x = 0, row; (row = table.rows[x]); x++) {
    for (var y = 0, cell; (cell = row.cells[y]); y++) {
      if (cell.className === "start-cell") {
        startCell = cell;
        cell.x = x;
        cell.y = y;
        queue.push(cell);
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

  let explored = new Set();
  let parent = {};
  while (queue.length > 0) {
    let currentCell = queue.shift();

    if (
      currentCell.className != "start-cell" &&
      currentCell.className != "target-cell"
    ) {
    }
    currentCell.className = "visited";

    if (!explored.has(currentCell)) {
      // If the current cell has NOT been explored, then we add it to the set and continue on
      explored.add(currentCell);
    } else {
      // If it has been explored, then we skip this iteration of the loop. This saves on a LOT of runtime.
      continue;
    }

    try {
      if (currentCell.id === targetCell.id) {
        let path = [targetCell.id];
        while (path.at(-1) !== startCell.id) {
          path.push(parent[path.at(-1)]);
        }
        path.reverse();
        console.log(path);
        shortestPath(path);
        return;
      }

      var x = currentCell.x;
      var y = currentCell.y;

      var nextRowUp = table.rows[x - 1] && table.rows[x - 1].cells[y];
      var nextRowDown = table.rows[x + 1] && table.rows[x + 1].cells[y];
      var nextCellLeft = table.rows[x] && table.rows[x].cells[y - 1];
      var nextCellRight = table.rows[x] && table.rows[x].cells[y + 1];

      if (
        nextRowUp !== undefined &&
        !explored.has(nextRowUp) &&
        nextRowUp.className !== "wall"
      ) {
        parent[nextRowUp.id] = currentCell.id;
        queue.push(nextRowUp);
      }

      if (
        nextCellRight !== undefined &&
        !explored.has(nextCellRight) &&
        nextCellRight.className !== "wall"
      ) {
        parent[nextCellRight.id] = currentCell.id;
        queue.push(nextCellRight);
      }

      if (
        nextRowDown !== undefined &&
        !explored.has(nextRowDown) &&
        nextRowDown.className !== "wall"
      ) {
        parent[nextRowDown.id] = currentCell.id;
        queue.push(nextRowDown);
      }

      if (
        nextCellLeft !== undefined &&
        !explored.has(nextCellLeft) &&
        nextCellLeft.className !== "wall"
      ) {
        parent[nextCellLeft.id] = currentCell.id;
        queue.push(nextCellLeft);
      }

      await sleep(0);
    } catch (e) {
      console.log(e);
    }
  }

  async function shortestPath(path) {
    for (var x = 0, row; (row = table.rows[x]); x++) {
      for (var y = 0, cell; (cell = row.cells[y]); y++) {
        if (path.includes(cell.id)) {
          cell.className = "shortest";
          await sleep(40);
        }
      }
    }
  }
}
