// محرك دبّرها الذكي v5: فهم الاستخدام + الميزانية + قيمة المنتج
window.DabbarhaSmart={
 normalize(t){const a='٠١٢٣٤٥٦٧٨٩',e='0123456789';return String(t||'').replace(/[٠-٩]/g,d=>e[a.indexOf(d)]).toLowerCase().replace(/[إأآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي')},
 budget(t){const n=this.normalize(t).match(/\d[\d,]*/g);return n?parseInt(n[n.length-1].replace(/,/g,''),10):null},
 intent(t){const s=this.normalize(t);const rules={gaming:/العاب|قيمنق|قيمينق|بلايستيشن|اكس بوكس|xbox|للعب|العاب ثقيله|العاب قويه|للألعاب/,camera:/تصوير|كاميرا|صور|فيديو|سيلفي|سلفي|تصوير قوي|كاميرا قويه/,work:/عمل|دوام|دراسه|جامعه|اوفيس|برمجه|وظيفه|مكتبي/,battery:/بطاريه|استخدام طويل|تجلس البطاريه|بطاريه قويه/,cheap:/رخيص|اقتصادي|اوفر|اقل سعر|ارخص|الأرخص/,premium:/افضل|فخم|قوي|احترافي|اعلى جوده|جودة أعلى|ممتاز/,value:/قيمه|يستاهل|مقابل السعر|افضل سعر/};return Object.keys(rules).filter(k=>rules[k].test(s))},
 score(p,budget,intents){
  const price=Number(p.price)||0,rating=Number(p.rating)||0;let score=rating*12;
  if(budget!=null&&budget>0){
   const ratio=price/budget;
   if(ratio<=1){score+=42-(1-ratio)*12;if(ratio>=0.7)score+=6}
   else score-=Math.min(38,(ratio-1)*38);
  }
  const text=this.normalize((p.name||'')+' '+(p.tags||'')+' '+(p.useCases||''));
  const hit=(re,pts)=>{if(re.test(text))score+=pts};
  if(intents.includes('gaming'))hit(/العاب|اداء|gaming|performance|بلايستيشن|xbox/,30);
  if(intents.includes('camera'))hit(/كاميرا|تصوير|صور|فيديو|سيلفي|camera/,30);
  if(intents.includes('work'))hit(/دراسه|عمل|دوام|برمجه|حاسب|لابتوب|تابلت|اوفيس/,24);
  if(intents.includes('battery'))hit(/بطاريه|battery/,22);
  if(intents.includes('cheap')){if(budget!=null&&price<=budget)score+=20;if(/اقتصادي|قيمه/.test(text))score+=10}
  if(intents.includes('premium')){score+=rating*2;if(/احترافي|قوي|فخم|اداء|كاميرا/.test(text))score+=10}
  if(intents.includes('value')){if(budget!=null&&price<=budget)score+=12;if(/قيمه|اقتصادي/.test(text))score+=12}
  return Math.round(score*10)/10;
 },
 recommend(products,query,category){const b=this.budget(query),i=this.intent(query),arr=Array.isArray(products)?products:[];let list=arr.filter(p=>!category||p.category===category).map(p=>({...p,_score:this.score(p,b,i)}));list.sort((a,z)=>z._score-a._score||((Number(a.price)||0)-(Number(z.price)||0)));return {budget:b,intents:i,items:list.slice(0,3)}}
};
