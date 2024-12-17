
import Graph from "graphology";
import Sigma from "sigma";


const graph = new Graph();
graph.addNode("1", { label: "Parent 1", x: 0, y: 0, size: 10, color: "red" });
graph.addNode("2", { label: "Parent 2", x: 10, y: 10, size: 10, color: "red" });
graph.addNode("1_2", { x: 5, y: 5, size: 5 });

graph.addNode("3", { label: "Node 2", x: 7, y: 3, size: 10, color: "red" });

graph.addEdge("1", "2", { size: 2 });
graph.addEdge("3", "1_2", { size: 2 });

const renderer = new Sigma(
  graph,
  document.getElementById("container") as HTMLDivElement
);
