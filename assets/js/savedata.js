"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var Save=function Save(){var a=this;_classCallCheck(this,Save),_defineProperty(this,"save",function(){console.log("Attempting to save"),localStorage.setItem("savedata",btoa(JSON.stringify(a.userData))),console.log(a.userData)}),_defineProperty(this,"load",function(){var b=localStorage.getItem("savedata");b?(a.userData=_objectSpread({},a.blankUserData,{},JSON.parse(atob(b))),console.log("Loaded existing savedata!")):console.log("Existing savedata doesn't exist!")}),_defineProperty(this,"reset",function(){a.userData=a.blankUserData,a.save(),location.reload()}),this.userData={brains:0,money:0,dps:0,dpc:1,bpk:1,mpb:5,level:1,zombie:{currentHealth:10,totalHealth:10},options:{language:"en",showDamage:!0},statistics:{clicks:0,kills:0},upgrades:{}},this.gameData={version:"0.0.6 ALPHA",modalOpen:!1},this.blankUserData=this.userData};