// واجهة الذكاء في دبّرها: توصية + مقارنة + روابط المتاجر + مشاركة النتيجة
(function(){
const labels={gaming:'ألعاب وأداء',camera:'تصوير',work:'عمل ودراسة',battery:'بطارية',cheap:'اقتصادي',premium:'جودة أعلى',value:'قيمة مقابل السعر'};
const extra=[
{name:'Samsung Galaxy Tab A11 64GB',category:'tablet',price:599,rating:4.4,tags:'اقتصادي دراسة تابلت',useCases:'دراسة أطفال ترفيه',priceSource:'نون'},
{name:'Samsung 45W USB-C Charger',category:'car',price:89,rating:4.3,tags:'شحن سريع USB-C',useCases:'شحن جوال سيارة سفر',priceSource:'نون'},
{name:'Amazon Basics AA Batteries 20-Pack',category:'home',price:28.5,rating:4.6,tags:'اقتصادي بطاريات',useCases:'منزل يومي',priceSource:'Amazon.sa'},
{name:'Amazon Kindle 16GB',category:'tablet',price:399,rating:4.7,tags:'قراءة خفيف بطارية',useCases:'قراءة دراسة سفر',priceSource:'Amazon.sa'},
{name:'Echo Dot 5th Gen',category:'home',price:239.99,rating:4.6,tags:'منزل ذكي صوت',useCases:'منزل ترفيه',priceSource:'Amazon.sa'}
];
const base=window.DABBIRHA_PRODUCTS||[];
const products=base.concat(extra.filter(x=>!base.some(p=>p.name===x.name)));
window.DABBIRHA_PRODUCTS=products;
function fallback(){try{if(typeof render==='function'){render();return true}}catch(e){}return false}
function storeLink(store,product){
 const u=window.dabbarhaAffiliateUrl&&window.dabbarhaAffiliateUrl(store,product);
 if(!u)return '<span class="store-disabled">'+(store==='noon'?'🛍️ نون قريبًا':'🛒 '+store+' قريبًا')+'</span>';
 const tracked=window.dabbarhaIsAffiliateLink?window.dabbarhaIsAffiliateLink(store,product):false;
 const key=encodeURIComponent(product);
 const label=store==='amazon'?'🛒 أمازون':'🛍️ نون'+(tracked?'':' — فتح نون');
 return '<a class="store-link" href="'+u+'" target="_blank" rel="noopener" data-store="'+store+'" data-product="'+key+'">'+label+'</a>';
}
function attachClicks(root){
 root.querySelectorAll('.store-link').forEach(a=>a.addEventListener('click',function(){
  if(window.dabbarhaIsAffiliateLink&&window.dabbarhaIsAffiliateLink(this.dataset.store,decodeURIComponent(this.dataset.product||''))&&window.dabbarhaAffiliateClick){window.dabbarhaAffiliateClick(this.dataset.store,decodeURIComponent(this.dataset.product||''));}
 }));
}
function shareResult(){
 const input=document.getElementById('q');
 const raw=(input&&input.value?input.value:'').trim() || (typeof prefs!=='undefined'&&prefs.query?prefs.query:'').trim();
 const url=new URL(location.href); url.search=''; if(raw)url.searchParams.set('q',raw);
 const text='شوف اختياري من دبّرها 🏆\n'+(raw?'طلب: '+raw+'\n':'')+url.toString();
 if(navigator.share){navigator.share({title:'اختيار دبّرها',text:'ترشيح ذكي حسب الميزانية والاستخدام',url:url.toString()}).catch(()=>{});return;}
 if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>alert('تم نسخ رابط النتيجة للمشاركة 📋')).catch(()=>prompt('انسخ الرابط للمشاركة:',url.toString()));return;}
 prompt('انسخ الرابط للمشاركة:',url.toString());
}
window.dabbarhaShareResult=shareResult;
function addShareButton(list){
 if(!list||document.getElementById('dab-share-btn'))return;
 const b=document.createElement('button');
 b.id='dab-share-btn';
 b.className='primary';
 b.style.cssText='width:100%;margin:0 0 14px;background:#e9f7f2;color:#087f5b;font-weight:bold';
 b.textContent='📤 شارك نتيجة دبّرها';
 b.onclick=shareResult;
 list.parentNode.insertBefore(b,list);
}
function runSmart(){
 try{
  const input=document.getElementById('q');
  const raw=(input&&input.value?input.value:'').trim() || (typeof prefs!=='undefined'&&prefs.query?prefs.query:'').trim();
  if(!raw||!window.DabbarhaSmart)return fallback();
  const result=DabbarhaSmart.recommend(products,raw,(typeof prefs!=='undefined'&&prefs.category)||null);
  const source=products.filter(p=>!((typeof prefs!=='undefined'&&prefs.category))||p.category===prefs.category).map(p=>({...p,_score:DabbarhaSmart.score(p,result.budget,result.intents||[])}));
  if(!source.length)return fallback();
  source.sort((a,b)=>b._score-a._score||a.price-b.price);
  const best=source[0],cheapest=source.slice().sort((a,b)=>a.price-b.price)[0];
  const valuePool=source.filter(p=>p.name!==cheapest.name);
  const value=(valuePool.length?valuePool:source).slice().sort((a,b)=>((b._score*100)/Math.max(1,b.price))-((a._score*100)/Math.max(1,a.price)))[0];
  const chosen=[];[best,value,cheapest].forEach(p=>{if(p&&!chosen.some(x=>x.name===p.name))chosen.push(p)});
  source.slice(0,5).forEach(p=>{if(chosen.length<3&&!chosen.some(x=>x.name===p.name))chosen.push(p)});
  const top=chosen.slice(0,3),sv=typeof saved==='function'?saved():[],info=document.getElementById('info'),list=document.getElementById('list');
  if(!list||!top.length)return fallback();
  const budget=result.budget||((typeof prefs!=='undefined'&&prefs.budget)||2000);
  if(info)info.textContent='ميزانيتك: '+budget.toLocaleString()+' ريال • تحليل ذكي حسب الاستخدام والقيمة والتقييم';
  const summary='<div class="why"><b>🏆 الأفضل لك:</b> '+best.name+'<br><b>💰 الأفضل قيمة:</b> '+value.name+'<br><b>🪙 الأرخص:</b> '+cheapest.name+'</div>';
  const compare='<div class="why" style="margin:14px 0 16px"><b style="font-size:17px">⚖️ مقارنة سريعة</b><div style="overflow-x:auto;margin-top:9px"><table style="width:100%;border-collapse:collapse;font-size:13px;text-align:right"><tr><th style="padding:8px;border-bottom:1px solid #ddd">المنتج</th><th style="padding:8px;border-bottom:1px solid #ddd">السعر</th><th style="padding:8px;border-bottom:1px solid #ddd">التقييم</th><th style="padding:8px;border-bottom:1px solid #ddd">الملاءمة</th></tr>'+top.map(p=>'<tr><td style="padding:8px;border-bottom:1px solid #eee">'+p.name+'</td><td style="padding:8px;border-bottom:1px solid #eee">'+p.price.toLocaleString()+' ر.س</td><td style="padding:8px;border-bottom:1px solid #eee">⭐ '+p.rating+'</td><td style="padding:8px;border-bottom:1px solid #eee">'+p._score+'</td></tr>').join('')+'</table></div><div style="margin-top:8px">💡 الأرخص: '+cheapest.name+' • الأعلى ملاءمة: '+best.name+'</div></div>';
  list.innerHTML=summary+compare+top.map(p=>{
   const role=p.name===best.name?'🏆 الأفضل لك':p.name===value.name?'💰 الأفضل قيمة':p.name===cheapest.name?'🪙 الأرخص':'⭐ خيار مناسب';
   const reason=result.intents.length?'طابقنا طلبك مع: '+result.intents.map(x=>labels[x]||x).join('، '):'اخترناه حسب السعر والتقييم والملاءمة';
   const sourceNote=p.priceSource?' • سعر مرصود من '+p.priceSource:' • سعر استرشادي';
   return '<div class="product"><button class="save" onclick="save('+JSON.stringify(p.name)+')">'+(sv.includes(p.name)?'❤️':'♡')+'</button><span class="tag">'+role+'</span><h3>'+p.name+'</h3><div class="price">'+p.price.toLocaleString()+' ريال</div><div class="meta">⭐ '+p.rating+' • درجة الملاءمة '+p._score+sourceNote+'</div><div class="why">'+reason+(p.price<=budget?' • ضمن الميزانية':' • أعلى من الميزانية')+'</div><div class="stores">'+storeLink('amazon',p.name)+storeLink('noon',p.name)+'</div></div>';
  }).join('');
  addShareButton(list);
  attachClicks(list);
  return true;
 }catch(e){return fallback()}
}
window.dabbarhaSmartRun=runSmart;
window.addEventListener('DOMContentLoaded',function(){
 const params=new URLSearchParams(location.search),q=params.get('q');
 if(q){const input=document.getElementById('q');if(input){input.value=q;setTimeout(()=>{if(typeof search==='function')search()},0)}}
});
})();
