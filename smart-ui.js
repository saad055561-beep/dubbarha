// واجهة الذكاء في دبّرها — نسخة مستقلة وآمنة
(function(){
const labels={gaming:'ألعاب وأداء',camera:'تصوير',work:'عمل ودراسة',battery:'بطارية',cheap:'اقتصادي',premium:'جودة أعلى'};
function getSaved(){try{return JSON.parse(localStorage.getItem('dab_saved')||'[]')}catch(e){return[]}}
function runSmart(){
 try{
  const input=document.getElementById('q');
  const raw=input&&input.value?input.value.trim():'';
  const products=window.DABBIRHA_PRODUCTS||[];
  if(!raw||!window.DabbarhaSmart||!products.length)return false;
  let category=null;
  const s=DabbarhaSmart.normalize(raw);
  const K={phone:/جوال|هاتف|موبايل/,laptop:/لابتوب|لاب توب|حاسب|كمبيوتر/,screen:/شاشة|مونيتور/,headphones:/سماعة|سماعات|هيدفون/,tablet:/تابلت|ايباد|ipad|لوحي/,tv:/تلفزيون|tv/,watch:/ساعة/,kitchen:/مطبخ|قلاية|خلاط|طبخ/,home:/منزل|بيت|مكنسة|مكواة/,car:/سيارة/,gaming:/ألعاب|العاب|بلايستيشن|إكس بوكس|xbox/,beauty:/عناية|حلاقة|شعر|أسنان/,kids:/أطفال|اطفال|طفل|مدرسية/,sport:/رياضة|رياضه|تمارين|دمبل/,travel:/سفر|شنطة|شنط|حقيبة/,camera:/كاميرا|تصوير/};
  for(const k in K){if(K[k].test(s)){category=k;break}}
  const result=DabbarhaSmart.recommend(products,raw,category);
  const top=result.items||[]; const sv=getSaved();
  const info=document.getElementById('info'),list=document.getElementById('list');
  if(!list)return false;
  const budget=result.budget||2000;
  if(info)info.textContent='ميزانيتك: '+budget.toLocaleString()+' ريال • تحليل ذكي حسب الاستخدام والقيمة والتقييم';
  if(!top.length){list.innerHTML='<div class="product"><h3>ما لقينا نتيجة مناسبة</h3><p>جرّب تعديل الطلب أو رفع الميزانية قليلًا.</p></div>';return true}
  const cheapest=[...top].sort((a,b)=>a.price-b.price)[0];
  const value=[...top].sort((a,b)=>(b.rating/Math.max(1,b.price))-(a.rating/Math.max(1,a.price)))[0];
  const best=top[0];
  let html='<div class="why"><b>🏆 الأفضل لك:</b> '+best.name+'<br><b>💰 الأفضل قيمة:</b> '+value.name+'<br><b>🪙 الأرخص:</b> '+cheapest.name+'</div>';
  html+=top.map((p,i)=>{const am='https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='+encodeURIComponent(p.name);const reason=(result.intents||[]).length?'طابقنا طلبك مع: '+result.intents.map(x=>labels[x]||x).join('، '):'اخترناه حسب السعر والتقييم والملاءمة';return '<div class="product"><button class="save" onclick="save('+JSON.stringify(p.name)+')">'+(sv.includes(p.name)?'❤️':'♡')+'</button><span class="tag">'+(i===0?'🏆 الأفضل لك':i===1?'🥈 خيار ممتاز':'🥉 بديل قوي')+'</span><h3>'+p.name+'</h3><div class="price">'+p.price.toLocaleString()+' ريال</div><div class="meta">⭐ '+p.rating+' • درجة الملاءمة '+p._score+'</div><div class="why">'+reason+(p.price<=budget?' • ضمن الميزانية':' • أعلى من الميزانية')+'</div><div class="stores"><a href="'+am+'" target="_blank" rel="noopener">🛒 أمازون</a><a href="https://www.noon.com/saudi-ar/" target="_blank" rel="noopener">🛍️ نون</a></div></div>'}).join('');
  list.innerHTML=html;return true;
 }catch(e){console.error('Dabbarha smart error',e);return false}
}
window.dabbarhaSmartRun=runSmart;
})();