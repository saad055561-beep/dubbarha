// واجهة الذكاء في دبّرها: توصية + مقارنة ثلاثية + مقارنة سريعة
(function(){
const labels={gaming:'ألعاب وأداء',camera:'تصوير',work:'عمل ودراسة',battery:'بطارية',cheap:'اقتصادي',premium:'جودة أعلى'};
function fallback(){try{if(typeof render==='function'){render();return true}}catch(e){}return false}
function runSmart(){
 try{
  const input=document.getElementById('q');
  const raw=(input&&input.value?input.value:'').trim() || (typeof prefs!=='undefined'&&prefs.query?prefs.query:'').trim();
  if(!raw||!window.DabbarhaSmart)return fallback();
  const result=DabbarhaSmart.recommend(window.DABBIRHA_PRODUCTS||[],raw,(typeof prefs!=='undefined'&&prefs.category)||null);
  const source=(window.DABBIRHA_PRODUCTS||[]).filter(p=>!((typeof prefs!=='undefined'&&prefs.category))||p.category===prefs.category).map(p=>({...p,_score:DabbarhaSmart.score(p,result.budget,result.intents||[])}));
  if(!source.length)return fallback();
  source.sort((a,b)=>b._score-a._score);
  const best=source[0];
  const cheapest=source.slice().sort((a,b)=>a.price-b.price)[0];
  const valuePool=source.filter(p=>p.name!==cheapest.name);
  const value=(valuePool.length?valuePool:source).slice().sort((a,b)=>{
   const av=(a._score*100)/(Math.max(1,a.price));
   const bv=(b._score*100)/(Math.max(1,b.price));
   return bv-av;
  })[0];
  const chosen=[];
  [best,value,cheapest].forEach(p=>{if(p&&!chosen.some(x=>x.name===p.name))chosen.push(p)});
  source.slice(0,5).forEach(p=>{if(chosen.length<3&&!chosen.some(x=>x.name===p.name))chosen.push(p)});
  const top=chosen.slice(0,3);
  const sv=typeof saved==='function'?saved():[];
  const info=document.getElementById('info'),list=document.getElementById('list');
  if(!list||!top.length)return fallback();
  const budget=result.budget||((typeof prefs!=='undefined'&&prefs.budget)||2000);
  if(info)info.textContent='ميزانيتك: '+budget.toLocaleString()+' ريال • تحليل ذكي حسب الاستخدام والقيمة والتقييم';
  const summary='<div class="why"><b>🏆 الأفضل لك:</b> '+best.name+'<br><b>💰 الأفضل قيمة:</b> '+value.name+'<br><b>🪙 الأرخص:</b> '+cheapest.name+'</div>';
  const compare='<div class="why" style="margin:14px 0 16px"><b style="font-size:17px">⚖️ مقارنة سريعة</b><div style="overflow-x:auto;margin-top:9px"><table style="width:100%;border-collapse:collapse;font-size:13px;text-align:right"><tr><th style="padding:8px;border-bottom:1px solid #ddd">المنتج</th><th style="padding:8px;border-bottom:1px solid #ddd">السعر</th><th style="padding:8px;border-bottom:1px solid #ddd">التقييم</th><th style="padding:8px;border-bottom:1px solid #ddd">الملاءمة</th></tr>'+top.map(p=>'<tr><td style="padding:8px;border-bottom:1px solid #eee">'+p.name+'</td><td style="padding:8px;border-bottom:1px solid #eee">'+p.price.toLocaleString()+' ر.س</td><td style="padding:8px;border-bottom:1px solid #eee">⭐ '+p.rating+'</td><td style="padding:8px;border-bottom:1px solid #eee">'+p._score+'</td></tr>').join('')+'</table></div><div style="margin-top:8px">💡 الأرخص: '+cheapest.name+' • الأعلى ملاءمة: '+best.name+'</div></div>';
  list.innerHTML=summary+compare+top.map(p=>{
   const role=p.name===best.name?'🏆 الأفضل لك':p.name===value.name?'💰 الأفضل قيمة':p.name===cheapest.name?'🪙 الأرخص':'⭐ خيار مناسب';
   const am='https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='+encodeURIComponent(p.name);
   const reason=result.intents.length?'طابقنا طلبك مع: '+result.intents.map(x=>labels[x]||x).join('، '):'اخترناه حسب السعر والتقييم والملاءمة';
   return '<div class="product"><button class="save" onclick="save('+JSON.stringify(p.name)+')">'+(sv.includes(p.name)?'❤️':'♡')+'</button><span class="tag">'+role+'</span><h3>'+p.name+'</h3><div class="price">'+p.price.toLocaleString()+' ريال</div><div class="meta">⭐ '+p.rating+' • درجة الملاءمة '+p._score+'</div><div class="why">'+reason+(p.price<=budget?' • ضمن الميزانية':' • أعلى من الميزانية')+'</div><div class="stores"><a href="'+am+'" target="_blank" rel="noopener">🛒 أمازون</a><a href="https://www.noon.com/saudi-ar/" target="_blank" rel="noopener">🛍️ نون</a></div></div>'
  }).join('');
  return true;
 }catch(e){return fallback()}
}
window.dabbarhaSmartRun=runSmart;
})();