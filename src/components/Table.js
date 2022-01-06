import React from "react";
import { Component } from "react";
import "../App.css";
import depthFirstSearch from "../algorithms/depthFirstSearch";
import breadthFirstSearch from "../algorithms/breadthFirstSearch";
import aStar from "../algorithms/aStar";
import Legend from "./Legend.js";

export default class MakeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  refreshPage() {
    window.location.reload(false);
  }

  createTable() {
    const rows = [];
    for (var i = 0; i < 25; i++) {
      let cell = [];
      for (let j = 0; j < 40; j++) {
        if (i === 10 && j === 5) {
          cell.push(
            <td
              key={j}
              draggable="true"
              onDragStart={this.onDragStart}
              className="start-cell"
              id={i + "-" + j}
              g={0}
              h={0}
              f={0}
              parent={null}
              x={i}
              y={j}
            ></td>
          );
        } else if (i === 10 && j === 35) {
          cell.push(
            <td
              key={j}
              draggable="true"
              onDragStart={this.onDragStart}
              className="target-cell"
              id={i + "-" + j}
              g={0}
              h={0}
              f={0}
              parent={null}
              x={i}
              y={j}
            ></td>
          );
        } else {
          cell.push(
            <td
              className="cell"
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              onMouseDown={this.makeWall}
              key={j}
              id={i + "-" + j}
              g={0}
              h={0}
              f={0}
              parent={null}
              x={i}
              y={j}
            ></td>
          );
        }
      }
      rows.push(
        <tr key={i} id="row">
          {cell}
        </tr>
      );
    }
    this.setState({ rows });
  }

  componentDidMount() {
    this.createTable();
  }

  render() {
    const { rows } = this.state;

    return (
      <div className="App">
        <header className="header">
          <text className="title">Pathfinding Visualizer</text>
          <div className="buttons">
            <button
              id="button-BFS"
              onClick={() => breadthFirstSearch({ rows })}
            >
              Breadth-First Search
            </button>
            <button id="button-DFS" onClick={() => depthFirstSearch({ rows })}>
              Depth-First Search
            </button>
            <button id="button-DFS" onClick={() => aStar({ rows })}>
              A*
            </button>
            <button id="button-refresh" onClick={() => this.refreshPage()}>
              Refresh Table
            </button>
          </div>
        </header>
        <Legend></Legend>
        <table id="table">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

  onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDrop(event) {
    const id = event.dataTransfer.getData("text");

    var draggableElement = document.getElementById(id);

    var dropzone = event.target;

    var temp = document.createElement("div");
    if (draggableElement !== null) {
      draggableElement.parentNode.insertBefore(temp, draggableElement);
      dropzone.parentNode.insertBefore(draggableElement, dropzone);
      temp.parentNode.insertBefore(dropzone, temp);
      temp.parentNode.removeChild(temp);

      event.dataTransfer.clearData();
    }
  }

  makeWall(event) {
    if (event.target.className === "cell") {
      event.target.className = "wall";
    } else if (event.target.className === "wall") {
      event.target.className = "cell";
    }
  }
}
