(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{AH38:function(t,n,e){"use strict";e.r(n),e.d(n,"CityModule",(function(){return z}));var o=e("cLqD"),c=e("PCNd"),i=e("tyNb"),s=e("ofXK"),a=e("Mpt7"),r=e("fXoL");let p=(()=>{class t{constructor(){this.city={name:"Zul'ah",id:"zulah",levelRequirement:0},this.shops=[{type:"blacksmith",name:"Blacksmith",items:Object(a.a)([["armor1",{id:"armor1",name:"Armor",value:2,level:1,icon:"armor",type:"armor",subType:"chest",defense:5,style:"rare"}],["armor2",{id:"armor2",name:"Gauntlet",value:1,level:1,icon:"armor",type:"armor",subType:"chest",defense:5,style:"common"}]]),crafts:[],display:!1,acceptType:"equipment"},{type:"alchemist",name:"Alchemist",items:Object(a.a)([["item1",{id:"item1",name:"Health Potion",value:150,level:0,icon:"potionRed",type:"item",style:""}],["item2",{id:"item2",name:"Mana Potion",value:150,level:0,icon:"potionBlue",type:"item",style:""}]]),upgrades:[],display:!1,acceptType:"consumable"}]}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Gb({type:t,selectors:[["app-city"]],decls:6,vars:2,consts:[[1,"container"],[3,"shops"]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.Rb(1,"h1"),r.yc(2),r.Qb(),r.Rb(3,"p"),r.yc(4,"Description of city"),r.Qb(),r.Nb(5,"app-city-overview",1),r.Qb()),2&t&&(r.Bb(2),r.zc(n.city.name),r.Bb(3),r.hc("shops",n.shops))},styles:[".container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}"]}),t})();var b=e("XiUz"),l=e("znSr");const u=function(t){return{active:t}};function h(t,n){if(1&t){const t=r.Sb();r.Rb(0,"button",1),r.Zb("click",(function(){return r.pc(t),r.bc().selectTab("craft")})),r.yc(1," Craft "),r.Qb()}if(2&t){const t=r.bc();r.hc("ngClass",r.lc(1,u,"craft"===t.activeTab))}}function g(t,n){if(1&t){const t=r.Sb();r.Rb(0,"button",1),r.Zb("click",(function(){return r.pc(t),r.bc().selectTab("update")})),r.yc(1," Upgrade "),r.Qb()}if(2&t){const t=r.bc();r.hc("ngClass",r.lc(1,u,"update"===t.activeTab))}}let d=(()=>{class t{constructor(){this.selectedTab=new r.n,this.activeTab="shop"}selectTab(t){this.activeTab=t,this.selectedTab.emit(t),console.log(t)}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Gb({type:t,selectors:[["app-city-shop-tab"]],inputs:{shop:"shop"},outputs:{selectedTab:"selectedTab"},decls:7,vars:6,consts:[["fxLayout","row nowrap",1,"tab"],[3,"ngClass","click"],[3,"ngClass","click",4,"ngIf"]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.Rb(1,"button",1),r.Zb("click",(function(){return n.selectTab("shop")})),r.yc(2," Shop "),r.Qb(),r.wc(3,h,2,3,"button",2),r.wc(4,g,2,3,"button",2),r.Rb(5,"span"),r.yc(6),r.Qb(),r.Qb()),2&t&&(r.Bb(1),r.hc("ngClass",r.lc(4,u,"shop"===n.activeTab)),r.Bb(2),r.hc("ngIf",void 0!==n.shop.crafts),r.Bb(1),r.hc("ngIf",void 0!==(null==n.shop?null:n.shop.upgrades)),r.Bb(2),r.Ac(" ",n.shop.name," "))},directives:[b.f,s.q,l.a,s.t],styles:[".tab[_ngcontent-%COMP%]{height:25px;background:#ededed}.tab[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:inherit;background:rgba(101,127,159,.25);border:none;outline:none;cursor:pointer;-webkit-transition:.3s;transition:.3s;font-size:small}.tab[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:rgba(101,127,159,.45)}.tab[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:rgba(108,159,101,.75)}.tab[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]:hover{background:#6c9f65}.tab[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{margin-left:auto;align-self:center}"]}),t})();var m=e("kt0X"),f=e("l5mm"),y=e("cOoP"),x=e("sYnD"),v=e("AB2Y");function C(t,n){if(1&t){const t=r.Sb();r.Rb(0,"button",11),r.Zb("click",(function(){r.pc(t);const n=r.bc().$implicit;return r.bc(2).buyItem(n[1])})),r.yc(1," Buy "),r.Qb()}}function w(t,n){if(1&t){const t=r.Sb();r.Rb(0,"div",6),r.Zb("mouseenter",(function(){r.pc(t);const e=n.$implicit;return r.bc(2),r.oc(3).setItem(e[1])}))("mouseleave",(function(){return r.pc(t),r.bc(2),r.oc(3).setItem(null)})),r.Nb(1,"i"),r.Rb(2,"span",7),r.yc(3),r.Qb(),r.Rb(4,"div",8),r.Rb(5,"span",9),r.yc(6),r.Qb(),r.wc(7,C,2,0,"button",10),r.cc(8,"async"),r.Qb(),r.Qb()}if(2&t){const t=n.$implicit,o=r.bc(2);var e=null;const c=t[1].value<=(null==(e=r.dc(8,9,o._currencies$))?null:e.get("gold").quantity);r.Db("content ",t[1].style,""),r.Bb(1),r.Db("sprite sprite-",t[1].icon," "),r.Bb(2),r.Ac(" ",t[1].name," "),r.Bb(3),r.Ac(" ",t[1].value,"g "),r.Bb(1),r.hc("ngIf",c)}}function k(t,n){if(1&t&&(r.Pb(0),r.Rb(1,"div",4),r.yc(2),r.wc(3,w,9,11,"div",5),r.Qb(),r.Ob()),2&t){const t=r.bc();r.Bb(2),r.Ac(" Shop reset in ",t.timer," "),r.Bb(1),r.hc("ngForOf",t.shop.items)("ngForTrackBy",t.trackByFn)}}let O=(()=>{class t{constructor(t){this.store=t,this._currencies$=this.store.pipe(Object(m.r)(y.a))}buyItem(t){this.shop.items=this.shop.items.filter((n,e)=>n.id!==t.id),this.store.dispatch(new x.n({name:"gold",quantity:-t.value})),this.store.dispatch(new x.o(t))}sellItem(t){switch(this.shop.acceptType){case"consumable":"item"===t.type?this.sell(t):alert("You can't sell this here");break;case"equipment":"armor"===t.type||"weapon"===t.type?this.sell(t):alert("You can't sell this here")}}sell(t){this.shop.items=this.shop.items.set(t.id,t),this.store.dispatch(new x.n({name:"gold",quantity:t.value})),this.store.dispatch(new x.p(t.id))}trackByFn(t,n){return n.id}ngOnInit(){var t,n,e=900;this.minutes=Object(f.a)(1e3).subscribe(o=>{t=Math.floor(e/60),n=Math.floor(e%60),this.timer=(t=t<10?"0"+t:t)+":"+(n=n<10?"0"+n:n),console.log(this.timer),--e<0&&console.log("timeup")})}ngOnDestroy(){this.minutes.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(r.Mb(m.h))},t.\u0275cmp=r.Gb({type:t,selectors:[["app-city-shop-content"]],inputs:{displayedContent:"displayedContent",shop:"shop"},decls:4,vars:2,consts:[["fxLayout","row","fxLayoutAlign","space-between"],[4,"ngIf"],[3,"selling","sell"],["inventory",""],["fxLayout","column"],[3,"class","mouseenter","mouseleave",4,"ngFor","ngForOf","ngForTrackBy"],[3,"mouseenter","mouseleave"],[1,"item-name"],[1,"action"],[1,"item-value"],[3,"click",4,"ngIf"],[3,"click"]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.wc(1,k,4,3,"ng-container",1),r.Rb(2,"app-inventory-slot",2,3),r.Zb("sell",(function(t){return n.sellItem(t)})),r.Qb(),r.Qb()),2&t&&(r.Bb(1),r.hc("ngIf","shop"===n.displayedContent),r.Bb(1),r.hc("selling",!0))},directives:[b.f,b.e,s.t,v.a,s.s],pipes:[s.b],styles:[".sprite[_ngcontent-%COMP%]{background-image:url(/RiseOfHeroes/assets/lootequipment.png);background-repeat:no-repeat;display:block}.sprite-armor[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-5px -5px}.sprite-axe[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-63px -5px}.sprite-bow[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-121px -5px}.sprite-dagger[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-5px -63px}.sprite-helmet[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-63px -63px}.sprite-potionBlue[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-121px -63px}.sprite-potionRed[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-5px -121px}.sprite-shield[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-63px -121px}.sprite-sword[_ngcontent-%COMP%]{width:48px;height:48px;background-position:-121px -121px}.content[_ngcontent-%COMP%]{display:-webkit-box;display:flex;height:50px;min-width:30vw;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;box-shadow:0 .2rem .15rem #789;box-sizing:border-box;margin:5px 0;border:1px solid #789;background:#fff;padding-right:5px}.content.rare[_ngcontent-%COMP%]{box-shadow:0 .2rem .15rem #3a529c;border:1px solid #3a529c}.content.common[_ngcontent-%COMP%]{box-shadow:0 .2rem .15rem #26a65b;border:1px solid #26a65b}.content[_ngcontent-%COMP%]   span.item-name[_ngcontent-%COMP%]{vertical-align:middle}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;text-align:center}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]   span.item-value[_ngcontent-%COMP%]{font-size:xx-small}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:inherit;border:none;outline:none;cursor:pointer;height:25px;-webkit-transition:.3s;transition:.3s;font-size:small}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:rgba(175,194,212,.88)}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background-color:#f0f0f0}.content[_ngcontent-%COMP%]   .action[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]:hover{background-color:hsla(0,0%,94.1%,.53)}"]}),t})();function M(t,n){if(1&t){const t=r.Sb();r.Rb(0,"div",1),r.Rb(1,"app-city-shop-tab",2),r.Zb("selectedTab",(function(n){return r.pc(t),r.bc().displayContent(n)})),r.Qb(),r.Nb(2,"app-city-shop-content",3),r.Qb()}if(2&t){const t=r.bc();r.Bb(1),r.hc("shop",t.shop),r.Bb(1),r.hc("displayedContent",t.displayedContent)("shop",t.shop)}}let P=(()=>{class t{constructor(){this.displayedContent="shop"}displayContent(t){console.log(t),this.displayedContent=t}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Gb({type:t,selectors:[["app-city-shop"]],inputs:{shop:"shop"},decls:1,vars:1,consts:[["class","shop-ui",4,"ngIf"],[1,"shop-ui"],[3,"shop","selectedTab"],[3,"displayedContent","shop"]],template:function(t,n){1&t&&r.wc(0,M,3,3,"div",0),2&t&&r.hc("ngIf",n.shop)},directives:[s.t,d,O],styles:[".shop-ui[_ngcontent-%COMP%]{box-shadow:0 0 2px 2px #95a6a7;padding:5px;min-width:30vw;min-height:50vh}"]}),t})();const _=function(t){return{active:t}};function B(t,n){if(1&t){const t=r.Sb();r.Rb(0,"button",3),r.Zb("click",(function(){r.pc(t);const e=n.$implicit;return r.bc().setShop(e)})),r.yc(1),r.Qb()}if(2&t){const t=n.$implicit,e=r.bc();r.hc("ngClass",r.lc(2,_,t.name===(null==e._shop?null:e._shop.name))),r.Bb(1),r.Ac(" ",t.name," ")}}let R=(()=>{class t{constructor(){}setShop(t){this._shop=t}ngOnInit(){}onClose(t){t.display=!1}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Gb({type:t,selectors:[["app-city-overview"]],inputs:{shops:"shops"},decls:3,vars:2,consts:[["fxLayout","row nowrap","fxLayoutAlign","center center"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"shop"],[3,"ngClass","click"]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.wc(1,B,2,4,"button",1),r.Qb(),r.Nb(2,"app-city-shop",2)),2&t&&(r.Bb(1),r.hc("ngForOf",n.shops),r.Bb(1),r.hc("shop",n._shop))},directives:[b.f,b.e,s.s,P,s.q,l.a],styles:["button[_ngcontent-%COMP%]{height:25px;margin:5px;background:rgba(101,127,159,.25);border:none;outline:none;cursor:pointer;-webkit-transition:.3s;transition:.3s;font-size:small}button[_ngcontent-%COMP%]:hover{background:rgba(101,127,159,.45)}button.active[_ngcontent-%COMP%]{background:rgba(108,159,101,.75)}button.active[_ngcontent-%COMP%]:hover{background:#6c9f65}"]}),t})();var T=e("QPBi"),Q=e("ajRT"),I=e("L21D"),S=e("tFfd"),j=e("5+WD"),q=e("zpSk"),A=e("lBSq"),F=e("8Tmd");let z=(()=>{class t{}return t.\u0275mod=r.Kb({type:t}),t.\u0275inj=r.Jb({factory:function(n){return new(n||t)},imports:[[s.c,c.a,o.a,i.i.forChild([{path:"",component:p}])]]}),t})();r.sc(p,[p,R,P,d,O,s.q,s.r,s.s,s.t,s.A,s.w,s.x,s.y,s.z,s.u,s.v,T.c,Q.a,I.a,S.a,j.e,j.f,j.a,j.b,j.d,j.c,b.f,b.g,b.e,b.d,b.c,b.h,b.a,b.b,l.c,l.a,l.d,l.b,q.e,q.f,q.g,q.h,q.i,q.j,q.k,q.l,q.b,q.c,q.d,A.a,v.a,F.a,i.j,i.f,i.h,i.g,i.l],[s.b,s.G,s.p,s.k,s.E,s.g,s.C,s.F,s.d,s.f,s.i,s.j,s.l,T.e])}}]);