(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{OVhx:function(t,n,o){"use strict";o.r(n),o.d(n,"CombatModule",(function(){return A}));var e=o("ofXK"),i=o("2Vo4"),p=o("lJxs"),c=o("QuZ5"),s=o("fXoL"),x=o("QPBi"),h=o("4Y61"),r=o("DcRq"),g=o("cOoP"),a=o("sYnD"),b=o("IzEk"),d=o("SxV6"),l=o("IM8C"),_=o("kt0X"),m=o("tyNb"),u=o("HkPj"),P=o("XiUz"),C=o("L21D"),O=o("LRne"),w=o("EQES");const M=["cooldown"],k=["action"];function f(t,n){if(1&t&&(s.Rb(0),s.Tb(1,"div",2,3),s.Tb(3,"div",4),s.Pb(4,"i"),s.Pb(5,"canvas",5,6),s.Sb(),s.Sb(),s.Qb()),2&t){const t=s.dc();s.Bb(4),s.Eb("peasant ",null==t.spell?null:t.spell.icon,""),s.Cb("data-key",t.index+1)}}function y(t,n){if(1&t&&(s.Tb(0,"div",2,3),s.Tb(2,"div",4),s.Pb(3,"i"),s.Pb(4,"canvas",5,6),s.Sb(),s.Sb()),2&t){const t=s.dc();s.Bb(3),s.Eb("peasant ",null==t.spell?null:t.spell.icon,"")}}let v=(()=>{class t{constructor(t){this.ngZone=t,this.isSkill=!0,this.spellReady=new s.n}ngOnInit(){}ngAfterViewInit(){this.ctx=this.canvas.nativeElement.getContext("2d"),this.subscription=Object(O.a)(this.spell).subscribe(t=>{var n;if(this.isSkill)if(null===(n=t)||void 0===n?void 0:n.isInCooldown){const t=new S(this.ctx,this.canvas.nativeElement,this.spell,this.action.nativeElement,!1,this.hero);this.ngZone.runOutsideAngular(()=>t.gaugeCooldown())}else this.spellReady.emit(!0),null!=this.subscription&&this.subscription.unsubscribe();else{const t=new S(this.ctx,this.canvas.nativeElement,this.spell,this.action.nativeElement,this.isSkill,this.hero);this.ngZone.runOutsideAngular(()=>t.gaugeCooldown())}})}ngOnDestroy(){this.subscription.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(s.Ob(s.z))},t.\u0275cmp=s.Ib({type:t,selectors:[["combat-spell-cooldown"]],viewQuery:function(t,n){var o;1&t&&(s.Fc(M,!0),s.Fc(k,!0)),2&t&&(s.oc(o=s.cc())&&(n.canvas=o.first),s.oc(o=s.cc())&&(n.action=o.first))},inputs:{index:"index",spell:"spell",isSkill:"isSkill",hero:"hero"},outputs:{spellReady:"rdy"},decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["dot",""],[1,"action"],["action",""],[1,"action-internal"],["width","48","height","48"],["cooldown",""]],template:function(t,n){if(1&t&&(s.yc(0,f,7,4,"ng-container",0),s.yc(1,y,6,3,"ng-template",null,1,s.zc)),2&t){const t=s.pc(2);s.ic("ngIf",n.isSkill)("ngIfElse",t)}},directives:[e.t],styles:['.peasant[_ngcontent-%COMP%]{background-image:url(/RiseOfHeroes/assets/peasantSkills.png);background-repeat:no-repeat;display:block}.peasant.peasantHearth[_ngcontent-%COMP%]{background-position:-5px -5px;width:48px;height:48px}.peasant.peasantLabor[_ngcontent-%COMP%]{background-position:-63px -5px;width:48px;height:48px}.peasant.peasantTorch[_ngcontent-%COMP%]{background-position:-5px -63px;width:48px;height:48px}.peasant.powerAttack[_ngcontent-%COMP%]{background-position:-63px -63px;width:48px;height:48px}[_nghost-%COMP%]{margin:0 1rem 2rem 0}.action[_ngcontent-%COMP%]{border:1px solid #000;border-radius:5px;box-shadow:0 2px 8px 0 #000;cursor:pointer;outline:0;position:relative;transition:.1s}.action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:before{font:700 .75em Roboto Condensed,sans-serif;left:.25rem;content:attr(data-key);position:absolute;text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;top:0;z-index:3}.action[_ngcontent-%COMP%]:after{bottom:0;content:"";display:block;height:100%;left:0;position:absolute;right:0;top:0;width:100%}.action.active[_ngcontent-%COMP%], .action[_ngcontent-%COMP%]:hover{border:1px solid #fdffad;box-shadow:0 0 6px 1px #fdffad}.action[_ngcontent-%COMP%]:last-child{margin-right:0}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]{background:transparent;border-radius:5px;box-sizing:content-box;color:#fff;font-size:1.2em;overflow:hidden;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]:after{box-shadow:inset 0 34px 16px -16px hsla(0,0%,100%,.4)}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]:after, .action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]:before{bottom:0;content:"";display:block;height:100%;left:0;position:absolute;right:0;top:0;width:100%}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]:before{box-shadow:inset 0 1px 1px -1px #fff,inset 0 2px 1px 0 hsla(0,0%,100%,.4),inset 0 -1px 2px -1px hsla(0,0%,100%,.4)}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{left:50%;position:absolute;top:50%;z-index:2}.action[_ngcontent-%COMP%]   .action-internal[_ngcontent-%COMP%]:last-child{margin-right:0}']}),t})();class S{constructor(t,n,o,e,i=!0,p){this.ctx=t,this.canvas=n,this.spell=o,this.element=e,this.isSkill=i,this.hero=p}clearCanvas(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}endCooldown(){this.clearCanvas(),this.timer=null;var t=this.canvas,n=this.canvas.getContext("2d");n.fillStyle="rgba(253, 255, 173, 0.5)",n.fillRect(0,0,t.width,t.height),window.setTimeout((function(){n.clearRect(0,0,t.width,t.height)}),20)}gaugeCooldown(){this.timer||this.initiateCooldown()}initiateCooldown(){console.log("hero spell",this.hero),console.log("spell cd",this.spell.cooldown),this.cd=this.isSkill?Object(w.h)("swiftness",this.hero,1e3*this.spell.cooldown):Object(w.h)("swiftness",this.hero,1e3*this.spell.duration),console.log("cd",this.cd),this.timer||(this.timer=window.setTimeout(this.endCooldown.bind(this),this.cd),this.timerStart=(new Date).getTime(),this.runCooldown())}runCooldown(){if(this.timer){var t=((new Date).getTime()-this.timerStart)/this.cd*360,n=this.canvas,o=this.canvas.getContext("2d"),e=Math.sqrt(Math.pow(this.element.clientWidth,2)+Math.pow(this.element.clientHeight,2));o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,n.width,n.height),n.height=e,n.width=e,n.style.marginLeft=-e/2+"px",n.style.marginTop=-e/2+"px",o.fillStyle="rgba(0, 0, 0, 0.5)",o.translate(n.width/2,n.height/2),o.rotate(-Math.PI/2),o.beginPath(),o.moveTo(0,0),o.lineTo(e/2*Object(x.g)(Math.cos(0).toFixed(15)),e/2*Object(x.g)(Math.sin(0).toFixed(15))),o.lineWidth=2,o.strokeStyle="rgba(255, 255, 255, 0.9)",o.shadowColor="rgba(255, 255, 255, 0.6)",o.shadowBlur=10,o.stroke(),o.moveTo(0,0),o.lineTo(e/2*Object(x.g)(Math.cos(t*Math.PI/180).toFixed(15)),e/2*Object(x.g)(Math.sin(t*Math.PI/180).toFixed(15))),o.stroke(),o.shadowColor=null,o.shadowBlur=null,o.arc(0,0,e/2,t*Math.PI/180,2*Math.PI,!1),o.fill(),o.closePath(),requestAnimationFrame(this.runCooldown.bind(this))}}}function T(t,n){if(1&t&&s.Pb(0,"combat-spell-cooldown",11),2&t){const t=n.$implicit,o=n.index,e=s.dc();s.ic("spell",t)("index",o)("hero",e.hero)("isSkill",!1)}}let B=(()=>{class t{constructor(){}healthPercentage(t){return Math.round(t.hp/t.maxHp*100)}trackByFn(t,n){return t}rewardExp(){return Object(c.c)(this.heroLevel,this.heroLevel-this.fighter.level)}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["app-combat-monster-hud"]],inputs:{fighter:"fighter",hero:"hero",heroLevel:"heroLevel"},decls:26,vars:14,consts:[["fxLayout","column","fxLayoutAlign","center center"],[1,"combat"],["cardHeader",""],["cardBody",""],["fxLayout","row nowrap"],["fxLayout","column","fxLayoutAlign","space-evenly","fxFlex","grow",1,"stat"],["fxLayout","row","fxLayoutAlign","space-around center"],[1,"myProgress","hp"],[1,"fillingBar"],["fxLayout","row"],["style","transform: scale(0.5);",3,"spell","index","hero","isSkill",4,"ngFor","ngForOf","ngForTrackBy"],[2,"transform","scale(0.5)",3,"spell","index","hero","isSkill"]],template:function(t,n){1&t&&(s.Tb(0,"div",0),s.Tb(1,"app-card",1),s.Rb(2,2),s.Ac(3),s.Qb(),s.Rb(4,3),s.Tb(5,"div",4),s.Tb(6,"div"),s.Pb(7,"i"),s.Sb(),s.Tb(8,"div",5),s.Tb(9,"div",6),s.Tb(10,"label"),s.Ac(11),s.Sb(),s.Tb(12,"label"),s.Ac(13),s.Sb(),s.Sb(),s.Tb(14,"div",6),s.Tb(15,"label"),s.Ac(16),s.Sb(),s.Tb(17,"label"),s.Ac(18),s.Sb(),s.Sb(),s.Sb(),s.Sb(),s.Tb(19,"div"),s.Tb(20,"div",7),s.Tb(21,"span"),s.Ac(22),s.Sb(),s.Pb(23,"div",8),s.Sb(),s.Tb(24,"div",9),s.yc(25,T,1,4,"combat-spell-cooldown",10),s.Sb(),s.Sb(),s.Qb(),s.Sb(),s.Sb()),2&t&&(s.Bb(3),s.Dc(" ",n.fighter.name," / lvl ",n.fighter.level," "),s.Bb(4),s.Eb("",n.fighter.icon," mob"),s.Bb(4),s.Cc(" Attack : ",n.fighter.attack,""),s.Bb(2),s.Cc(" Defense : ",n.fighter.defense,""),s.Bb(3),s.Cc(" Attack speed : ",n.fighter.attackSpeed/1e3,"/s"),s.Bb(2),s.Cc(" Exp : ",n.rewardExp(),""),s.Bb(4),s.Cc(" ",n.fighter.hp,""),s.Bb(1),s.xc("width",n.healthPercentage(n.fighter),"%"),s.Bb(2),s.ic("ngForOf",null==n.fighter?null:n.fighter.debuffs)("ngForTrackBy",n.trackByFn))},directives:[P.f,P.e,C.a,P.b,e.s,v],styles:[".myProgress[_ngcontent-%COMP%]{display:flex;position:relative;font-size:small;height:30px;width:inherit}.myProgress.mana[_ngcontent-%COMP%]{height:20px;box-shadow:1px 1px 2px #3a529c,-1px -1px 2px #3a529c}.myProgress.mana[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{background-color:chambray;transition:width 1s;border-radius:inherit}.myProgress.mana[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #3a529c,-1px -1px 4px #3a529c}.myProgress.hp[_ngcontent-%COMP%]{box-shadow:1px 1px 2px #26a65b,-1px -1px 2px #26a65b}.myProgress.hp[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{background-color:#26a65b;border-radius:inherit;transition:width 1s}.myProgress.hp[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #26a65b,-1px -1px 4px #26a65b}.myProgress.exp[_ngcontent-%COMP%]{width:100%;margin-top:10px;height:15px;box-shadow:1px 1px 2px #f15a22,-1px -1px 2px #f15a22}.myProgress.exp[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{border-radius:inherit;background-color:#f15a22;transition:width 1s}.myProgress.exp[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #f15a22,-1px -1px 4px #f15a22}.myProgress.miscellaneous[_ngcontent-%COMP%]{height:15px;margin-top:2px;box-shadow:1px 1px 2px orange,-1px -1px 2px orange}.myProgress.miscellaneous[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{border-radius:inherit;transition:width 1s}.myProgress.miscellaneous[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px orange,-1px -1px 4px orange}.myProgress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.mob[_ngcontent-%COMP%]{background-image:url(/RiseOfHeroes/assets/mobs.png);background-repeat:no-repeat;display:block}.mob.Arctic_wolf[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -5px}.mob.Plant_Monster_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -5px}.mob.addons_091[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -5px}.mob.addons_093[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -5px}.mob.addons_095[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -5px}.mob.addons_096[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -5px}.mob.addons_097[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -5px}.mob.ancient_vampire[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -5px}.mob.ash_zombies[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -5px}.mob.banshee[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -5px}.mob.bat_01[_ngcontent-%COMP%]{background-position:-1385px -5px}.mob.bat_01[_ngcontent-%COMP%], .mob.bear[_ngcontent-%COMP%]{width:128px;height:128px}.mob.bear[_ngcontent-%COMP%]{background-position:-5px -143px}.mob.bear_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -143px}.mob.beest_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -143px}.mob.beest_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -143px}.mob.beest_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -143px}.mob.bird_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -143px}.mob.bogard[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -143px}.mob.bone_beast[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -143px}.mob.buddy[_ngcontent-%COMP%]{background-position:-1109px -143px}.mob.buddy[_ngcontent-%COMP%], .mob.bug[_ngcontent-%COMP%]{width:128px;height:128px}.mob.bug[_ngcontent-%COMP%]{background-position:-1247px -143px}.mob.bug2[_ngcontent-%COMP%]{background-position:-1385px -143px}.mob.bug2[_ngcontent-%COMP%], .mob.cat_01[_ngcontent-%COMP%]{width:128px;height:128px}.mob.cat_01[_ngcontent-%COMP%]{background-position:-5px -281px}.mob.chicken_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -281px}.mob.crocodile_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -281px}.mob.crow_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -281px}.mob.crystal_golem_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -281px}.mob.cyclop_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -281px}.mob.dark_knight_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -281px}.mob.dark_knight_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -281px}.mob.dark_knight_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -281px}.mob.dark_knight_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -281px}.mob.demon_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -281px}.mob.demon_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -419px}.mob.demon_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -419px}.mob.demon_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -419px}.mob.demon_05[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -419px}.mob.demon_06[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -419px}.mob.demon_07[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -419px}.mob.demon_08[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -419px}.mob.diver_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -419px}.mob.dog_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -419px}.mob.doll_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -419px}.mob.dragon_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -419px}.mob.dragon_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -557px}.mob.dragon_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -557px}.mob.dragon_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -557px}.mob.dragon_05[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -557px}.mob.dragon_06[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -557px}.mob.dragon_07[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -557px}.mob.dragon_08[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -557px}.mob.dragon_09[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -557px}.mob.dragon_10[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -557px}.mob.dragon_11[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -557px}.mob.dragon_12[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -557px}.mob.dragon_13[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -695px}.mob.dummy_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -695px}.mob.elephant_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -695px}.mob.eye_01[_ngcontent-%COMP%]{background-position:-419px -695px}.mob.eye_01[_ngcontent-%COMP%], .mob.eye_02[_ngcontent-%COMP%]{width:128px;height:128px}.mob.eye_02[_ngcontent-%COMP%]{background-position:-557px -695px}.mob.frog_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -695px}.mob.frost_giant_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -695px}.mob.ghost_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -695px}.mob.ghoul_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -695px}.mob.goat_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -695px}.mob.goblin_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -695px}.mob.goblin_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -833px}.mob.goblin_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -833px}.mob.goblin_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -833px}.mob.golem_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -833px}.mob.golem_01a[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -833px}.mob.golem_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -833px}.mob.golem_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -833px}.mob.golem_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -833px}.mob.gremlin_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -833px}.mob.grey-wolf_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -833px}.mob.horse_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -833px}.mob.hound[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -971px}.mob.insect_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -971px}.mob.insect_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -971px}.mob.insect_03[_ngcontent-%COMP%]{background-position:-419px -971px}.mob.insect_03[_ngcontent-%COMP%], .mob.jin[_ngcontent-%COMP%]{width:128px;height:128px}.mob.jin[_ngcontent-%COMP%]{background-position:-557px -971px}.mob.joker_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -971px}.mob.joker_02[_ngcontent-%COMP%]{background-position:-833px -971px}.mob.joker_02[_ngcontent-%COMP%], .mob.l_01[_ngcontent-%COMP%]{width:128px;height:128px}.mob.l_01[_ngcontent-%COMP%]{background-position:-971px -971px}.mob.l_02[_ngcontent-%COMP%]{background-position:-1109px -971px}.mob.l_02[_ngcontent-%COMP%], .mob.l_03[_ngcontent-%COMP%]{width:128px;height:128px}.mob.l_03[_ngcontent-%COMP%]{background-position:-1247px -971px}.mob.lion_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -971px}.mob.living_armor_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -1109px}.mob.living_armor_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -1109px}.mob.living_armor_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -1109px}.mob.living_armor_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -1109px}.mob.lizardman_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -1109px}.mob.madman[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -1109px}.mob.mask_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -1109px}.mob.mummy_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -1109px}.mob.nightmare_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -1109px}.mob.ogr_01[_ngcontent-%COMP%]{background-position:-1247px -1109px}.mob.ogr_01[_ngcontent-%COMP%], .mob.orc_01[_ngcontent-%COMP%]{width:128px;height:128px}.mob.orc_01[_ngcontent-%COMP%]{background-position:-1385px -1109px}.mob.orc_02[_ngcontent-%COMP%]{background-position:-5px -1247px}.mob.orc_02[_ngcontent-%COMP%], .mob.orc_03[_ngcontent-%COMP%]{width:128px;height:128px}.mob.orc_03[_ngcontent-%COMP%]{background-position:-143px -1247px}.mob.orc_04[_ngcontent-%COMP%]{background-position:-281px -1247px}.mob.orc_04[_ngcontent-%COMP%], .mob.orc_05[_ngcontent-%COMP%]{width:128px;height:128px}.mob.orc_05[_ngcontent-%COMP%]{background-position:-419px -1247px}.mob.owl_01[_ngcontent-%COMP%]{background-position:-557px -1247px}.mob.owl_01[_ngcontent-%COMP%], .mob.ox_01[_ngcontent-%COMP%]{width:128px;height:128px}.mob.ox_01[_ngcontent-%COMP%]{background-position:-695px -1247px}.mob.parasit_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -1247px}.mob.parasit_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -1247px}.mob.phoenix_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -1247px}.mob.pig_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -1247px}.mob.pumpkin[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -1247px}.mob.rat_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -1385px}.mob.red_ghoul_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -1385px}.mob.robot_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -1385px}.mob.robot_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -1385px}.mob.robot_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -1385px}.mob.robot_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -1385px}.mob.robot_05[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-833px -1385px}.mob.sheep_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-971px -1385px}.mob.skeleton_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1109px -1385px}.mob.skeleton_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1247px -1385px}.mob.skeleton_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1385px -1385px}.mob.skeleton_04[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -5px}.mob.skeleton_05[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -143px}.mob.skeleton_06[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -281px}.mob.skeleton_07[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -419px}.mob.snail_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -557px}.mob.snail_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -695px}.mob.snake_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -833px}.mob.spider_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -971px}.mob.spider_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -1109px}.mob.spider_03[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -1247px}.mob.tentacle_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-1523px -1385px}.mob.troll_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-5px -1523px}.mob.turtle_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-143px -1523px}.mob.werewolf_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-281px -1523px}.mob.yeti_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-419px -1523px}.mob.zombie_01[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-557px -1523px}.mob.zombie_02[_ngcontent-%COMP%]{width:128px;height:128px;background-position:-695px -1523px}.stat[_ngcontent-%COMP%]{height:10vh}"]}),t})();var L=o("++hd");function $(t,n){if(1&t){const t=s.Ub();s.Tb(0,"combat-spell-cooldown",10),s.bc("rdy",(function(n){return s.rc(t),s.dc().casted(n)}))("click",(function(){s.rc(t);const o=n.$implicit,e=s.dc();return!o.isInCooldown&&e.cast(o)})),s.ec(1,"async"),s.Sb()}if(2&t){const t=n.$implicit,o=n.index,e=s.dc();s.ic("tooltip",t)("tooltip-detach",e.spellCasted)("tooltip-type","spell")("spell",t)("index",o)("hero",s.fc(1,6,e.hero$))}}let j=(()=>{class t{constructor(){this._hero$=new i.a(null),this.hero$=this._hero$,this.castSpell=new s.n,this.spellCasted=new s.n,this.healthPercentage$=this.hero$.pipe(Object(p.a)(t=>t?Math.round(t.hp/t.maxHp*100):0)),this.expPercentage$=this.hero$.pipe(Object(p.a)(t=>t?Math.round(t.exp/this.getXPForLevel(t.level)*100):0))}set hero(t){this._hero$.next(t)}casted(t){this.spellCasted.emit(t)}cast(t){if("keydown"==event.type){const t=String.fromCharCode(event.keyCode);let n;return this.hero$.pipe(Object(d.a)()).subscribe(t=>n=t.equippedSpell),void n.forEach((n,o)=>{t!==(o+1).toString()||n.isInCooldown||(this.castSpell.emit(n),this.casted(!0))})}this.castSpell.emit(t),this.casted(!0)}getXPForLevel(t){return Object(c.a)(t)}trackByFn(t,n){return n}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["app-combat-hero-hud"]],hostBindings:function(t,n){1&t&&s.bc("keydown",(function(){return n.cast()}),!1,s.qc)},inputs:{hero:"hero"},outputs:{castSpell:"castSpell",spellCasted:"spellCasted"},decls:25,vars:27,consts:[["fxLayout","row","fxLayoutAlign","center center",1,"ui-container"],[1,"combat"],["cardHeader",""],["cardBody",""],[1,"myProgress","hp"],[1,"fillingBar"],[1,"myProgress","exp"],["cardFooter",""],["fxLayout","row","fxLayoutAlign","center center"],[3,"tooltip","tooltip-detach","tooltip-type","spell","index","hero","rdy","click",4,"ngFor","ngForOf","ngForTrackBy"],[3,"tooltip","tooltip-detach","tooltip-type","spell","index","hero","rdy","click"]],template:function(t,n){1&t&&(s.Tb(0,"div",0),s.Tb(1,"app-card",1),s.Rb(2,2),s.Ac(3),s.ec(4,"async"),s.Qb(),s.Rb(5,3),s.Tb(6,"div"),s.Tb(7,"div",4),s.Tb(8,"span"),s.Ac(9),s.ec(10,"async"),s.ec(11,"async"),s.Sb(),s.Tb(12,"div",5),s.ec(13,"async"),s.Sb(),s.Sb(),s.Tb(14,"div",6),s.Tb(15,"span"),s.Ac(16),s.ec(17,"async"),s.ec(18,"async"),s.Sb(),s.Tb(19,"div",5),s.ec(20,"async"),s.Sb(),s.Sb(),s.Sb(),s.Qb(),s.Rb(21,7),s.Tb(22,"div",8),s.yc(23,$,2,8,"combat-spell-cooldown",9),s.ec(24,"async"),s.Sb(),s.Qb(),s.Sb(),s.Sb()),2&t&&(s.Bb(3),s.Cc(" You / lvl ",s.fc(4,11,n.hero$).level," "),s.Bb(6),s.Dc(" ",s.fc(10,13,n.hero$).hp," / ",s.fc(11,15,n.hero$).maxHp,""),s.Bb(3),s.xc("width",s.fc(13,17,n.healthPercentage$),"%"),s.Bb(4),s.Dc(" ",s.fc(17,19,n.hero$).exp," / ",n.getXPForLevel(s.fc(18,21,n.hero$).level),""),s.Bb(3),s.xc("width",s.fc(20,23,n.expPercentage$),"%"),s.Bb(4),s.ic("ngForOf",s.fc(24,25,n.hero$).equippedSpell)("ngForTrackBy",n.trackByFn))},directives:[P.f,P.e,C.a,e.s,v,L.a],pipes:[e.b],styles:[".myProgress[_ngcontent-%COMP%]{display:flex;position:relative;font-size:small;height:30px;width:inherit}.myProgress.mana[_ngcontent-%COMP%]{height:20px;box-shadow:1px 1px 2px #3a529c,-1px -1px 2px #3a529c}.myProgress.mana[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{background-color:chambray;transition:width 1s;border-radius:inherit}.myProgress.mana[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #3a529c,-1px -1px 4px #3a529c}.myProgress.hp[_ngcontent-%COMP%]{box-shadow:1px 1px 2px #26a65b,-1px -1px 2px #26a65b}.myProgress.hp[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{background-color:#26a65b;border-radius:inherit;transition:width 1s}.myProgress.hp[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #26a65b,-1px -1px 4px #26a65b}.myProgress.exp[_ngcontent-%COMP%]{width:100%;margin-top:10px;height:15px;box-shadow:1px 1px 2px #f15a22,-1px -1px 2px #f15a22}.myProgress.exp[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{border-radius:inherit;background-color:#f15a22;transition:width 1s}.myProgress.exp[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px #f15a22,-1px -1px 4px #f15a22}.myProgress.miscellaneous[_ngcontent-%COMP%]{height:15px;margin-top:2px;box-shadow:1px 1px 2px orange,-1px -1px 2px orange}.myProgress.miscellaneous[_ngcontent-%COMP%]   .fillingBar[_ngcontent-%COMP%]{border-radius:inherit;transition:width 1s}.myProgress.miscellaneous[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 4px orange,-1px -1px 4px orange}.myProgress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}[_nghost-%COMP%]{position:absolute;display:flex;align-items:center;justify-content:center;bottom:0;width:100vw}.ui-container[_ngcontent-%COMP%]{width:500px}.ui-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px;width:48px;height:48px;box-shadow:0 0 1px .5px #fff}"]}),t})(),F=(()=>{class t{constructor(t,n,o,e){this.store=t,this.route=n,this.combatService=o,this.router=e,this.hero$=this.store.select(g.e),this.city$=this.store.select(Object(h.a)(this.route.snapshot.paramMap.get("cityId")))}activateSpell(t){this.combatService.activateSpell(t)}ngOnInit(){let t=r.m.findIndex(t=>t.name===this.route.snapshot.paramMap.get("monster"));this.city$.pipe(Object(b.a)(1)).subscribe(n=>{let o=n.building.find(t=>"huntingPost"==t.type).actions.find(n=>n.targetId===t).currentLevel;this.fighter=Object(l.a)(r.m[t],o)}),this.combatService.fighter=this.fighter,this.subscription=this.hero$.subscribe(t=>this.combatService.initialize(t))}ngOnDestroy(){this.hero$.pipe(Object(d.a)()).subscribe(t=>this.store.dispatch(new a.l(Object.assign(Object.assign({},t),{hp:t.maxHp})))),this.subscription.unsubscribe(),this.combatService.stop()}}return t.\u0275fac=function(n){return new(n||t)(s.Ob(_.h),s.Ob(m.a),s.Ob(u.a),s.Ob(m.f))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-combat"]],decls:6,vars:10,consts:[["fxLayout","row nowrap","fxLayoutAlign","center center"],[3,"fighter","hero","heroLevel"],[3,"hero","castSpell"]],template:function(t,n){1&t&&(s.Tb(0,"div",0),s.Pb(1,"app-combat-monster-hud",1),s.ec(2,"async"),s.ec(3,"async"),s.Sb(),s.Tb(4,"app-combat-hero-hud",2),s.bc("castSpell",(function(t){return n.activateSpell(t)})),s.ec(5,"async"),s.Sb()),2&t&&(s.Bb(1),s.ic("fighter",n.fighter)("hero",s.fc(2,4,n.hero$))("heroLevel",s.fc(3,6,n.hero$).level),s.Bb(3),s.ic("hero",s.fc(5,8,n.hero$)))},directives:[P.f,P.e,B,j],pipes:[e.b],styles:[""]}),t})();var I=o("PCNd");let A=(()=>{class t{}return t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({factory:function(n){return new(n||t)},imports:[[e.c,I.a,m.i.forChild([{path:"",component:F}])]]}),t})()}}]);