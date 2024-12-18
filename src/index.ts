
import Graph from "graphology";
import Sigma from "sigma";
import { circular, rotation } from "graphology-layout"; 
import family from './mock_family'
// import { v4 as uuid } from 'uuid';

const graph = new Graph();

family.forEach(node => {
  const { id, label } = node;
  graph.addNode(id, { label, size: 10})
})

// Список id партнёрских нод
const partnersIdsList = new Set()
family.forEach(node => !!node?.partnersId ? partnersIdsList.add(node.partnersId) : undefined)
console.log('partnersIdsList', partnersIdsList);

family.forEach(node => {
  const {id, partnersId } = node
  if (partnersId){
    // Добавляем партнёрские ноды
    if (!graph.hasNode(partnersId)) {
      graph.addNode(partnersId, { label: partnersId, size: 10, color: "red" })
    }
    // Добавляем связи партнерских нод с родителями
    if (graph.hasNode(partnersId)) {
      graph.addEdge(id, partnersId, { size: 2 });
    }
    // Добавляем связи партнерских нод с детьми
    const childNodes = family.filter(node => node.parentsId === partnersId)
    console.log('childNodes', childNodes);
    if (childNodes.length) {
      childNodes.forEach(childNode => {
        if (!graph.hasEdge(childNode.id, partnersId)) {

          graph.addEdge(childNode.id, partnersId, { size: 2 });
        }
      })
    }
    
    // if (graph.hasNode(node.partnersId)) {
    //   graph.addEdge(node.id, node.partnersId, { size: 2 });
    // }
  } 
})
// Присоединение родителей к партнерским нодам

// family.forEach(item => {

 
// })
// graph.addNode("1", { label: "Parent 1", size: 10, color: "red" });
// graph.addNode("2", { label: "Parent 2", size: 10, color: "red" });
// graph.addNode("1_2", { size: 5 });

// graph.addNode("3", { label: "Child_1_2", size: 10, color: "red" });

// graph.addEdge("1", "1_2", { size: 2 });
// graph.addEdge("2", "1_2", { size: 2 });
// graph.addEdge("3", "1_2", { size: 2 });

circular(graph);
// rotation(graph, 360);


// Устанавливаем координаты x и y для каждого узла
graph.forEachNode((node, attr) => {
  const coords = graph.getNodeAttributes(node);
  graph.setNodeAttribute(node, 'x', coords.x || Math.random() * 100); // Устанавливаем случайное значение, если нет
  graph.setNodeAttribute(node, 'y', coords.y || Math.random() * 100); // Устанавливаем случайное значение, если нет
});

const renderer = new Sigma(
  graph,
  document.getElementById("container") as HTMLDivElement
);
