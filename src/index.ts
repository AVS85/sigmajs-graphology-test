
import Graph from "graphology";
import Sigma from "sigma";
// import { circular, rotation } from "graphology-layout"; 
import family from './mock_family'
import partnershipsList from './mock_partnerships'
// import { v4 as uuid } from 'uuid';
import forceAtlas2 from 'graphology-layout-forceatlas2';


const graph = new Graph();

family.forEach(node => {
  const { id, label } = node;
  graph.addNode(id, { 
    label, 
    x: Math.random() * 100, 
    y: Math.random() * 100,  
    size: 10
  })
})

// Список id партнёрских нод
// const partnersIdsList = new Set()
// family.forEach(node => !!node?.partnersId ? partnersIdsList.add(node.partnersId) : undefined)
// console.log('partnersIdsList', partnersIdsList);

family.forEach(node => {
  const {id, partnershipsIDs } = node
  // если у человека есть партнеры
  if (Array.isArray(partnershipsIDs) && partnershipsIDs.length){
    // Добавляем партнёрские ноды
    partnershipsIDs.forEach(shipId => {
      
      // фильтруем ноды для которых нужно добавить партнерскую ноду и связь
      const partnerNodes = family
      .filter(el => el.partnershipsIDs?.includes(shipId))
      .map(el => { 
        return { id: el.id, shipId }
      }); 
      
      // console.log('partnerNodes', partnerNodes);

      // Добавляем партнёрские ноды
      partnerNodes.forEach(node => {
        const { shipId } = node;
        if (!graph.hasNode(shipId)) {
          graph.addNode(shipId, { 
            label: node.shipId,  
            x: Math.random() * 100, 
            y: Math.random() * 100, 
            size: 10, 
            color: "red" 
          })

        }
      })

      // Добавляем связи партнерских нод с родителями
      partnerNodes.forEach(node => {
        const { id, shipId } = node;
        console.log('node', node);
        if (!graph.hasEdge(shipId, id)) {
          graph.addEdge(shipId, id, { size: 2 });
        }
      })

      // Добавляем связи партнерских нод с детьми
      partnershipsList.forEach(ship => {
        const { id: shipId } = ship;
        ship.childId.forEach(childId => {
          if (!graph.hasEdge(childId, shipId) && graph.hasNode(childId) && graph.hasNode(shipId)) {
            graph.addEdge(childId, shipId, { size: 2 });
          }
        })
      })
    })
  } 
})

// circular(graph);
// rotation(graph, 0);

const positions = forceAtlas2(graph, {
  iterations: 150,
  settings: {
    gravity: 10,
    scalingRatio: 10,
    strongGravityMode: false,
  }
});

// forceAtlas2.assign(graph);

// Устанавливаем координаты x и y для каждого узла
graph.forEachNode((node) => {
  // const coords = graph.getNodeAttributes(node);
  // graph.setNodeAttribute(node, 'x', coords.x || Math.random() * 100);  
  // graph.setNodeAttribute(node, 'y', coords.y || Math.random() * 100);  
  const coords = positions[node];
  graph.setNodeAttribute(node, 'x', coords.x);  
  graph.setNodeAttribute(node, 'y', coords.y);  
});

const renderer = new Sigma(
  graph,
  document.getElementById("container") as HTMLDivElement
);
