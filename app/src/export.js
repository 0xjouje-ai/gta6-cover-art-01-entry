import {getPanels} from './layouts.js';
import {drawPanel} from './panels.js';
import {finishPoster} from './grades.js';
import {drawLettering} from './lettering.js';
export function renderCover(canvas,state){let [w,h]=state.size;canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='#10121d';ctx.fillRect(0,0,w,h);getPanels(state.layout,w,h).forEach((box,i)=>drawPanel(ctx,box,state.panels[i],state.grade));finishPoster(ctx,w,h);drawLettering(ctx,w,h,state.title,state.subtitle);ctx.strokeStyle='#ffdbb1';ctx.lineWidth=3;ctx.strokeRect(12,12,w-24,h-24);return canvas;}
export function makePNG(state){const canvas=renderCover(document.createElement('canvas'),state);return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG export failed')),'image/png'));}
export async function downloadCover(state){const blob=await makePNG(state),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`neon-coast-${state.size.join('x')}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
