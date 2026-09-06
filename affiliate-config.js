// إعداد روابط الإحالة في دبّرها
// لا نضع أي رابط إحالة غير معتمد. الروابط الموجودة في links هي روابط شريك معتمدة.
window.DABBIRHA_AFFILIATE={
  amazon:{enabled:true,name:'أمازون',tag:'dabbirha-21',search:'https://www.amazon.sa/gp/search?tag=dabbirha-21&url=search-alias%3Daps&field-keywords='},
  noon:{
    enabled:true,
    name:'نون',
    url:'https://www.noon.com/saudi-ar/',
    links:{
      'Xiaomi Redmi Note 14':'https://s.noon.com/DlPsJs69Auk',
      'Samsung Galaxy A17 4G':'https://s.noon.com/o7QQpIWMzbc',
      'Samsung Galaxy A26 5G':'https://s.noon.com/gKinfuKUgLw',
      'Samsung Galaxy A36 5G':'https://s.noon.com/tZ1olod7lHY',
      'Lenovo IdeaPad 1':'https://s.noon.com/ZjwADSOoJug',
      'HP 15':'https://s.noon.com/73u7Y2_YbvQ',
      'Lenovo IdeaPad Slim 3':'https://s.noon.com/xgMdRw0Umy8',
      'ASUS Vivobook 15':'https://s.noon.com/ic0Knt8DuvU',
      'Samsung 24 بوصة':'https://s.noon.com/p2tQALN_VBY',
      'Samsung 32 بوصة':'https://s.noon.com/l2Cyl2RkQdw',
      'LG UltraGear 27':'https://s.noon.com/CaueD21c6qI',
      'Samsung Galaxy Buds FE':'https://s.noon.com/QCoC6_-cr28',
      'Anker Soundcore':'https://s.noon.com/lt1Vb4jtZZQ',
      'Sony WH-CH520':'https://s.noon.com/g8XqKRSX684',
      'Sony WH-1000XM5':'https://s.noon.com/8dlC8stL1e8',
      'HONOR 400 5G':'https://s.noon.com/WUAWZioMfTo',
      'iPhone 16e':'https://s.noon.com/OwuVifEEtCU'
    },
    publicLinks:{
      'Samsung Galaxy A56 5G':'https://www.noon.com/saudi-ar/galaxy-a56-5g-dual-sim-awesome-graphite-8gb-ram-256gb-middle-east-version/N70158930V/p/'
    }
  },
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
  if(store==='noon')return (a.links&&a.links[product])||(a.publicLinks&&a.publicLinks[product])||null);
  return a.url||null;
};
window.dabbarhaIsAffiliateLink=function(store,product){
  const a=window.DABBIRHA_AFFILIATE&&window.DABBIRHA_AFFILIATE[store];
  if(!a||!a.enabled)return false;
  if(store==='amazon')return true;
  return !!(a.links&&a.links[product]);
};