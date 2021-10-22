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
        queue.push(cell);
      } else if (cell.className === "target-cell") {
        targetCell = cell;
      }
    }
  }

  let explored = new Set();
  let parent = {};
  while (queue.length > 0) {
    let rowUp = parseInt(queue[0].id.split("-")[0]);
    let rowDown = parseInt(queue[0].id.split("-")[0]);

    let currentCell = queue.shift();
    currentCell.className = "visited";

    if (!explored.has(currentCell)) {
      // If the current cell has NOT been explored, then we add it to the set and continue on
      explored.add(currentCell);
    } else {
      // If it has been explored, then we skip this iteration of the loop. This saves on a LOT of runtime.
      continue;
    }

    let r = currentCell.id.split("-")[0];
    let c = currentCell.id.split("-")[1];
    let currentRow = table.rows[r];

    let nextCellRight = currentRow.cells[r + "-" + String(parseInt(c) + 1)];
    let nextCellLeft = currentRow.cells[r + "-" + String(parseInt(c) - 1)];

    let nextRowUp = undefined;
    if (rowUp - 1 >= 0) {
      nextRowUp =
        table.rows[(rowUp - 1).toString()].cells[
          (rowUp - 1).toString() + "-" + c
        ];
    }
    rowUp = rowUp - 1;

    let nextRowDown = undefined;
    if (rowDown + 1 <= 24) {
      nextRowDown =
        table.rows[(rowDown + 1).toString()].cells[
          (rowDown + 1).toString() + "-" + c
        ];
    }
    rowDown = rowDown + 1;

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

      if (nextRowUp !== undefined && !explored.has(nextRowUp)) {
        parent[nextRowUp.id] = currentCell.id;
        queue.push(nextRowUp);
        // currentCell.className = "visited";
      }

      if (nextCellRight !== undefined && !explored.has(nextCellRight)) {
        parent[nextCellRight.id] = currentCell.id;
        queue.push(nextCellRight);
        // currentCell.className = "visited";
      }

      if (nextRowDown !== undefined && !explored.has(nextRowDown)) {
        parent[nextRowDown.id] = currentCell.id;
        queue.push(nextRowDown);
        // currentCell.className = "visited";
      }

      if (nextCellLeft !== undefined && !explored.has(nextCellLeft)) {
        parent[nextCellLeft.id] = currentCell.id;
        queue.push(nextCellLeft);
        // currentCell.className = "visited";
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
