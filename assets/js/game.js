"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var BrainsSellSpan=document.getElementsByClassName("brains-sell")[0],BrainSpans=document.getElementsByClassName("brains"),MoneySpans=document.getElementsByClassName("money"),LevelSpan=document.getElementsByClassName("level")[0],Modals=document.getElementsByClassName("modal"),SettingsModal=document.getElementsByClassName("modal-settings")[0],ShopModal=document.getElementsByClassName("modal-shop")[0],Tabs=document.getElementsByClassName("tab"),DpcTab=document.getElementsByClassName("tab-dpc")[0],DpsTab=document.getElementsByClassName("tab-dps")[0],MultipliersTab=document.getElementsByClassName("tab-multipliers")[0],TabButtons=document.getElementsByClassName("tab-btn"),DpsTabButton=document.getElementsByClassName("tab-btn-dps")[0],DpcTabButton=document.getElementsByClassName("tab-btn-dpc")[0],MultipliersTabButton=document.getElementsByClassName("tab-btn-multipliers")[0],SellBrainsButton=document.getElementsByClassName("button-sellbrains")[0],SettingsButton=document.getElementsByClassName("button-settings")[0],ShopButton=document.getElementsByClassName("button-shop")[0],CloseModalButtons=document.getElementsByClassName("button-closemodal"),BuyShopItemButtons=document.getElementsByClassName("shop-item-button"),ShopItemLevels=document.getElementsByClassName("shop-item-level"),MenuButtons=document.getElementsByClassName("menubutton"),ModalPages=document.getElementsByClassName("modalpage"),MenuBackButton=document.getElementsByClassName("button-menuback")[0],MainModalPage=document.getElementsByClassName("modalpage-main")[0],DisplayModalPage=document.getElementsByClassName("modalpage-display")[0],SaveModalPage=document.getElementsByClassName("modalpage-saving")[0],AudioModalPage=document.getElementsByClassName("modalpage-audio")[0],StatisticsModalPage=document.getElementsByClassName("modalpage-statistics")[0],AboutModalPage=document.getElementsByClassName("modalpage-about")[0],CreditsModalPage=document.getElementsByClassName("modalpage-credits")[0],DisplaySettingsButton=document.getElementsByClassName("menubutton-display")[0],SaveSettingsButton=document.getElementsByClassName("menubutton-saving")[0],AudioSettingsButton=document.getElementsByClassName("menubutton-audio")[0],StatisticsSectionButton=document.getElementsByClassName("menubutton-statistics")[0],AboutSectionButton=document.getElementsByClassName("menubutton-about")[0],CreditsSectionButton=document.getElementsByClassName("menubutton-credits")[0],DamageIndicatorToggle=document.getElementsByClassName("settings-button-damageindicator")[0],NumberFormatDropdown=document.getElementsByClassName("settings-dropdown-numberformatting")[0],SaveButton=document.getElementsByClassName("settings-button-save")[0],LoadButton=document.getElementsByClassName("settings-button-load")[0],ResetButton=document.getElementsByClassName("settings-button-reset")[0],PlayMusicButton=document.getElementsByClassName("settings-button-playmusic")[0],PauseMusicButton=document.getElementsByClassName("settings-button-pausemusic")[0],MuteMusicButton=document.getElementsByClassName("settings-button-mutemusic")[0],MuteSFXButton=document.getElementsByClassName("settings-button-mutesfx")[0],MusicVolumeSlider=document.getElementsByClassName("settings-slider-musicvolume")[0],SFXVolumeSlider=document.getElementsByClassName("settings-slider-sfxvolume")[0],HealthBarCurrent=document.getElementsByClassName("current-health")[0],VersionSpan=document.getElementById("version"),Zombie=document.getElementsByClassName("zombie")[0],ZombieHealthCurrent=document.getElementsByClassName("zombie-current-health")[0],ZombieHealthTotal=document.getElementsByClassName("zombie-total-health")[0],StatisticDPC=document.getElementById("statistics-dpc"),StatisticDPS=document.getElementById("statistics-dps"),StatisticKills=document.getElementById("statistics-kills"),StatisticClicks=document.getElementById("statistics-clicks"),StatisticLevel=document.getElementById("statistics-level"),StatisticBPK=document.getElementById("statistics-bpk"),StatisticMPB=document.getElementById("statistics-mpb"),StatisticMoneyNumber=document.getElementById("statistics-money-number"),StatisticBrainsNumber=document.getElementById("statistics-brains-number"),TapZ=function TapZ(){var a=this;_classCallCheck(this,TapZ),_defineProperty(this,"addEventListeners",function(){document.body.addEventListener("click",function(){a.playMusic(),document.body.onclick=null},!0),Array.from(Modals).forEach(function(b){b.addEventListener("click",function(b){b.currentTarget!==b.target||a.toggleModal("")})}),Array.from(CloseModalButtons).forEach(function(b){return b.addEventListener("click",function(){return a.toggleModal("")})}),SellBrainsButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.shop.sellBrains(),a.update()}),SettingsButton.addEventListener("click",function(){return a.toggleModal("settings")}),ShopButton.addEventListener("click",function(){return a.toggleModal("shop")}),MenuBackButton.addEventListener("click",function(){return a.toggleMenu("main")}),DisplaySettingsButton.addEventListener("click",function(){return a.toggleMenu("display")}),SaveSettingsButton.addEventListener("click",function(){return a.toggleMenu("saving")}),AudioSettingsButton.addEventListener("click",function(){return a.toggleMenu("audio")}),StatisticsSectionButton.addEventListener("click",function(){return a.toggleMenu("statistics")}),AboutSectionButton.addEventListener("click",function(){return a.toggleMenu("about")}),CreditsSectionButton.addEventListener("click",function(){return a.toggleMenu("credits")}),DpcTabButton.addEventListener("click",function(){return a.toggleTab("dpc")}),DpsTabButton.addEventListener("click",function(){return a.toggleTab("dps")}),MultipliersTabButton.addEventListener("click",function(){return a.toggleTab("multipliers")}),DamageIndicatorToggle.addEventListener("click",function(){return a.editSettings("showDamage")}),SaveButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.saveData.save()}),LoadButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.saveData.load()}),ResetButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.saveData.reset()}),PlayMusicButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.playMusic()}),PauseMusicButton.addEventListener("click",function(){a.playSFX("buttonClick"),a.pauseMusic()}),MuteMusicButton.addEventListener("click",function(){return a.editSettings("mutemusic")}),MuteSFXButton.addEventListener("click",function(){return a.editSettings("mutesfx")}),MusicVolumeSlider.addEventListener("change",function(b){return a.editSettings("musicvolume",b.target.value/100)}),SFXVolumeSlider.addEventListener("change",function(b){return a.editSettings("sfxvolume",b.target.value/100)}),NumberFormatDropdown.addEventListener("change",function(b){return a.editSettings("numberFormat",b.target.options[b.target.options.selectedIndex].value)}),Zombie.addEventListener("click",a.click),Zombie.addEventListener("touchstart",a.multiTouch)}),_defineProperty(this,"multiTouch",function(b){b.preventDefault();var c=b.touches[b.touches.length-1],d=new MouseEvent("click",{clientX:c.clientX,clientY:c.clientY});a.click(d)}),_defineProperty(this,"click",function(b){a.playSFX("zombieHit"),a.saveData.userData.statistics.clicks=a.saveData.userData.statistics.clicks.plus(1),a.injureZombie(a.saveData.userData.dpc),a.saveData.userData.options.showDamage&&a.damageIndicator(b.x,b.y),a.update()}),_defineProperty(this,"damageIndicator",function(b,c){if(0!=b&&0!=c){var d=new Date().getTime(),e=document.createElement("span");e.innerHTML="-".concat(a.saveData.userData.dpc),e.id=d,e.classList.add("damage-indicator"),e.dataset.itter=10,e.dataset.uid=d,e.dataset.x=b,e.dataset.y=c,e.style.top="".concat(c-40,"px"),e.style.left="".concat(b+20,"px"),document.body.appendChild(e);var f=setInterval(function(){e.dataset.itter--,e.dataset.x=parseInt(e.dataset.x)+25,e.dataset.y=parseInt(e.dataset.y)-75,e.style.top="".concat(e.dataset.y,"px"),e.style.left="".concat(e.dataset.x,"px"),e.style.opacity=e.dataset.itter/10,0>=e.dataset.itter&&(clearInterval(f),null!=e&&e.parentNode.removeChild(e))},100)}}),_defineProperty(this,"editSettings",function(b,c){var d=a.saveData.userData.options[b];a.saveData.userData.options[b]="boolean"==typeof d?!d:c,a.playSFX("buttonClick"),"mutemusic"==b&&(a.saveData.userData.options.mutemusic?(a.setMusicVolume(0),a.pauseMusic()):(a.setMusicVolume(a.saveData.userData.options.musicvolume),a.playMusic())),a.update()}),_defineProperty(this,"handleDPS",function(){a.saveData.userData.dps.gt(0)&&(a.injureZombie(a.saveData.userData.dps),a.update())}),_defineProperty(this,"injureZombie",function(b){a.saveData.userData.zombie.currentHealth=a.saveData.userData.zombie.currentHealth.minus(b),a.saveData.userData.zombie.currentHealth.lte(0)&&a.killZombie(),b.gt(0)&&(Zombie.classList.add("zombie-hurt"),setTimeout(function(){return Zombie.classList.remove("zombie-hurt")},300))}),_defineProperty(this,"killZombie",function(){a.saveData.userData.statistics.kills=a.saveData.userData.statistics.kills.plus(1);var b=a.saveData.userData.level.plus(1).pow(3).plus(15);a.saveData.userData.statistics.kills.gt(b)&&(a.saveData.userData.level=a.saveData.userData.level.plus(1),a.saveData.userData.zombie.totalHealth=b.minus(5),console.debug("Level",a.saveData.userData.level.toString(10),"Required",b.toString(10),"kills"),console.debug("Zombie health is now",a.saveData.userData.zombie.totalHealth.toString(10))),a.saveData.userData.brains=a.saveData.userData.brains.plus(a.saveData.userData.bpk),a.saveData.userData.statistics.totalBrains=a.saveData.userData.statistics.totalBrains.plus(a.saveData.userData.bpk),a.saveData.userData.zombie.currentHealth=a.saveData.userData.zombie.totalHealth}),_defineProperty(this,"playMusic",function(){a.musicPlayer.paused&&!a.saveData.userData.options.mutemusic&&0!=a.saveData.userData.options.musicvolume&&a.musicPlayer.play()}),_defineProperty(this,"pauseMusic",function(){a.musicPlayer.paused||a.musicPlayer.pause()}),_defineProperty(this,"playSFX",function(b){if(!a.saveData.userData.options.mutesfx){var c=null,d=!0,e=!1,f=void 0;try{for(var g,h,i=a.sfxPlayers[Symbol.iterator]();!(d=(g=i.next()).done);d=!0)if(h=g.value,h.paused){c=h;break}}catch(a){e=!0,f=a}finally{try{d||null==i.return||i.return()}finally{if(e)throw f}}switch(c||(c=new Audio,a.sfxPlayers.push(c)),c.onplay=function(){return a.currentlyPlaying++},c.onended=function(){return a.currentlyPlaying--},c.volume=a.saveData.userData.options.sfxvolume,b){case"buttonClick":c.src="/assets/audio/click.mp3",c.play();break;case"zombieHit":if(.85<=Math.random()&&3>a.currentlyPlaying){var j="/assets/audio/zombie_".concat(Math.floor(24*Math.random())+1,".mp3");c.src=j,c.play()}}}}),_defineProperty(this,"setMusicVolume",function(b){a.musicPlayer.volume=b}),_defineProperty(this,"setupMusic",function(){a.musicPlayer.volume=a.saveData.userData.options.musicvolume,a.musicPlayer.loop=!0,a.playMusic()}),_defineProperty(this,"toggleModal",function(b){if(a.saveData.gameData.currentModal=b,a.saveData.gameData.modalOpen)Array.from(Modals).forEach(function(a){return a.classList.remove("modal-visible")}),a.saveData.gameData.modalOpen=!1;else{switch(b){case"shop":ShopModal.classList.add("modal-visible");break;case"settings":SettingsModal.classList.add("modal-visible"),a.toggleMenu("main");break;case"":break;default:console.log("Error, unknown modal: ".concat(b));}a.saveData.gameData.modalOpen=!0}a.update(),a.playSFX("buttonClick")}),_defineProperty(this,"toggleTab",function(b){Array.from(TabButtons).forEach(function(a){return a.classList.remove("tab-btn-active")}),Array.from(Tabs).forEach(function(a){return a.classList.remove("tab-visible")});"dpc"===b?(DpcTabButton.classList.add("tab-btn-active"),DpcTab.classList.add("tab-visible")):"dps"===b?(DpsTabButton.classList.add("tab-btn-active"),DpsTab.classList.add("tab-visible")):"multipliers"===b?(MultipliersTabButton.classList.add("tab-btn-active"),MultipliersTab.classList.add("tab-visible")):console.log("Unknown Tab: ".concat(b));a.playSFX("buttonClick")}),_defineProperty(this,"toggleMenu",function(b){Array.from(ModalPages).forEach(function(a){return a.classList.remove("modalpage-visible")}),"main"==b?MenuBackButton.classList.remove("button-visible"):MenuBackButton.classList.add("button-visible");"main"===b?MainModalPage.classList.add("modalpage-visible"):"display"===b?DisplayModalPage.classList.add("modalpage-visible"):"saving"===b?SaveModalPage.classList.add("modalpage-visible"):"audio"===b?AudioModalPage.classList.add("modalpage-visible"):"statistics"===b?StatisticsModalPage.classList.add("modalpage-visible"):"about"===b?AboutModalPage.classList.add("modalpage-visible"):"credits"===b?CreditsModalPage.classList.add("modalpage-visible"):(console.log("Unknown Menu"),MainModalPage.classList.add("modalpage-visible"));a.playSFX("buttonClick")}),_defineProperty(this,"update",function(){a.updateHealth(),BrainsSellSpan.innerText="\xA3".concat(formatNumber(a.shop.sellBrainsValue(),a.saveData.userData.options.numberFormat)),Array.from(BrainSpans).forEach(function(b){return b.innerText="".concat(formatNumber(a.saveData.userData.brains,a.saveData.userData.options.numberFormat)," Brains")}),Array.from(MoneySpans).forEach(function(b){return b.innerText="\xA3".concat(formatNumber(a.saveData.userData.money,a.saveData.userData.options.numberFormat))}),LevelSpan.innerText=a.saveData.userData.level,"shop"==a.saveData.gameData.currentModal?(Array.from(BuyShopItemButtons).forEach(function(b){var c=a.shop.getItem(b.getAttribute("data-id"));b.innerText="Buy x1 ".concat(c.text.name," for \xA3").concat(formatNumber(a.shop.getItemCost(c),a.saveData.userData.options.numberFormat))}),Array.from(ShopItemLevels).forEach(function(b){b.innerText="Level: ".concat(a.saveData.userData.upgrades[b.getAttribute("data-id")].level)})):"settings"==a.saveData.gameData.currentModal&&(DamageIndicatorToggle.innerText="Damage Indicators: ".concat(a.saveData.userData.options.showDamage?"ON":"OFF"),MuteMusicButton.innerText="Music: ".concat(a.saveData.userData.options.mutemusic?"Muted":"Unmuted"),MuteSFXButton.innerText="SFX: ".concat(a.saveData.userData.options.mutesfx?"Muted":"Unmuted"),Array.from(NumberFormatDropdown.options).forEach(function(b){b.value==a.saveData.userData.options.numberFormat?b.setAttribute("selected",!1):b.setAttribute("selected",!0)}),StatisticClicks.innerText=a.saveData.userData.statistics.clicks.toString(10),StatisticDPC.innerText=a.saveData.userData.dpc.toString(10),StatisticDPS.innerText=a.saveData.userData.dps.toString(10),StatisticKills.innerText=a.saveData.userData.statistics.kills.toString(10),StatisticLevel.innerText=0,StatisticBPK.innerText=a.saveData.userData.bpk.toString(10),StatisticMPB.innerText="\xA3".concat(a.saveData.userData.mpb.toString(10)),StatisticMoneyNumber.innerText="\xA3".concat(a.saveData.userData.money.toString(10)),StatisticBrainsNumber.innerText=a.saveData.userData.brains.toString(10)),ZombieHealthCurrent.innerText=formatNumber(a.saveData.userData.zombie.currentHealth,a.saveData.userData.options.numberFormat),ZombieHealthTotal.innerText=formatNumber(a.saveData.userData.zombie.totalHealth,a.saveData.userData.options.numberFormat),a.musicPlayer.volume=a.saveData.userData.options.musicvolume}),_defineProperty(this,"updateHealth",function(){var b=100*a.saveData.userData.zombie.currentHealth.dividedBy(a.saveData.userData.zombie.totalHealth);50<b?(HealthBarCurrent.classList.remove("health-amber","health-red"),HealthBarCurrent.classList.add("health-green")):25<b?(HealthBarCurrent.classList.remove("health-green","health-red"),HealthBarCurrent.classList.add("health-amber")):(HealthBarCurrent.classList.remove("health-green","health-amber"),HealthBarCurrent.classList.add("health-red")),HealthBarCurrent.style.width="".concat(b,"%")}),BigNumber.config({EXPONENTIAL_AT:1e9}),this.saveData=new Save,this.shop=new Shop(this.saveData),this.shop.update=this.update,this.shop.playSFX=this.playSFX,this.musicPlayer=new Audio("/assets/audio/the_last_encounter_loop.mp3"),this.sfxPlayers=[],this.currentlyPlaying=0,this.addEventListeners(),console.log("TapZ Incremental"),console.log("v".concat(this.saveData.gameData.version)),VersionSpan.innerText="v".concat(this.saveData.gameData.version),window.TAPZ_VERSION_NAME=this.saveData.gameData.version;var b={platform:navigator.platform,userAgent:navigator.userAgent,appVersion:navigator.appVersion,vendor:navigator.vendor,opera:window.opera,language:navigator.language,screen:[window.screen.width,window.screen.height,window.screen.availWidth,window.screen.availHeight],dpr:window.devicePixelRatio};console.log("[DEBUG] Device Info",b),this.saveData.load(),this.setupMusic(),this.update(),setInterval(function(){a.saveData.save()},1e4),setInterval(function(){a.handleDPS()},1e3)};window.onload=function(){return new TapZ};
"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var Save=function Save(){var a=this;_classCallCheck(this,Save),_defineProperty(this,"save",function(){var b=btoa(JSON.stringify(a.userData));localStorage.setItem("savedata",b),console.debug("Saved at ".concat(new Date))}),_defineProperty(this,"load",function(){var b=localStorage.getItem("savedata");if(b){var c=JSON.parse(atob(b),function(a,b){return"string"==typeof b&&b.match(/^[0-9]+$/)?BigNumber(b,10):b});console.debug("Existing savedata exists using version",c.saveVersion,"so attempting to load it!"),a.userData=c}else console.debug("Existing savedata doesn't exist!");(!a.userData.saveVersion||a.userData.saveVersion<a.gameData.currentSaveVersion)&&a.migrateSave()}),_defineProperty(this,"migrateSave",function(){var b=_objectSpread({},a.blankUserData,{},a.userData);b.zombie=_objectSpread({},a.blankUserData.zombie,{},a.userData.zombie),b.options=_objectSpread({},a.blankUserData.options,{},a.userData.options),b.statistics=_objectSpread({},a.blankUserData.statistics,{},a.userData.statistics),b.saveVersion=a.blankUserData.saveVersion,a.userData=b,console.debug("Just Bumped save-version to ".concat(b.saveVersion)),a.save()}),_defineProperty(this,"reset",function(){localStorage.removeItem("savedata"),location.reload()}),this.userData={brains:BigNumber(0,10),money:BigNumber(0,10),dps:BigNumber(0,10),dpc:BigNumber(1,10),bpk:BigNumber(1,10),mpb:BigNumber(5,10),level:BigNumber(1,10),zombie:{currentHealth:BigNumber(10,10),totalHealth:BigNumber(10,10)},options:{language:"en",showDamage:!0,numberShorthand:!0,numberFormat:"lazy",mutemusic:!1,musicvolume:.6,mutesfx:!1,sfxvolume:.8},statistics:{clicks:BigNumber(0,10),kills:BigNumber(0,10),totalBrains:BigNumber(0,10),totalMoney:BigNumber(0,10)},upgrades:{},saveVersion:3},this.blankUserData=this.userData,this.gameData={version:"0.0.23 ALPHA",currentSaveVersion:3,modalOpen:!1,currentModal:""}};
"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var DPCTab=document.getElementsByClassName("tab-dpc")[0],DPSTab=document.getElementsByClassName("tab-dps")[0],MultiplierTab=document.getElementsByClassName("tab-multipliers")[0],Shop=function Shop(a){var b=this;_classCallCheck(this,Shop),_defineProperty(this,"buyItem",function(a){var c=b.getItem(a),d=b.getItemCost(c);b.saveData.userData.money.gte(d)?(b.saveData.userData.upgrades[a].level=b.saveData.userData.upgrades[a].level.plus(1),b.saveData.userData.money=b.saveData.userData.money.minus(d),b.recalculateBuffs()):console.debug("Cannot afford ".concat(a))}),_defineProperty(this,"checkUserData",function(){[].concat(_toConsumableArray(b.shopData.dpc),_toConsumableArray(b.shopData.dps),_toConsumableArray(b.shopData.multipliers)).forEach(function(a){var c=b.saveData.userData.upgrades[a.id];c||(b.saveData.userData.upgrades[a.id]={level:BigNumber(0,10)})})}),_defineProperty(this,"createShopItem",function(a){var c=document.createElement("section");c.classList.add("shop-item");var d=document.createElement("section");d.classList.add("shop-item-information");var e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.classList.add("shop-item-icon"),e.setAttribute("viewBox","0 0 512 512");var f=document.createElementNS("http://www.w3.org/2000/svg","path");f.setAttribute("fill","#4caf50"),f.setAttribute("d",a.icon),e.appendChild(f);var g=document.createElement("section");g.classList.add("shop-item-text");var h=document.createElement("p");h.classList.add("shop-item-name"),h.innerText=b.shopLangData[a.id].name;var i=document.createElement("p");i.classList.add("shop-item-description"),i.innerText=b.shopLangData[a.id].description;var j=document.createElement("p");j.classList.add("shop-item-level"),j.innerText="Level: ".concat(formatNumber(b.saveData.userData.upgrades[a.id].level.toString(10),b.saveData.userData.options.numberFormat)),j.setAttribute("data-id",a.id),g.appendChild(h),g.appendChild(i),g.appendChild(j),d.appendChild(e),d.appendChild(g);var k=document.createElement("button");return k.classList.add("shop-item-button"),k.classList.add("button"),k.classList.add("button-primary"),k.classList.add("button-block"),k.innerText="Buy x1 ".concat(b.shopLangData[a.id].name," for \xA3").concat(formatNumber(b.getItemCost(a).toString(10),b.saveData.userData.options.numberFormat)),k.setAttribute("data-id",a.id),k.onclick=function(){b.buyItem(a.id),b.playSFX("buttonClick"),b.update()},c.appendChild(d),c.appendChild(k),c}),_defineProperty(this,"displayShopData",function(){b.shopData&&b.shopLangData&&(b.checkUserData(),b.shopData.dpc.forEach(function(a){var c=b.createShopItem(a);DPCTab.firstElementChild.appendChild(c)}),b.shopData.dps.forEach(function(a){var c=b.createShopItem(a);DPSTab.firstElementChild.appendChild(c)}),b.shopData.multipliers.forEach(function(a){var c=b.createShopItem(a);MultiplierTab.firstElementChild.appendChild(c)}))}),_defineProperty(this,"getItem",function(a){var c=[].concat(_toConsumableArray(b.shopData.dpc),_toConsumableArray(b.shopData.dps),_toConsumableArray(b.shopData.multipliers)).find(function(b){return b.id==a});return c.text=b.shopLangData[a],c}),_defineProperty(this,"getItemCost",function(a){var c=a,d=b.saveData.userData.upgrades[a.id].level,e=BigNumber(c.costMultiplier,10),f=BigNumber(c.startingCost,10);return 0!=d&&(f=f.multipliedBy(e.pow(d)).dp(0)),f}),_defineProperty(this,"loadShopData",function(){fetch("/assets/data/shop_items.json").then(function(a){return a.json()}).then(function(a){b.shopData=a,b.displayShopData()}).catch(function(a){console.error(a)}),fetch("/assets/data/".concat(b.saveData.userData.options.language,"/shop.json")).then(function(a){return a.json()}).then(function(a){b.shopLangData=a,b.displayShopData()}).catch(function(a){console.error(a)})}),_defineProperty(this,"recalculateBuffs",function(){var a=b.saveData.userData.upgrades,c=BigNumber(1,10),d=BigNumber(0,10),e=BigNumber(5,10),f=BigNumber(1,10);Object.keys(a).forEach(function(g){var h=b.getItem(g),i=a[g].level;if(h.dpc)c=c.plus(BigNumber(h.dpc,10).multipliedBy(i));else if(h.dps)d=d.plus(BigNumber(h.dps,10).multipliedBy(i));else switch(h.effects){case"brainCount":"multiplier"==h.type?f=f.multipliedBy(BigNumber(h.multiplier,10).pow(i)):"add"==h.type&&(f=f.plus(BigNumber(h.add,10).multipliedBy(i)));break;case"brainValue":"multiplier"==h.type?e=e.multipliedBy(BigNumber(h.multiplier,10).pow(i)):"add"==h.type&&(e=e.plus(BigNumber(h.add,10).multipliedBy(i)));break;default:console.log(h.effects,"=> Unknown Effect");}}),b.saveData.userData.dpc=BigNumber(c,10),b.saveData.userData.dps=BigNumber(d,10),b.saveData.userData.mpb=BigNumber(e,10),b.saveData.userData.bpk=BigNumber(f,10)}),_defineProperty(this,"sellBrains",function(){var a=b.sellBrainsValue();b.saveData.userData.brains=BigNumber(0,10),b.saveData.userData.money=b.saveData.userData.money.plus(a),b.saveData.userData.statistics.totalMoney=b.saveData.userData.statistics.totalMoney.plus(a)}),_defineProperty(this,"sellBrainsValue",function(){var a=b.saveData.userData.brains,c=b.saveData.userData.mpb;return a.multipliedBy(c)}),this.saveData=a,this.shopData=null,this.shopLangData=null,this.loadShopData()};
"use strict";var suffixList=[["Thousand","K","a"],["Million","M","b"],["Billion","B","c"],["Trillion","T","d"],["Quadrillion","Qa","e"],["Quintillion","Qi","f"],["Sextillion","Sx","g"],["Septillion","Sp","h"],["Octillion","Oc","i"],["Nonillion","No","j"],["Decillion","Dc","k"],["Undecillion","Ud","l"],["Duodecillion","Dd","m"],["Tredecillion","Td","n"],["Quattuordecillion","Qad","o"],["Quindecillion","Qid","p"],["Sexdecillion","Sxd","q"],["Septendecillion","Spd","r"],["Octodecillion","Ocd","s"],["Novemdecillion","Nod","t"],["Vigintillion","Vg","u"],["Unvigintillion","Uvg","v"],["Duovigintillion","Dvg","w"],["Trevigintillion","Tvg","x"],["Quattuorvigintillion","Qavg","y"],["Quinvigintillion","Qivg","z"],["Sexvigintillion","Sxvg","aa"],["Septenvigintillion","Spvg","ab"],["Octovigintillion","Ocvg","ac"],["Novemvigintillion","Novg","ad"],["Trigintillion","Tg","ae"],["Untrigintillion","Utg","af"],["Duotrigintillion","Dtg","ag"],["Tretrigintillion","Ttg","ah"],["Quattuortrigintillion","Qatg","ai"],["Quintrigintillion","Qitg","aj"],["Sextrigintillion","Sxtg","ak"],["Septentrigintillion","Sptg","al"],["Octotrigintillion","Octg","am"],["Novemtrigintillion","Notg","an"],["Quadragintillion","Qag","ao"],["Unquadragintillion","Uqag","ap"],["Duoquadragintillion","Dqag","aq"],["Trequadragintillion","Tqag","ar"],["Quattuorquadragintillion","Qaqag","as"],["Quinquadragintillion","Qiqag","at"],["Sexquadragintillion","Sxqag","au"],["Septenquadragintillion","Spqag","av"],["Octoquadragintillion","Ocqag","aw"],["Novemquadragintillion","Noqag","ax"],["Quinquagintillion","Qig","ay"],["Unquinquagintillion","Uqig","az"],["Duoquinquagintillion","Dqig","ba"],["Trequinquagintillion","Tqig","bb"],["Quattuorquinquagintillion","Qaqig","bc"],["Quinquinquagintillion","Qiqig","bd"],["Sexquinquagintillion","Sxqig","be"],["Septenquinquagintillion","Spqig","bf"],["Octoquinquagintillion","Ocqig","bg"],["Novemquinquagintillion","Noqig","bh"],["Sexagintillion","Sxg","bi"],["Unsexagintillion","Usxg","bj"],["Duosexagintillion","Dsxg","bk"],["Tresexagintillion","Tsxg","bl"],["Quattuorsexagintillion","Qasxg","bm"],["Quinsexagintillion","Qisxg","bn"],["Sexsexagintillion","Sxsxg","bo"],["Septensexagintillion","Spsxg","bp"],["Octosexagintillion","Ocsxg","bp"],["Novemsexagintillion","Nosxg","br"],["Septuagintillion","Spg","bs"],["Unseptuagintillion","Uspg","bt"],["Duoseptuagintillion","Dspg","bu"],["Treseptuagintillion","Tspg","bv"],["Quattuorseptuagintillion","Qaspg","bw"],["Quinseptuagintillion","Qispg","bx"],["Sexseptuagintillion","Sxspg","bw"],["Septenseptuagintillion","Spspg","bz"],["Octoseptuagintillion","Ocspg","ca"],["Novemseptuagintillion","Nospg","cb"],["Octogintillion","Ocg","cc"],["Unoctogintillion","Uocg","cd"],["Duooctogintillion","Docg","ce"],["Treoctogintillion","Tocg","cf"],["Quattuoroctogintillion","Qaocg","cg"],["Quinoctogintillion","Qiocg","ch"],["Sexoctogintillion","Sxocg","ci"],["Septenoctogintillion","Spocg","cj"],["Octooctogintillion","Ococg","ck"],["Novemoctogintillion","Noocg","cl"],["Nonagintillion","Nog","cm"],["Unnonagintillion","Unog","cn"],["Duononagintillion","Dnog","co"],["Trenonagintillion","Tnog","cp"],["Quattuornonagintillion","Qanog","cq"],["Quinnonagintillion","Qinog","cr"],["Sexnonagintillion","Sxnog","cs"],["Septennonagintillion","Spnog","ct"],["Octononagintillion","Ocnog","cu"],["Novemnonagintillion","Nonog","cv"],["Centillion","C","cw"],["Uncentillion","Uc","cx"],["Duocentillion","Dc","cy"],["Trescentillion","Tc","cz"],["Quattuorcentillion","Qac","da"],["Quinquacentillion","Qic","db"],["Sexcentillion","Sxc","dc"],["Septencentillion","Spc","dd"],["Octocentilion","Occ","de"],["Novencentilion","Noc","df"],["Decicentillion","Dc","dg"],["Undecicentillion","Udc","dh"],["Duodecicentillion","Ddc","di"],["Tredecicentillion","Tdc","dj"],["Quattuordecicentillion","Qadc","dk"],["Quinquadecicentillion","Qidc","dl"],["Sedecicentillion","Sxdc","dm"],["Septendecicentillion","Spdc","dn"],["Octodecicentillion","Ocdc","do"],["Novendecicentillion","Nodc","dp"],["Viginticentillion","Vc","dq"],["Unviginticentillion","Uvc","dr"],["Duoviginticentillion","Dvc","ds"],["Tresviginticentillion","Tvc","dt"],["Quattuorviginticentillion","Qavc","du"],["Quinquaviginticentillion","Qivc","dv"],["Sesviginticentillion","Sxvc","dw"],["Septemviginticentillion","Spvc","dx"],["Octoviginticentillion","Ocvc","dy"],["Novemviginticentillion","Novc","dz"],["Trigintacentillion","Tc","ea"],["Untrigintacentillion","Utc","eb"],["Duotrigintacentillion","Dtc","ec"],["Trestrigintacentillion","Ttc","ed"],["Quattuortrigintacentillion","Qatc","ee"],["Quinquatrigintacentillion","Qitc","ef"],["Sestrigintacentillion","Sxtc","eg"],["Septentrigintacentillion","Sptc","eh"],["Octotrigintacentillion","Octc","ei"],["Noventrigintacentillion","Notc","ej"],["Quadragintacentillion","","ek"],["Unquadragintacentillion","","el"],["Duoquadragintacentillion","","em"],["Tresquadragintacentillion","","en"],["Quattuorquadragintacentillion","","eo"],["Quinquaquadragintacentillion","","ep"],["Sesquadragintacentillion","","eq"],["Septenquadragintacentillion","","er"],["Octoquadragintacentillion","","es"],["Novenquadragintacentillion","","et"],["Quinquagintacentillion","","eu"],["Unquinquagintacentillion","","ev"],["Duoquinquagintacentillion","","ew"],["Tresquinquagintacentillion","","ex"],["Quattuorquinquagintacentillion","","ey"],["Quinquaquinquagintacentillion","","ez"],["Sesquinquagintacentillion","","fa"],["Septenquinquagintacentillion","","fb"],["Octoquinquagintacentillion","","fc"],["Novenquinquagintacentillion","","fd"],["Sexagintacentillion","","fe"],["Unsexagintacentillion","","ff"],["Duosexagintacentillion","","fg"],["Tresexagintacentillion","","fh"],["Quattuorsexagintacentillion","","fi"],["Quinquasexagintacentillion","","fj"],["Sesexagintacentillion","","fk"],["Septensexagintacentillion","","fl"],["Octosexagintacentillion","","fm"],["Novensexagintacentillion","","fn"],["Septuagintacentillion","","fo"],["Unseptuagintacentillion","","fp"],["Duoseptuagintacentillion","","fq"],["Treseptuagintacentillion","","fr"],["Quattuorseptuagintacentillion","","fs"],["Quinquaseptuagintacentillion","","ft"],["Seseptuagintacentillion","","fu"],["Septenseptuagintacentillion","","fv"],["Octoseptuagintacentillion","","fw"],["Novenseptuagintacentillion","","fx"],["Octogintacentillion","","fy"],["Unoctogintacentillion","","fz"],["Duooctogintacentillion","","ga"],["Tresoctogintacentillion","","gb"],["Quattuoroctogintacentillion","","gc"],["Quinquaoctogintacentillion","","gd"],["Sexoctogintacentillion","","ge"],["Septemoctogintacentillion","","gf"],["Octooctogintacentillion","","gg"],["Novemoctogintacentillion","","gh"],["Nonagintacentillion","","gi"],["Unnonagintacentillion","","gj"],["Duononagintacentillion","","gk"],["Trenonagintacentillion","","gl"],["Quattuornonagintacentillion","","gm"],["Quinquanonagintacentillion","","gn"],["Senonagintacentillion","","go"],["Septenonagintacentillion","","gp"],["Octononagintacentillion","","gq"],["Novenonagintacentillion","","gr"],["Ducentillion","","gs"],["Unducentillion","","gt"],["Duoducentillion","","gu"],["Treducentillion","","gv"],["Quattuorducentillion","","gw"],["Quinquaducentillion","","gx"],["Seducentillion","","gy"],["Septenducentillion","","gz"],["Octoducentillion","","ha"],["Novenducentillion","","hb"],["Deciducentillion","","hc"],["Undeciducentillion","","hd"],["Duodeciducentillion","","he"],["Tredeciducentillion","","hf"],["Quattuordeciducentillion","","hg"],["Quinquadeciducentillion","","hh"],["Sedeciducentillion","","hi"],["Septendeciducentillion","","hj"],["Octodeciducentillion","","hk"],["Novendeciducentillion","","hl"],["Vigintiducentillion","","hm"],["Unvigintiducentillion","","hn"],["Duovigintiducentillion","","ho"],["Tresvigintiducentillion","","hp"],["Quattuorvigintiducentillion","","hq"],["Quinquavigintiducentillion","","hr"],["Sesvigintiducentillion","","hs"],["Septemvigintiducentillion","","ht"],["Octovigintiducentillion","","hu"],["Novemvigintiducentillion","","hv"],["Trigintaducentillion","","hw"],["Untrigintaducentillion","","hx"],["Duotrigintaducentillion","","hy"],["Trestrigintaducentillion","","hz"],["Quattuortrigintaducentillion","","ia"],["Quinquatrigintaducentillion","","ib"],["Sestrigintaducentillion","","ic"],["Septentrigintaducentillion","","id"],["Octotrigintaducentillion","","ie"],["Noventrigintaducentillion","","if"],["Quadragintaducentillion","","ig"],["Unquadragintaducentillion","","ih"],["Duoquadragintaducentillion","","ii"],["Tresquadragintaducentillion","","ij"],["Quattuorquadragintaducentillion","","ik"],["Quinquaquadragintaducentillion","","il"],["Sesquadragintaducentillion","","im"],["Septenquadragintaducentillion","","in"],["Octoquadragintaducentillion","","io"],["Novenquadragintaducentillion","","ip"],["Quinquagintaducentillion","","iq"],["Unquinquagintaducentillion","","ir"],["Duoquinquagintaducentillion","","is"],["Tresquinquagintaducentillion","","it"],["Quattuorquinquagintaducentillion","","iu"],["Quinquaquinquagintaducentillion","","iv"],["Sesquinquagintaducentillion","","iw"],["Septenquinquagintaducentillion","","ix"],["Octoquinquagintaducentillion","","iy"],["Novenquinquagintaducentillion","","iz"],["Sexagintaducentillion","","ja"],["Unsexagintaducentillion","","jb"],["Duosexagintaducentillion","","jc"],["Tresexagintaducentillion","","jd"],["Quattuorsexagintaducentillion","","je"],["Quinquasexagintaducentillion","","jf"],["Sesexagintaducentillion","","jg"],["Septensexagintaducentillion","","jh"],["Octosexagintaducentillion","","ji"],["Novensexagintaducentillion","","jj"],["Septuagintaducentillion","","jk"],["Unseptuagintaducentillion","","jl"],["Duoseptuagintaducentillion","","jm"],["Treseptuagintaducentillion","","jn"],["Quattuorseptuagintaducentillion","","jo"],["Quinquaseptuagintaducentillion","","jp"],["Seseptuagintaducentillion","","jq"],["Septenseptuagintaducentillion","","jr"],["Octoseptuagintaducentillion","","js"],["Novenseptuagintaducentillion","","jt"],["Octogintaducentillion","","ju"],["Unoctogintaducentillion","","jv"],["Duooctogintaducentillion","","jw"],["Tresoctogintaducentillion","","jx"],["Quattuoroctogintaducentillion","","jy"],["Quinquaoctogintaducentillion","","jz"],["Sexoctogintaducentillion","","ka"],["Septemoctogintaducentillion","","kb"],["Octooctogintaducentillion","","kc"],["Novemoctogintaducentillion","","kd"],["Nonagintaducentillion","","ke"],["Unnonagintaducentillion","","kf"],["Duononagintaducentillion","","kg"],["Trenonagintaducentillion","","kh"],["Quattuornonagintaducentillion","","ki"],["Quinquanonagintaducentillion","","kj"],["Senonagintaducentillion","","kk"],["Septenonagintaducentillion","","kl"],["Octononagintaducentillion","","km"],["Novenonagintaducentillion","","kn"],["Trecentillion","","ko"],["Untrecentillion","","kp"],["Duotrecentillion","","kq"],["Trestrecentillion","","kr"],["Quattuortrecentillion","","ks"],["Quinquatrecentillion","","kt"],["Sestrecentillion","","ku"],["Septentrecentillion","","kv"],["Octotrecentillion","","kw"],["Noventrecentillion","","kx"],["Decitrecentillion","","ky"],["Undecitrecentillion","","kz"],["Duodecitrecentillion","","la"],["Tredecitrecentillion","","lb"],["Quattuordecitrecentillion","","lc"],["Quinquadecitrecentillion","","ld"],["Sedecitrecentillion","","le"],["Septendecitrecentillion","","lf"],["Octodecitrecentillion","","lg"],["Novendecitrecentillion","","lh"],["Vigintitrecentillion","","li"],["Unvigintitrecentillion","","lj"],["Duovigintitrecentillion","","lk"],["Tresvigintitrecentillion","","ll"],["Quattuorvigintitrecentillion","","lm"],["Quinquavigintitrecentillion","","ln"],["Sesvigintitrecentillion","","lo"],["Septemvigintitrecentillion","","lp"],["Octovigintitrecentillion","","lq"],["Novemvigintitrecentillion","","lr"],["Trigintatrecentillion","","ls"],["Untrigintatrecentillion","","lt"],["Duotrigintatrecentillion","","lu"],["Trestrigintatrecentillion","","lv"]],formatNumber=function formatNumber(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"lazy",c="";c=a instanceof BigNumber?a.toString(10):"".concat(a);var d=c.length-1;if(3>d)return c;var e=(d/3<<0)-1,f="";f=e>suffixList.length-1?"fullname"==b?"???????????????":"??":suffixList[e][{fullname:0,shorthand:1,lazy:2}[b]];var g=c.slice(0,-(3*(e+1)-2)),h="".concat(g.slice(0,-2),".").concat(g.slice(-2)," ").concat(f);return h};

//# sourceMappingURL=game.js.map