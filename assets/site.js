(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var OPEN=12,CLOSE=20,TZ='America/New_York';
function hhmm(h){return (h%12||12)+(h<12?' am':' pm')}
function sign(){var p=new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()),H=0,M=0;p.forEach(function(x){if(x.type==='hour')H=+x.value%24;if(x.type==='minute')M=+x.value});
 var now=H*60+M,o=OPEN*60,c=CLOSE*60,cls,txt;
 if(now>=o&&now<c){var left=c-now;if(left<=60){cls='is-soon';txt='We’re open, come on in! Closing soon at '+hhmm(CLOSE)+' ('+left+' min left)'}else{cls='is-open';txt='We’re open right now, come on in! Open until '+hhmm(CLOSE)}}
 else{cls='is-closed';txt='Sorry, the store is closed right now. We’ll be back open '+(now<o?'today':'tomorrow')+' at '+hhmm(OPEN)+'.'}
 $$('[data-open]').forEach(function(el){el.className='open '+cls;el.querySelector('span').textContent=txt})}
sign();setInterval(sign,30000);
var m=$('.menu'),n=$('.nav');if(m)m.onclick=function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)};
var lb=$('.lightbox'),li=lb&&$('img',lb);$$('img.zoom').forEach(function(i){i.addEventListener('click',function(){li.src=i.src;li.alt=i.alt;lb.hidden=false})});
if(lb){lb.onclick=function(e){if(e.target!==li)lb.hidden=true};document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.hidden=true})}
var F={family:'Ticket to Ride, Cascadia, Kingdomino or Carcassonne',party:'Codenames, Hues & Cues, Telestrations or Herd Mentality',strategy:'Ark Nova, Terraforming Mars, Brass or Dune',coop:'Pandemic, Mysterium, Flash Point or an EXIT game',kids:'Dragomino, Animal Upon Animal, Go Cuckoo or Hungry Hungry Hippos',two:'Lost Cities, Patchwork-style puzzlers, Azul or Ticket to Ride'};
$$('[data-finder] button').forEach(function(b){b.onclick=function(){$$('[data-finder] button').forEach(function(x){x.classList.toggle('on',x===b)});$('[data-finder-out]').textContent='Look for: '+F[b.dataset.v]+'. Ask us for more ideas when you visit!'}});
var P=['a Pokémon booster hunt ⚡','a Magic: The Gathering Commander deck 🧙','a Disney Lorcana starter deck ✨','a Yu-Gi-Oh! booster pack 🐉','a One Piece card adventure 🏴‍☠️','a trip through the singles case 🔍','a sleeve and deck box upgrade 🛡️'];
$$('[data-pack]').forEach(function(b){b.onclick=function(){$('[data-pack-out]').textContent='Your adventure: '+P[Math.floor(Math.random()*P.length)]}});
$$('[data-die]').forEach(function(b){b.onclick=function(){var o=b.closest('.card-ui').querySelector('[data-die-out]'),s=+b.dataset.die;o.classList.remove('roll');void o.offsetWidth;o.classList.add('roll');o.textContent=1+Math.floor(Math.random()*s)}});
$$('[data-filter]').forEach(function(b){b.onclick=function(){$$('[data-filter]').forEach(function(x){x.classList.toggle('on',x===b)});$$('.gallery img').forEach(function(i){i.style.display=b.dataset.filter==='all'||i.dataset.cat===b.dataset.filter?'':'none'})}});
$$('.slides').forEach(function(sl){var im=$$('.slides-track img',sl),d=$$('.sl-dots i',sl),i=0,t;if(im.length<2)return;
 function go(n){im[i].classList.remove('on');d[i]&&d[i].classList.remove('on');i=(n+im.length)%im.length;im[i].classList.add('on');d[i]&&d[i].classList.add('on')}
 function auto(){clearInterval(t);t=setInterval(function(){go(i+1)},5000)}
 $('.sl-prev',sl).onclick=function(e){e.stopPropagation();go(i-1);auto()};$('.sl-next',sl).onclick=function(e){e.stopPropagation();go(i+1);auto()};
 sl.addEventListener('mouseenter',function(){clearInterval(t)});sl.addEventListener('mouseleave',auto);auto()});
var boxes=$$('[data-shelf]');if(boxes.length){fetch('assets/data/shelf.json').then(function(r){return r.json()}).then(function(d){boxes.forEach(function(box){var list=d[box.dataset.shelf]||[],ul=$('.shelf-list',box),inp=$('input',box),em=$('.shelf-empty',box);
 var pg=$('.pager',box),pi=$('.pg-info',box),pp=$('.pg-prev',box),pn=$('.pg-next',box),page=0,hits=[];
 function per(){return window.innerWidth<640?12:24}
 function show(){var n=per(),pages=Math.max(1,Math.ceil(hits.length/n));page=Math.min(page,pages-1);
  ul.innerHTML=hits.slice(page*n,page*n+n).map(function(it){return '<li>'+it.name.replace(/[&<>]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[x]})+'</li>'}).join('');
  em.hidden=hits.length>0;pg.hidden=pages<2;pi.textContent='Page '+(page+1)+' of '+pages;pp.disabled=page===0;pn.disabled=page>=pages-1}
 function draw(q){q=(q||'').toLowerCase();hits=list.filter(function(it){return !q||it.name.toLowerCase().indexOf(q)>-1});page=0;show()}
 function jump(d){page+=d;show();var top=box.getBoundingClientRect().top;if(top<0)box.scrollIntoView({behavior:'smooth',block:'start'})}
 pp.onclick=function(){jump(-1)};pn.onclick=function(){jump(1)};window.addEventListener('resize',show);
 draw('');inp.addEventListener('input',function(){draw(inp.value)})})})}
})();
