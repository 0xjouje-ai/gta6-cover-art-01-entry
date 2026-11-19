export const layouts = ['Coastline','Crossroads','After hours','Postcards'];
export const sizes = [[1080,1080],[1080,1350],[1920,1080]];
// Normalized panel rectangles keep the same composition at every export size.
export function getPanels(layout,w,h){
 const m=22,g=10,iw=w-2*m,ih=h-2*m;
 let boxes;
 if(layout===0) boxes=[[0,0,1,.58],[0,.58,.34,.42],[.34,.58,.33,.42],[.67,.58,.33,.42]];
 if(layout===1) boxes=[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,.5,.5],[.5,.5,.5,.5]];
 if(layout===2) boxes=[[0,0,1,1],[.03,.61,.30,.35],[.35,.61,.30,.35],[.67,.61,.30,.35]];
 if(layout===3) boxes=[[0,0,1,1],[.06,.08,.40,.46,-.09],[.55,.12,.38,.44,.10],[.30,.53,.40,.43,-.05]];
 return boxes.map(([x,y,bw,bh,angle=0])=>({x:m+x*iw+g/2,y:m+y*ih+g/2,w:bw*iw-g,h:bh*ih-g,angle}));
}
export function panelPoint(box,x,y){const dx=x-box.x-box.w/2,dy=y-box.y-box.h/2;return {x:dx*Math.cos(box.angle)+dy*Math.sin(box.angle)+box.w/2,y:-dx*Math.sin(box.angle)+dy*Math.cos(box.angle)+box.h/2};}
