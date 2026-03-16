const canvas = document.getElementById("canvas");
const connections = document.getElementById("connections");

let nodes = [];
let scale = 1;



function addNode(){

const rect = canvas.getBoundingClientRect();

let node;

if(nodes.length===0){

node={
id:Date.now(),
text:"",
x:rect.width/2-80,
y:rect.height/2-30
};

}else{

node={
id:Date.now(),
text:"",
x:rect.width/2+(Math.random()*200-100),
y:rect.height/2+(Math.random()*200-100)
};

}

nodes.push(node);

render();

}



function createNode(node){

const div=document.createElement("div");
div.className="node";

div.style.left=node.x+"px";
div.style.top=node.y+"px";

const input=document.createElement("input");

input.placeholder="Enter your idea...";
input.value=node.text;

input.addEventListener("input",()=>{
node.text=input.value;
});

const del=document.createElement("button");

del.innerText="Delete";
del.className="deleteBtn";

del.onclick=()=>{

nodes = nodes.filter(n=>n.id!==node.id);

render();

};

div.appendChild(input);
div.appendChild(del);

canvas.appendChild(div);

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

div.addEventListener("mousedown",(e)=>{

isDragging = true;

offsetX = e.clientX - node.x;
offsetY = e.clientY - node.y;

});

document.addEventListener("mousemove",(e)=>{

if(!isDragging) return;

node.x = e.clientX - offsetX;
node.y = e.clientY - offsetY;

div.style.left = node.x + "px";
div.style.top = node.y + "px";

drawConnections();

});

document.addEventListener("mouseup",()=>{

isDragging = false;

});


}



function render(){

canvas.innerHTML="";
connections.innerHTML="";

nodes.forEach(createNode);

drawConnections();

}




function drawConnections(){

connections.innerHTML = "";   // clear old lines

if(nodes.length < 2) return;

for(let i = 1; i < nodes.length; i++){

const line = document.createElementNS(
"http://www.w3.org/2000/svg",
"line"
);

line.setAttribute("x1", nodes[0].x + 85);
line.setAttribute("y1", nodes[0].y + 35);

line.setAttribute("x2", nodes[i].x + 85);
line.setAttribute("y2", nodes[i].y + 35);

line.setAttribute("stroke", "white");
line.setAttribute("stroke-width", "2");

connections.appendChild(line);

}
}



function saveMap(){

const name=document.getElementById("mapName").value;

if(!name){

alert("Enter map name first");
return;

}

localStorage.setItem("map_"+name,JSON.stringify(nodes));

updateMapList();

alert("Map Saved");

}



function loadSelectedMap(){

const name=document.getElementById("mapList").value;

if(!name) return;

const saved=JSON.parse(localStorage.getItem("map_"+name));

if(!saved) return;

nodes=saved;

render();

}



function updateMapList(){

const list=document.getElementById("mapList");

list.innerHTML='<option value="">Load Map</option>';

for(let key in localStorage){

if(key.startsWith("map_")){

let name=key.replace("map_","");

let option=document.createElement("option");

option.value=name;
option.textContent=name;

list.appendChild(option);

}

}

}



function zoomIn(){

scale+=0.1;

canvas.style.transform=`scale(${scale})`;
connections.style.transform=`scale(${scale})`;

}

function zoomOut(){

scale-=0.1;

canvas.style.transform=`scale(${scale})`;
connections.style.transform=`scale(${scale})`;

}



updateMapList();
render();
