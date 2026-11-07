const chart = document.getElementById('performanceChart');
if (chart) {
 const ctx = chart.getContext('2d');
 function drawChart(){const rect=chart.getBoundingClientRect(),dpr=window.devicePixelRatio||1;chart.width=Math.max(1,rect.width*dpr);chart.height=Math.max(1,rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const w=rect.width,h=rect.height;ctx.clearRect(0,0,w,h);const vals=[42,58,51,67,61,74,70,82,76,91],l=8,r=w-8,t=14,b=h-12;ctx.strokeStyle='rgba(150,160,130,.18)';for(let i=0;i<4;i++){let y=t+(b-t)*i/3;ctx.beginPath();ctx.moveTo(l,y);ctx.lineTo(r,y);ctx.stroke()}const pts=vals.map((v,i)=>({x:l+(r-l)*i/(vals.length-1),y:b-v/100*(b-t)}));let g=ctx.createLinearGradient(0,t,0,b);g.addColorStop(0,'rgba(213,245,108,.25)');g.addColorStop(1,'rgba(213,245,108,0)');ctx.beginPath();ctx.moveTo(pts[0].x,b);pts.forEach(p=>ctx.lineTo(p.x,p.y));ctx.lineTo(pts.at(-1).x,b);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle='#d5f56c';ctx.lineWidth=2.5;ctx.stroke();pts.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,i===pts.length-1?4:2.5,0,Math.PI*2);ctx.fillStyle=i===pts.length-1?'#e26c5b':'#d5f56c';ctx.fill()})}
 window.addEventListener('resize',drawChart);
 document.querySelector('[data-tab="analytics"]').addEventListener('click',()=>requestAnimationFrame(drawChart));
 requestAnimationFrame(drawChart);
}
const tabs=[...document.querySelectorAll('.tab-button')],pages=[...document.querySelectorAll('.tab-page')];
function activateTab(id){tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));pages.forEach(p=>p.classList.toggle('active',p.id===id));}
tabs.forEach(b=>b.addEventListener('click',()=>activateTab(b.dataset.tab)));
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();const val=document.getElementById('steamId').value.trim();if(!val){document.getElementById('steamId').focus();return}const btn=e.currentTarget.querySelector('button'),old=btn.innerHTML;btn.innerHTML='ПОИСК...';btn.disabled=true;setTimeout(()=>{btn.innerHTML=old;btn.disabled=false;document.querySelector('.profile-kicker').textContent=`ОБЪЕКТ ИДЕНТИФИЦИРОВАН / ЗАПРОС ${val.toUpperCase()}`;activateTab('profile');document.getElementById('profile').scrollIntoView({behavior:'smooth',block:'start'})},500)});
