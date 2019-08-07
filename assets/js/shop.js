"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var DPCTab=document.getElementsByClassName("tab-dpc")[0],DPSTab=document.getElementsByClassName("tab-dps")[0],MultiplierTab=document.getElementsByClassName("tab-multipliers")[0],Shop=function Shop(a,b){var c=this;_classCallCheck(this,Shop),_defineProperty(this,"buyItem",function(a){var b=c.getItem(a),d=c.getItemCost(b);c.saveData.userData.money.gte(d)?(c.saveData.userData.upgrades[a].level+=1,c.saveData.userData.money=c.saveData.userData.money.minus(d),c.recalculateBuffs()):console.log("Cannot afford ".concat(a))}),_defineProperty(this,"checkUserData",function(){[].concat(_toConsumableArray(c.shopData.dpc),_toConsumableArray(c.shopData.dps),_toConsumableArray(c.shopData.multipliers)).forEach(function(a){var b=c.saveData.userData.upgrades[a.id];b||(c.saveData.userData.upgrades[a.id]={level:0})})}),_defineProperty(this,"createShopItem",function(a){var b=document.createElement("section");b.classList.add("shop-item");var d=document.createElement("section");d.classList.add("shop-item-information");var e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.classList.add("shop-item-icon"),e.setAttribute("viewBox","0 0 512 512");var f=document.createElementNS("http://www.w3.org/2000/svg","path");f.setAttribute("fill","#4caf50"),f.setAttribute("d",a.icon),e.appendChild(f);var g=document.createElement("section");g.classList.add("shop-item-text");var h=document.createElement("p");h.classList.add("shop-item-name"),h.innerText=c.shopLangData[a.id].name;var i=document.createElement("p");i.classList.add("shop-item-description"),i.innerText=c.shopLangData[a.id].description;var j=document.createElement("p");j.classList.add("shop-item-level"),j.innerText="Level: ".concat(c.saveData.userData.upgrades[a.id].level),j.setAttribute("data-id",a.id),g.appendChild(h),g.appendChild(i),g.appendChild(j),d.appendChild(e),d.appendChild(g);var k=document.createElement("button");return k.classList.add("shop-item-button"),k.classList.add("button"),k.classList.add("button-primary"),k.classList.add("button-block"),k.innerText="Buy x1 ".concat(c.shopLangData[a.id].name," for \xA3").concat(formatNumber(c.getItemCost(a),!0)),k.setAttribute("data-id",a.id),k.onclick=function(){c.buyItem(a.id),c.update()},b.appendChild(d),b.appendChild(k),b}),_defineProperty(this,"displayShopData",function(){c.shopData&&c.shopLangData&&(c.checkUserData(),c.shopData.dpc.forEach(function(a){var b=c.createShopItem(a);DPCTab.firstElementChild.appendChild(b)}),c.shopData.dps.forEach(function(a){var b=c.createShopItem(a);DPSTab.firstElementChild.appendChild(b)}),c.shopData.multipliers.forEach(function(a){var b=c.createShopItem(a);MultiplierTab.firstElementChild.appendChild(b)}))}),_defineProperty(this,"getItem",function(a){var b=[].concat(_toConsumableArray(c.shopData.dpc),_toConsumableArray(c.shopData.dps),_toConsumableArray(c.shopData.multipliers)).find(function(b){return b.id==a});return b.text=c.shopLangData[a],b}),_defineProperty(this,"getItemCost",function(a){var b=a,d=c.saveData.userData.upgrades[a.id].level,e=b.startingCost;return 0!=d&&_toConsumableArray(Array(d).keys()).forEach(function(){e*=b.costMultiplier}),Math.round(e)}),_defineProperty(this,"loadShopData",function(){fetch("/assets/data/shop_items.json").then(function(a){return a.json()}).then(function(a){c.shopData=a,c.displayShopData()}).catch(function(a){console.error(a)}),fetch("/assets/data/".concat(c.saveData.userData.options.language,"/shop.json")).then(function(a){return a.json()}).then(function(a){c.shopLangData=a,c.displayShopData()}).catch(function(a){console.error(a)})}),_defineProperty(this,"recalculateBuffs",function(){var a=c.saveData.userData.upgrades,b=1,d=0,e=5,f=1;Object.keys(a).forEach(function(g){var h=c.getItem(g),i=a[g].level;if(h.dpc)b+=h.dpc*i;else if(h.dps)d+=h.dps*i;else switch(h.effects){case"brainCount":_toConsumableArray(Array(i).keys()).forEach(function(){return f*=h.multiplier});break;case"brainValue":_toConsumableArray(Array(i).keys()).forEach(function(){return e*=h.multiplier});break;default:console.log(h.effects,"=> Unknown Effect");}}),c.saveData.userData.dpc=BigNumber(b,10),c.saveData.userData.dps=BigNumber(d,10),c.saveData.userData.mpb=BigNumber(e,10),c.saveData.userData.bpk=BigNumber(f,10)}),_defineProperty(this,"sellBrains",function(){var a=c.sellBrainsCost();c.saveData.userData.brains=BigNumber(0,10),c.saveData.userData.money=c.saveData.userData.money.plus(a)}),_defineProperty(this,"sellBrainsCost",function(){var a=c.saveData.userData.brains,b=c.saveData.userData.mpb;return a.multipliedBy(b)}),this.saveData=a,this.update=b,this.shopData=null,this.shopLangData=null,this.loadShopData()};