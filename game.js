// ---------- الصوت ----------
let AC=null,soundOn=true;
function ctx(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){}return AC}
function tone(f,t,d,type,vol){const a=ctx();if(!a||!soundOn)return;const o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(vol||.2,a.currentTime+t);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+t+d);o.connect(g);g.connect(a.destination);o.start(a.currentTime+t);o.stop(a.currentTime+t+d+.05)}
const SFX={
 click:()=>tone(660,0,.08,'triangle'),
 ok:()=>[523,659,784,1047].forEach((f,i)=>tone(f,i*.09,.18,'triangle',.25)),
 no:()=>{tone(220,0,.15,'sawtooth',.12);tone(165,.14,.25,'sawtooth',.12)},
 win:()=>[523,523,659,784,659,784,1047].forEach((f,i)=>tone(f,i*.12,.25,'square',.12)),
 star:()=>{tone(1200,0,.1,'sine',.2);tone(1600,.08,.2,'sine',.2)},
 thud:()=>{tone(110,0,.15,'sine',.4);tone(90,.18,.15,'sine',.4)},
 water:()=>{const a=ctx();if(!a||!soundOn)return;const n=a.sampleRate*.7,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=a.createBufferSource();s.buffer=b;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=2500;const g=a.createGain();g.gain.setValueAtTime(.001,a.currentTime);g.gain.linearRampToValueAtTime(.12,a.currentTime+.15);g.gain.linearRampToValueAtTime(.001,a.currentTime+.7);s.connect(f);f.connect(g);g.connect(a.destination);s.start()}
};
function say(t){try{stopA();if(!soundOn||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=.8;u.pitch=1.2;speechSynthesis.speak(u)}catch(e){}}
// ---------- تشغيل التسجيلات (البيانات في audio-data.js) ----------
let curA=null,PT=0,UL=false;const BUF={};
addEventListener('pointerdown',()=>{UL=true;ctx()},{once:true,capture:true});
function stopA(){PT++;talk(false);try{if(curA){curA.stop();curA=null}}catch(e){}}
function play(id,t){if(!soundOn||!UL)return;stopA();const tok=PT,a=ctx();
 try{if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}
 if(a&&AUD[id]){
  const go=b=>{if(tok!==PT)return;const s=a.createBufferSource();s.buffer=b;s.connect(a.destination);curA=s;s.onended=()=>{if(curA===s){curA=null;talk(false)}};s.start();talk(true)};
  if(BUF[id])return go(BUF[id]);
  try{const bin=atob(AUD[id]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
   a.decodeAudioData(u.buffer,b=>{BUF[id]=b;go(b)},()=>{if(tok===PT)say(t)});return}catch(e){}
 }
 say(t)}
// ---------- بيانات الدروس ----------
const Q={
islam:{t:'أركان الإسلام',e:'🕋',c:'var(--g)',q:[
 ['🖐️','كم عدد أركان الإسلام؟',['خمسة','ثلاثة','ستة']],
 ['☝️','أول أركان الإسلام هو:',['شهادة أن لا إله إلا الله وأن محمداً رسول الله','صوم رمضان','الحج']],
 ['🕌','الركن الثاني من أركان الإسلام:',['إقامة الصلاة','إيتاء الزكاة','الإيمان بالملائكة']],
 ['💰','نعطي المال للفقراء، وهذا ركن:',['إيتاء الزكاة','إقامة الصلاة','صوم رمضان']],
 ['🌙','نصوم في شهر:',['رمضان','محرم','شعبان']],
 ['🕋','نحج إلى:',['بيت الله الحرام','المدرسة','السوق']]]},
iman:{t:'أركان الإيمان',e:'💛',c:'var(--b)',q:[
 ['✋','كم عدد أركان الإيمان؟',['ستة','خمسة','ثلاثة']],
 ['🌟','أول أركان الإيمان:',['الإيمان بالله','الإيمان بالرسل','الإيمان باليوم الآخر']],
 ['👼','نؤمن بـ:',['الملائكة','الصلاة','الحج']],
 ['📖','القرآن الكريم من الكتب:',['السماوية','القديمة','المدرسية']],
 ['🌍','نؤمن بالرسل، ومنهم:',['محمد صلى الله عليه وسلم','المعلم','الجار']],
 ['⚖️','نؤمن بالقدر:',['خيره وشره','خيره فقط','شره فقط']]]},
tahara:{t:'الطهارة والتيمم',e:'🧼',c:'var(--o)',q:[
 ['🧽','الطهارة تعني:',['نظافة أجسامنا وثيابنا والمكان','اللعب','النوم']],
 ['🧴','الطُّهور شطر:',['الإيمان','الطعام','اللعب']],
 ['🪥','المسلم ينظف أسنانه بـ:',['السواك أو الفرشاة','الصابون','المنديل']],
 ['🙏','نصلي في مكان:',['نظيف طاهر','متسخ','مظلم']],
 ['🪨','التيمم بالتراب أو الحجر عند:',['عدم وجود الماء','وجود الماء','اللعب']],
 ['🤲','في التيمم نمسح الوجه واليدين إلى:',['المرفقين','الكتفين','الركبتين']]]}
};
const WUDU=[['🙌','غسل اليدين ثلاث مرات'],['🫧','المضمضة بالفم ثلاث مرات'],['👃','الاستنشاق والاستنثار'],['😊','غسل الوجه ثلاث مرات'],['💪','غسل اليدين إلى المرفقين'],['🧒','مسح الرأس مرة واحدة'],['👂','مسح الأذنين'],['🦶','غسل الرجلين إلى الكعبين']];
// ---------- الحالة ----------
let stars=0;try{stars=+localStorage.getItem('stars')||0}catch(e){}
const app=document.getElementById('app');
const shuf=a=>a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
function addStar(){stars++;try{localStorage.setItem('stars',stars)}catch(e){}SFX.star()}
function head(back){return `<div class="top">${back?'<button class="small" onclick="SFX.click();menu()">🗺️ الخريطة</button>':`<button class="small" id="inst" onclick="install()" style="visibility:${canInstall()?'visible':'hidden'}">📲 ثبّت اللعبة</button>`}<span class="pill">⭐ ${stars}</span><button class="small" onclick="toggleSound()">${soundOn?'🔊':'🔇'}</button></div>`}
function toggleSound(){soundOn=!soundOn;if(soundOn)SFX.click();else{stopA();speechSynthesis&&speechSynthesis.cancel()}document.querySelector('.top .small:last-child').textContent=soundOn?'🔊':'🔇'}
// ---------- أساور: بطلة اللعبة (الصور مدمجة في images-data.js، ومصدرها img/) ----------
// الصورة المدمجة أولاً، ثم الملف في img/ احتياطاً (صور العبادات JPG والباقي PNG)
const IMG=n=>(typeof IMGD!=='undefined'&&IMGD[n])||'img/'+n+(/^(wudu|tayammum|siwak)/.test(n)?'.jpg':'.png');
const FACE=m=>IMG(m==='smile'?'face-encourage':'face-'+m);
const hero=n=>`<img class="hero" src="${IMG(n)}" alt="أساور">`;
// وجه أساور مع فقاعة كلام. التعبير: smile (الافتراضي) أو think أو happy أو wow
const guide=(t,m='smile')=>`<div class="guide"><img class="ava" data-m="${m}" src="${FACE(m)}" alt="أساور"><div class="bub">${t}</div></div>`;
function mood(m){app.querySelectorAll('.ava').forEach(a=>{a.dataset.m=m;a.src=FACE(m)})}
// تطلّ أساور من أسفل عمود اللعبة لحظة مع فقاعة: تصفّق للصحيح وترفع إبهامها للخطأ
function cheer(n,t){document.querySelectorAll('.cheer').forEach(x=>x.remove());const c=document.createElement('div');c.className='cheer';c.setAttribute('aria-hidden','true');c.innerHTML=`<img src="${IMG(n)}" alt=""><div class="bub l">${t}</div>`;
 // طولها بقدر المساحة الفارغة تحت المحتوى، فلا تغطي إلا طرف الخيار الأخير
 const free=innerHeight-app.lastElementChild.getBoundingClientRect().bottom;c.firstChild.style.height=Math.max(120,Math.min(230,free+50))+'px';
 document.body.appendChild(c);setTimeout(()=>c.remove(),1600)}
// يتحرك فمها أثناء التسجيل حين يكون وجهها المبتسم ظاهراً
let TK=0;
function talk(on){clearInterval(TK);const f=()=>app.querySelectorAll('.ava[data-m="smile"]');f().forEach(a=>a.src=FACE('smile'));if(!on)return;let o=0;TK=setInterval(()=>{o^=1;f().forEach(a=>a.src=FACE(o?'talk':'smile'))},170)}
['face-think','face-happy','face-encourage','face-wow','face-talk','pose-clap','pose-thumbs','pose-jump','pose-wave','pose-sticker','pose-think'].forEach(n=>{new Image().src=IMG(n)});
// ---------- خريطة المغامرة ----------
const STAGES=['islam','iman','tahara','wudu'];
const META=k=>k==='wudu'?{t:'رتّب خطوات الوضوء',e:'🚰',c:'var(--p)'}:Q[k];
// أفضل تقييم لكل محطة (١–٣ نجوم) من لعبتها
let best={};try{best=JSON.parse(localStorage.getItem('best')||'{}')}catch(e){}
function setBest(k,n){if((best[k]||0)>=n)return;best[k]=n;try{localStorage.setItem('best',JSON.stringify(best))}catch(e){}}
// المحطة تكتمل بإنهاء درسها (الملصق) أو لعبتها، فتُفتح التي بعدها
const fin=k=>mine.includes(k)||best[k]>0;
const unlocked=i=>i===0||fin(STAGES[i-1]);
// مواقع المحطات على الخريطة بالنسبة المئوية، والأخيرة صندوق الملصقات
const PTS=[[74,17],[28,36],[72,54],[28,72],[58,88]];
const DECO=[['🌙',8,3],['☁️',42,4],['🌴',9,18],['🌴',91,38],['🌵',9,52],['🐑',90,68],['🌴',11,90],['🕌',90,89]].map(([e,x,y])=>`<i style="left:${x}%;top:${y}%">${e}</i>`).join('');
function menu(){
 const cur=STAGES.findIndex(k=>!fin(k)),at=cur<0?4:cur,[px,py]=PTS[at];
 const road=PTS.slice(1).map(([x,y],i)=>{const [a,b]=PTS[i],m=(b+y)/2;return `<path class="${i<at?'on':''}" d="M${a} ${b}C${a} ${m} ${x} ${m} ${x} ${y}"/>`}).join('');
 const node=(k,i)=>{const m=META(k),ok=unlocked(i),s=best[k]||0;
  return `<button class="node${ok?'':' lock'}${i===at?' cur':''}" style="left:${PTS[i][0]}%;top:${PTS[i][1]}%;--c:${m.c}" onclick="stage(${i})" aria-label="${m.t}${ok?'':' (مقفلة)'}"><span class="dot">${ok?m.e:'🔒'}</span><span class="lbl">${m.t}</span>${ok?`<span class="st">${'★'.repeat(s)}<i>${'★'.repeat(3-s)}</i></span>`:''}</button>`};
 app.innerHTML=head(false)+`<h1>مغامرة التربية الإسلامية</h1>${guide('مرحباً يا بطل! اختر لعبتك')}
 <div class="map"><span class="deco" aria-hidden="true">${DECO}</span><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${road}</svg>${STAGES.map(node).join('')}
 <button class="node chest${cur<0?' cur':''}" style="left:${PTS[4][0]}%;top:${PTS[4][1]}%;--c:var(--o)" onclick="SFX.click();room()"><span class="dot">${cur<0?'🏆':'🎁'}</span><span class="lbl">ملصقاتي (${mine.length} من ${STAGES.length})</span></button>
 <div class="pal" style="left:${px>50?px-24:px+24}%;top:${py}%" aria-hidden="true"><img src="${IMG('pose-wave')}" alt=""></div></div>`;
 play('F-1','مرحباً يا بطل! اختر لعبتك');
}
function stage(i){
 const k=STAGES[i],m=META(k),s=best[k]||0;
 if(!unlocked(i)){SFX.no();const d=app.querySelectorAll('.node')[i];d.classList.remove('shk');void d.offsetWidth;d.classList.add('shk');cheer('pose-think','أكمل المحطة السابقة أولاً');play('F-9','هذه المحطة مقفلة. أكمل المحطة السابقة أولاً');return}
 SFX.click();
 if(!fin(k))return learn(k);
 app.innerHTML=head(true)+`<div class="mascot">${m.e}</div><h2>${m.t}</h2><div class="card"><div class="st big-st">${'★'.repeat(s)}<i>${'★'.repeat(3-s)}</i></div></div>
 <div class="menu"><button class="big" style="background:var(--b)" onclick="SFX.click();learn('${k}')"><span>📖</span>راجع الدرس</button><button class="big" style="background:var(--g)" onclick="SFX.click();${k==='wudu'?'wudu()':`quiz('${k}')`}"><span>🎮</span>العب</button></div>`;
}
function room(){
 app.innerHTML=head(true)+`${guide('🎁 ملصقاتي: '+mine.length+' من '+STAGES.length,'wow')}
 <div class="menu">${STAGES.map(k=>mine.includes(k)?`<div class="card stk"><div class="emo">${STK[k][0]}</div><div class="q">${STK[k][1]}</div></div>`:`<div class="card stk off"><div class="emo">❔</div><div class="q">لم تجمعه بعد</div></div>`).join('')}</div>`;
}
// ---------- شرح الدرس ----------
const LESSONS={
islam:[['🕋','للإسلام خمسة أركان، وهي الأعمدة التي يقوم عليها ديننا.'],['☝️','الركن الأول: الشهادتان. نقول: أشهد أن لا إله إلا الله، وأشهد أن محمداً رسول الله.'],['🕌','الركن الثاني: إقامة الصلاة.'],['💰','الركن الثالث: إيتاء الزكاة. نعطي جزءاً من المال للفقراء.'],['🌙','الركن الرابع: صوم شهر رمضان.'],['🕋','الركن الخامس: حج بيت الله الحرام لمن يستطيع إليه سبيلاً.']],
iman:[['💛','للإيمان ستة أركان. هيا نتعلمها معاً.'],['🌟','الأول: الإيمان بالله.'],['👼','الثاني: الإيمان بالملائكة.'],['📖','الثالث: الإيمان بالكتب السماوية، ومنها القرآن الكريم.'],['🌍','الرابع: الإيمان بالرسل، وآخرهم محمد صلى الله عليه وسلم.'],['🌅','الخامس: الإيمان باليوم الآخر.'],['⚖️','السادس: الإيمان بالقدر خيره وشره.']],
tahara:[['🧼','الطهارة: نظافة أجسامنا والثياب التي نلبسها والمكان من حولنا. قال رسول الله صلى الله عليه وسلم: الطهور شطر الإيمان.'],['🛁','المؤمن نظيف طاهر. ينظف بدنه وثوبه من الأوساخ والنجاسات.'],['🙏','نصلي في مكان نظيف طاهر. ولا تقبل صلاة المسلم إذا كان في بدنه أو ثوبه أو مكانه نجاسة.'],['🪥','المؤمن يحب السواك. ننظف أسناننا صباحاً ومساءً، وبعد الطعام، وعند كل صلاة.'],['🪨','التيمم: الطهارة بالتراب أو الحجر بدلاً من الماء، إذا لم نجد الماء أو عجزنا عن استعماله.'],['🤲','كيف نتيمم؟ نضع كفينا على التراب ونضرب بهما، ثم نمسح وجهنا مرة واحدة.'],['🧒','ثم نضع كفينا مرة أخرى، ونمسح اليد اليمنى حتى المرفق، ثم اليسرى حتى المرفق، مرة واحدة.']]
};
// أسئلة سريعة بين الشرائح: رقم الشريحة => [السؤال، الصحيح، خطأ، خطأ]
const CHECK={
islam:{1:['ما أول أركان الإسلام؟','الشهادتان','الحج','الصوم'],3:['نعطي المال للفقراء، وهذا ركن:','إيتاء الزكاة','صوم رمضان','إقامة الصلاة'],5:['إلى أين نحج؟','بيت الله الحرام','المدرسة','السوق']},
iman:{2:['نؤمن بـ:','الملائكة','الصلاة','الحج'],4:['من آخر الرسل؟','محمد صلى الله عليه وسلم','المعلم','الجار'],6:['كم عدد أركان الإيمان؟','ستة','خمسة','ثلاثة']},
tahara:{2:['نصلي في مكان:','نظيف طاهر','متسخ','مظلم'],4:['نتيمم عند:','عدم وجود الماء','وجود الماء','اللعب']},
wudu:{3:['الاستنشاق هو إدخال الماء في:','الأنف','الأذن','العين'],5:['نغسل اليدين إلى:','المرفقين','الكتفين','الركبتين'],8:['نغسل الرجلين إلى:','الكعبين','الركبتين','الفخذين']}
};
function ask(c,done,id){
 const [q,a,...w]=c;
 app.innerHTML=head(true)+`${guide('🤔 سؤال سريع','think')}<div class="card"><div class="emo">❓</div><div class="q">${q}</div><button class="small" onclick="play(QID,'${q}')">🔈 استمع</button></div><div class="opts">${shuf([a,...w]).map(x=>`<button class="opt">${x}</button>`).join('')}</div>`;
 QID=id;play(id,q);let ok=false;
 app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(ok)return;if(b.textContent===a){ok=true;b.classList.add('ok');SFX.ok();addStar();confetti(25);mood('happy');cheer('pose-clap','أحسنت!');play('F-2','أحسنت');setTimeout(done,1200)}else{b.classList.add('no');SFX.no();cheer('pose-thumbs','حاول مرة أخرى');play('F-3','حاول مرة أخرى')}});
}
const STK={islam:['🕌','نجم الأركان'],iman:['💛','حافظ الإيمان'],tahara:['🧼','نظيف وطاهر'],wudu:['🚰','بطل الوضوء']};
let mine=[];try{mine=JSON.parse(localStorage.getItem('stk')||'[]')}catch(e){}
function award(k,next){
 if(mine.includes(k))return next();
 mine.push(k);try{localStorage.setItem('stk',JSON.stringify(mine))}catch(e){}
 SFX.win();confetti(100);play('F-5','حصلت على ملصق جديد');
 app.innerHTML=head(true)+`${hero('pose-sticker')}<h2>🎉 ملصق جديد!</h2><div class="card"><div class="emo" style="font-size:6rem">${STK[k][0]}</div><div class="q">${STK[k][1]}</div></div><div class="row"><button class="small" id="go" style="background:var(--g);font-size:1.2rem">ابدأ اللعب 🎮</button></div>`;
 document.getElementById('go').onclick=()=>{SFX.click();next()};
}
let CUR='',CURID='',QID='';
// صور أساور في شرائح الشرح: رقم الشريحة => الصورة (روجعت مع المعلم)، وما لا صورة له يبقى بالإيموجي
const SCN={wudu:{1:'wudu-1',2:'wudu-2',3:'wudu-3',4:'wudu-4',5:'wudu-5',6:'wudu-6',7:'wudu-7',8:'wudu-8'},tahara:{3:'siwak',4:'tayammum-1',5:'tayammum-2',6:'tayammum-3'}};
function learn(k){
 const S=k==='wudu'?[['🚰','الوضوء: نظافة أجزاء محددة من الجسم بنية الطهارة. نتوضأ لأن الوضوء فريضة قبل الصلاة. تعال نتعلم خطوات الوضوء بالترتيب.']].concat(WUDU.map((s,i)=>[s[0],'الخطوة '+(i+1)+': '+s[1]+'.'])):LESSONS[k];
 let i=0;
 function show(){
  CUR=S[i][1];const last=i===S.length-1;const w=k==='wudu'&&i>0,tm=k==='tahara'&&(i===5||i===6),sc=SCN[k]&&SCN[k][i],cl=sc?'':w?' anim a'+i:tm?' anim t'+i:'';const wt=(w||tm)&&!sc?`<div class="water"><b>${w?'🚰':'🪨'}</b>${[15,38,62,85].map((x,j)=>`<i style="left:${x}%;animation-delay:${j*.25}s">${w?'💧':'💨'}</i>`).join('')}</div>`:'';
  app.innerHTML=head(true)+`${guide('📖 تعلّم مع أساور')}<div class="bar"><i style="width:${(i+1)/S.length*100}%"></i></div>
  <div class="card${cl}">${wt}${sc?`<div class="scene"><img src="${IMG(sc)}" alt=""></div>`:`<div class="emo">${S[i][0]}</div>`}<div class="q" style="line-height:1.8">${CUR}</div><button class="small" onclick="play(CURID,CUR)">🔈 استمع</button></div>
  <div class="row">${i?'<button class="small" id="pv">▶ السابق</button>':''}<button class="small" id="nx" style="background:var(--g);font-size:1.2rem">${last?'ابدأ اللعب 🎮':'التالي ◀'}</button></div>`;
  CURID=(k==='wudu'?'L-wudu-'+i:'L-'+k+'-'+(i+1));play(CURID,CUR);
  if(w)setTimeout(SFX.water,300);if(tm)setTimeout(SFX.thud,300);const pv=document.getElementById('pv');if(pv)pv.onclick=()=>{SFX.click();i--;show()};
  document.getElementById('nx').onclick=()=>{SFX.click();const go=()=>{if(last){SFX.star();award(k,()=>k==='wudu'?wudu():quiz(k))}else{i++;show()}};const c=CHECK[k]&&CHECK[k][i];c?ask(c,go,'C-'+k+'-'+(Object.keys(CHECK[k]).map(Number).sort((a,b)=>a-b).indexOf(i)+1)):go()};
 }
 show();
}
// ---------- لعبة الأسئلة ----------
function quiz(k){
 const L=Q[k],qs=shuf(L.q.map((x,n)=>[x[0],x[1],x[2],n]));let i=0,score=0;
 function show(){
  const [em,q,o,qn]=qs[i];const ans=o[0];const opts=shuf(o);
  app.innerHTML=head(true)+`${guide('🤔 فكّر جيداً','think')}<div class="bar"><i style="width:${i/qs.length*100}%"></i></div>
  <div class="card"><div class="emo">${em}</div><div class="q">${q}</div><button class="small" onclick="play(QID,'${q}')">🔈 استمع</button></div>
  <div class="opts">${opts.map(x=>`<button class="opt">${x}</button>`).join('')}</div>`;
  QID='Q-'+k+'-'+(qn+1);play(QID,q);
  let done=false,miss=false;
  app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
   if(done)return;
   if(b.textContent===ans){done=true;b.classList.add('ok');SFX.ok();addStar();if(!miss)score++;confetti(30);mood('happy');cheer('pose-clap','أحسنت!');play('F-2','أحسنت');setTimeout(next,1300)}
   else{miss=true;b.classList.add('no');SFX.no();cheer('pose-thumbs','حاول مرة أخرى');play('F-3','حاول مرة أخرى')}
  });
 }
 function next(){i++;i<qs.length?show():end()}
 function end(){SFX.win();confetti(120);play('F-4','ما شاء الله! أنت بطل');
  // النجوم بحسب الإجابات الصحيحة من أول محاولة
  const s=Math.max(1,Math.round(score/qs.length*3));setBest(k,s);
  app.innerHTML=head(true)+`${hero('pose-jump')}<h2>🏆 ما شاء الله! أنت بطل</h2><div class="card"><div class="emo">${'⭐'.repeat(s)}</div><div class="q">أجبت ${score} من ${qs.length} من أول محاولة</div></div>
  <div class="row"><button class="small" onclick="SFX.click();quiz('${k}')">🔁 العب مرة أخرى</button><button class="small" onclick="SFX.click();learn('${k}')">📖 راجع الدرس</button><button class="small" onclick="SFX.click();menu()">🗺️ الخريطة</button></div>`}
 show();
}
// ---------- لعبة ترتيب الوضوء ----------
function wudu(){
 let n=0,err=0;const order=WUDU.map((s,i)=>({i,s}));
 app.innerHTML=head(true)+`<h2>🚰 رتّب خطوات الوضوء</h2><div class="q">اضغط الخطوة الأولى، ثم التي بعدها…</div><div class="bar"><i id="pb" style="width:0"></i></div>
 <div class="steps">${WUDU.map((s,i)=>`<div class="slot" id="s${i}"><b>${i+1}</b></div>`).join('')}</div>
 <div class="tiles">${shuf(order).map(o=>`<button class="tile" data-i="${o.i}"><b>${o.s[0]}</b>${o.s[1]}</button>`).join('')}</div>`;
 play('F-6','رتب خطوات الوضوء');
 app.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{
  const i=+t.dataset.i;
  if(i===n){const s=document.getElementById('s'+n);s.classList.add('f');s.innerHTML=`<b>${WUDU[n][0]}</b>${WUDU[n][1]}`;t.remove();n++;
   document.getElementById('pb').style.width=n/8*100+'%';SFX.ok();play('W-'+n,WUDU[n-1][1]);
   if(n===8){addStar();addStar();addStar();const s=err===0?3:err<=2?2:1;setBest('wudu',s);setTimeout(()=>{SFX.win();confetti(140);play('F-8','أحسنت! وضوءك مكتمل');
    app.insertAdjacentHTML('beforeend',`<div class="card">${hero('pose-jump')}<div class="emo">${'⭐'.repeat(s)}</div><div class="q">أحسنت! أتممت الوضوء</div><div class="row"><button class="small" onclick="wudu()">🔁 مرة أخرى</button><button class="small" onclick="menu()">🗺️ الخريطة</button></div></div>`)},600)}
  }else{err++;t.classList.add('no');SFX.no();cheer('pose-thumbs','حاول مرة أخرى');setTimeout(()=>t.classList.remove('no'),400);play('F-7','ليست هذه الخطوة. حاول مرة أخرى')}
 });
}
// ---------- التثبيت على الجوال (يعمل حين تُفتح اللعبة من رابط https، لا من ملف) ----------
let BIP=null;
const IOS=/iphone|ipad|ipod/i.test(navigator.userAgent),STANDALONE=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
// أندرويد يعطينا نافذة التثبيت، والآيفون لا يسمح بها فنعرض طريقة التثبيت من سفاري
const canInstall=()=>!STANDALONE&&!!(BIP||(IOS&&location.protocol==='https:'));
function showInst(){const b=document.getElementById('inst');if(b)b.style.visibility=canInstall()?'visible':'hidden'}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();BIP=e;showInst()});
addEventListener('appinstalled',()=>{BIP=null;showInst()});
function install(){SFX.click();if(BIP){BIP.prompt();BIP.userChoice.finally(()=>{BIP=null;showInst()})}else alert('لتثبيت اللعبة على الآيفون: اضغط زر المشاركة ⬆️ أسفل سفاري، ثم اختر «إضافة إلى الشاشة الرئيسية».')}
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
// ---------- قصاصات ملونة ----------
const cv=document.getElementById('cf'),cx=cv.getContext('2d');let ps=[],run=false;
function confetti(n){cv.width=innerWidth;cv.height=innerHeight;for(let i=0;i<n;i++)ps.push({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*14,vy:-Math.random()*12-2,c:`hsl(${Math.random()*360},90%,60%)`,s:6+Math.random()*6,l:90});if(!run){run=true;loop()}}
function loop(){cx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.l--;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s)});ps=ps.filter(p=>p.l>0);if(ps.length)requestAnimationFrame(loop);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}}
menu();
