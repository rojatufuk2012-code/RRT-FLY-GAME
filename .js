
// ---------------- DATA ----------------

let skins={
default:{price:0,owned:true,color:"yellow"},
red:{price:10,owned:false,color:"red"},
blue:{price:25,owned:false,color:"blue"},
glow:{price:100,owned:false,color:"cyan"}
};

let upgrades={
magnet:{price:50,owned:false},
shield:{price:75,owned:false}
};

// ---------------- OPEN ----------------
function openShop(){
document.getElementById("shop").style.display="block";
state="shop";
renderShop();
}

// ---------------- CLOSE ----------------
function closeShop(){
document.getElementById("shop").style.display="none";
state="menu";
saveGame();
}

// ---------------- TAB SWITCH ----------------
function switchTab(tab){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
document.querySelectorAll(".tabPage").forEach(p=>p.classList.remove("active"));

if(tab==="skins"){
document.querySelectorAll(".tab")[0].classList.add("active");
document.getElementById("skinsTab").classList.add("active");
}
else{
document.querySelectorAll(".tab")[1].classList.add("active");
document.getElementById("upgradesTab").classList.add("active");
}
}

// ---------------- RENDER ----------------
function renderShop(){

// SKINS
let html="";
for(let k in skins){

let s=skins[k];

html+=`
<div class="shopItem" 
onmouseenter="previewSkin('${k}')">

<b>${k.toUpperCase()}</b><br>
Price: ${s.price}<br>

<canvas class="preview" id="prev_${k}" width="100" height="50"></canvas><br>
`;

if(!s.owned){
html+=`<button onclick="buySkin('${k}')">BUY</button>`;
}else{
html+=`<button onclick="equip('${k}')">EQUIP</button>`;
}

html+=`</div>`;
}

document.getElementById("skinsTab").innerHTML=html;


// UPGRADES
let upHTML="";
for(let u in upgrades){

let up=upgrades[u];

upHTML+=`
<div class="shopItem">
<b>${u.toUpperCase()}</b><br>
Price: ${up.price}<br>
`;

if(!up.owned){
upHTML+=`<button onclick="buyUpgrade('${u}')">BUY</button>`;
}else{
upHTML+=`<span>OWNED</span>`;
}

upHTML+=`</div>`;
}

document.getElementById("upgradesTab").innerHTML=upHTML;


// preview initial
for(let k in skins) drawPreview(k);
}

// ---------------- PREVIEW ----------------
function drawPreview(type){

let c=document.getElementById("prev_"+type);
if(!c) return;

let ctx=c.getContext("2d");

let t=0;

function anim(){
t+=0.1;

ctx.clearRect(0,0,100,50);

ctx.fillStyle=skins[type].color;

let y=25+Math.sin(t)*5;

ctx.beginPath();
ctx.arc(50,y,8,0,Math.PI*2);
ctx.fill();

requestAnimationFrame(anim);
}

anim();
}

// hover preview trigger
function previewSkin(type){
drawPreview(type);
}

// ---------------- BUY ----------------
function buySkin(type){
let s=skins[type];

if(coins>=s.price && !s.owned){
coins-=s.price;
s.owned=true;
skin=type;
renderShop();
updateUI();
}
}

function equip(type){
skin=type;
renderShop();
}

// ---------------- UPGRADES ----------------
function buyUpgrade(type){
let u=upgrades[type];

if(coins>=u.price && !u.owned){
coins-=u.price;
u.owned=true;
renderShop();
}
}
