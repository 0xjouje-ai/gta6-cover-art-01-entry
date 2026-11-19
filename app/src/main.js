import {layouts,sizes,getPanels,panelPoint} from './layouts.js';
import {grades} from './grades.js';
import {loadPhoto} from './panels.js';
import {renderCover,downloadCover} from './export.js';
import {showShot} from './shots.js';
const $=id=>document.getElementById(id),canvas=$('cover');
const state={layout:0,grade:0,size:sizes[0],title:$('title').value,subtitle:$('subtitle').value,panels:[]};let selected=0;
function redraw(){renderCover(canvas,state);$('dimensions').textContent=state.size.join(' × ')+' PX';}
function selectPanel(index){selected=index;$('panel-label').textContent=`PANEL 0${index+1}`;$('zoom').value=state.panels[index].zoom;$('zoom-value').textContent=Math.round(state.panels[index].zoom*100)+'%';[...$('panels').children].forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed',i===index);});}
function refreshThumbnails(){$('panels').replaceChildren();state.panels.forEach((p,i)=>{const b=document.createElement('button'),img=document.createElement('img'),label=document.createElement('span');img.src=p.photo.src;img.alt=`Select panel ${i+1}`;label.textContent=`0${i+1}`;b.append(img,label);b.onclick=()=>selectPanel(i);$('panels').append(b);});selectPanel(selected);}
function createChoices(id,items,action){items.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.textContent=typeof item==='string'?item:item.name;b.classList.toggle('active',i===0);b.setAttribute('aria-pressed',i===0);if(item.a)b.style.setProperty('--swatch',`linear-gradient(135deg,${item.a},${item.b})`);b.onclick=()=>{[...$(id).children].forEach((n,j)=>{n.classList.toggle('active',i===j);n.setAttribute('aria-pressed',i===j);});action(i);redraw();};$(id).append(b);});}
createChoices('layouts',layouts,i=>state.layout=i);createChoices('grades',grades,i=>state.grade=i);createChoices('sizes',sizes.map((s,i)=>({name:`${s.join(' × ')}   ${['Square','Portrait','Landscape'][i]}`})),i=>state.size=sizes[i]);
for(const key of ['title','subtitle'])$(key).oninput=()=>{state[key]=$(key).value;redraw();};
$('zoom').oninput=()=>{state.panels[selected].zoom=+$('zoom').value;$('zoom-value').textContent=Math.round(+$('zoom').value*100)+'%';redraw();};
$('reset').onclick=()=>{Object.assign(state.panels[selected],{x:0,y:0,zoom:1});selectPanel(selected);redraw();};
$('fill').onclick=()=>{const source=state.panels[selected];state.panels=state.panels.map(()=>({...source}));refreshThumbnails();redraw();};
$('photo').onchange=async e=>{const file=e.target.files[0];if(!file)return;const url=URL.createObjectURL(file);try{const photo=await loadPhoto(url);state.panels[selected]={photo,x:0,y:0,zoom:1};refreshThumbnails();redraw();$('status').textContent='Photo loaded locally.';}catch(err){URL.revokeObjectURL(url);$('status').textContent=err.message;}e.target.value='';};
let drag=null;
function pointerPosition(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};}
canvas.onpointerdown=e=>{const p=pointerPosition(e),boxes=getPanels(state.layout,...state.size);for(let i=boxes.length-1;i>=0;i--){const local=panelPoint(boxes[i],p.x,p.y);if(local.x>=0&&local.y>=0&&local.x<=boxes[i].w&&local.y<=boxes[i].h){selectPanel(i);drag={start:local,box:boxes[i],x:state.panels[i].x,y:state.panels[i].y};canvas.setPointerCapture(e.pointerId);break;}}};
canvas.onpointermove=e=>{if(!drag)return;const p=pointerPosition(e),local=panelPoint(drag.box,p.x,p.y),panel=state.panels[selected],im=panel.photo,s=Math.max(drag.box.w/im.width,drag.box.h/im.height)*panel.zoom;panel.x=Math.max(-1,Math.min(1,drag.x+2*(local.x-drag.start.x)/Math.max(1,im.width*s-drag.box.w)));panel.y=Math.max(-1,Math.min(1,drag.y+2*(local.y-drag.start.y)/Math.max(1,im.height*s-drag.box.h)));redraw();};canvas.onpointerup=canvas.onpointercancel=()=>drag=null;
$('export').onclick=async()=>{try{$('export').disabled=true;await downloadCover(state);$('status').textContent=`Saved ${state.size.join(' × ')} PNG`;}catch(err){$('status').textContent=err.message;}finally{$('export').disabled=false;}};
try{const photos=await Promise.all(['boulevard','pier'].map(name=>loadPhoto(`./samples/${name}.jpg`)));state.panels=Array.from({length:4},(_,i)=>({photo:photos[i%2],zoom:i===2?1.5:1,x:i===2?.5:0,y:i===0?1:0}));refreshThumbnails();redraw();await showShot(new URLSearchParams(location.search).get('shot'),state);window.__shotReady=true;}catch(err){$('status').textContent=err.message;}
