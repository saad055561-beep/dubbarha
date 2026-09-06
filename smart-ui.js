// واجهة الذكاء في دبّرها: توصية + مقارنة ثلاثية
(function(){
const labels={gaming:'ألعاب وأداء',camera:'تصوير',work:'عمل ودراسة',battery:'بطارية',cheap:'اقتصادي',premium:'جودة أعلى'};
function runSmart(){
 const raw=(document.getElementById('q')||{}).value?.trim()||''; if(!raw||!window.DabbarhaSmart)return;
 const result=DabbarhaSmart.recommend(P,raw,prefs.category); const top=result.items||[]; const sv=saved();
 document.getElementById('info').textContent='ميزانيتك: '+(result.budget||prefs.budget).toLocaleString()+' ريال • تحليل ذكي حسب الاستخدام والقيمة والتقييم';
 if(!top.length){document.getElementById('list').innerHTML='<div class="product"><h3>ما لقينا نتيجة مناسبة</h3><p>جرّب تعديل الطلب أو رفع الميزانية قليلًا.</p></div>';return}
 const cheapest=[...top].sort((a,b)=>a.price-b.price)[0], value=[...top].sort((a,b)=>(b.rating/Math.max(1,b.price))-(a.rating/Math.max(1,a.price)))[0];
 const best=top[0];
 const summary='<div class="why"><b>🏆 الأفضل لك:</b> '+best.name+'<br><b>💰 الأفضل قيمة:</b> '+value.name+'<br><b>🪙 الأرخص:</b> '+cheapest.name+'</div>';
 document.getElementById('list').innerHTML=summary+top.map((p,i)=>{const am='https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='+encodeURIComponent(p.name);const reason=result.intents.length?'طابقنا طلبك مع: '+result.intents.map(x=>labels[x]||x).join('، '):'اخترناه حسب السعر والتقييم والملاءمة';return '<div class="product"><button class="save" onclick="save('+JSON.stringify(p.name)+')">'+(sv.includes(p.name)?'❤️':'♡')+'</button><span class="tag">'+(i===0?'🏆 الأفضل لك':i===1?'🥈 خيار ممتاز':'🥉 بديل قوي')+'</span><h3>'+p.name+'</h3><div class="price">'+p.price.toLocaleString()+' ريال</div><div class="meta">⭐ '+p.rating+' • درجة الملاءمة '+p._score+'</div><div class="why">'+reason+(p.price<=result.budget?' • ضمن الميزانية':' • أعلى من الميزانية')+'</div><div class="stores"><a href="'+am+'" target="_blank" rel="noopener">🛒 أمازون</a><a href="https://www.noon.com/saudi-ar/" target="_blank" rel="noopener">🛍️ نون</a></div></div>'}).join('');
}
window.dabbarhaSmartRun=runSmart;
})();