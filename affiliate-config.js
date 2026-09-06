// إعداد روابط الإحالة في دبّرها
// لا نضع أي رابط إحالة غير معتمد. يتم تفعيل المتجر فقط بعد إضافة رابط/معرّف رسمي.
window.DABBIRHA_AFFILIATE={
  amazon:{enabled:true,name:'أمازون',tag:'dabbirha-21',search:'https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='},
  noon:{enabled:false,name:'نون',url:'https://www.noon.com/saudi-ar/'},
  temu:{enabled:false,name:'Temu',url:'https://www.temu.com/'},
  shein:{enabled:false,name:'SHEIN',url:'https://ar.shein.com/'},
  aliexpress:{enabled:false,name:'AliExpress',url:'https://www.aliexpress.com/'}
};
window.dabbarhaAffiliateClick=function(store,product){
  try{
    const key='dab_affiliate_clicks';
    const data=JSON.parse(localStorage.getItem(key)||'{}');
    data[store]=(data[store]||0)+1;
    localStorage.setItem(key,JSON.stringify(data));
    localStorage.setItem('dab_last_affiliate',JSON.stringify({store,product:product||'',at:Date.now()}));
  }catch(e){}
};
window.dabbarhaAffiliateUrl=function(store,product){
  const a=window.DABBIRHA_AFFILIATE&&window.DABBIRHA_AFFILIATE[store];
  if(!a||!a.enabled)return null;
  if(store==='amazon')return a.search+encodeURIComponent(product||'');
  return a.url||null;
};