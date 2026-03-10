const canvas = document.getElementById("canvas");
const svg = document.getElementById("connections");

let scale = 1;
let nodes = JSON.parse(localStorage.getItem("mindmap")) || [];

function save(){
localStorage.setItem("mindmap",JSON.stringify(nodes));
}

function drawLines(){

svg.innerHTML="";

if(nodes.length<2) return;

for(let i=1;i<nodes.length;i++){

let line = document.createElementNS("http://www.w3.org/2000/svg","line");

line.setAttribute("x1",nodes[0].x+60);
line.setAttribute("y1",nodes[0].y+20);

line.setAttribute("x2",nodes[i].x+60);
line.setAttribute("y2",nodes[i].y+20);

line.setAttribute("stroke","white");
line.setAttribute("stroke-width","2");

svg.appendChild(line);
}
}

function createNode(node){

const div=document.createElement("div");

div.className="node "+node.category;
div.style.left=node.x+"px";
div.style.top=node.y+"px";
div.contentEditable=true;

div.innerHTML=node.text;

const del=document.createElement("button");
del.innerText="Delete";
del.className="deleteBtn";

del.onclick=()=>{
nodes=nodes.filter(n=>n.id!==node.id);
render();
save();
};

div.appendChild(del);

canvas.appendChild(div);

let offsetX,offsetY;

div.addEventListener("mousedown",(e)=>{

offsetX=e.offsetX;
offsetY=e.offsetY;

function move(e){

node.x=e.pageX-offsetX;
node.y=e.pageY-offsetY;

div.style.left=node.x+"px";
div.style.top=node.y+"px";

drawLines();
}

document.addEventListener("mousemove",move);

document.addEventListener("mouseup",()=>{
document.removeEventListener("mousemove",move);
save();
},{once:true});

});
}

function render(){

canvas.innerHTML="";
nodes.forEach(createNode);
drawLines();
}

document.getElementById("addNode").onclick=()=>{

let node={
id:Date.now(),
text:"New Idea",
x:300,
y:200,
category:["category1","category2","category3"][Math.floor(Math.random()*3)]
};

nodes.push(node);

render();
save();
};

document.getElementById("zoomIn").onclick=()=>{
scale+=0.1;
canvas.style.transform=`scale(${scale})`;
svg.style.transform=`scale(${scale})`;
};

document.getElementById("zoomOut").onclick=()=>{
scale-=0.1;
canvas.style.transform=`scale(${scale})`;
svg.style.transform=`scale(${scale})`;
};

if(nodes.length===0){

nodes.push({
id:1,
text:"Central Idea",
x:500,
y:250,
category:"category2"
});

save();
}

render();