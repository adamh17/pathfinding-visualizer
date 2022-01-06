import { render } from "@testing-library/react";
import { Component } from "react";
import greenBox from "../greenbox.jpg";
import redBox from "../redbox.jpg";
import blueBox from "../bluebox.jpg";
import yellowBox from "../yellowbox.jpg";
import black from "../black.jpg";

export default class Legend extends Component {
  render() {
    return (
      <div className="legend">
        <div className="startNode">
          <img alt={"start"} src={greenBox} width="20" height="20"></img>
          <text className="text">Start Node</text>
        </div>
        <div className="targetNode">
          <img alt={"target"} src={redBox} width="20" height="20"></img>
          <text className="text">Target Node</text>
        </div>
        <div className="visitedNode">
          <img alt={"visited"} src={blueBox} width="20" height="20"></img>
          <text className="text">Visited Node</text>
        </div>
        <div className="shortestPathNode">
          <img alt={"shortest"} src={yellowBox} width="20" height="20"></img>
          <text className="text">Shortest Path Node</text>
        </div>
        <div className="wallNode">
          <img alt={"wall"} src={black} width="20" height="20"></img>
          <text className="text">Wall Node</text>
        </div>
      </div>
    );
  }
}
