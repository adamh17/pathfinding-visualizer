import React from "react";
import { Component } from "react";
import "../App.css";
import depthFirstSearch from "../algorithms/depthFirstSearch";
import breadthFirstSearch from "../algorithms/breadthFirstSearch";
import Legend from "./Legend.js";

export default class MakeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  componentDidMount() {
    const rows = [];
    for (var i = 0; i < 25; i++) {
      let cell = [];
      for (let j = 0; j < 40; j++) {
        if (i === 5 && j === 5) {
          cell.push(<td key={j} className="start-cell" id={i + "-" + j}></td>);
        } else if (i === 5 && j === 25) {
          cell.push(<td key={j} className="target-cell" id={i + "-" + j}></td>);
        } else {
          cell.push(<td className="testing" key={j} id={i + "-" + j}></td>);
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
