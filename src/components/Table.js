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
        if (i === 5 && j === 5) {
          cell.push(
            <td
              key={j}
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
        } else if (i === 5 && j === 25) {
          cell.push(
            <td
              key={j}
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
        } else if (i >= 3 && i <= 8 && j === 16) {
          cell.push(
            <td
              key={j}
              className="wall"
              id={i + "-" + j}
              g={0}
              h={0}
              f={0}
              parent={null}
              x={i}
              y={j}
            ></td>
          );
        } else if (i === 8 && j > 20 && j < 40) {
          cell.push(
            <td
              key={j}
              className="wall"
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
              className="testing"
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
}
