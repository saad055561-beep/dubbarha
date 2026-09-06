// طبقة الذكاء في الواجهة: تعطي أولوية للاستخدام المطلوب وليس السعر وحده.
(function(){
function runSmart(){
 const raw=(document.getElementById('q')||{}).value?.trim()||''; if(!raw)return;
 const result=window.DabbarhaSmart&&typeof DabbarhaSmart.recommend==='function'?DabbarhaSmart.recommend(P,raw,prefs.category):null;
 if(!result)return;
 const top=result.items||[];
 const sv=saved();
 document.getElementById('info').textContent='ميزانيتك: '+(result.budget||prefs.budget).toLocaleString()+' ريال • تحليل ذكي حسب الاستخدام والقيمة والتقييم';
 document.getElementById('list').innerHTML=top.length?top.map((p,i)=>{const am='https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='+encodeURIComponent(p.name);const reason=result.intents.length?'طابقنا طلبك مع احتياجك: '+result.intents.map(x=>({gaming:'ألعاب وأداء',camera:'تصوير',work:'عمل ودراسة',battery:'بطارية',cheap:'اقتصادي',premium:'جودة أعلى'}[x]||x)).join('، '):'اخترناه بناءً على السعر والتقييم والقيمة';return `<div class="product"><button class="save" onclick="save(${JSON.stringify(p.name)})">${sv.includes(p.name)?'❤️':'♡'}</button><span class="tag">${i===0?'🏆 الأفضل لك':i===1?'🥈 خيار ممتاز':'🥉 بديل قوي'}</span><h3>${p.name}</h3><div class="price">${p.price.toLocaleString()} ريال</div><div class="meta">⭐ ${p.rating} • درجة الملاءمة ${p._score}</div><div class="why">${reason}</div><div class="stores"><a href="${am}" target="_blank" rel="noopener">🛒 أمازون</a><a href="https://www.noon.com/saudi-ar/" target="_blank" rel="noopener">🛍️ نون</a></div></div>`}).join(''):'<div class="product"><h3>ما لقينا نتيجة مناسبة</h3><p>جرّب تعديل الطلب أو الميزانية.</p></div>';
}
window.dabbarhaSmartRun=runSmart;
})();
