(function(){const t=document.createElement('link').relList;

if(t&&t.supports&&t.supports('modulepreload'))return;

for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);

new MutationObserver(o=>{for(const a of o)if(a.type==='childList')for(const i of a.addedNodes)i.tagName==='LINK'&&i.rel==='modulepreload'&&l(i);}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};

return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==='use-credentials'?a.credentials='include':o.crossOrigin==='anonymous'?a.credentials='omit':a.credentials='same-origin',a;}function l(o){if(o.ep)return;

o.ep=!0;const a=n(o);fetch(o.href,a);}})();function es(e){const t=Object.create(null);

for(const n of e.split(','))t[n]=1;

return n=>n in t;}const De={},wl=[],sn=()=>{},oc=()=>!1,xa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ts=e=>e.startsWith('onUpdate:'),Ze=Object.assign,ns=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},Jv=Object.prototype.hasOwnProperty,Pe=(e,t)=>Jv.call(e,t),ve=Array.isArray,Cl=e=>xo(e)==='[object Map]',ac=e=>xo(e)==='[object Set]',ar=e=>xo(e)==='[object Date]',pe=e=>typeof e=='function',Ke=e=>typeof e=='string',Ht=e=>typeof e=='symbol',Ee=e=>e!==null&&typeof e=='object',ic=e=>(Ee(e)||pe(e))&&pe(e.then)&&pe(e.catch),sc=Object.prototype.toString,xo=e=>sc.call(e),Qv=e=>xo(e).slice(8,-1),rc=e=>xo(e)==='[object Object]',ka=e=>Ke(e)&&e!=='NaN'&&e[0]!=='-'&&''+parseInt(e,10)===e,Yl=es(',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'),_a=e=>{const t=Object.create(null);

return(n=>t[n]||(t[n]=e(n)));},em=/-\w/g,ht=_a(e=>e.replace(em,t=>t.slice(1).toUpperCase())),tm=/\B([A-Z])/g,ul=_a(e=>e.replace(tm,'-$1').toLowerCase()),An=_a(e=>e.charAt(0).toUpperCase()+e.slice(1)),qa=_a(e=>e?`on${An(e)}`:''),$n=(e,t)=>!Object.is(e,t),Xa=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t);},uc=(e,t,n,l=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:l,value:n});},nm=e=>{const t=parseFloat(e);

return isNaN(t)?e:t;},lm=e=>{const t=Ke(e)?Number(e):NaN;

return isNaN(t)?e:t;};let ir;const Aa=()=>ir||(ir=typeof globalThis<'u'?globalThis:typeof self<'u'?self:typeof window<'u'?window:typeof global<'u'?global:{});function he(e){if(ve(e)){const t={};

for(let n=0;n<e.length;n++){const l=e[n],o=Ke(l)?sm(l):he(l);

if(o)for(const a in o)t[a]=o[a];}

return t;}else if(Ke(e)||Ee(e))return e;}const om=/;(?![^(]*\))/g,am=/:([^]+)/,im=/\/\*[^]*?\*\//g;function sm(e){const t={};

return e.replace(im,'').split(om).forEach(n=>{if(n){const l=n.split(am);l.length>1&&(t[l[0].trim()]=l[1].trim());}}),t;}function ce(e){let t='';

if(Ke(e))t=e;else if(ve(e))for(let n=0;n<e.length;n++){const l=ce(e[n]);l&&(t+=l+' ');}else if(Ee(e))for(const n in e)e[n]&&(t+=n+' ');

return t.trim();}const rm='itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',um=es(rm);function cc(e){return!!e||e==='';}function cm(e,t){if(e.length!==t.length)return!1;

let n=!0;

for(let l=0;n&&l<e.length;l++)n=ls(e[l],t[l]);

return n;}function ls(e,t){if(e===t)return!0;

let n=ar(e),l=ar(t);

if(n||l)return n&&l?e.getTime()===t.getTime():!1;

if(n=Ht(e),l=Ht(t),n||l)return e===t;

if(n=ve(e),l=ve(t),n||l)return n&&l?cm(e,t):!1;

if(n=Ee(e),l=Ee(t),n||l){if(!n||!l)return!1;

const o=Object.keys(e).length,a=Object.keys(t).length;

if(o!==a)return!1;

for(const i in e){const s=e.hasOwnProperty(i),r=t.hasOwnProperty(i);

if(s&&!r||!s&&r||!ls(e[i],t[i]))return!1;}}

return String(e)===String(t);}const dc=e=>!!(e&&e.__v_isRef===!0),Ge=e=>Ke(e)?e:e==null?'':ve(e)||Ee(e)&&(e.toString===sc||!pe(e.toString))?dc(e)?Ge(e.value):JSON.stringify(e,fc,2):String(e),fc=(e,t)=>dc(t)?fc(e,t.value):Cl(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[l,o],a)=>(n[Za(l,a)+' =>']=o,n),{})}:ac(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Za(n))}:Ht(t)?Za(t):Ee(t)&&!ve(t)&&!rc(t)?String(t):t,Za=(e,t='')=>{var n;

return Ht(e)?`Symbol(${(n=e.description)!=null?n:t})`:e;};let ut;class vc{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=ut,!t&&ut&&(this.index=(ut.scopes||(ut.scopes=[])).push(this)-1);}get active(){return this._active;}pause(){if(this._active){this._isPaused=!0;let t,n;

if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();

for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause();}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;

if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();

for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume();}}run(t){if(this._active){const n=ut;try{return ut=this,t();}finally{ut=n;}}}on(){++this._on===1&&(this.prevScope=ut,ut=this);}off(){this._on>0&&--this._on===0&&(ut=this.prevScope,this.prevScope=void 0);}stop(t){if(this._active){this._active=!1;let n,l;

for(n=0,l=this.effects.length;n<l;n++)this.effects[n].stop();

for(this.effects.length=0,n=0,l=this.cleanups.length;n<l;n++)this.cleanups[n]();

if(this.cleanups.length=0,this.scopes){for(n=0,l=this.scopes.length;n<l;n++)this.scopes[n].stop(!0);

this.scopes.length=0;}

if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index);}

this.parent=void 0;}}}function nl(e){return new vc(e);}function os(){return ut;}function tt(e,t=!1){ut&&ut.cleanups.push(e);}let Ne;const Ja=new WeakSet;class mc{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ut&&ut.active&&ut.effects.push(this);}pause(){this.flags|=64;}resume(){this.flags&64&&(this.flags&=-65,Ja.has(this)&&(Ja.delete(this),this.trigger()));}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||hc(this);}run(){if(!(this.flags&1))return this.fn();

this.flags|=2,sr(this),yc(this);const t=Ne,n=Rt;Ne=this,Rt=!0;try{return this.fn();}finally{pc(this),Ne=t,Rt=n,this.flags&=-3;}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ss(t);

this.deps=this.depsTail=void 0,sr(this),this.onStop&&this.onStop(),this.flags&=-2;}}trigger(){this.flags&64?Ja.add(this):this.scheduler?this.scheduler():this.runIfDirty();}runIfDirty(){xi(this)&&this.run();}get dirty(){return xi(this);}}let gc=0,ql,Xl;function hc(e,t=!1){if(e.flags|=8,t){e.next=Xl,Xl=e;

return;}

e.next=ql,ql=e;}function as(){gc++;}function is(){if(--gc>0)return;

if(Xl){let t=Xl;

for(Xl=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n;}}

let e;

for(;ql;){let t=ql;

for(ql=void 0;t;){const n=t.next;

if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger();}catch(l){e||(e=l);}

t=n;}}

if(e)throw e;}function yc(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t;}function pc(e){let t,n=e.depsTail,l=n;

for(;l;){const o=l.prevDep;l.version===-1?(l===n&&(n=o),ss(l),dm(l)):t=l,l.dep.activeLink=l.prevActiveLink,l.prevActiveLink=void 0,l=o;}

e.deps=t,e.depsTail=n;}function xi(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(bc(t.dep.computed)||t.dep.version!==t.version))return!0;

return!!e._dirty;}function bc(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===io)||(e.globalVersion=io,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!xi(e))))return;

e.flags|=2;const t=e.dep,n=Ne,l=Rt;Ne=e,Rt=!0;try{yc(e);const o=e.fn(e._value);(t.version===0||$n(o,e._value))&&(e.flags|=128,e._value=o,t.version++);}catch(o){throw t.version++,o;}finally{Ne=n,Rt=l,pc(e),e.flags&=-3;}}function ss(e,t=!1){const{dep:n,prevSub:l,nextSub:o}=e;

if(l&&(l.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=l,e.nextSub=void 0),n.subs===e&&(n.subs=l,!l&&n.computed)){n.computed.flags&=-5;

for(let a=n.computed.deps;a;a=a.nextDep)ss(a,!0);}

!t&&!--n.sc&&n.map&&n.map.delete(n.key);}function dm(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0);}let Rt=!0;const Sc=[];function wn(){Sc.push(Rt),Rt=!1;}function Cn(){const e=Sc.pop();Rt=e===void 0?!0:e;}function sr(e){const{cleanup:t}=e;

if(e.cleanup=void 0,t){const n=Ne;Ne=void 0;try{t();}finally{Ne=n;}}}let io=0;class fm{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0;}}class rs{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0;}track(t){if(!Ne||!Rt||Ne===this.computed)return;

let n=this.activeLink;

if(n===void 0||n.sub!==Ne)n=this.activeLink=new fm(Ne,this),Ne.deps?(n.prevDep=Ne.depsTail,Ne.depsTail.nextDep=n,Ne.depsTail=n):Ne.deps=Ne.depsTail=n,wc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const l=n.nextDep;l.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=l),n.prevDep=Ne.depsTail,n.nextDep=void 0,Ne.depsTail.nextDep=n,Ne.depsTail=n,Ne.deps===n&&(Ne.deps=l);}

return n;}trigger(t){this.version++,io++,this.notify(t);}notify(t){as();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify();}finally{is();}}}function wc(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;

if(t&&!e.dep.subs){t.flags|=20;

for(let l=t.deps;l;l=l.nextDep)wc(l);}

const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e;}}const Jo=new WeakMap,Zn=Symbol(''),ki=Symbol(''),so=Symbol('');function ct(e,t,n){if(Rt&&Ne){let l=Jo.get(e);l||Jo.set(e,l=new Map);let o=l.get(n);o||(l.set(n,o=new rs),o.map=l,o.key=n),o.track();}}function yn(e,t,n,l,o,a){const i=Jo.get(e);

if(!i){io++;

return;}

const s=r=>{r&&r.trigger();};

if(as(),t==='clear')i.forEach(s);else{const r=ve(e),u=r&&ka(n);

if(r&&n==='length'){const c=Number(l);i.forEach((d,f)=>{(f==='length'||f===so||!Ht(f)&&f>=c)&&s(d);});}else switch((n!==void 0||i.has(void 0))&&s(i.get(n)),u&&s(i.get(so)),t){case'add':r?u&&s(i.get('length')):(s(i.get(Zn)),Cl(e)&&s(i.get(ki)));break;case'delete':r||(s(i.get(Zn)),Cl(e)&&s(i.get(ki)));break;case'set':Cl(e)&&s(i.get(Zn));break;}}

is();}function vm(e,t){const n=Jo.get(e);

return n&&n.get(t);}function dl(e){const t=fe(e);

return t===e?t:(ct(t,'iterate',so),Tt(e)?t:t.map(Wt));}function Va(e){return ct(e=fe(e),'iterate',so),e;}function Mn(e,t){return xn(e)?Vl(Sn(e)?Wt(t):t):Wt(t);}const mm={__proto__:null,[Symbol.iterator](){return Qa(this,Symbol.iterator,e=>Mn(this,e));},concat(...e){return dl(this).concat(...e.map(t=>ve(t)?dl(t):t));},entries(){return Qa(this,'entries',e=>(e[1]=Mn(this,e[1]),e));},every(e,t){return fn(this,'every',e,t,void 0,arguments);},filter(e,t){return fn(this,'filter',e,t,n=>n.map(l=>Mn(this,l)),arguments);},find(e,t){return fn(this,'find',e,t,n=>Mn(this,n),arguments);},findIndex(e,t){return fn(this,'findIndex',e,t,void 0,arguments);},findLast(e,t){return fn(this,'findLast',e,t,n=>Mn(this,n),arguments);},findLastIndex(e,t){return fn(this,'findLastIndex',e,t,void 0,arguments);},forEach(e,t){return fn(this,'forEach',e,t,void 0,arguments);},includes(...e){return ei(this,'includes',e);},indexOf(...e){return ei(this,'indexOf',e);},join(e){return dl(this).join(e);},lastIndexOf(...e){return ei(this,'lastIndexOf',e);},map(e,t){return fn(this,'map',e,t,void 0,arguments);},pop(){return Hl(this,'pop');},push(...e){return Hl(this,'push',e);},reduce(e,...t){return rr(this,'reduce',e,t);},reduceRight(e,...t){return rr(this,'reduceRight',e,t);},shift(){return Hl(this,'shift');},some(e,t){return fn(this,'some',e,t,void 0,arguments);},splice(...e){return Hl(this,'splice',e);},toReversed(){return dl(this).toReversed();},toSorted(e){return dl(this).toSorted(e);},toSpliced(...e){return dl(this).toSpliced(...e);},unshift(...e){return Hl(this,'unshift',e);},values(){return Qa(this,'values',e=>Mn(this,e));}};function Qa(e,t,n){const l=Va(e),o=l[t]();

return l!==e&&!Tt(e)&&(o._next=o.next,o.next=()=>{const a=o._next();

return a.done||(a.value=n(a.value)),a;}),o;}const gm=Array.prototype;function fn(e,t,n,l,o,a){const i=Va(e),s=i!==e&&!Tt(e),r=i[t];

if(r!==gm[t]){const d=r.apply(e,a);

return s?Wt(d):d;}

let u=n;i!==e&&(s?u=function(d,f){return n.call(this,Mn(e,d),f,e);}:n.length>2&&(u=function(d,f){return n.call(this,d,f,e);}));const c=r.call(i,u,l);

return s&&o?o(c):c;}function rr(e,t,n,l){const o=Va(e);let a=n;

return o!==e&&(Tt(e)?n.length>3&&(a=function(i,s,r){return n.call(this,i,s,r,e);}):a=function(i,s,r){return n.call(this,i,Mn(e,s),r,e);}),o[t](a,...l);}function ei(e,t,n){const l=fe(e);ct(l,'iterate',so);const o=l[t](...n);

return(o===-1||o===!1)&&Ta(n[0])?(n[0]=fe(n[0]),l[t](...n)):o;}function Hl(e,t,n=[]){wn(),as();const l=fe(e)[t].apply(e,n);

return is(),Cn(),l;}const hm=es('__proto__,__v_isRef,__isVue'),Cc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=='arguments'&&e!=='caller').map(e=>Symbol[e]).filter(Ht));function ym(e){Ht(e)||(e=String(e));const t=fe(this);

return ct(t,'has',e),t.hasOwnProperty(e);}class xc{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n;}get(t,n,l){if(n==='__v_skip')return t.__v_skip;

const o=this._isReadonly,a=this._isShallow;

if(n==='__v_isReactive')return!o;

if(n==='__v_isReadonly')return o;

if(n==='__v_isShallow')return a;

if(n==='__v_raw')return l===(o?a?Vm:Vc:a?Ac:_c).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(l)?t:void 0;

const i=ve(t);

if(!o){let r;

if(i&&(r=mm[n]))return r;

if(n==='hasOwnProperty')return ym;}

const s=Reflect.get(t,n,He(t)?t:l);

if((Ht(n)?Cc.has(n):hm(n))||(o||ct(t,'get',n),a))return s;

if(He(s)){const r=i&&ka(n)?s:s.value;

return o&&Ee(r)?Al(r):r;}

return Ee(s)?o?Al(s):et(s):s;}}class kc extends xc{constructor(t=!1){super(!1,t);}set(t,n,l,o){let a=t[n];const i=ve(t)&&ka(n);

if(!this._isShallow){const u=xn(a);

if(!Tt(l)&&!xn(l)&&(a=fe(a),l=fe(l)),!i&&He(a)&&!He(l))return u||(a.value=l),!0;}

const s=i?Number(n)<t.length:Pe(t,n),r=Reflect.set(t,n,l,He(t)?t:o);

return t===fe(o)&&(s?$n(l,a)&&yn(t,'set',n,l):yn(t,'add',n,l)),r;}deleteProperty(t,n){const l=Pe(t,n);t[n];const o=Reflect.deleteProperty(t,n);

return o&&l&&yn(t,'delete',n,void 0),o;}has(t,n){const l=Reflect.has(t,n);

return(!Ht(n)||!Cc.has(n))&&ct(t,'has',n),l;}ownKeys(t){return ct(t,'iterate',ve(t)?'length':Zn),Reflect.ownKeys(t);}}class pm extends xc{constructor(t=!1){super(!0,t);}set(t,n){return!0;}deleteProperty(t,n){return!0;}}const bm=new kc,Sm=new pm,wm=new kc(!0);const _i=e=>e,Lo=e=>Reflect.getPrototypeOf(e);function Cm(e,t,n){return function(...l){const o=this.__v_raw,a=fe(o),i=Cl(a),s=e==='entries'||e===Symbol.iterator&&i,r=e==='keys'&&i,u=o[e](...l),c=n?_i:t?Vl:Wt;

return!t&&ct(a,'iterate',r?ki:Zn),Ze(Object.create(u),{next(){const{value:d,done:f}=u.next();

return f?{value:d,done:f}:{value:s?[c(d[0]),c(d[1])]:c(d),done:f};}});};}function Ro(e){return function(...t){return e==='delete'?!1:e==='clear'?void 0:this;};}function xm(e,t){const n={get(o){const a=this.__v_raw,i=fe(a),s=fe(o);e||($n(o,s)&&ct(i,'get',o),ct(i,'get',s));const{has:r}=Lo(i),u=t?_i:e?Vl:Wt;

if(r.call(i,o))return u(a.get(o));

if(r.call(i,s))return u(a.get(s));

a!==i&&a.get(o);},get size(){const o=this.__v_raw;

return!e&&ct(fe(o),'iterate',Zn),o.size;},has(o){const a=this.__v_raw,i=fe(a),s=fe(o);

return e||($n(o,s)&&ct(i,'has',o),ct(i,'has',s)),o===s?a.has(o):a.has(o)||a.has(s);},forEach(o,a){const i=this,s=i.__v_raw,r=fe(s),u=t?_i:e?Vl:Wt;

return!e&&ct(r,'iterate',Zn),s.forEach((c,d)=>o.call(a,u(c),u(d),i));}};

return Ze(n,e?{add:Ro('add'),set:Ro('set'),delete:Ro('delete'),clear:Ro('clear')}:{add(o){!t&&!Tt(o)&&!xn(o)&&(o=fe(o));const a=fe(this);

return Lo(a).has.call(a,o)||(a.add(o),yn(a,'add',o,o)),this;},set(o,a){!t&&!Tt(a)&&!xn(a)&&(a=fe(a));const i=fe(this),{has:s,get:r}=Lo(i);let u=s.call(i,o);u||(o=fe(o),u=s.call(i,o));const c=r.call(i,o);

return i.set(o,a),u?$n(a,c)&&yn(i,'set',o,a):yn(i,'add',o,a),this;},delete(o){const a=fe(this),{has:i,get:s}=Lo(a);let r=i.call(a,o);r||(o=fe(o),r=i.call(a,o)),s&&s.call(a,o);const u=a.delete(o);

return r&&yn(a,'delete',o,void 0),u;},clear(){const o=fe(this),a=o.size!==0,i=o.clear();

return a&&yn(o,'clear',void 0,void 0),i;}}),['keys','values','entries',Symbol.iterator].forEach(o=>{n[o]=Cm(o,e,t);}),n;}function us(e,t){const n=xm(e,t);

return(l,o,a)=>o==='__v_isReactive'?!e:o==='__v_isReadonly'?e:o==='__v_raw'?l:Reflect.get(Pe(n,o)&&o in l?n:l,o,a);}const km={get:us(!1,!1)},_m={get:us(!1,!0)},Am={get:us(!0,!1)};const _c=new WeakMap,Ac=new WeakMap,Vc=new WeakMap,Vm=new WeakMap;function Tm(e){switch(e){case'Object':case'Array':return 1;case'Map':case'Set':case'WeakMap':case'WeakSet':return 2;default:return 0;}}function Em(e){return e.__v_skip||!Object.isExtensible(e)?0:Tm(Qv(e));}function et(e){return xn(e)?e:cs(e,!1,bm,km,_c);}function Pm(e){return cs(e,!1,wm,_m,Ac);}function Al(e){return cs(e,!0,Sm,Am,Vc);}function cs(e,t,n,l,o){if(!Ee(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;

const a=Em(e);

if(a===0)return e;

const i=o.get(e);

if(i)return i;

const s=new Proxy(e,a===2?l:n);

return o.set(e,s),s;}function Sn(e){return xn(e)?Sn(e.__v_raw):!!(e&&e.__v_isReactive);}function xn(e){return!!(e&&e.__v_isReadonly);}function Tt(e){return!!(e&&e.__v_isShallow);}function Ta(e){return e?!!e.__v_raw:!1;}function fe(e){const t=e&&e.__v_raw;

return t?fe(t):e;}function ds(e){return!Pe(e,'__v_skip')&&Object.isExtensible(e)&&uc(e,'__v_skip',!0),e;}const Wt=e=>Ee(e)?et(e):e,Vl=e=>Ee(e)?Al(e):e;function He(e){return e?e.__v_isRef===!0:!1;}function L(e){return Tc(e,!1);}function le(e){return Tc(e,!0);}function Tc(e,t){return He(e)?e:new Im(e,t);}class Im{constructor(t,n){this.dep=new rs,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:fe(t),this._value=n?t:Wt(t),this.__v_isShallow=n;}get value(){return this.dep.track(),this._value;}set value(t){const n=this._rawValue,l=this.__v_isShallow||Tt(t)||xn(t);t=l?t:fe(t),$n(t,n)&&(this._rawValue=t,this._value=l?t:Wt(t),this.dep.trigger());}}function Me(e){return He(e)?e.value:e;}function lt(e){return pe(e)?e():Me(e);}const Fm={get:(e,t,n)=>t==='__v_raw'?e:Me(Reflect.get(e,t,n)),set:(e,t,n,l)=>{const o=e[t];

return He(o)&&!He(n)?(o.value=n,!0):Reflect.set(e,t,n,l);}};function Ec(e){return Sn(e)?e:new Proxy(e,Fm);}function fs(e){const t=ve(e)?new Array(e.length):{};

for(const n in e)t[n]=Pc(e,n);

return t;}class Om{constructor(t,n,l){this._object=t,this._key=n,this._defaultValue=l,this.__v_isRef=!0,this._value=void 0,this._raw=fe(t);let o=!0,a=t;

if(!ve(t)||!ka(String(n)))do o=!Ta(a)||Tt(a);while(o&&(a=a.__v_raw));

this._shallow=o;}get value(){let t=this._object[this._key];

return this._shallow&&(t=Me(t)),this._value=t===void 0?this._defaultValue:t;}set value(t){if(this._shallow&&He(this._raw[this._key])){const n=this._object[this._key];

if(He(n)){n.value=t;

return;}}

this._object[this._key]=t;}get dep(){return vm(this._raw,this._key);}}class Mm{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0;}get value(){return this._value=this._getter();}}function O(e,t,n){return He(e)?e:pe(e)?new Mm(e):Ee(e)&&arguments.length>1?Pc(e,t,n):L(e);}function Pc(e,t,n){return new Om(e,t,n);}class Dm{constructor(t,n,l){this.fn=t,this.setter=n,this._value=void 0,this.dep=new rs(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=io-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=l;}notify(){if(this.flags|=16,!(this.flags&8)&&Ne!==this)return hc(this,!0),!0;}get value(){const t=this.dep.track();

return bc(this),t&&(t.version=this.dep.version),this._value;}set value(t){this.setter&&this.setter(t);}}function $m(e,t,n=!1){let l,o;

return pe(e)?l=e:(l=e.get,o=e.set),new Dm(l,o,n);}const No={},Qo=new WeakMap;let Yn;function Bm(e,t=!1,n=Yn){if(n){let l=Qo.get(n);l||Qo.set(n,l=[]),l.push(e);}}function Lm(e,t,n=De){const{immediate:l,deep:o,once:a,scheduler:i,augmentJob:s,call:r}=n,u=y=>o?y:Tt(y)||o===!1||o===0?pn(y,1):pn(y);let c,d,f,m,v=!1,g=!1;

if(He(e)?(d=()=>e.value,v=Tt(e)):Sn(e)?(d=()=>u(e),v=!0):ve(e)?(g=!0,v=e.some(y=>Sn(y)||Tt(y)),d=()=>e.map(y=>{if(He(y))return y.value;

if(Sn(y))return u(y);

if(pe(y))return r?r(y,2):y();})):pe(e)?t?d=r?()=>r(e,2):e:d=()=>{if(f){wn();try{f();}finally{Cn();}}

const y=Yn;Yn=c;try{return r?r(e,3,[m]):e(m);}finally{Yn=y;}}:d=sn,t&&o){const y=d,_=o===!0?1/0:o;d=()=>pn(y(),_);}

const p=os(),b=()=>{c.stop(),p&&p.active&&ns(p.effects,c);};

if(a&&t){const y=t;t=(..._)=>{y(..._),b();};}

let S=g?new Array(e.length).fill(No):No;const w=y=>{if(!(!(c.flags&1)||!c.dirty&&!y)){if(t){const _=c.run();

if(o||v||(g?_.some((k,I)=>$n(k,S[I])):$n(_,S))){f&&f();const k=Yn;Yn=c;try{const I=[_,S===No?void 0:g&&S[0]===No?[]:S,m];S=_,r?r(t,3,I):t(...I);}finally{Yn=k;}}}else c.run();}};

return s&&s(w),c=new mc(d),c.scheduler=i?()=>i(w,!1):w,m=y=>Bm(y,!1,c),f=c.onStop=()=>{const y=Qo.get(c);

if(y){if(r)r(y,4);else for(const _ of y)_();

Qo.delete(c);}},t?l?w(!0):S=c.run():i?i(w.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b;}function pn(e,t=1/0,n){if(t<=0||!Ee(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;

if(n.set(e,t),t--,He(e))pn(e.value,t,n);else if(ve(e))for(let l=0;l<e.length;l++)pn(e[l],t,n);else if(ac(e)||Cl(e))e.forEach(l=>{pn(l,t,n);});else if(rc(e)){for(const l in e)pn(e[l],t,n);

for(const l of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,l)&&pn(e[l],t,n);}

return e;}function ko(e,t,n,l){try{return l?e(...l):e();}catch(o){Ea(o,t,n);}}function jt(e,t,n,l){if(pe(e)){const o=ko(e,t,n,l);

return o&&ic(o)&&o.catch(a=>{Ea(a,t,n);}),o;}

if(ve(e)){const o=[];

for(let a=0;a<e.length;a++)o.push(jt(e[a],t,n,l));

return o;}}function Ea(e,t,n,l=!0){const o=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||De;

if(t){let s=t.parent;const r=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;

for(;s;){const c=s.ec;

if(c){for(let d=0;d<c.length;d++)if(c[d](e,r,u)===!1)return;}

s=s.parent;}

if(a){wn(),ko(a,null,10,[e,r,u]),Cn();

return;}}

Rm(e,n,o,l,i);}function Rm(e,t,n,l=!0,o=!1){if(o)throw e;

console.error(e);}const gt=[];let nn=-1;const xl=[];let Dn=null,hl=0;const Ic=Promise.resolve();let ea=null;function Be(e){const t=ea||Ic;

return e?t.then(this?e.bind(this):e):t;}function Nm(e){let t=nn+1,n=gt.length;

for(;t<n;){const l=t+n>>>1,o=gt[l],a=ro(o);a<e||a===e&&o.flags&2?t=l+1:n=l;}

return t;}function vs(e){if(!(e.flags&1)){const t=ro(e),n=gt[gt.length-1];!n||!(e.flags&2)&&t>=ro(n)?gt.push(e):gt.splice(Nm(t),0,e),e.flags|=1,Fc();}}function Fc(){ea||(ea=Ic.then(Mc));}function zm(e){ve(e)?xl.push(...e):Dn&&e.id===-1?Dn.splice(hl+1,0,e):e.flags&1||(xl.push(e),e.flags|=1),Fc();}function ur(e,t,n=nn+1){for(;n<gt.length;n++){const l=gt[n];

if(l&&l.flags&2){if(e&&l.id!==e.uid)continue;

gt.splice(n,1),n--,l.flags&4&&(l.flags&=-2),l(),l.flags&4||(l.flags&=-2);}}}function Oc(e){if(xl.length){const t=[...new Set(xl)].sort((n,l)=>ro(n)-ro(l));

if(xl.length=0,Dn){Dn.push(...t);

return;}

for(Dn=t,hl=0;hl<Dn.length;hl++){const n=Dn[hl];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2;}

Dn=null,hl=0;}}const ro=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Mc(e){try{for(nn=0;nn<gt.length;nn++){const t=gt[nn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),ko(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2));}}finally{for(;nn<gt.length;nn++){const t=gt[nn];t&&(t.flags&=-2);}

nn=-1,gt.length=0,Oc(),ea=null,(gt.length||xl.length)&&Mc();}}let it=null,Dc=null;function ta(e){const t=it;

return it=e,Dc=e&&e.type.__scopeId||null,t;}function H(e,t=it,n){if(!t||e._n)return e;

const l=(...o)=>{l._d&&oa(-1);const a=ta(t);let i;try{i=e(...o);}finally{ta(a),l._d&&oa(1);}

return i;};

return l._n=!0,l._c=!0,l._d=!0,l;}function st(e,t){if(it===null)return e;

const n=Ma(it),l=e.dirs||(e.dirs=[]);

for(let o=0;o<t.length;o++){let[a,i,s,r=De]=t[o];a&&(pe(a)&&(a={mounted:a,updated:a}),a.deep&&pn(i),l.push({dir:a,instance:n,value:i,oldValue:void 0,arg:s,modifiers:r}));}

return e;}function Wn(e,t,n,l){const o=e.dirs,a=t&&t.dirs;

for(let i=0;i<o.length;i++){const s=o[i];a&&(s.oldValue=a[i].value);let r=s.dir[l];r&&(wn(),jt(r,n,8,[e.el,s,e,t]),Cn());}}function vt(e,t){if(dt){let n=dt.provides;const l=dt.parent&&dt.parent.provides;l===n&&(n=dt.provides=Object.create(l)),n[e]=t;}}function Ie(e,t,n=!1){const l=Dl();

if(l||Jn){let o=Jn?Jn._context.provides:l?l.parent==null||l.ce?l.vnode.appContext&&l.vnode.appContext.provides:l.parent.provides:void 0;

if(o&&e in o)return o[e];

if(arguments.length>1)return n&&pe(t)?t.call(l&&l.proxy):t;}}function Hm(){return!!(Dl()||Jn);}const Wm=Symbol.for('v-scx'),jm=()=>Ie(Wm);function Ct(e,t){return ms(e,null,t);}function ie(e,t,n){return ms(e,t,n);}function ms(e,t,n=De){const{immediate:l,deep:o,flush:a,once:i}=n,s=Ze({},n),r=t&&l||!t&&a!=='post';let u;

if(fo){if(a==='sync'){const m=jm();u=m.__watcherHandles||(m.__watcherHandles=[]);}else if(!r){const m=()=>{};

return m.stop=sn,m.resume=sn,m.pause=sn,m;}}

const c=dt;s.call=(m,v,g)=>jt(m,c,v,g);let d=!1;a==='post'?s.scheduler=m=>{rt(m,c&&c.suspense);}:a!=='sync'&&(d=!0,s.scheduler=(m,v)=>{v?m():vs(m);}),s.augmentJob=m=>{t&&(m.flags|=4),d&&(m.flags|=2,c&&(m.id=c.uid,m.i=c));};const f=Lm(e,t,s);

return fo&&(u?u.push(f):r&&f()),f;}function Um(e,t,n){const l=this.proxy,o=Ke(e)?e.includes('.')?$c(l,e):()=>l[e]:e.bind(l,l);let a;pe(t)?a=t:(a=t.handler,n=t);const i=Vo(this),s=ms(o,a.bind(l),n);

return i(),s;}function $c(e,t){const n=t.split('.');

return()=>{let l=e;

for(let o=0;o<n.length&&l;o++)l=l[n[o]];

return l;};}const Bc=Symbol('_vte'),Lc=e=>e.__isTeleport,Zl=e=>e&&(e.disabled||e.disabled===''),cr=e=>e&&(e.defer||e.defer===''),dr=e=>typeof SVGElement<'u'&&e instanceof SVGElement,fr=e=>typeof MathMLElement=='function'&&e instanceof MathMLElement,Ai=(e,t)=>{const n=e&&e.to;

return Ke(n)?t?t(n):null:n;},Rc={name:'Teleport',__isTeleport:!0,process(e,t,n,l,o,a,i,s,r,u){const{mc:c,pc:d,pbc:f,o:{insert:m,querySelector:v,createText:g,createComment:p}}=u,b=Zl(t.props);let{shapeFlag:S,children:w,dynamicChildren:y}=t;

if(e==null){const _=t.el=g(''),k=t.anchor=g('');m(_,n,l),m(k,n,l);const I=(E,M)=>{S&16&&c(w,E,M,o,a,i,s,r);},x=()=>{const E=t.target=Ai(t.props,v),M=Vi(E,t,g,m);E&&(i!=='svg'&&dr(E)?i='svg':i!=='mathml'&&fr(E)&&(i='mathml'),o&&o.isCE&&(o.ce._teleportTargets||(o.ce._teleportTargets=new Set)).add(E),b||(I(E,M),Go(t,!1)));};b&&(I(n,k),Go(t,!0)),cr(t.props)?(t.el.__isMounted=!1,rt(()=>{x(),delete t.el.__isMounted;},a)):x();}else{if(cr(t.props)&&e.el.__isMounted===!1){rt(()=>{Rc.process(e,t,n,l,o,a,i,s,r,u);},a);

return;}

t.el=e.el,t.targetStart=e.targetStart;const _=t.anchor=e.anchor,k=t.target=e.target,I=t.targetAnchor=e.targetAnchor,x=Zl(e.props),E=x?n:k,M=x?_:I;

if(i==='svg'||dr(k)?i='svg':(i==='mathml'||fr(k))&&(i='mathml'),y?(f(e.dynamicChildren,y,E,o,a,i,s),Ss(e,t,!0)):r||d(e,t,E,M,o,a,i,s,!1),b)x?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):zo(t,n,_,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const z=t.target=Ai(t.props,v);z&&zo(t,z,null,u,0);}else x&&zo(t,k,I,u,1);

Go(t,b);}},remove(e,t,n,{um:l,o:{remove:o}},a){const{shapeFlag:i,children:s,anchor:r,targetStart:u,targetAnchor:c,target:d,props:f}=e;

if(d&&(o(u),o(c)),a&&o(r),i&16){const m=a||!Zl(f);

for(let v=0;v<s.length;v++){const g=s[v];l(g,t,n,m,!!g.dynamicChildren);}}},move:zo,hydrate:Km};function zo(e,t,n,{o:{insert:l},m:o},a=2){a===0&&l(e.targetAnchor,t,n);const{el:i,anchor:s,shapeFlag:r,children:u,props:c}=e,d=a===2;

if(d&&l(i,t,n),(!d||Zl(c))&&r&16)for(let f=0;f<u.length;f++)o(u[f],t,n,2);

d&&l(s,t,n);}function Km(e,t,n,l,o,a,{o:{nextSibling:i,parentNode:s,querySelector:r,insert:u,createText:c}},d){function f(p,b){let S=b;

for(;S;){if(S&&S.nodeType===8){if(S.data==='teleport start anchor')t.targetStart=S;else if(S.data==='teleport anchor'){t.targetAnchor=S,p._lpa=t.targetAnchor&&i(t.targetAnchor);break;}}

S=i(S);}}function m(p,b){b.anchor=d(i(p),b,s(p),n,l,o,a);}const v=t.target=Ai(t.props,r),g=Zl(t.props);

if(v){const p=v._lpa||v.firstChild;t.shapeFlag&16&&(g?(m(e,t),f(v,p),t.targetAnchor||Vi(v,t,c,u,s(e)===v?e:null)):(t.anchor=i(e),f(v,p),t.targetAnchor||Vi(v,t,c,u),d(p&&i(p),t,v,n,l,o,a))),Go(t,g);}else g&&t.shapeFlag&16&&(m(e,t),t.targetStart=e,t.targetAnchor=i(e));

return t.anchor&&i(t.anchor);}const Nc=Rc;function Go(e,t){const n=e.ctx;

if(n&&n.ut){let l,o;

for(t?(l=e.el,o=e.anchor):(l=e.targetStart,o=e.targetAnchor);l&&l!==o;)l.nodeType===1&&l.setAttribute('data-v-owner',n.uid),l=l.nextSibling;

n.ut();}}function Vi(e,t,n,l,o=null){const a=t.targetStart=n(''),i=t.targetAnchor=n('');

return a[Bc]=i,e&&(l(a,e,o),l(i,e,o)),i;}const ln=Symbol('_leaveCb'),Wl=Symbol('_enterCb');function zc(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};

return Yt(()=>{e.isMounted=!0;}),yt(()=>{e.isUnmounting=!0;}),e;}const Ft=[Function,Array],Hc={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ft,onEnter:Ft,onAfterEnter:Ft,onEnterCancelled:Ft,onBeforeLeave:Ft,onLeave:Ft,onAfterLeave:Ft,onLeaveCancelled:Ft,onBeforeAppear:Ft,onAppear:Ft,onAfterAppear:Ft,onAppearCancelled:Ft},Wc=e=>{const t=e.subTree;

return t.component?Wc(t.component):t;},Gm={name:'BaseTransition',props:Hc,setup(e,{slots:t}){const n=Dl(),l=zc();

return()=>{const o=t.default&&gs(t.default(),!0);

if(!o||!o.length)return;

const a=jc(o),i=fe(e),{mode:s}=i;

if(l.isLeaving)return ti(a);

const r=vr(a);

if(!r)return ti(a);

let u=uo(r,i,l,n,d=>u=d);r.type!==at&&ll(r,u);let c=n.subTree&&vr(n.subTree);

if(c&&c.type!==at&&!qn(c,r)&&Wc(n).type!==at){let d=uo(c,i,l,n);

if(ll(c,d),s==='out-in'&&r.type!==at)return l.isLeaving=!0,d.afterLeave=()=>{l.isLeaving=!1,n.job.flags&8||n.update(),delete d.afterLeave,c=void 0;},ti(a);

s==='in-out'&&r.type!==at?d.delayLeave=(f,m,v)=>{const g=Uc(l,c);g[String(c.key)]=c,f[ln]=()=>{m(),f[ln]=void 0,delete u.delayedLeave,c=void 0;},u.delayedLeave=()=>{v(),delete u.delayedLeave,c=void 0;};}:c=void 0;}else c&&(c=void 0);

return a;};}};function jc(e){let t=e[0];

if(e.length>1){for(const n of e)if(n.type!==at){t=n;break;}}

return t;}const Ym=Gm;function Uc(e,t){const{leavingVNodes:n}=e;let l=n.get(t.type);

return l||(l=Object.create(null),n.set(t.type,l)),l;}function uo(e,t,n,l,o){const{appear:a,mode:i,persisted:s=!1,onBeforeEnter:r,onEnter:u,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:f,onLeave:m,onAfterLeave:v,onLeaveCancelled:g,onBeforeAppear:p,onAppear:b,onAfterAppear:S,onAppearCancelled:w}=t,y=String(e.key),_=Uc(n,e),k=(E,M)=>{E&&jt(E,l,9,M);},I=(E,M)=>{const z=M[1];k(E,M),ve(E)?E.every(P=>P.length<=1)&&z():E.length<=1&&z();},x={mode:i,persisted:s,beforeEnter(E){let M=r;

if(!n.isMounted)if(a)M=p||r;else return;

E[ln]&&E[ln](!0);const z=_[y];z&&qn(e,z)&&z.el[ln]&&z.el[ln](),k(M,[E]);},enter(E){let M=u,z=c,P=d;

if(!n.isMounted)if(a)M=b||u,z=S||c,P=w||d;else return;

let $=!1;E[Wl]=Y=>{$||($=!0,Y?k(P,[E]):k(z,[E]),x.delayedLeave&&x.delayedLeave(),E[Wl]=void 0);};const U=E[Wl].bind(null,!1);M?I(M,[E,U]):U();},leave(E,M){const z=String(e.key);

if(E[Wl]&&E[Wl](!0),n.isUnmounting)return M();

k(f,[E]);let P=!1;E[ln]=U=>{P||(P=!0,M(),U?k(g,[E]):k(v,[E]),E[ln]=void 0,_[z]===e&&delete _[z]);};const $=E[ln].bind(null,!1);_[z]=e,m?I(m,[E,$]):$();},clone(E){const M=uo(E,t,n,l,o);

return o&&o(M),M;}};

return x;}function ti(e){if(Pa(e))return e=kn(e),e.children=null,e;}function vr(e){if(!Pa(e))return Lc(e.type)&&e.children?jc(e.children):e;

if(e.component)return e.component.subTree;

const{shapeFlag:t,children:n}=e;

if(n){if(t&16)return n[0];

if(t&32&&pe(n.default))return n.default();}}function ll(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ll(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function gs(e,t=!1,n){let l=[],o=0;

for(let a=0;a<e.length;a++){let i=e[a];const s=n==null?i.key:String(n)+String(i.key!=null?i.key:a);i.type===ke?(i.patchFlag&128&&o++,l=l.concat(gs(i.children,t,s))):(t||i.type!==at)&&l.push(s!=null?kn(i,{key:s}):i);}

if(o>1)for(let a=0;a<l.length;a++)l[a].patchFlag=-2;

return l;}function Je(e,t){return pe(e)?Ze({name:e.name},t,{setup:e}):e;}function Gt(){const e=Dl();

return e?(e.appContext.config.idPrefix||'v')+'-'+e.ids[0]+e.ids[1]++:'';}function Kc(e){e.ids=[e.ids[0]+e.ids[2]+++'-',0,0];}function mr(e,t){let n;

return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable);}const na=new WeakMap;function Jl(e,t,n,l,o=!1){if(ve(e)){e.forEach((g,p)=>Jl(g,t&&(ve(t)?t[p]:t),n,l,o));

return;}

if(kl(l)&&!o){l.shapeFlag&512&&l.type.__asyncResolved&&l.component.subTree.component&&Jl(e,t,n,l.component.subTree);

return;}

const a=l.shapeFlag&4?Ma(l.component):l.el,i=o?null:a,{i:s,r}=e,u=t&&t.r,c=s.refs===De?s.refs={}:s.refs,d=s.setupState,f=fe(d),m=d===De?oc:g=>mr(c,g)?!1:Pe(f,g),v=(g,p)=>!(p&&mr(c,p));

if(u!=null&&u!==r){if(gr(t),Ke(u))c[u]=null,m(u)&&(d[u]=null);else if(He(u)){const g=t;v(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null);}}

if(pe(r))ko(r,s,12,[i,c]);else{const g=Ke(r),p=He(r);

if(g||p){const b=()=>{if(e.f){const S=g?m(r)?d[r]:c[r]:v()||!e.k?r.value:c[e.k];

if(o)ve(S)&&ns(S,a);else if(ve(S))S.includes(a)||S.push(a);else if(g)c[r]=[a],m(r)&&(d[r]=c[r]);else{const w=[a];v(r,e.k)&&(r.value=w),e.k&&(c[e.k]=w);}}else g?(c[r]=i,m(r)&&(d[r]=i)):p&&(v(r,e.k)&&(r.value=i),e.k&&(c[e.k]=i));};

if(i){const S=()=>{b(),na.delete(e);};S.id=-1,na.set(e,S),rt(S,n);}else gr(e),b();}}}function gr(e){const t=na.get(e);t&&(t.flags|=8,na.delete(e));}Aa().requestIdleCallback;Aa().cancelIdleCallback;const kl=e=>!!e.type.__asyncLoader,Pa=e=>e.type.__isKeepAlive;function Gc(e,t){Yc(e,'a',t);}function hs(e,t){Yc(e,'da',t);}function Yc(e,t,n=dt){const l=e.__wdc||(e.__wdc=()=>{let o=n;

for(;o;){if(o.isDeactivated)return;

o=o.parent;}

return e();});

if(Ia(t,l,n),n){let o=n.parent;

for(;o&&o.parent;)Pa(o.parent.vnode)&&qm(l,t,n,o),o=o.parent;}}function qm(e,t,n,l){const o=Ia(t,e,l,!0);Fa(()=>{ns(l[t],o);},n);}function Ia(e,t,n=dt,l=!1){if(n){const o=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...i)=>{wn();const s=Vo(n),r=jt(t,n,e,i);

return s(),Cn(),r;});

return l?o.unshift(a):o.push(a),a;}}const Vn=e=>(t,n=dt)=>{(!fo||e==='sp')&&Ia(e,(...l)=>t(...l),n);},_o=Vn('bm'),Yt=Vn('m'),Xm=Vn('bu'),ys=Vn('u'),yt=Vn('bum'),Fa=Vn('um'),Zm=Vn('sp'),Jm=Vn('rtg'),Qm=Vn('rtc');function eg(e,t=dt){Ia('ec',e,t);}const qc='components';function nt(e,t){return Xc(qc,e,!0,t)||e;}const tg=Symbol.for('v-ndc');function ng(e){return Ke(e)&&Xc(qc,e,!1)||e;}function Xc(e,t,n=!0,l=!1){const o=it||dt;

if(o){const a=o.type;{const s=Ng(a,!1);

if(s&&(s===t||s===ht(t)||s===An(ht(t))))return a;}const i=hr(o[e]||a[e],t)||hr(o.appContext[e],t);

return!i&&l?a:i;}}function hr(e,t){return e&&(e[t]||e[ht(t)]||e[An(ht(t))]);}function lg(e,t,n,l){let o;const a=n,i=ve(e);

if(i||Ke(e)){const s=i&&Sn(e);let r=!1,u=!1;s&&(r=!Tt(e),u=xn(e),e=Va(e)),o=new Array(e.length);

for(let c=0,d=e.length;c<d;c++)o[c]=t(r?u?Vl(Wt(e[c])):Wt(e[c]):e[c],c,void 0,a);}else if(typeof e=='number'){o=new Array(e);

for(let s=0;s<e;s++)o[s]=t(s+1,s,void 0,a);}else if(Ee(e)){if(e[Symbol.iterator])o=Array.from(e,(s,r)=>t(s,r,void 0,a));else{const s=Object.keys(e);o=new Array(s.length);

for(let r=0,u=s.length;r<u;r++){const c=s[r];o[r]=t(e[c],c,r,a);}}}else o=[];

return o;}function Ml(e,t){for(let n=0;n<t.length;n++){const l=t[n];

if(ve(l))for(let o=0;o<l.length;o++)e[l[o].name]=l[o].fn;else {l&&(e[l.name]=l.key?(...o)=>{const a=l.fn(...o);

return a&&(a.key=l.key),a;}:l.fn);}}

return e;}function Pt(e,t,n={},l,o){if(it.ce||it.parent&&kl(it.parent)&&it.parent.ce){const u=Object.keys(n).length>0;

return t!=='default'&&(n.name=t),Ve(),$e(ke,null,[h('slot',n,l&&l())],u?-2:64);}

let a=e[t];a&&a._c&&(a._d=!1),Ve();const i=a&&Zc(a(n)),s=n.key||i&&i.key,r=$e(ke,{key:(s&&!Ht(s)?s:`_${t}`)+(!i&&l?'_fb':'')},i||(l?l():[]),i&&e._===1?64:-2);

return!o&&r.scopeId&&(r.slotScopeIds=[r.scopeId+'-s']),a&&a._c&&(a._d=!0),r;}function Zc(e){return e.some(t=>Tl(t)?!(t.type===at||t.type===ke&&!Zc(t.children)):!0)?e:null;}const Ti=e=>e?hd(e)?Ma(e):Ti(e.parent):null,Ql=Ze(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ti(e.parent),$root:e=>Ti(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Qc(e),$forceUpdate:e=>e.f||(e.f=()=>{vs(e.update);}),$nextTick:e=>e.n||(e.n=Be.bind(e.proxy)),$watch:e=>Um.bind(e)}),ni=(e,t)=>e!==De&&!e.__isScriptSetup&&Pe(e,t),og={get({_:e},t){if(t==='__v_skip')return!0;

const{ctx:n,setupState:l,data:o,props:a,accessCache:i,type:s,appContext:r}=e;

if(t[0]!=='$'){const f=i[t];

if(f!==void 0)switch(f){case 1:return l[t];case 2:return o[t];case 4:return n[t];case 3:return a[t];}else{if(ni(l,t))return i[t]=1,l[t];

if(o!==De&&Pe(o,t))return i[t]=2,o[t];

if(Pe(a,t))return i[t]=3,a[t];

if(n!==De&&Pe(n,t))return i[t]=4,n[t];

Ei&&(i[t]=0);}}

const u=Ql[t];let c,d;

if(u)return t==='$attrs'&&ct(e.attrs,'get',''),u(e);

if((c=s.__cssModules)&&(c=c[t]))return c;

if(n!==De&&Pe(n,t))return i[t]=4,n[t];

if(d=r.config.globalProperties,Pe(d,t))return d[t];},set({_:e},t,n){const{data:l,setupState:o,ctx:a}=e;

return ni(o,t)?(o[t]=n,!0):l!==De&&Pe(l,t)?(l[t]=n,!0):Pe(e.props,t)||t[0]==='$'&&t.slice(1)in e?!1:(a[t]=n,!0);},has({_:{data:e,setupState:t,accessCache:n,ctx:l,appContext:o,props:a,type:i}},s){let r;

return!!(n[s]||e!==De&&s[0]!=='$'&&Pe(e,s)||ni(t,s)||Pe(a,s)||Pe(l,s)||Pe(Ql,s)||Pe(o.config.globalProperties,s)||(r=i.__cssModules)&&r[s]);},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Pe(n,'value')&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n);}};function yr(e){return ve(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e;}let Ei=!0;function ag(e){const t=Qc(e),n=e.proxy,l=e.ctx;Ei=!1,t.beforeCreate&&pr(t.beforeCreate,e,'bc');const{data:o,computed:a,methods:i,watch:s,provide:r,inject:u,created:c,beforeMount:d,mounted:f,beforeUpdate:m,updated:v,activated:g,deactivated:p,beforeDestroy:b,beforeUnmount:S,destroyed:w,unmounted:y,render:_,renderTracked:k,renderTriggered:I,errorCaptured:x,serverPrefetch:E,expose:M,inheritAttrs:z,components:P,directives:$,filters:U}=t;

if(u&&ig(u,l,null),i)for(const ee in i){const te=i[ee];pe(te)&&(l[ee]=te.bind(n));}

if(o){const ee=o.call(n,n);Ee(ee)&&(e.data=et(ee));}

if(Ei=!0,a)for(const ee in a){const te=a[ee],Se=pe(te)?te.bind(n,n):pe(te.get)?te.get.bind(n,n):sn,J=!pe(te)&&pe(te.set)?te.set.bind(n):sn,ue=V({get:Se,set:J});Object.defineProperty(l,ee,{enumerable:!0,configurable:!0,get:()=>ue.value,set:R=>ue.value=R});}

if(s)for(const ee in s)Jc(s[ee],l,n,ee);

if(r){const ee=pe(r)?r.call(n):r;Reflect.ownKeys(ee).forEach(te=>{vt(te,ee[te]);});}

c&&pr(c,e,'c');function oe(ee,te){ve(te)?te.forEach(Se=>ee(Se.bind(n))):te&&ee(te.bind(n));}

if(oe(_o,d),oe(Yt,f),oe(Xm,m),oe(ys,v),oe(Gc,g),oe(hs,p),oe(eg,x),oe(Qm,k),oe(Jm,I),oe(yt,S),oe(Fa,y),oe(Zm,E),ve(M))if(M.length){const ee=e.exposed||(e.exposed={});M.forEach(te=>{Object.defineProperty(ee,te,{get:()=>n[te],set:Se=>n[te]=Se,enumerable:!0});});}else e.exposed||(e.exposed={});

_&&e.render===sn&&(e.render=_),z!=null&&(e.inheritAttrs=z),P&&(e.components=P),$&&(e.directives=$),E&&Kc(e);}function ig(e,t,n=sn){ve(e)&&(e=Pi(e));

for(const l in e){const o=e[l];let a;Ee(o)?'default'in o?a=Ie(o.from||l,o.default,!0):a=Ie(o.from||l):a=Ie(o),He(a)?Object.defineProperty(t,l,{enumerable:!0,configurable:!0,get:()=>a.value,set:i=>a.value=i}):t[l]=a;}}function pr(e,t,n){jt(ve(e)?e.map(l=>l.bind(t.proxy)):e.bind(t.proxy),t,n);}function Jc(e,t,n,l){let o=l.includes('.')?$c(n,l):()=>n[l];

if(Ke(e)){const a=t[e];pe(a)&&ie(o,a);}else if(pe(e))ie(o,e.bind(n));else if(Ee(e))if(ve(e))e.forEach(a=>Jc(a,t,n,l));else{const a=pe(e.handler)?e.handler.bind(n):t[e.handler];pe(a)&&ie(o,a,e);}}function Qc(e){const t=e.type,{mixins:n,extends:l}=t,{mixins:o,optionsCache:a,config:{optionMergeStrategies:i}}=e.appContext,s=a.get(t);let r;

return s?r=s:!o.length&&!n&&!l?r=t:(r={},o.length&&o.forEach(u=>la(r,u,i,!0)),la(r,t,i)),Ee(t)&&a.set(t,r),r;}function la(e,t,n,l=!1){const{mixins:o,extends:a}=t;a&&la(e,a,n,!0),o&&o.forEach(i=>la(e,i,n,!0));

for(const i in t)if(!(l&&i==='expose')){const s=sg[i]||n&&n[i];e[i]=s?s(e[i],t[i]):t[i];}

return e;}const sg={data:br,props:Sr,emits:Sr,methods:Gl,computed:Gl,beforeCreate:mt,created:mt,beforeMount:mt,mounted:mt,beforeUpdate:mt,updated:mt,beforeDestroy:mt,beforeUnmount:mt,destroyed:mt,unmounted:mt,activated:mt,deactivated:mt,errorCaptured:mt,serverPrefetch:mt,components:Gl,directives:Gl,watch:ug,provide:br,inject:rg};function br(e,t){return t?e?function(){return Ze(pe(e)?e.call(this,this):e,pe(t)?t.call(this,this):t);}:t:e;}function rg(e,t){return Gl(Pi(e),Pi(t));}function Pi(e){if(ve(e)){const t={};

for(let n=0;n<e.length;n++)t[e[n]]=e[n];

return t;}

return e;}function mt(e,t){return e?[...new Set([].concat(e,t))]:t;}function Gl(e,t){return e?Ze(Object.create(null),e,t):t;}function Sr(e,t){return e?ve(e)&&ve(t)?[...new Set([...e,...t])]:Ze(Object.create(null),yr(e),yr(t??{})):t;}function ug(e,t){if(!e)return t;

if(!t)return e;

const n=Ze(Object.create(null),e);

for(const l in t)n[l]=mt(e[l],t[l]);

return n;}function ed(){return{app:null,config:{isNativeTag:oc,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap};}let cg=0;function dg(e,t){return function(l,o=null){pe(l)||(l=Ze({},l)),o!=null&&!Ee(o)&&(o=null);const a=ed(),i=new WeakSet,s=[];let r=!1;const u=a.app={_uid:cg++,_component:l,_props:o,_container:null,_context:a,_instance:null,version:Hg,get config(){return a.config;},set config(c){},use(c,...d){return i.has(c)||(c&&pe(c.install)?(i.add(c),c.install(u,...d)):pe(c)&&(i.add(c),c(u,...d))),u;},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u;},component(c,d){return d?(a.components[c]=d,u):a.components[c];},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c];},mount(c,d,f){if(!r){const m=u._ceVNode||h(l,o);

return m.appContext=a,f===!0?f='svg':f===!1&&(f=void 0),e(m,c,f),r=!0,u._container=c,c.__vue_app__=u,Ma(m.component);}},onUnmount(c){s.push(c);},unmount(){r&&(jt(s,u._instance,16),e(null,u._container),delete u._container.__vue_app__);},provide(c,d){return a.provides[c]=d,u;},runWithContext(c){const d=Jn;Jn=u;try{return c();}finally{Jn=d;}}};

return u;};}let Jn=null;const fg=(e,t)=>t==='modelValue'||t==='model-value'?e.modelModifiers:e[`${t}Modifiers`]||e[`${ht(t)}Modifiers`]||e[`${ul(t)}Modifiers`];function vg(e,t,...n){if(e.isUnmounted)return;

const l=e.vnode.props||De;let o=n;const a=t.startsWith('update:'),i=a&&fg(l,t.slice(7));i&&(i.trim&&(o=n.map(c=>Ke(c)?c.trim():c)),i.number&&(o=n.map(nm)));let s,r=l[s=qa(t)]||l[s=qa(ht(t))];!r&&a&&(r=l[s=qa(ul(t))]),r&&jt(r,e,6,o);const u=l[s+'Once'];

if(u){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;

e.emitted[s]=!0,jt(u,e,6,o);}}const mg=new WeakMap;function td(e,t,n=!1){const l=n?mg:t.emitsCache,o=l.get(e);

if(o!==void 0)return o;

const a=e.emits;let i={},s=!1;

if(!pe(e)){const r=u=>{const c=td(u,t,!0);c&&(s=!0,Ze(i,c));};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r);}

return!a&&!s?(Ee(e)&&l.set(e,null),null):(ve(a)?a.forEach(r=>i[r]=null):Ze(i,a),Ee(e)&&l.set(e,i),i);}function Oa(e,t){return!e||!xa(t)?!1:(t=t.slice(2).replace(/Once$/,''),Pe(e,t[0].toLowerCase()+t.slice(1))||Pe(e,ul(t))||Pe(e,t));}function wr(e){const{type:t,vnode:n,proxy:l,withProxy:o,propsOptions:[a],slots:i,attrs:s,emit:r,render:u,renderCache:c,props:d,data:f,setupState:m,ctx:v,inheritAttrs:g}=e,p=ta(e);let b,S;try{if(n.shapeFlag&4){const y=o||l,_=y;b=on(u.call(_,y,c,d,m,f,v)),S=s;}else{const y=t;b=on(y.length>1?y(d,{attrs:s,slots:i,emit:r}):y(d,null)),S=t.props?s:gg(s);}}catch(y){eo.length=0,Ea(y,e,1),b=h(at);}let w=b;

if(S&&g!==!1){const y=Object.keys(S),{shapeFlag:_}=w;y.length&&_&7&&(a&&y.some(ts)&&(S=hg(S,a)),w=kn(w,S,!1,!0));}

return n.dirs&&(w=kn(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(n.dirs):n.dirs),n.transition&&ll(w,n.transition),b=w,ta(p),b;}const gg=e=>{let t;

for(const n in e)(n==='class'||n==='style'||xa(n))&&((t||(t={}))[n]=e[n]);

return t;},hg=(e,t)=>{const n={};

for(const l in e)(!ts(l)||!(l.slice(9)in t))&&(n[l]=e[l]);

return n;};function yg(e,t,n){const{props:l,children:o,component:a}=e,{props:i,children:s,patchFlag:r}=t,u=a.emitsOptions;

if(t.dirs||t.transition)return!0;

if(n&&r>=0){if(r&1024)return!0;

if(r&16)return l?Cr(l,i,u):!!i;

if(r&8){const c=t.dynamicProps;

for(let d=0;d<c.length;d++){const f=c[d];

if(nd(i,l,f)&&!Oa(u,f))return!0;}}}else return(o||s)&&(!s||!s.$stable)?!0:l===i?!1:l?i?Cr(l,i,u):!0:!!i;

return!1;}function Cr(e,t,n){const l=Object.keys(t);

if(l.length!==Object.keys(e).length)return!0;

for(let o=0;o<l.length;o++){const a=l[o];

if(nd(t,e,a)&&!Oa(n,a))return!0;}

return!1;}function nd(e,t,n){const l=e[n],o=t[n];

return n==='style'&&Ee(l)&&Ee(o)?!ls(l,o):l!==o;}function pg({vnode:e,parent:t},n){for(;t;){const l=t.subTree;

if(l.suspense&&l.suspense.activeBranch===e&&(l.el=e.el),l===e)(e=t.vnode).el=n,t=t.parent;else break;}}const ld={},od=()=>Object.create(ld),ad=e=>Object.getPrototypeOf(e)===ld;function bg(e,t,n,l=!1){const o={},a=od();e.propsDefaults=Object.create(null),id(e,t,o,a);

for(const i in e.propsOptions[0])i in o||(o[i]=void 0);

n?e.props=l?o:Pm(o):e.type.props?e.props=o:e.props=a,e.attrs=a;}function Sg(e,t,n,l){const{props:o,attrs:a,vnode:{patchFlag:i}}=e,s=fe(o),[r]=e.propsOptions;let u=!1;

if((l||i>0)&&!(i&16)){if(i&8){const c=e.vnode.dynamicProps;

for(let d=0;d<c.length;d++){let f=c[d];

if(Oa(e.emitsOptions,f))continue;

const m=t[f];

if(r)if(Pe(a,f))m!==a[f]&&(a[f]=m,u=!0);else{const v=ht(f);o[v]=Ii(r,s,v,m,e,!1);}else m!==a[f]&&(a[f]=m,u=!0);}}}else{id(e,t,o,a)&&(u=!0);let c;

for(const d in s)(!t||!Pe(t,d)&&((c=ul(d))===d||!Pe(t,c)))&&(r?n&&(n[d]!==void 0||n[c]!==void 0)&&(o[d]=Ii(r,s,d,void 0,e,!0)):delete o[d]);

if(a!==s)for(const d in a)(!t||!Pe(t,d))&&(delete a[d],u=!0);}

u&&yn(e.attrs,'set','');}function id(e,t,n,l){const[o,a]=e.propsOptions;let i=!1,s;

if(t){for(let r in t){if(Yl(r))continue;

const u=t[r];let c;o&&Pe(o,c=ht(r))?!a||!a.includes(c)?n[c]=u:(s||(s={}))[c]=u:Oa(e.emitsOptions,r)||(!(r in l)||u!==l[r])&&(l[r]=u,i=!0);}}

if(a){const r=fe(n),u=s||De;

for(let c=0;c<a.length;c++){const d=a[c];n[d]=Ii(o,r,d,u[d],e,!Pe(u,d));}}

return i;}function Ii(e,t,n,l,o,a){const i=e[n];

if(i!=null){const s=Pe(i,'default');

if(s&&l===void 0){const r=i.default;

if(i.type!==Function&&!i.skipFactory&&pe(r)){const{propsDefaults:u}=o;

if(n in u)l=u[n];else{const c=Vo(o);l=u[n]=r.call(null,t),c();}}else l=r;

o.ce&&o.ce._setProp(n,l);}

i[0]&&(a&&!s?l=!1:i[1]&&(l===''||l===ul(n))&&(l=!0));}

return l;}const wg=new WeakMap;function sd(e,t,n=!1){const l=n?wg:t.propsCache,o=l.get(e);

if(o)return o;

const a=e.props,i={},s=[];let r=!1;

if(!pe(e)){const c=d=>{r=!0;const[f,m]=sd(d,t,!0);Ze(i,f),m&&s.push(...m);};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c);}

if(!a&&!r)return Ee(e)&&l.set(e,wl),wl;

if(ve(a))for(let c=0;c<a.length;c++){const d=ht(a[c]);xr(d)&&(i[d]=De);}else if(a){for(const c in a){const d=ht(c);

if(xr(d)){const f=a[c],m=i[d]=ve(f)||pe(f)?{type:f}:Ze({},f),v=m.type;let g=!1,p=!0;

if(ve(v)){for(let b=0;b<v.length;++b){const S=v[b],w=pe(S)&&S.name;

if(w==='Boolean'){g=!0;break;}else w==='String'&&(p=!1);}}else g=pe(v)&&v.name==='Boolean';

m[0]=g,m[1]=p,(g||Pe(m,'default'))&&s.push(d);}}}

const u=[i,s];

return Ee(e)&&l.set(e,u),u;}function xr(e){return e[0]!=='$'&&!Yl(e);}const ps=e=>e==='_'||e==='_ctx'||e==='$stable',bs=e=>ve(e)?e.map(on):[on(e)],Cg=(e,t,n)=>{if(t._n)return t;

const l=H((...o)=>bs(t(...o)),n);

return l._c=!1,l;},rd=(e,t,n)=>{const l=e._ctx;

for(const o in e){if(ps(o))continue;

const a=e[o];

if(pe(a))t[o]=Cg(o,a,l);else if(a!=null){const i=bs(a);t[o]=()=>i;}}},ud=(e,t)=>{const n=bs(t);e.slots.default=()=>n;},cd=(e,t,n)=>{for(const l in t)(n||!ps(l))&&(e[l]=t[l]);},xg=(e,t,n)=>{const l=e.slots=od();

if(e.vnode.shapeFlag&32){const o=t._;o?(cd(l,t,n),n&&uc(l,'_',o,!0)):rd(t,l);}else t&&ud(e,t);},kg=(e,t,n)=>{const{vnode:l,slots:o}=e;let a=!0,i=De;

if(l.shapeFlag&32){const s=t._;s?n&&s===1?a=!1:cd(o,t,n):(a=!t.$stable,rd(t,o)),i=t;}else t&&(ud(e,t),i={default:1});

if(a)for(const s in o)!ps(s)&&i[s]==null&&delete o[s];},rt=Eg;function _g(e){return Ag(e);}function Ag(e,t){const n=Aa();n.__VUE__=!0;const{insert:l,remove:o,patchProp:a,createElement:i,createText:s,createComment:r,setText:u,setElementText:c,parentNode:d,nextSibling:f,setScopeId:m=sn,insertStaticContent:v}=e,g=(C,A,F,N=null,D=null,B=null,K=void 0,Z=null,G=!!A.dynamicChildren)=>{if(C===A)return;

C&&!qn(C,A)&&(N=X(C),R(C,D,B,!0),C=null),A.patchFlag===-2&&(G=!1,A.dynamicChildren=null);const{type:W,ref:ge,shapeFlag:ne}=A;

switch(W){case Ao:p(C,A,F,N);break;case at:b(C,A,F,N);break;case oi:C==null&&S(A,F,N,K);break;case ke:P(C,A,F,N,D,B,K,Z,G);break;default:ne&1?_(C,A,F,N,D,B,K,Z,G):ne&6?$(C,A,F,N,D,B,K,Z,G):(ne&64||ne&128)&&W.process(C,A,F,N,D,B,K,Z,G,We);}

ge!=null&&D?Jl(ge,C&&C.ref,B,A||C,!A):ge==null&&C&&C.ref!=null&&Jl(C.ref,null,B,C,!0);},p=(C,A,F,N)=>{if(C==null)l(A.el=s(A.children),F,N);else{const D=A.el=C.el;A.children!==C.children&&u(D,A.children);}},b=(C,A,F,N)=>{C==null?l(A.el=r(A.children||''),F,N):A.el=C.el;},S=(C,A,F,N)=>{[C.el,C.anchor]=v(C.children,A,F,N,C.el,C.anchor);},w=({el:C,anchor:A},F,N)=>{let D;

for(;C&&C!==A;)D=f(C),l(C,F,N),C=D;

l(A,F,N);},y=({el:C,anchor:A})=>{let F;

for(;C&&C!==A;)F=f(C),o(C),C=F;

o(A);},_=(C,A,F,N,D,B,K,Z,G)=>{if(A.type==='svg'?K='svg':A.type==='math'&&(K='mathml'),C==null)k(A,F,N,D,B,K,Z,G);else{const W=C.el&&C.el._isVueCE?C.el:null;try{W&&W._beginPatch(),E(C,A,D,B,K,Z,G);}finally{W&&W._endPatch();}}},k=(C,A,F,N,D,B,K,Z)=>{let G,W;const{props:ge,shapeFlag:ne,transition:de,dirs:be}=C;

if(G=C.el=i(C.type,B,ge&&ge.is,ge),ne&8?c(G,C.children):ne&16&&x(C.children,G,null,N,D,li(C,B),K,Z),be&&Wn(C,null,N,'created'),I(G,C,C.scopeId,K,N),ge){for(const Re in ge)Re!=='value'&&!Yl(Re)&&a(G,Re,null,ge[Re],B,N);

'value'in ge&&a(G,'value',null,ge.value,B),(W=ge.onVnodeBeforeMount)&&en(W,N,C);}

be&&Wn(C,null,N,'beforeMount');const Ae=Vg(D,de);Ae&&de.beforeEnter(G),l(G,A,F),((W=ge&&ge.onVnodeMounted)||Ae||be)&&rt(()=>{W&&en(W,N,C),Ae&&de.enter(G),be&&Wn(C,null,N,'mounted');},D);},I=(C,A,F,N,D)=>{if(F&&m(C,F),N)for(let B=0;B<N.length;B++)m(C,N[B]);

if(D){let B=D.subTree;

if(A===B||vd(B.type)&&(B.ssContent===A||B.ssFallback===A)){const K=D.vnode;I(C,K,K.scopeId,K.slotScopeIds,D.parent);}}},x=(C,A,F,N,D,B,K,Z,G=0)=>{for(let W=G;W<C.length;W++){const ge=C[W]=Z?gn(C[W]):on(C[W]);g(null,ge,A,F,N,D,B,K,Z);}},E=(C,A,F,N,D,B,K)=>{const Z=A.el=C.el;let{patchFlag:G,dynamicChildren:W,dirs:ge}=A;G|=C.patchFlag&16;const ne=C.props||De,de=A.props||De;let be;

if(F&&jn(F,!1),(be=de.onVnodeBeforeUpdate)&&en(be,F,A,C),ge&&Wn(A,C,F,'beforeUpdate'),F&&jn(F,!0),(ne.innerHTML&&de.innerHTML==null||ne.textContent&&de.textContent==null)&&c(Z,''),W?M(C.dynamicChildren,W,Z,F,N,li(A,D),B):K||te(C,A,Z,null,F,N,li(A,D),B,!1),G>0){if(G&16)z(Z,ne,de,F,D);else if(G&2&&ne.class!==de.class&&a(Z,'class',null,de.class,D),G&4&&a(Z,'style',ne.style,de.style,D),G&8){const Ae=A.dynamicProps;

for(let Re=0;Re<Ae.length;Re++){const Oe=Ae[Re],pt=ne[Oe],bt=de[Oe];(bt!==pt||Oe==='value')&&a(Z,Oe,pt,bt,D,F);}}

G&1&&C.children!==A.children&&c(Z,A.children);}else!K&&W==null&&z(Z,ne,de,F,D);

((be=de.onVnodeUpdated)||ge)&&rt(()=>{be&&en(be,F,A,C),ge&&Wn(A,C,F,'updated');},N);},M=(C,A,F,N,D,B,K)=>{for(let Z=0;Z<A.length;Z++){const G=C[Z],W=A[Z],ge=G.el&&(G.type===ke||!qn(G,W)||G.shapeFlag&198)?d(G.el):F;g(G,W,ge,null,N,D,B,K,!0);}},z=(C,A,F,N,D)=>{if(A!==F){if(A!==De)for(const B in A)!Yl(B)&&!(B in F)&&a(C,B,A[B],null,D,N);

for(const B in F){if(Yl(B))continue;

const K=F[B],Z=A[B];K!==Z&&B!=='value'&&a(C,B,Z,K,D,N);}

'value'in F&&a(C,'value',A.value,F.value,D);}},P=(C,A,F,N,D,B,K,Z,G)=>{const W=A.el=C?C.el:s(''),ge=A.anchor=C?C.anchor:s('');let{patchFlag:ne,dynamicChildren:de,slotScopeIds:be}=A;be&&(Z=Z?Z.concat(be):be),C==null?(l(W,F,N),l(ge,F,N),x(A.children||[],F,ge,D,B,K,Z,G)):ne>0&&ne&64&&de&&C.dynamicChildren&&C.dynamicChildren.length===de.length?(M(C.dynamicChildren,de,F,D,B,K,Z),(A.key!=null||D&&A===D.subTree)&&Ss(C,A,!0)):te(C,A,F,ge,D,B,K,Z,G);},$=(C,A,F,N,D,B,K,Z,G)=>{A.slotScopeIds=Z,C==null?A.shapeFlag&512?D.ctx.activate(A,F,N,K,G):U(A,F,N,D,B,K,G):Y(C,A,G);},U=(C,A,F,N,D,B,K)=>{const Z=C.component=Dg(C,N,D);

if(Pa(C)&&(Z.ctx.renderer=We),$g(Z,!1,K),Z.asyncDep){if(D&&D.registerDep(Z,oe,K),!C.el){const G=Z.subTree=h(at);b(null,G,A,F),C.placeholder=G.el;}}else oe(Z,C,A,F,D,B,K);},Y=(C,A,F)=>{const N=A.component=C.component;

if(yg(C,A,F)){if(N.asyncDep&&!N.asyncResolved){ee(N,A,F);

return;}else N.next=A,N.update();}else A.el=C.el,N.vnode=A;},oe=(C,A,F,N,D,B,K)=>{const Z=()=>{if(C.isMounted){let{next:ne,bu:de,u:be,parent:Ae,vnode:Re}=C;{const Jt=dd(C);

if(Jt){ne&&(ne.el=Re.el,ee(C,ne,K)),Jt.asyncDep.then(()=>{rt(()=>{C.isUnmounted||W();},D);});

return;}}let Oe=ne,pt;jn(C,!1),ne?(ne.el=Re.el,ee(C,ne,K)):ne=Re,de&&Xa(de),(pt=ne.props&&ne.props.onVnodeBeforeUpdate)&&en(pt,Ae,ne,Re),jn(C,!0);const bt=wr(C),Zt=C.subTree;C.subTree=bt,g(Zt,bt,d(Zt.el),X(Zt),C,D,B),ne.el=bt.el,Oe===null&&pg(C,bt.el),be&&rt(be,D),(pt=ne.props&&ne.props.onVnodeUpdated)&&rt(()=>en(pt,Ae,ne,Re),D);}else{let ne;const{el:de,props:be}=A,{bm:Ae,m:Re,parent:Oe,root:pt,type:bt}=C,Zt=kl(A);jn(C,!1),Ae&&Xa(Ae),!Zt&&(ne=be&&be.onVnodeBeforeMount)&&en(ne,Oe,A),jn(C,!0);{pt.ce&&pt.ce._hasShadowRoot()&&pt.ce._injectChildStyle(bt);const Jt=C.subTree=wr(C);g(null,Jt,F,N,C,D,B),A.el=Jt.el;}

if(Re&&rt(Re,D),!Zt&&(ne=be&&be.onVnodeMounted)){const Jt=A;rt(()=>en(ne,Oe,Jt),D);}

(A.shapeFlag&256||Oe&&kl(Oe.vnode)&&Oe.vnode.shapeFlag&256)&&C.a&&rt(C.a,D),C.isMounted=!0,A=F=N=null;}};C.scope.on();const G=C.effect=new mc(Z);C.scope.off();const W=C.update=G.run.bind(G),ge=C.job=G.runIfDirty.bind(G);ge.i=C,ge.id=C.uid,G.scheduler=()=>vs(ge),jn(C,!0),W();},ee=(C,A,F)=>{A.component=C;const N=C.vnode.props;C.vnode=A,C.next=null,Sg(C,A.props,N,F),kg(C,A.children,F),wn(),ur(C),Cn();},te=(C,A,F,N,D,B,K,Z,G=!1)=>{const W=C&&C.children,ge=C?C.shapeFlag:0,ne=A.children,{patchFlag:de,shapeFlag:be}=A;

if(de>0){if(de&128){J(W,ne,F,N,D,B,K,Z,G);

return;}else if(de&256){Se(W,ne,F,N,D,B,K,Z,G);

return;}}

be&8?(ge&16&&xe(W,D,B),ne!==W&&c(F,ne)):ge&16?be&16?J(W,ne,F,N,D,B,K,Z,G):xe(W,D,B,!0):(ge&8&&c(F,''),be&16&&x(ne,F,N,D,B,K,Z,G));},Se=(C,A,F,N,D,B,K,Z,G)=>{C=C||wl,A=A||wl;const W=C.length,ge=A.length,ne=Math.min(W,ge);let de;

for(de=0;de<ne;de++){const be=A[de]=G?gn(A[de]):on(A[de]);g(C[de],be,F,null,D,B,K,Z,G);}

W>ge?xe(C,D,B,!0,!1,ne):x(A,F,N,D,B,K,Z,G,ne);},J=(C,A,F,N,D,B,K,Z,G)=>{let W=0;const ge=A.length;let ne=C.length-1,de=ge-1;

for(;W<=ne&&W<=de;){const be=C[W],Ae=A[W]=G?gn(A[W]):on(A[W]);

if(qn(be,Ae))g(be,Ae,F,null,D,B,K,Z,G);else break;

W++;}

for(;W<=ne&&W<=de;){const be=C[ne],Ae=A[de]=G?gn(A[de]):on(A[de]);

if(qn(be,Ae))g(be,Ae,F,null,D,B,K,Z,G);else break;

ne--,de--;}

if(W>ne){if(W<=de){const be=de+1,Ae=be<ge?A[be].el:N;

for(;W<=de;)g(null,A[W]=G?gn(A[W]):on(A[W]),F,Ae,D,B,K,Z,G),W++;}}else if(W>de)for(;W<=ne;)R(C[W],D,B,!0),W++;else{const be=W,Ae=W,Re=new Map;

for(W=Ae;W<=de;W++){const _t=A[W]=G?gn(A[W]):on(A[W]);_t.key!=null&&Re.set(_t.key,W);}

let Oe,pt=0;const bt=de-Ae+1;let Zt=!1,Jt=0;const zl=new Array(bt);

for(W=0;W<bt;W++)zl[W]=0;

for(W=be;W<=ne;W++){const _t=C[W];

if(pt>=bt){R(_t,D,B,!0);continue;}

let Qt;

if(_t.key!=null)Qt=Re.get(_t.key);else for(Oe=Ae;Oe<=de;Oe++)if(zl[Oe-Ae]===0&&qn(_t,A[Oe])){Qt=Oe;break;}

Qt===void 0?R(_t,D,B,!0):(zl[Qt-Ae]=W+1,Qt>=Jt?Jt=Qt:Zt=!0,g(_t,A[Qt],F,null,D,B,K,Z,G),pt++);}

const nr=Zt?Tg(zl):wl;

for(Oe=nr.length-1,W=bt-1;W>=0;W--){const _t=Ae+W,Qt=A[_t],lr=A[_t+1],or=_t+1<ge?lr.el||fd(lr):N;zl[W]===0?g(null,Qt,F,or,D,B,K,Z,G):Zt&&(Oe<0||W!==nr[Oe]?ue(Qt,F,or,2):Oe--);}}},ue=(C,A,F,N,D=null)=>{const{el:B,type:K,transition:Z,children:G,shapeFlag:W}=C;

if(W&6){ue(C.component.subTree,A,F,N);

return;}

if(W&128){C.suspense.move(A,F,N);

return;}

if(W&64){K.move(C,A,F,We);

return;}

if(K===ke){l(B,A,F);

for(let ne=0;ne<G.length;ne++)ue(G[ne],A,F,N);

l(C.anchor,A,F);

return;}

if(K===oi){w(C,A,F);

return;}

if(N!==2&&W&1&&Z)if(N===0)Z.beforeEnter(B),l(B,A,F),rt(()=>Z.enter(B),D);else{const{leave:ne,delayLeave:de,afterLeave:be}=Z,Ae=()=>{C.ctx.isUnmounted?o(B):l(B,A,F);},Re=()=>{B._isLeaving&&B[ln](!0),ne(B,()=>{Ae(),be&&be();});};de?de(B,Ae,Re):Re();}else l(B,A,F);},R=(C,A,F,N=!1,D=!1)=>{const{type:B,props:K,ref:Z,children:G,dynamicChildren:W,shapeFlag:ge,patchFlag:ne,dirs:de,cacheIndex:be}=C;

if(ne===-2&&(D=!1),Z!=null&&(wn(),Jl(Z,null,F,C,!0),Cn()),be!=null&&(A.renderCache[be]=void 0),ge&256){A.ctx.deactivate(C);

return;}

const Ae=ge&1&&de,Re=!kl(C);let Oe;

if(Re&&(Oe=K&&K.onVnodeBeforeUnmount)&&en(Oe,A,C),ge&6)Q(C.component,F,N);else{if(ge&128){C.suspense.unmount(F,N);

return;}

Ae&&Wn(C,null,A,'beforeUnmount'),ge&64?C.type.remove(C,A,F,We,N):W&&!W.hasOnce&&(B!==ke||ne>0&&ne&64)?xe(W,A,F,!1,!0):(B===ke&&ne&384||!D&&ge&16)&&xe(G,A,F),N&&q(C);}

(Re&&(Oe=K&&K.onVnodeUnmounted)||Ae)&&rt(()=>{Oe&&en(Oe,A,C),Ae&&Wn(C,null,A,'unmounted');},F);},q=C=>{const{type:A,el:F,anchor:N,transition:D}=C;

if(A===ke){ye(F,N);

return;}

if(A===oi){y(C);

return;}

const B=()=>{o(F),D&&!D.persisted&&D.afterLeave&&D.afterLeave();};

if(C.shapeFlag&1&&D&&!D.persisted){const{leave:K,delayLeave:Z}=D,G=()=>K(F,B);Z?Z(C.el,B,G):G();}else B();},ye=(C,A)=>{let F;

for(;C!==A;)F=f(C),o(C),C=F;

o(A);},Q=(C,A,F)=>{const{bum:N,scope:D,job:B,subTree:K,um:Z,m:G,a:W}=C;kr(G),kr(W),N&&Xa(N),D.stop(),B&&(B.flags|=8,R(K,C,A,F)),Z&&rt(Z,A),rt(()=>{C.isUnmounted=!0;},A);},xe=(C,A,F,N=!1,D=!1,B=0)=>{for(let K=B;K<C.length;K++)R(C[K],A,F,N,D);},X=C=>{if(C.shapeFlag&6)return X(C.component.subTree);

if(C.shapeFlag&128)return C.suspense.next();

const A=f(C.anchor||C.el),F=A&&A[Bc];

return F?f(F):A;};let _e=!1;const Qe=(C,A,F)=>{let N;C==null?A._vnode&&(R(A._vnode,null,null,!0),N=A._vnode.component):g(A._vnode||null,C,A,null,null,null,F),A._vnode=C,_e||(_e=!0,ur(N),Oc(),_e=!1);},We={p:g,um:R,m:ue,r:q,mt:U,mc:x,pc:te,pbc:M,n:X,o:e};

return{render:Qe,hydrate:void 0,createApp:dg(Qe)};}function li({type:e,props:t},n){return n==='svg'&&e==='foreignObject'||n==='mathml'&&e==='annotation-xml'&&t&&t.encoding&&t.encoding.includes('html')?void 0:n;}function jn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5);}function Vg(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted;}function Ss(e,t,n=!1){const l=e.children,o=t.children;

if(ve(l)&&ve(o))for(let a=0;a<l.length;a++){const i=l[a];let s=o[a];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=o[a]=gn(o[a]),s.el=i.el),!n&&s.patchFlag!==-2&&Ss(i,s)),s.type===Ao&&(s.patchFlag===-1&&(s=o[a]=gn(s)),s.el=i.el),s.type===at&&!s.el&&(s.el=i.el);}}function Tg(e){const t=e.slice(),n=[0];let l,o,a,i,s;const r=e.length;

for(l=0;l<r;l++){const u=e[l];

if(u!==0){if(o=n[n.length-1],e[o]<u){t[l]=o,n.push(l);continue;}

for(a=0,i=n.length-1;a<i;)s=a+i>>1,e[n[s]]<u?a=s+1:i=s;

u<e[n[a]]&&(a>0&&(t[l]=n[a-1]),n[a]=l);}}

for(a=n.length,i=n[a-1];a-- >0;)n[a]=i,i=t[i];

return n;}function dd(e){const t=e.subTree.component;

if(t)return t.asyncDep&&!t.asyncResolved?t:dd(t);}function kr(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8;}function fd(e){if(e.placeholder)return e.placeholder;

const t=e.component;

return t?fd(t.subTree):null;}const vd=e=>e.__isSuspense;function Eg(e,t){t&&t.pendingBranch?ve(e)?t.effects.push(...e):t.effects.push(e):zm(e);}const ke=Symbol.for('v-fgt'),Ao=Symbol.for('v-txt'),at=Symbol.for('v-cmt'),oi=Symbol.for('v-stc'),eo=[];let Vt=null;function Ve(e=!1){eo.push(Vt=e?null:[]);}function Pg(){eo.pop(),Vt=eo[eo.length-1]||null;}let co=1;function oa(e,t=!1){co+=e,e<0&&Vt&&t&&(Vt.hasOnce=!0);}function md(e){return e.dynamicChildren=co>0?Vt||wl:null,Pg(),co>0&&Vt&&Vt.push(e),e;}function ol(e,t,n,l,o,a){return md(T(e,t,n,l,o,a,!0));}function $e(e,t,n,l,o){return md(h(e,t,n,l,o,!0));}function Tl(e){return e?e.__v_isVNode===!0:!1;}function qn(e,t){return e.type===t.type&&e.key===t.key;}const gd=({key:e})=>e??null,Yo=({ref:e,ref_key:t,ref_for:n})=>(typeof e=='number'&&(e=''+e),e!=null?Ke(e)||He(e)||pe(e)?{i:it,r:e,k:t,f:!!n}:e:null);function T(e,t=null,n=null,l=0,o=null,a=e===ke?0:1,i=!1,s=!1){const r={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&gd(t),ref:t&&Yo(t),scopeId:Dc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:l,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:it};

return s?(ws(r,n),a&128&&e.normalize(r)):n&&(r.shapeFlag|=Ke(n)?8:16),co>0&&!i&&Vt&&(r.patchFlag>0||a&6)&&r.patchFlag!==32&&Vt.push(r),r;}const h=Ig;function Ig(e,t=null,n=null,l=0,o=null,a=!1){if((!e||e===tg)&&(e=at),Tl(e)){const s=kn(e,t,!0);

return n&&ws(s,n),co>0&&!a&&Vt&&(s.shapeFlag&6?Vt[Vt.indexOf(e)]=s:Vt.push(s)),s.patchFlag=-2,s;}

if(zg(e)&&(e=e.__vccOpts),t){t=Fg(t);let{class:s,style:r}=t;s&&!Ke(s)&&(t.class=ce(s)),Ee(r)&&(Ta(r)&&!ve(r)&&(r=Ze({},r)),t.style=he(r));}

const i=Ke(e)?1:vd(e)?128:Lc(e)?64:Ee(e)?4:pe(e)?2:0;

return T(e,t,n,l,o,i,a,!0);}function Fg(e){return e?Ta(e)||ad(e)?Ze({},e):e:null;}function kn(e,t,n=!1,l=!1){const{props:o,ref:a,patchFlag:i,children:s,transition:r}=e,u=t?ae(o||{},t):o,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&gd(u),ref:t&&t.ref?n&&a?ve(a)?a.concat(Yo(t)):[a,Yo(t)]:Yo(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ke?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:r,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&kn(e.ssContent),ssFallback:e.ssFallback&&kn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};

return r&&l&&ll(c,r.clone(c)),c;}function we(e=' ',t=0){return h(Ao,null,e,t);}function Bn(e='',t=!1){return t?(Ve(),$e(at,null,e)):h(at,null,e);}function on(e){return e==null||typeof e=='boolean'?h(at):ve(e)?h(ke,null,e.slice()):Tl(e)?gn(e):h(Ao,null,String(e));}function gn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:kn(e);}function ws(e,t){let n=0;const{shapeFlag:l}=e;

if(t==null)t=null;else if(ve(t))n=16;else if(typeof t=='object'){if(l&65){const o=t.default;o&&(o._c&&(o._d=!1),ws(e,o()),o._c&&(o._d=!0));

return;}else{n=32;const o=t._;!o&&!ad(t)?t._ctx=it:o===3&&it&&(it.slots._===1?t._=1:(t._=2,e.patchFlag|=1024));}}else pe(t)?(t={default:t,_ctx:it},n=32):(t=String(t),l&64?(n=16,t=[we(t)]):n=8);

e.children=t,e.shapeFlag|=n;}function ae(...e){const t={};

for(let n=0;n<e.length;n++){const l=e[n];

for(const o in l)if(o==='class')t.class!==l.class&&(t.class=ce([t.class,l.class]));else if(o==='style')t.style=he([t.style,l.style]);else if(xa(o)){const a=t[o],i=l[o];i&&a!==i&&!(ve(a)&&a.includes(i))&&(t[o]=a?[].concat(a,i):i);}else o!==''&&(t[o]=l[o]);}

return t;}function en(e,t,n,l=null){jt(e,t,7,[n,l]);}const Og=ed();let Mg=0;function Dg(e,t,n){const l=e.type,o=(t?t.appContext:e.appContext)||Og,a={uid:Mg++,vnode:e,type:l,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new vc(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:['',0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:sd(l,o),emitsOptions:td(l,o),emit:null,emitted:null,propsDefaults:De,inheritAttrs:l.inheritAttrs,ctx:De,data:De,props:De,attrs:De,slots:De,refs:De,setupState:De,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};

return a.ctx={_:a},a.root=t?t.root:a,a.emit=vg.bind(null,a),e.ce&&e.ce(a),a;}let dt=null;const Dl=()=>dt||it;let aa,Fi;{const e=Aa(),t=(n,l)=>{let o;

return(o=e[n])||(o=e[n]=[]),o.push(l),a=>{o.length>1?o.forEach(i=>i(a)):o[0](a);};};aa=t('__VUE_INSTANCE_SETTERS__',n=>dt=n),Fi=t('__VUE_SSR_SETTERS__',n=>fo=n);}const Vo=e=>{const t=dt;

return aa(e),e.scope.on(),()=>{e.scope.off(),aa(t);};},_r=()=>{dt&&dt.scope.off(),aa(null);};function hd(e){return e.vnode.shapeFlag&4;}let fo=!1;function $g(e,t=!1,n=!1){t&&Fi(t);const{props:l,children:o}=e.vnode,a=hd(e);bg(e,l,a,t),xg(e,o,n||t);const i=a?Bg(e,t):void 0;

return t&&Fi(!1),i;}function Bg(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,og);const{setup:l}=n;

if(l){wn();const o=e.setupContext=l.length>1?Rg(e):null,a=Vo(e),i=ko(l,e,0,[e.props,o]),s=ic(i);

if(Cn(),a(),(s||e.sp)&&!kl(e)&&Kc(e),s){if(i.then(_r,_r),t)return i.then(r=>{Ar(e,r);}).catch(r=>{Ea(r,e,0);});

e.asyncDep=i;}else Ar(e,i);}else yd(e);}function Ar(e,t,n){pe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ee(t)&&(e.setupState=Ec(t)),yd(e);}function yd(e,t,n){const l=e.type;e.render||(e.render=l.render||sn);{const o=Vo(e);wn();try{ag(e);}finally{Cn(),o();}}}const Lg={get(e,t){return ct(e,'get',''),e[t];}};function Rg(e){const t=n=>{e.exposed=n||{};};

return{attrs:new Proxy(e.attrs,Lg),slots:e.slots,emit:e.emit,expose:t};}function Ma(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Ec(ds(e.exposed)),{get(t,n){if(n in t)return t[n];

if(n in Ql)return Ql[n](e);},has(t,n){return n in t||n in Ql;}})):e.proxy;}function Ng(e,t=!0){return pe(e)?e.displayName||e.name:e.name||t&&e.__name;}function zg(e){return pe(e)&&'__vccOpts'in e;}const V=(e,t)=>$m(e,t,fo);function Tn(e,t,n){try{oa(-1);const l=arguments.length;

return l===2?Ee(t)&&!ve(t)?Tl(t)?h(e,null,[t]):h(e,t):h(e,null,t):(l>3?n=Array.prototype.slice.call(arguments,2):l===3&&Tl(n)&&(n=[n]),h(e,t,n));}finally{oa(1);}}const Hg='3.5.28';let Oi;const Vr=typeof window<'u'&&window.trustedTypes;

if(Vr)try{Oi=Vr.createPolicy('vue',{createHTML:e=>e});}catch{}

const pd=Oi?e=>Oi.createHTML(e):e=>e,Wg='http://www.w3.org/2000/svg',jg='http://www.w3.org/1998/Math/MathML',mn=typeof document<'u'?document:null,Tr=mn&&mn.createElement('template'),Ug={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,l)=>{const o=t==='svg'?mn.createElementNS(Wg,e):t==='mathml'?mn.createElementNS(jg,e):n?mn.createElement(e,{is:n}):mn.createElement(e);

return e==='select'&&l&&l.multiple!=null&&o.setAttribute('multiple',l.multiple),o;},createText:e=>mn.createTextNode(e),createComment:e=>mn.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>mn.querySelector(e),setScopeId(e,t){e.setAttribute(t,'');},insertStaticContent(e,t,n,l,o,a){const i=n?n.previousSibling:t.lastChild;

if(o&&(o===a||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{Tr.innerHTML=pd(l==='svg'?`<svg>${e}</svg>`:l==='mathml'?`<math>${e}</math>`:e);const s=Tr.content;

if(l==='svg'||l==='mathml'){const r=s.firstChild;

for(;r.firstChild;)s.appendChild(r.firstChild);

s.removeChild(r);}

t.insertBefore(s,n);}

return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild];}},Pn='transition',jl='animation',El=Symbol('_vtc'),bd={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Sd=Ze({},Hc,bd),Kg=e=>(e.displayName='Transition',e.props=Sd,e),Ut=Kg((e,{slots:t})=>Tn(Ym,wd(e),t)),Un=(e,t=[])=>{ve(e)?e.forEach(n=>n(...t)):e&&e(...t);},Er=e=>e?ve(e)?e.some(t=>t.length>1):e.length>1:!1;function wd(e){const t={};

for(const P in e)P in bd||(t[P]=e[P]);

if(e.css===!1)return t;

const{name:n='v',type:l,duration:o,enterFromClass:a=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:s=`${n}-enter-to`,appearFromClass:r=a,appearActiveClass:u=i,appearToClass:c=s,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,v=Gg(o),g=v&&v[0],p=v&&v[1],{onBeforeEnter:b,onEnter:S,onEnterCancelled:w,onLeave:y,onLeaveCancelled:_,onBeforeAppear:k=b,onAppear:I=S,onAppearCancelled:x=w}=t,E=(P,$,U,Y)=>{P._enterCancelled=Y,In(P,$?c:s),In(P,$?u:i),U&&U();},M=(P,$)=>{P._isLeaving=!1,In(P,d),In(P,m),In(P,f),$&&$();},z=P=>($,U)=>{const Y=P?I:S,oe=()=>E($,P,U);Un(Y,[$,oe]),Pr(()=>{In($,P?r:a),tn($,P?c:s),Er(Y)||Ir($,l,g,oe);});};

return Ze(t,{onBeforeEnter(P){Un(b,[P]),tn(P,a),tn(P,i);},onBeforeAppear(P){Un(k,[P]),tn(P,r),tn(P,u);},onEnter:z(!1),onAppear:z(!0),onLeave(P,$){P._isLeaving=!0;const U=()=>M(P,$);tn(P,d),P._enterCancelled?(tn(P,f),Mi(P)):(Mi(P),tn(P,f)),Pr(()=>{P._isLeaving&&(In(P,d),tn(P,m),Er(y)||Ir(P,l,p,U));}),Un(y,[P,U]);},onEnterCancelled(P){E(P,!1,void 0,!0),Un(w,[P]);},onAppearCancelled(P){E(P,!0,void 0,!0),Un(x,[P]);},onLeaveCancelled(P){M(P),Un(_,[P]);}});}function Gg(e){if(e==null)return null;

if(Ee(e))return[ai(e.enter),ai(e.leave)];

{const t=ai(e);

return[t,t];}}function ai(e){return lm(e);}function tn(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[El]||(e[El]=new Set)).add(t);}function In(e,t){t.split(/\s+/).forEach(l=>l&&e.classList.remove(l));const n=e[El];n&&(n.delete(t),n.size||(e[El]=void 0));}function Pr(e){requestAnimationFrame(()=>{requestAnimationFrame(e);});}let Yg=0;function Ir(e,t,n,l){const o=e._endId=++Yg,a=()=>{o===e._endId&&l();};

if(n!=null)return setTimeout(a,n);

const{type:i,timeout:s,propCount:r}=Cd(e,t);

if(!i)return l();

const u=i+'end';let c=0;const d=()=>{e.removeEventListener(u,f),a();},f=m=>{m.target===e&&++c>=r&&d();};setTimeout(()=>{c<r&&d();},s+1),e.addEventListener(u,f);}function Cd(e,t){const n=window.getComputedStyle(e),l=v=>(n[v]||'').split(', '),o=l(`${Pn}Delay`),a=l(`${Pn}Duration`),i=Fr(o,a),s=l(`${jl}Delay`),r=l(`${jl}Duration`),u=Fr(s,r);let c=null,d=0,f=0;t===Pn?i>0&&(c=Pn,d=i,f=a.length):t===jl?u>0&&(c=jl,d=u,f=r.length):(d=Math.max(i,u),c=d>0?i>u?Pn:jl:null,f=c?c===Pn?a.length:r.length:0);const m=c===Pn&&/\b(?:transform|all)(?:,|$)/.test(l(`${Pn}Property`).toString());

return{type:c,timeout:d,propCount:f,hasTransform:m};}function Fr(e,t){for(;e.length<t.length;)e=e.concat(e);

return Math.max(...t.map((n,l)=>Or(n)+Or(e[l])));}function Or(e){return e==='auto'?0:Number(e.slice(0,-1).replace(',','.'))*1e3;}function Mi(e){return(e?e.ownerDocument:document).body.offsetHeight;}function qg(e,t,n){const l=e[El];l&&(t=(t?[t,...l]:[...l]).join(' ')),t==null?e.removeAttribute('class'):n?e.setAttribute('class',t):e.className=t;}const ia=Symbol('_vod'),xd=Symbol('_vsh'),cl={name:'show',beforeMount(e,{value:t},{transition:n}){e[ia]=e.style.display==='none'?'':e.style.display,n&&t?n.beforeEnter(e):Ul(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:l}){!t!=!n&&(l?t?(l.beforeEnter(e),Ul(e,!0),l.enter(e)):l.leave(e,()=>{Ul(e,!1);}):Ul(e,t));},beforeUnmount(e,{value:t}){Ul(e,t);}};function Ul(e,t){e.style.display=t?e[ia]:'none',e[xd]=!t;}const Xg=Symbol(''),Zg=/(?:^|;)\s*display\s*:/;function Jg(e,t,n){const l=e.style,o=Ke(n);let a=!1;

if(n&&!o){if(t)if(Ke(t))for(const i of t.split(';')){const s=i.slice(0,i.indexOf(':')).trim();n[s]==null&&qo(l,s,'');}else for(const i in t)n[i]==null&&qo(l,i,'');

for(const i in n)i==='display'&&(a=!0),qo(l,i,n[i]);}else if(o){if(t!==n){const i=l[Xg];i&&(n+=';'+i),l.cssText=n,a=Zg.test(n);}}else t&&e.removeAttribute('style');

ia in e&&(e[ia]=a?l.display:'',e[xd]&&(l.display='none'));}const Mr=/\s*!important$/;function qo(e,t,n){if(ve(n))n.forEach(l=>qo(e,t,l));else if(n==null&&(n=''),t.startsWith('--'))e.setProperty(t,n);else{const l=Qg(e,t);Mr.test(n)?e.setProperty(ul(l),n.replace(Mr,''),'important'):e[l]=n;}}const Dr=['Webkit','Moz','ms'],ii={};function Qg(e,t){const n=ii[t];

if(n)return n;

let l=ht(t);

if(l!=='filter'&&l in e)return ii[t]=l;

l=An(l);

for(let o=0;o<Dr.length;o++){const a=Dr[o]+l;

if(a in e)return ii[t]=a;}

return t;}const $r='http://www.w3.org/1999/xlink';function Br(e,t,n,l,o,a=um(t)){l&&t.startsWith('xlink:')?n==null?e.removeAttributeNS($r,t.slice(6,t.length)):e.setAttributeNS($r,t,n):n==null||a&&!cc(n)?e.removeAttribute(t):e.setAttribute(t,a?'':Ht(n)?String(n):n);}function Lr(e,t,n,l,o){if(t==='innerHTML'||t==='textContent'){n!=null&&(e[t]=t==='innerHTML'?pd(n):n);

return;}

const a=e.tagName;

if(t==='value'&&a!=='PROGRESS'&&!a.includes('-')){const s=a==='OPTION'?e.getAttribute('value')||'':e.value,r=n==null?e.type==='checkbox'?'on':'':String(n);(s!==r||!('_value'in e))&&(e.value=r),n==null&&e.removeAttribute(t),e._value=n;

return;}

let i=!1;

if(n===''||n==null){const s=typeof e[t];s==='boolean'?n=cc(n):n==null&&s==='string'?(n='',i=!0):s==='number'&&(n=0,i=!0);}

try{e[t]=n;}catch{}i&&e.removeAttribute(o||t);}function eh(e,t,n,l){e.addEventListener(t,n,l);}function th(e,t,n,l){e.removeEventListener(t,n,l);}const Rr=Symbol('_vei');function nh(e,t,n,l,o=null){const a=e[Rr]||(e[Rr]={}),i=a[t];

if(l&&i)i.value=l;else{const[s,r]=lh(t);

if(l){const u=a[t]=ih(l,o);eh(e,s,u,r);}else i&&(th(e,s,i,r),a[t]=void 0);}}const Nr=/(?:Once|Passive|Capture)$/;function lh(e){let t;

if(Nr.test(e)){t={};let l;

for(;l=e.match(Nr);)e=e.slice(0,e.length-l[0].length),t[l[0].toLowerCase()]=!0;}

return[e[2]===':'?e.slice(3):ul(e.slice(2)),t];}let si=0;const oh=Promise.resolve(),ah=()=>si||(oh.then(()=>si=0),si=Date.now());function ih(e,t){const n=l=>{if(!l._vts)l._vts=Date.now();else if(l._vts<=n.attached)return;

jt(sh(l,n.value),t,5,[l]);};

return n.value=e,n.attached=ah(),n;}function sh(e,t){if(ve(t)){const n=e.stopImmediatePropagation;

return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map(l=>o=>!o._stopped&&l&&l(o));}else return t;}const zr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,rh=(e,t,n,l,o,a)=>{const i=o==='svg';t==='class'?qg(e,l,i):t==='style'?Jg(e,n,l):xa(t)?ts(t)||nh(e,t,n,l,a):(t[0]==='.'?(t=t.slice(1),!0):t[0]==='^'?(t=t.slice(1),!1):uh(e,t,l,i))?(Lr(e,t,l),!e.tagName.includes('-')&&(t==='value'||t==='checked'||t==='selected')&&Br(e,t,l,i,a,t!=='value')):e._isVueCE&&(/[A-Z]/.test(t)||!Ke(l))?Lr(e,ht(t),l,a,t):(t==='true-value'?e._trueValue=l:t==='false-value'&&(e._falseValue=l),Br(e,t,l,i));};function uh(e,t,n,l){if(l)return!!(t==='innerHTML'||t==='textContent'||t in e&&zr(t)&&pe(n));

if(t==='spellcheck'||t==='draggable'||t==='translate'||t==='autocorrect'||t==='sandbox'&&e.tagName==='IFRAME'||t==='form'||t==='list'&&e.tagName==='INPUT'||t==='type'&&e.tagName==='TEXTAREA')return!1;

if(t==='width'||t==='height'){const o=e.tagName;

if(o==='IMG'||o==='VIDEO'||o==='CANVAS'||o==='SOURCE')return!1;}

return zr(t)&&Ke(n)?!1:t in e;}const kd=new WeakMap,_d=new WeakMap,sa=Symbol('_moveCb'),Hr=Symbol('_enterCb'),ch=e=>(delete e.props.mode,e),dh=ch({name:'TransitionGroup',props:Ze({},Sd,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Dl(),l=zc();let o,a;

return ys(()=>{if(!o.length)return;

const i=e.moveClass||`${e.name||'v'}-move`;

if(!gh(o[0].el,n.vnode.el,i)){o=[];

return;}

o.forEach(fh),o.forEach(vh);const s=o.filter(mh);Mi(n.vnode.el),s.forEach(r=>{const u=r.el,c=u.style;tn(u,i),c.transform=c.webkitTransform=c.transitionDuration='';const d=u[sa]=f=>{f&&f.target!==u||(!f||f.propertyName.endsWith('transform'))&&(u.removeEventListener('transitionend',d),u[sa]=null,In(u,i));};u.addEventListener('transitionend',d);}),o=[];}),()=>{const i=fe(e),s=wd(i);let r=i.tag||ke;

if(o=[],a)for(let u=0;u<a.length;u++){const c=a[u];c.el&&c.el instanceof Element&&(o.push(c),ll(c,uo(c,s,l,n)),kd.set(c,Ad(c.el)));}

a=t.default?gs(t.default()):[];

for(let u=0;u<a.length;u++){const c=a[u];c.key!=null&&ll(c,uo(c,s,l,n));}

return h(r,null,a);};}}),Cs=dh;function fh(e){const t=e.el;t[sa]&&t[sa](),t[Hr]&&t[Hr]();}function vh(e){_d.set(e,Ad(e.el));}function mh(e){const t=kd.get(e),n=_d.get(e),l=t.left-n.left,o=t.top-n.top;

if(l||o){const a=e.el,i=a.style,s=a.getBoundingClientRect();let r=1,u=1;

return a.offsetWidth&&(r=s.width/a.offsetWidth),a.offsetHeight&&(u=s.height/a.offsetHeight),(!Number.isFinite(r)||r===0)&&(r=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(r-1)<.01&&(r=1),Math.abs(u-1)<.01&&(u=1),i.transform=i.webkitTransform=`translate(${l/r}px,${o/u}px)`,i.transitionDuration='0s',e;}}function Ad(e){const t=e.getBoundingClientRect();

return{left:t.left,top:t.top};}function gh(e,t,n){const l=e.cloneNode(),o=e[El];o&&o.forEach(s=>{s.split(/\s+/).forEach(r=>r&&l.classList.remove(r));}),n.split(/\s+/).forEach(s=>s&&l.classList.add(s)),l.style.display='none';const a=t.nodeType===1?t:t.parentNode;a.appendChild(l);const{hasTransform:i}=Cd(l);

return a.removeChild(l),i;}const hh=['ctrl','shift','alt','meta'],yh={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>'button'in e&&e.button!==0,middle:e=>'button'in e&&e.button!==1,right:e=>'button'in e&&e.button!==2,exact:(e,t)=>hh.some(n=>e[`${n}Key`]&&!t.includes(n))},ph=(e,t)=>{if(!e)return e;

const n=e._withMods||(e._withMods={}),l=t.join('.');

return n[l]||(n[l]=((o,...a)=>{for(let i=0;i<t.length;i++){const s=yh[t[i]];

if(s&&s(o,t))return;}

return e(o,...a);}));},bh=Ze({patchProp:rh},Ug);let Wr;function Vd(){return Wr||(Wr=_g(bh));}const Td=((...e)=>{Vd().render(...e);}),Sh=((...e)=>{const t=Vd().createApp(...e),{mount:n}=t;

return t.mount=l=>{const o=Ch(l);

if(!o)return;

const a=t._component;!pe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent='');const i=n(o,!1,wh(o));

return o instanceof Element&&(o.removeAttribute('v-cloak'),o.setAttribute('data-v-app','')),i;},t;});function wh(e){if(e instanceof SVGElement)return'svg';

if(typeof MathMLElement=='function'&&e instanceof MathMLElement)return'mathml';}function Ch(e){return Ke(e)?document.querySelector(e):e;}let Ed;const Da=e=>Ed=e,Pd=Symbol();function Di(e){return e&&typeof e=='object'&&Object.prototype.toString.call(e)==='[object Object]'&&typeof e.toJSON!='function';}var to;(function(e){e.direct='direct',e.patchObject='patch object',e.patchFunction='patch function';})(to||(to={}));function xh(){const e=nl(!0),t=e.run(()=>L({}));let n=[],l=[];const o=ds({install(a){Da(o),o._a=a,a.provide(Pd,o),a.config.globalProperties.$pinia=o,l.forEach(i=>n.push(i)),l=[];},use(a){return this._a?n.push(a):l.push(a),this;},_p:n,_a:null,_e:e,_s:new Map,state:t});

return o;}const Id=()=>{};function jr(e,t,n,l=Id){e.add(t);const o=()=>{e.delete(t)&&l();};

return!n&&os()&&tt(o),o;}function fl(e,...t){e.forEach(n=>{n(...t);});}const kh=e=>e(),Ur=Symbol(),ri=Symbol();function $i(e,t){e instanceof Map&&t instanceof Map?t.forEach((n,l)=>e.set(l,n)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);

for(const n in t){if(!t.hasOwnProperty(n))continue;

const l=t[n],o=e[n];Di(o)&&Di(l)&&e.hasOwnProperty(n)&&!He(l)&&!Sn(l)?e[n]=$i(o,l):e[n]=l;}

return e;}const _h=Symbol();function Ah(e){return!Di(e)||!Object.prototype.hasOwnProperty.call(e,_h);}const{assign:Fn}=Object;function Vh(e){return!!(He(e)&&e.effect);}function Th(e,t,n,l){const{state:o,actions:a,getters:i}=t,s=n.state.value[e];let r;function u(){s||(n.state.value[e]=o?o():{});const c=fs(n.state.value[e]);

return Fn(c,a,Object.keys(i||{}).reduce((d,f)=>(d[f]=ds(V(()=>{Da(n);const m=n._s.get(e);

return i[f].call(m,m);})),d),{}));}

return r=Fd(e,u,t,n,l,!0),r;}function Fd(e,t,n={},l,o,a){let i;const s=Fn({actions:{}},n),r={deep:!0};let u,c,d=new Set,f=new Set,m;const v=l.state.value[e];!a&&!v&&(l.state.value[e]={});let g;function p(x){let E;u=c=!1,typeof x=='function'?(x(l.state.value[e]),E={type:to.patchFunction,storeId:e,events:m}):($i(l.state.value[e],x),E={type:to.patchObject,payload:x,storeId:e,events:m});const M=g=Symbol();Be().then(()=>{g===M&&(u=!0);}),c=!0,fl(d,E,l.state.value[e]);}const b=a?function(){const{state:E}=n,M=E?E():{};this.$patch(z=>{Fn(z,M);});}:Id;function S(){i.stop(),d.clear(),f.clear(),l._s.delete(e);}const w=(x,E='')=>{if(Ur in x)return x[ri]=E,x;

const M=function(){Da(l);const z=Array.from(arguments),P=new Set,$=new Set;function U(ee){P.add(ee);}function Y(ee){$.add(ee);}fl(f,{args:z,name:M[ri],store:_,after:U,onError:Y});let oe;try{oe=x.apply(this&&this.$id===e?this:_,z);}catch(ee){throw fl($,ee),ee;}

return oe instanceof Promise?oe.then(ee=>(fl(P,ee),ee)).catch(ee=>(fl($,ee),Promise.reject(ee))):(fl(P,oe),oe);};

return M[Ur]=!0,M[ri]=E,M;},y={_p:l,$id:e,$onAction:jr.bind(null,f),$patch:p,$reset:b,$subscribe(x,E={}){const M=jr(d,x,E.detached,()=>z()),z=i.run(()=>ie(()=>l.state.value[e],P=>{(E.flush==='sync'?c:u)&&x({storeId:e,type:to.direct,events:m},P);},Fn({},r,E)));

return M;},$dispose:S},_=et(y);l._s.set(e,_);const I=(l._a&&l._a.runWithContext||kh)(()=>l._e.run(()=>(i=nl()).run(()=>t({action:w}))));

for(const x in I){const E=I[x];

if(He(E)&&!Vh(E)||Sn(E))a||(v&&Ah(E)&&(He(E)?E.value=v[x]:$i(E,v[x])),l.state.value[e][x]=E);else if(typeof E=='function'){const M=w(E,x);I[x]=M,s.actions[x]=E;}}

return Fn(_,I),Fn(fe(_),I),Object.defineProperty(_,'$state',{get:()=>l.state.value[e],set:x=>{p(E=>{Fn(E,x);});}}),l._p.forEach(x=>{Fn(_,i.run(()=>x({store:_,app:l._a,pinia:l,options:s})));}),v&&a&&n.hydrate&&n.hydrate(_.$state,v),u=!0,c=!0,_;}function Od(e,t,n){let l;const o=typeof t=='function';l=o?n:t;function a(i,s){const r=Hm();

return i=i||(r?Ie(Pd,null):null),i&&Da(i),i=Ed,i._s.has(e)||(o?Fd(e,t,l,i):Th(e,l,i)),i._s.get(e);}

return a.$id=e,a;}function Md(e,t){t=Array.isArray(t)?t.slice(0,-1).map(n=>`'${n}'`).join(', ')+` or '${t.at(-1)}'`:`'${t}'`;}const Fe=typeof window<'u',xs=Fe&&'IntersectionObserver'in window,Eh=Fe&&('ontouchstart'in window||window.navigator.maxTouchPoints>0),Dd=Fe&&'matchMedia'in window&&typeof window.matchMedia=='function',al=()=>Dd&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;function Kr(e,t,n){Ph(e,t),t.set(e,n);}function Ph(e,t){if(t.has(e))throw new TypeError('Cannot initialize the same private elements twice on an object');}function Gr(e,t,n){return e.set($d(e,t),n),n;}function vn(e,t){return e.get($d(e,t));}function $d(e,t,n){if(typeof e=='function'?e===t:e.has(t))return arguments.length<3?t:n;

throw new TypeError('Private element is not present on this object');}function Bd(e,t,n){const l=t.length-1;

if(l<0)return e===void 0?n:e;

for(let o=0;o<l;o++){if(e==null)return n;

e=e[t[o]];}

return e==null||e[t[l]]===void 0?n:e[t[l]];}function Bi(e,t,n){return e==null||!t||typeof t!='string'?n:e[t]!==void 0?e[t]:(t=t.replace(/\[(\w+)\]/g,'.$1'),t=t.replace(/^\./,''),Bd(e,t.split('.'),n));}function Lt(e,t,n){if(t===!0)return e===void 0?n:e;

if(t==null||typeof t=='boolean')return n;

if(e!==Object(e)){if(typeof t!='function')return n;

const o=t(e,n);

return typeof o>'u'?n:o;}

if(typeof t=='string')return Bi(e,t,n);

if(Array.isArray(t))return Bd(e,t,n);

if(typeof t!='function')return n;

const l=t(e,n);

return typeof l>'u'?n:l;}function Ld(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;

return Array.from({length:e},(n,l)=>t+l);}function se(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:'px';

if(e==null||e==='')return;

const n=Number(e);

return isNaN(n)?String(e):isFinite(n)?`${n}${t}`:void 0;}function Pl(e){return e!==null&&typeof e=='object'&&!Array.isArray(e);}function Yr(e){let t;

return e!==null&&typeof e=='object'&&((t=Object.getPrototypeOf(e))===Object.prototype||t===null);}function Rd(e){if(e&&'$el'in e){const t=e.$el;

return t?.nodeType===Node.TEXT_NODE?t.nextElementSibling:t;}

return e;}function Nd(e){return Object.keys(e);}function ui(e,t){return t.every(n=>e.hasOwnProperty(n));}function To(e,t){const n={};

for(const l of t)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l]);

return n;}function qr(e,t,n){const l=Object.create(null),o=Object.create(null);

for(const a in e)t.some(i=>i instanceof RegExp?i.test(a):i===a)?l[a]=e[a]:o[a]=e[a];

return[l,o];}function xt(e,t){const n={...e};

return t.forEach(l=>delete n[l]),n;}const zd=/^on[^a-z]/,Hd=e=>zd.test(e),Ih=['onAfterscriptexecute','onAnimationcancel','onAnimationend','onAnimationiteration','onAnimationstart','onAuxclick','onBeforeinput','onBeforescriptexecute','onChange','onClick','onCompositionend','onCompositionstart','onCompositionupdate','onContextmenu','onCopy','onCut','onDblclick','onFocusin','onFocusout','onFullscreenchange','onFullscreenerror','onGesturechange','onGestureend','onGesturestart','onGotpointercapture','onInput','onKeydown','onKeypress','onKeyup','onLostpointercapture','onMousedown','onMousemove','onMouseout','onMouseover','onMouseup','onMousewheel','onPaste','onPointercancel','onPointerdown','onPointerenter','onPointerleave','onPointermove','onPointerout','onPointerover','onPointerup','onReset','onSelect','onSubmit','onTouchcancel','onTouchend','onTouchmove','onTouchstart','onTransitioncancel','onTransitionend','onTransitionrun','onTransitionstart','onWheel'];function Wd(e){const[t,n]=qr(e,[zd]),l=xt(t,Ih),[o,a]=qr(n,['class','style','id','inert',/^data-/]);

return Object.assign(o,t),Object.assign(a,l),[o,a];}function Nt(e){return e==null?[]:Array.isArray(e)?e:[e];}function Fh(e,t){let n=0;const l=function(){for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];

clearTimeout(n),n=setTimeout(()=>e(...a),Me(t));};

return l.clear=()=>{clearTimeout(n);},l.immediate=e,l;}function Et(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;

return Math.max(t,Math.min(n,e));}function Xr(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:'0';

return e+n.repeat(Math.max(0,t-e.length));}function Zr(e,t){return(arguments.length>2&&arguments[2]!==void 0?arguments[2]:'0').repeat(Math.max(0,t-e.length))+e;}function Oh(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;const n=[];let l=0;

for(;l<e.length;)n.push(e.substr(l,t)),l+=t;

return n;}function ft(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;const l={};

for(const o in e)l[o]=e[o];

for(const o in t){const a=e[o],i=t[o];

if(Yr(a)&&Yr(i)){l[o]=ft(a,i,n);continue;}

if(n&&Array.isArray(a)&&Array.isArray(i)){l[o]=n(a,i);continue;}

l[o]=i;}

return l;}function jd(e){return e.map(t=>t.type===ke?jd(t.children):t).flat();}function Qn(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:'';

if(Qn.cache.has(e))return Qn.cache.get(e);

const t=e.replace(/[^a-z]/gi,'-').replace(/\B([A-Z])/g,'-$1').toLowerCase();

return Qn.cache.set(e,t),t;}Qn.cache=new Map;function bl(e,t){if(!t||typeof t!='object')return[];

if(Array.isArray(t))return t.map(n=>bl(e,n)).flat(1);

if(t.suspense)return bl(e,t.ssContent);

if(Array.isArray(t.children))return t.children.map(n=>bl(e,n)).flat(1);

if(t.component){if(Object.getOwnPropertyDescriptor(t.component.provides,e))return[t.component];

if(t.component.subTree)return bl(e,t.component.subTree).flat(1);}

return[];}var vl=new WeakMap,Kn=new WeakMap;class Mh{constructor(t){Kr(this,vl,[]),Kr(this,Kn,0),this.size=t;}get isFull(){return vn(vl,this).length===this.size;}push(t){vn(vl,this)[vn(Kn,this)]=t,Gr(Kn,this,(vn(Kn,this)+1)%this.size);}values(){return vn(vl,this).slice(vn(Kn,this)).concat(vn(vl,this).slice(0,vn(Kn,this)));}clear(){vn(vl,this).length=0,Gr(Kn,this,0);}}function ks(e){const t=et({});Ct(()=>{const l=e();

for(const o in l)t[o]=l[o];},{flush:'sync'});const n={};

for(const l in t)n[l]=O(()=>t[l]);

return n;}function ra(e,t){return e.includes(t);}function Ud(e){return e[2].toLowerCase()+e.slice(3);}const wt=()=>[Function,Array];function Jr(e,t){return t='on'+An(t),!!(e[t]||e[`${t}Once`]||e[`${t}Capture`]||e[`${t}OnceCapture`]||e[`${t}CaptureOnce`]);}function Kd(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),l=1;l<t;l++)n[l-1]=arguments[l];

if(Array.isArray(e))for(const o of e)o(...n);else typeof e=='function'&&e(...n);}function el(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const n=['button','[href]','input:not([type="hidden"])','select','textarea','details:not(:has(> summary))','details > summary','[tabindex]','[contenteditable]:not([contenteditable="false"])','audio[controls]','video[controls]'].map(o=>`${o}${t?':not([tabindex="-1"])':''}:not([disabled], [inert])`).join(', ');let l;try{l=[...e.querySelectorAll(n)];}catch{return[];}

return l.filter(o=>!o.closest('[inert]')).filter(o=>!!o.offsetParent||o.getClientRects().length>0).filter(o=>!o.parentElement?.closest('details:not([open])')||o.tagName==='SUMMARY'&&o.parentElement?.tagName==='DETAILS');}function Gd(e,t,n){let l,o=e.indexOf(document.activeElement);const a=t==='next'?1:-1;do o+=a,l=e[o];while((!l||l.offsetParent==null||!(n?.(l)??!0))&&o<e.length&&o>=0);

return l;}function no(e,t){const n=el(e);

if(t==null)(e===document.activeElement||!e.contains(document.activeElement))&&n[0]?.focus();else if(t==='first')n[0]?.focus();else if(t==='last')n.at(-1)?.focus();else if(typeof t=='number')n[t]?.focus();else{const l=Gd(n,t);l?l.focus():no(e,t==='next'?'first':'last');}}function ua(e,t){if(!(Fe&&typeof CSS<'u'&&typeof CSS.supports<'u'&&CSS.supports(`selector(${t})`)))return null;

try{return!!e&&e.matches(t);}catch{return null;}}function Yd(e){return e.some(t=>Tl(t)?t.type===at?!1:t.type!==ke||Yd(t.children):!0)?e:null;}function Dh(e,t){if(!Fe||e===0)return t(),()=>{};

const n=window.setTimeout(t,e);

return()=>window.clearTimeout(n);}function $h(e,t){const n=e.clientX,l=e.clientY,o=t.getBoundingClientRect(),a=o.left,i=o.top,s=o.right,r=o.bottom;

return n>=a&&n<=s&&l>=i&&l<=r;}function Li(){const e=le(),t=n=>{e.value=n;};

return Object.defineProperty(t,'value',{enumerable:!0,get:()=>e.value,set:n=>e.value=n}),Object.defineProperty(t,'el',{enumerable:!0,get:()=>Rd(e.value)}),t;}function Qr(e){const t=e.key.length===1,n=!e.ctrlKey&&!e.metaKey&&!e.altKey;

return t&&n;}function il(e){return typeof e=='string'||typeof e=='number'||typeof e=='boolean'||typeof e=='bigint';}function Bh(e){const t={};

for(const n in e)t[ht(n)]=e[n];

return t;}function Lh(e){const t=['checked','disabled'];

return Object.fromEntries(Object.entries(e).filter(n=>{let[l,o]=n;

return t.includes(l)?!!o:o!==void 0;}));}const qd=['top','bottom'],Rh=['start','end','left','right'];function Ri(e,t){let[n,l]=e.split(' ');

return l||(l=ra(qd,n)?'start':ra(Rh,n)?'top':'center'),{side:eu(n,t),align:eu(l,t)};}function eu(e,t){return e==='start'?t?'right':'left':e==='end'?t?'left':'right':e;}function ci(e){return{side:{center:'center',top:'bottom',bottom:'top',left:'right',right:'left'}[e.side],align:e.align};}function di(e){return{side:e.side,align:{center:'center',top:'bottom',bottom:'top',left:'right',right:'left'}[e.align]};}function tu(e){return{side:e.align,align:e.side};}function nu(e){return ra(qd,e.side)?'y':'x';}class Ot{constructor(t){const n=document.body.currentCSSZoom??1,l=t instanceof Element,o=l?1+(1-n)/n:1,{x:a,y:i,width:s,height:r}=l?t.getBoundingClientRect():t;this.x=a*o,this.y=i*o,this.width=s*o,this.height=r*o;}get top(){return this.y;}get bottom(){return this.y+this.height;}get left(){return this.x;}get right(){return this.x+this.width;}}function lu(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}};}function Xd(e){if(Array.isArray(e)){const t=document.body.currentCSSZoom??1,n=1+(1-t)/t;

return new Ot({x:e[0]*n,y:e[1]*n,width:0*n,height:0*n});}else return new Ot(e);}function Nh(e){if(e===document.documentElement){if(visualViewport){const t=document.body.currentCSSZoom??1;

return new Ot({x:visualViewport.scale>1?0:visualViewport.offsetLeft,y:visualViewport.scale>1?0:visualViewport.offsetTop,width:visualViewport.width*visualViewport.scale/t,height:visualViewport.height*visualViewport.scale/t});}else return new Ot({x:0,y:0,width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});}else return new Ot(e);}function _s(e){const t=new Ot(e),n=getComputedStyle(e),l=n.transform;

if(l){let o,a,i,s,r;

if(l.startsWith('matrix3d('))o=l.slice(9,-1).split(/, /),a=Number(o[0]),i=Number(o[5]),s=Number(o[12]),r=Number(o[13]);else if(l.startsWith('matrix('))o=l.slice(7,-1).split(/, /),a=Number(o[0]),i=Number(o[3]),s=Number(o[4]),r=Number(o[5]);else return new Ot(t);

const u=n.transformOrigin,c=t.x-s-(1-a)*parseFloat(u),d=t.y-r-(1-i)*parseFloat(u.slice(u.indexOf(' ')+1)),f=a?t.width/a:e.offsetWidth+1,m=i?t.height/i:e.offsetHeight+1;

return new Ot({x:c,y:d,width:f,height:m});}else return new Ot(t);}function hn(e,t,n){if(typeof e.animate>'u')return{finished:Promise.resolve()};

let l;try{l=e.animate(t,n);}catch{return{finished:Promise.resolve()};}

return typeof l.finished>'u'&&(l.finished=new Promise(o=>{l.onfinish=()=>{o(l);};})),l;}const Xo=new WeakMap;function zh(e,t){Object.keys(t).forEach(n=>{if(Hd(n)){const l=Ud(n),o=Xo.get(e);

if(t[n]==null)o?.forEach(a=>{const[i,s]=a;i===l&&(e.removeEventListener(l,s),o.delete(a));});else if(!o||![...o].some(a=>a[0]===l&&a[1]===t[n])){e.addEventListener(l,t[n]);const a=o||new Set;a.add([l,t[n]]),Xo.has(e)||Xo.set(e,a);}}else t[n]==null?e.removeAttribute(n):e.setAttribute(n,t[n]);});}function Hh(e,t){Object.keys(t).forEach(n=>{if(Hd(n)){const l=Ud(n),o=Xo.get(e);o?.forEach(a=>{const[i,s]=a;i===l&&(e.removeEventListener(l,s),o.delete(a));});}else e.removeAttribute(n);});}const ml=2.4,ou=.2126729,au=.7151522,iu=.072175,Wh=.55,jh=.58,Uh=.57,Kh=.62,Ho=.03,su=1.45,Gh=5e-4,Yh=1.25,qh=1.25,ru=.078,uu=12.82051282051282,Wo=.06,cu=.001;function du(e,t){const n=(e.r/255)**ml,l=(e.g/255)**ml,o=(e.b/255)**ml,a=(t.r/255)**ml,i=(t.g/255)**ml,s=(t.b/255)**ml;let r=n*ou+l*au+o*iu,u=a*ou+i*au+s*iu;

if(r<=Ho&&(r+=(Ho-r)**su),u<=Ho&&(u+=(Ho-u)**su),Math.abs(u-r)<Gh)return 0;

let c;

if(u>r){const d=(u**Wh-r**jh)*Yh;c=d<cu?0:d<ru?d-d*uu*Wo:d-Wo;}else{const d=(u**Kh-r**Uh)*qh;c=d>-cu?0:d>-ru?d-d*uu*Wo:d+Wo;}

return c*100;}const ca=.20689655172413793,Xh=e=>e>ca**3?Math.cbrt(e):e/(3*ca**2)+4/29,Zh=e=>e>ca?e**3:3*ca**2*(e-4/29);function Zd(e){const t=Xh,n=t(e[1]);

return[116*n-16,500*(t(e[0]/.95047)-n),200*(n-t(e[2]/1.08883))];}function Jd(e){const t=Zh,n=(e[0]+16)/116;

return[t(n+e[1]/500)*.95047,t(n),t(n-e[2]/200)*1.08883];}const Jh=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],Qh=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055,ey=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],ty=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function Qd(e){const t=Array(3),n=Qh,l=Jh;

for(let o=0;o<3;++o)t[o]=Math.round(Et(n(l[o][0]*e[0]+l[o][1]*e[1]+l[o][2]*e[2]))*255);

return{r:t[0],g:t[1],b:t[2]};}function As(e){let{r:t,g:n,b:l}=e;const o=[0,0,0],a=ty,i=ey;t=a(t/255),n=a(n/255),l=a(l/255);

for(let s=0;s<3;++s)o[s]=i[s][0]*t+i[s][1]*n+i[s][2]*l;

return o;}function Ni(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e);}function ny(e){return Ni(e)&&!/^((rgb|hsl)a?\()?var\(--/.test(e);}const fu=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,ly={rgb:(e,t,n,l)=>({r:e,g:t,b:n,a:l}),rgba:(e,t,n,l)=>({r:e,g:t,b:n,a:l}),hsl:(e,t,n,l)=>vu({h:e,s:t,l:n,a:l}),hsla:(e,t,n,l)=>vu({h:e,s:t,l:n,a:l}),hsv:(e,t,n,l)=>vo({h:e,s:t,v:n,a:l}),hsva:(e,t,n,l)=>vo({h:e,s:t,v:n,a:l})};function an(e){if(typeof e=='number')return{r:(e&16711680)>>16,g:(e&65280)>>8,b:e&255};

if(typeof e=='string'&&fu.test(e)){const{groups:t}=e.match(fu),{fn:n,values:l}=t,o=l.split(/,\s*|\s*\/\s*|\s+/).map((a,i)=>a.endsWith('%')||i>0&&i<3&&['hsl','hsla','hsv','hsva'].includes(n)?parseFloat(a)/100:parseFloat(a));

return ly[n](...o);}else if(typeof e=='string'){let t=e.startsWith('#')?e.slice(1):e;

return[3,4].includes(t.length)?t=t.split('').map(n=>n+n).join(''):[6,8].includes(t.length),ay(t);}else if(typeof e=='object'){if(ui(e,['r','g','b']))return e;

if(ui(e,['h','s','l']))return vo(ef(e));

if(ui(e,['h','s','v']))return vo(e);}

throw new TypeError(`Invalid color: ${e==null?e:String(e)||e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);}function vo(e){const{h:t,s:n,v:l,a:o}=e,a=s=>{const r=(s+t/60)%6;

return l-l*n*Math.max(Math.min(r,4-r,1),0);},i=[a(5),a(3),a(1)].map(s=>Math.round(s*255));

return{r:i[0],g:i[1],b:i[2],a:o};}function vu(e){return vo(ef(e));}function ef(e){const{h:t,s:n,l,a:o}=e,a=l+n*Math.min(l,1-l),i=a===0?0:2-2*l/a;

return{h:t,s:i,v:a,a:o};}function jo(e){const t=Math.round(e).toString(16);

return('00'.substr(0,2-t.length)+t).toUpperCase();}function oy(e){let{r:t,g:n,b:l,a:o}=e;

return`#${[jo(t),jo(n),jo(l),o!==void 0?jo(Math.round(o*255)):''].join('')}`;}function ay(e){e=iy(e);let[t,n,l,o]=Oh(e,2).map(a=>parseInt(a,16));

return o=o===void 0?o:o/255,{r:t,g:n,b:l,a:o};}function iy(e){return e.startsWith('#')&&(e=e.slice(1)),e=e.replace(/([^0-9a-f])/gi,'F'),(e.length===3||e.length===4)&&(e=e.split('').map(t=>t+t).join('')),e.length!==6&&(e=Xr(Xr(e,6),8,'F')),e;}function sy(e,t){const n=Zd(As(e));

return n[0]=n[0]+t*10,Qd(Jd(n));}function ry(e,t){const n=Zd(As(e));

return n[0]=n[0]-t*10,Qd(Jd(n));}function uy(e){const t=an(e);

return As(t)[1];}function tf(e){const t=Math.abs(du(an(0),an(e)));

return Math.abs(du(an(16777215),an(e)))>Math.min(t,50)?'#fff':'#000';}function j(e,t){return n=>Object.keys(e).reduce((l,o)=>{const i=typeof e[o]=='object'&&e[o]!=null&&!Array.isArray(e[o])?e[o]:{type:e[o]};

return n&&o in n?l[o]={...i,default:n[o]}:l[o]=i,t&&!l[o].source&&(l[o].source=t),l;},{});}const Ce=j({class:[String,Array,Object],style:{type:[String,Array,Object],default:null}},'component');function Ye(e,t){const n=Dl();

if(!n)throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);

return n;}function un(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:'composables';const t=Ye(e).type;

return Qn(t?.aliasName||t?.name);}function cy(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ye('injectSelf');const{provides:n}=t;

if(n&&e in n)return n[e];}const Il=Symbol.for('vuetify:defaults');function dy(e){return L(e);}function Vs(){const e=Ie(Il);

if(!e)throw new Error('[Vuetify] Could not find defaults instance');

return e;}function Ln(e,t){const n=Vs(),l=L(e),o=V(()=>{if(Me(t?.disabled))return n.value;

const i=Me(t?.scoped),s=Me(t?.reset),r=Me(t?.root);

if(l.value==null&&!(i||s||r))return n.value;

let u=ft(l.value,{prev:n.value});

if(i)return u;

if(s||r){const c=Number(s||1/0);

for(let d=0;d<=c&&!(!u||!('prev'in u));d++)u=u.prev;

return u&&typeof r=='string'&&r in u&&(u=ft(ft(u,{prev:u}),u[r])),u;}

return u.prev?ft(u.prev,u):u;});

return vt(Il,o),o;}function fy(e,t){return e.props&&(typeof e.props[t]<'u'||typeof e.props[Qn(t)]<'u');}function vy(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vs();const l=Ye('useDefaults');

if(t=t??l.type.name??l.type.__name,!t)throw new Error('[Vuetify] Could not determine component name');

const o=V(()=>n.value?.[e._as??t]),a=new Proxy(e,{get(r,u){const c=Reflect.get(r,u);

if(u==='class'||u==='style')return[o.value?.[u],c].filter(m=>m!=null);

if(fy(l.vnode,u))return c;

const d=o.value?.[u];

if(d!==void 0)return d;

const f=n.value?.global?.[u];

return f!==void 0?f:c;}}),i=le();Ct(()=>{if(o.value){const r=Object.entries(o.value).filter(u=>{let[c]=u;

return c.startsWith(c[0].toUpperCase());});i.value=r.length?Object.fromEntries(r):void 0;}else i.value=void 0;});function s(){const r=cy(Il,l);vt(Il,V(()=>i.value?ft(r?.value??{},i.value):r?.value));}

return{props:a,provideSubDefaults:s};}function $l(e){if(e._setup=e._setup??e.setup,!e.name)return e;

if(e._setup){e.props=j(e.props??{},e.name)();const t=Object.keys(e.props).filter(n=>n!=='class'&&n!=='style');e.filterProps=function(l){return To(l,t);},e.props._as=String,e.setup=function(l,o){const a=Vs();

if(!a.value)return e._setup(l,o);

const{props:i,provideSubDefaults:s}=vy(l,l._as??e.name,a),r=e._setup(i,o);

return s(),r;};}

return e;}function re(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;

return t=>(e?$l:Je)(t);}function $a(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:'div',n=arguments.length>2?arguments[2]:void 0;

return re()({name:n??An(ht(e.replace(/__/g,'-'))),props:{tag:{type:String,default:t},...Ce()},setup(l,o){let{slots:a}=o;

return()=>Tn(l.tag,{class:[e,l.class],style:l.style},a.default?.());}});}function my(e,t,n,l){if(!n||il(e)||il(t))return;

const o=n.get(e);

if(o)o.set(t,l);else{const a=new WeakMap;a.set(t,l),n.set(e,a);}}function gy(e,t,n){if(!n||il(e)||il(t))return null;

const l=n.get(e)?.get(t);

if(typeof l=='boolean')return l;

const o=n.get(t)?.get(e);

return typeof o=='boolean'?o:null;}function Mt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:new WeakMap;

if(e===t)return!0;

if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime()||e!==Object(e)||t!==Object(t))return!1;

const l=Object.keys(e);

if(l.length!==Object.keys(t).length)return!1;

const o=gy(e,t,n);

return o||(my(e,t,n,!0),l.every(a=>Mt(e[a],t[a],n)));}function nf(e){if(typeof e.getRootNode!='function'){for(;e.parentNode;)e=e.parentNode;

return e!==document?null:document;}

const t=e.getRootNode();

return t!==document&&t.getRootNode({composed:!0})!==document?null:t;}const mo='cubic-bezier(0.4, 0, 0.2, 1)',mu='cubic-bezier(0.0, 0, 0.2, 1)',gu='cubic-bezier(0.4, 0, 1, 1)',hy={linear:e=>e,easeInQuad:e=>e**2,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e**2:-1+(4-2*e)*e,easeInCubic:e=>e**3,easeOutCubic:e=>--e**3+1,easeInOutCubic:e=>e<.5?4*e**3:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e**4,easeOutQuart:e=>1- --e**4,easeInOutQuart:e=>e<.5?8*e**4:1-8*--e**4,easeInQuint:e=>e**5,easeOutQuint:e=>1+--e**5,easeInOutQuint:e=>e<.5?16*e**5:1+16*--e**5,instant:e=>1};function Ts(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;

for(;e;){if(t?yy(e):Es(e))return e;

e=e.parentElement;}

return document.scrollingElement;}function da(e,t){const n=[];

if(t&&e&&!t.contains(e))return n;

for(;e&&(Es(e)&&n.push(e),e!==t);)e=e.parentElement;

return n;}function Es(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;

const t=window.getComputedStyle(e),n=t.overflowY==='scroll'||t.overflowY==='auto'&&e.scrollHeight>e.clientHeight,l=t.overflowX==='scroll'||t.overflowX==='auto'&&e.scrollWidth>e.clientWidth;

return n||l;}function yy(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;

const t=window.getComputedStyle(e);

return['scroll','auto'].includes(t.overflowY);}function py(e){for(;e;){if(window.getComputedStyle(e).position==='fixed')return!0;

e=e.offsetParent;}

return!1;}function me(e){const t=Ye('useRender');t.render=e;}function by(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{leading:!0,trailing:!0},l=0,o=0,a=!1,i=0;function s(){clearTimeout(l),a=!1,i=0;}const r=function(){for(var u=arguments.length,c=new Array(u),d=0;d<u;d++)c[d]=arguments[d];

clearTimeout(l);const f=Date.now();i||(i=f);const m=f-Math.max(i,o);function v(){o=Date.now(),l=setTimeout(s,t),e(...c);}a?m>=t?v():n.trailing&&(l=setTimeout(v,t-m)):(a=!0,n.leading&&v());};

return r.clear=s,r.immediate=e,r;}const Te=[String,Function,Object,Array],zi=Symbol.for('vuetify:icons'),Ba=j({icon:{type:Te},tag:{type:[String,Object,Function],required:!0}},'icon'),hu=re()({name:'VComponentIcon',props:Ba(),setup(e,t){let{slots:n}=t;

return()=>{const l=e.icon;

return h(e.tag,null,{default:()=>[e.icon?h(l,null,null):n.default?.()]});};}}),lf=$l({name:'VSvgIcon',inheritAttrs:!1,props:Ba(),setup(e,t){let{attrs:n}=t;

return()=>h(e.tag,ae(n,{style:null}),{default:()=>[T('svg',{class:'v-icon__svg',xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',role:'img','aria-hidden':'true'},[Array.isArray(e.icon)?e.icon.map(l=>Array.isArray(l)?T('path',{d:l[0],'fill-opacity':l[1]},null):T('path',{d:l},null)):T('path',{d:e.icon},null)])]});}});$l({name:'VLigatureIcon',props:Ba(),setup(e){return()=>h(e.tag,null,{default:()=>[e.icon]});}});const of=$l({name:'VClassIcon',props:Ba(),setup(e){return()=>h(e.tag,{class:ce(e.icon)},null);}}),Sy=e=>{const t=Ie(zi);

if(!t)throw new Error('Missing Vuetify Icons provide!');

return{iconData:V(()=>{const l=lt(e);

if(!l)return{component:hu};

let o=l;

if(typeof o=='string'&&(o=o.trim(),o.startsWith('$')&&(o=t.aliases?.[o.slice(1)])),Array.isArray(o))return{component:lf,icon:o};

if(typeof o!='string')return{component:hu,icon:o};

const a=Object.keys(t.sets).find(r=>typeof o=='string'&&o.startsWith(`${r}:`)),i=a?o.slice(a.length+1):o;

return{component:t.sets[a??t.defaultSet].component,icon:i};})};},wy={collapse:'mdi-chevron-up',complete:'mdi-check',cancel:'mdi-close-circle',close:'mdi-close',delete:'mdi-close-circle',clear:'mdi-close-circle',success:'mdi-check-circle',info:'mdi-information',warning:'mdi-alert-circle',error:'mdi-close-circle',prev:'mdi-chevron-left',next:'mdi-chevron-right',checkboxOn:'mdi-checkbox-marked',checkboxOff:'mdi-checkbox-blank-outline',checkboxIndeterminate:'mdi-minus-box',delimiter:'mdi-circle',sortAsc:'mdi-arrow-up',sortDesc:'mdi-arrow-down',expand:'mdi-chevron-down',menu:'mdi-menu',subgroup:'mdi-menu-down',dropdown:'mdi-menu-down',radioOn:'mdi-radiobox-marked',radioOff:'mdi-radiobox-blank',edit:'mdi-pencil',ratingEmpty:'mdi-star-outline',ratingFull:'mdi-star',ratingHalf:'mdi-star-half-full',loading:'mdi-cached',first:'mdi-page-first',last:'mdi-page-last',unfold:'mdi-unfold-more-horizontal',file:'mdi-paperclip',plus:'mdi-plus',minus:'mdi-minus',calendar:'mdi-calendar',treeviewCollapse:'mdi-menu-down',treeviewExpand:'mdi-menu-right',tableGroupCollapse:'mdi-chevron-down',tableGroupExpand:'mdi-chevron-right',eyeDropper:'mdi-eyedropper',upload:'mdi-cloud-upload',color:'mdi-palette',command:'mdi-apple-keyboard-command',ctrl:'mdi-apple-keyboard-control',space:'mdi-keyboard-space',shift:'mdi-apple-keyboard-shift',alt:'mdi-apple-keyboard-option',enter:'mdi-keyboard-return',arrowup:'mdi-arrow-up',arrowdown:'mdi-arrow-down',arrowleft:'mdi-arrow-left',arrowright:'mdi-arrow-right',backspace:'mdi-backspace',play:'mdi-play',pause:'mdi-pause',fullscreen:'mdi-fullscreen',fullscreenExit:'mdi-fullscreen-exit',volumeHigh:'mdi-volume-high',volumeMedium:'mdi-volume-medium',volumeLow:'mdi-volume-low',volumeOff:'mdi-volume-variant-off'},Cy={component:e=>Tn(of,{...e,class:'mdi'})};function xy(){return{svg:{component:lf},class:{component:of}};}function ky(e){const t=xy(),n=e?.defaultSet??'mdi';

return n==='mdi'&&!t.mdi&&(t.mdi=Cy),ft({defaultSet:n,sets:t,aliases:{...wy,vuetify:['M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z',['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z',.6]],'vuetify-outline':'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z','vuetify-play':['m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z',['M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z',.6]]}},e);}function _n(e,t){let n;function l(){n=nl(),n.run(()=>t.length?t(()=>{n?.stop(),l();}):t());}ie(e,o=>{o&&!n?l():o||(n?.stop(),n=void 0);},{immediate:!0}),tt(()=>{n?.stop();});}function je(e,t,n){let l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:d=>d,o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:d=>d;const a=Ye('useProxiedModel'),i=L(e[t]!==void 0?e[t]:n),s=Qn(t),u=V(s!==t?()=>(e[t],!!((a.vnode.props?.hasOwnProperty(t)||a.vnode.props?.hasOwnProperty(s))&&(a.vnode.props?.hasOwnProperty(`onUpdate:${t}`)||a.vnode.props?.hasOwnProperty(`onUpdate:${s}`)))):()=>(e[t],!!(a.vnode.props?.hasOwnProperty(t)&&a.vnode.props?.hasOwnProperty(`onUpdate:${t}`))));_n(()=>!u.value,()=>{ie(()=>e[t],d=>{i.value=d;});});const c=V({get(){const d=e[t];

return l(u.value?d:i.value);},set(d){const f=o(d),m=fe(u.value?e[t]:i.value);m===f||l(m)===d||(i.value=f,a?.emit(`update:${t}`,f));}});

return Object.defineProperty(c,'externalValue',{get:()=>u.value?e[t]:i.value}),c;}const _y={badge:'Badge',open:'Open',close:'Close',dismiss:'Dismiss',confirmEdit:{ok:'OK',cancel:'Cancel'},dataIterator:{noResultsText:'No matching records found',loadingText:'Loading items...'},dataTable:{itemsPerPageText:'Rows per page:',ariaLabel:{sortDescending:'Sorted descending.',sortAscending:'Sorted ascending.',sortNone:'Not sorted.',activateNone:'Activate to remove sorting.',activateDescending:'Activate to sort descending.',activateAscending:'Activate to sort ascending.'},sortBy:'Sort by'},dataFooter:{itemsPerPageText:'Items per page:',itemsPerPageAll:'All',nextPage:'Next page',prevPage:'Previous page',firstPage:'First page',lastPage:'Last page',pageText:'{0}-{1} of {2}'},dateRangeInput:{divider:'to'},datePicker:{itemsSelected:'{0} selected',range:{title:'Select dates',header:'Enter dates'},title:'Select date',header:'Enter date',input:{placeholder:'Enter date'},ariaLabel:{previousMonth:'Previous month',nextMonth:'Next month',selectYear:'Select year',previousYear:'Previous year',nextYear:'Next year',selectMonth:'Select month',selectDate:'{0}',currentDate:'Today, {0}'}},noDataText:'No data available',carousel:{prev:'Previous visual',next:'Next visual',ariaLabel:{delimiter:'Carousel slide {0} of {1}'}},calendar:{moreEvents:'{0} more',today:'Today'},input:{clear:'Clear {0}',prependAction:'{0} prepended action',appendAction:'{0} appended action',otp:'Please enter OTP character {0}'},fileInput:{counter:'{0} files',counterSize:'{0} files ({1} in total)'},fileUpload:{title:'Drag and drop files here',divider:'or',browse:'Browse Files'},timePicker:{am:'AM',pm:'PM',title:'Select Time',hour:'Hour',minute:'Minute',second:'Second'},pagination:{ariaLabel:{root:'Pagination Navigation',next:'Next page',previous:'Previous page',page:'Go to page {0}',currentPage:'Page {0}, Current page',first:'First page',last:'Last page'}},stepper:{next:'Next',prev:'Previous'},rating:{ariaLabel:{item:'Rating {0} of {1}'}},loading:'Loading...',infiniteScroll:{loadMore:'Load more',empty:'No more'},rules:{required:'This field is required',email:'Please enter a valid email',number:'This field can only contain numbers',integer:'This field can only contain integer values',capital:'This field can only contain uppercase letters',maxLength:'You must enter a maximum of {0} characters',minLength:'You must enter a minimum of {0} characters',strictLength:'The length of the entered field is invalid',exclude:'The {0} character is not allowed',notEmpty:'Please choose at least one value',pattern:'Invalid format'},hotkey:{then:'then',ctrl:'Ctrl',command:'Command',space:'Space',shift:'Shift',alt:'Alt',enter:'Enter',escape:'Escape',upArrow:'Up Arrow',downArrow:'Down Arrow',leftArrow:'Left Arrow',rightArrow:'Right Arrow',backspace:'Backspace',option:'Option',plus:'plus',shortcut:'Keyboard shortcut: {0}',or:'or'},video:{play:'Play',pause:'Pause',seek:'Seek',volume:'Volume',showVolume:'Show volume control',mute:'Mute',unmute:'Unmute',enterFullscreen:'Full screen',exitFullscreen:'Exit full screen'},colorPicker:{ariaLabel:{eyedropper:'Select color with eyedropper',hueSlider:'Hue',alphaSlider:'Alpha',redInput:'Red value',greenInput:'Green value',blueInput:'Blue value',alphaInput:'Alpha value',hueInput:'Hue value',saturationInput:'Saturation value',lightnessInput:'Lightness value',hexInput:'HEX value',hexaInput:'HEX with alpha value',changeFormat:'Change color format'}}},yu='$vuetify.',pu=(e,t)=>e.replace(/\{(\d+)\}/g,(n,l)=>String(t[Number(l)])),af=(e,t,n)=>function(l){for(var o=arguments.length,a=new Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];

if(!l.startsWith(yu))return pu(l,a);

const s=l.replace(yu,''),r=e.value&&n.value[e.value],u=t.value&&n.value[t.value];let c=Bi(r,s,null);

return c||(`${l}${e.value}`,c=Bi(u,s,null)),c||(c=l),typeof c!='string'&&(c=l),pu(c,a);};function Ps(e,t){return(n,l)=>new Intl.NumberFormat([e.value,t.value],l).format(n);}function sf(e,t){return Ps(e,t)(.1).includes(',')?',':'.';}function fi(e,t,n){const l=je(e,t,e[t]??n.value);

return l.value=e[t]??n.value,ie(n,o=>{e[t]==null&&(l.value=n.value);}),l;}function rf(e){return t=>{const n=fi(t,'locale',e.current),l=fi(t,'fallback',e.fallback),o=fi(t,'messages',e.messages);

return{name:'vuetify',current:n,fallback:l,messages:o,decimalSeparator:O(()=>sf(n,l)),t:af(n,l,o),n:Ps(n,l),provide:rf({current:n,fallback:l,messages:o})};};}function Ay(e){const t=le(e?.locale??'en'),n=le(e?.fallback??'en'),l=L({en:_y,...e?.messages});

return{name:'vuetify',current:t,fallback:n,messages:l,decimalSeparator:O(()=>e?.decimalSeparator??sf(t,n)),t:af(t,n,l),n:Ps(t,n),provide:rf({current:t,fallback:n,messages:l})};}const fa=Symbol.for('vuetify:locale');function Vy(e){return e.name!=null;}function Ty(e){const t=e?.adapter&&Vy(e?.adapter)?e?.adapter:Ay(e),n=Py(t,e);

return{...t,...n};}function Eo(){const e=Ie(fa);

if(!e)throw new Error('[Vuetify] Could not find injected locale instance');

return e;}function Ey(){return{af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,km:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1};}function Py(e,t){const n=L(t?.rtl??Ey()),l=V(()=>n.value[e.current.value]??!1);

return{isRtl:l,rtl:n,rtlClasses:O(()=>`v-locale--is-${l.value?'rtl':'ltr'}`)};}function qt(){const e=Ie(fa);

if(!e)throw new Error('[Vuetify] Could not find injected rtl instance');

return{isRtl:e.isRtl,rtlClasses:e.rtlClasses};}function Po(e){const t=e.slice(-2).toUpperCase();

switch(!0){case e==='GB-alt-variant':return{firstDay:0,firstWeekSize:4};case e==='001':return{firstDay:1,firstWeekSize:1};case`AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(t):return{firstDay:0,firstWeekSize:1};case`AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(t):return{firstDay:1,firstWeekSize:1};case`AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(t):return{firstDay:1,firstWeekSize:4};case'AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY'.includes(t):return{firstDay:6,firstWeekSize:1};case t==='MV':return{firstDay:5,firstWeekSize:1};case t==='PT':return{firstDay:0,firstWeekSize:4};default:return null;}}function Iy(e,t,n){const l=[];let o=[];const a=uf(e),i=cf(e),s=n??Po(t)?.firstDay??0,r=(a.getDay()-s+7)%7,u=(i.getDay()-s+7)%7;

for(let c=0;c<r;c++){const d=new Date(a);d.setDate(d.getDate()-(r-c)),o.push(d);}

for(let c=1;c<=i.getDate();c++){const d=new Date(e.getFullYear(),e.getMonth(),c);o.push(d),o.length===7&&(l.push(o),o=[]);}

for(let c=1;c<7-u;c++){const d=new Date(i);d.setDate(d.getDate()+c),o.push(d);}

return o.length>0&&l.push(o),l;}function lo(e,t,n){let l=(n??Po(t)?.firstDay??0)%7;[0,1,2,3,4,5,6].includes(l)||(l=0);const o=new Date(e);

for(;o.getDay()!==l;)o.setDate(o.getDate()-1);

return o;}function Fy(e,t){const n=new Date(e),l=((Po(t)?.firstDay??0)+6)%7;

for(;n.getDay()!==l;)n.setDate(n.getDate()+1);

return n;}function uf(e){return new Date(e.getFullYear(),e.getMonth(),1);}function cf(e){return new Date(e.getFullYear(),e.getMonth()+1,0);}function Oy(e){const t=e.split('-').map(Number);

return new Date(t[0],t[1]-1,t[2]);}const My=/^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;function df(e){if(e==null)return new Date;

if(e instanceof Date)return e;

if(typeof e=='string'){let t;

if(My.test(e))return Oy(e);

if(t=Date.parse(e),!isNaN(t))return new Date(t);}

return null;}const bu=new Date(2e3,0,2);function Dy(e,t,n){const l=t??Po(e)?.firstDay??0;

return Ld(7).map(o=>{const a=new Date(bu);

return a.setDate(bu.getDate()+l+o),new Intl.DateTimeFormat(e,{weekday:n??'narrow'}).format(a);});}function $y(e,t,n,l){const o=df(e)??new Date,a=l?.[t];

if(typeof a=='function')return a(o,t,n);

let i={};

switch(t){case'fullDate':i={year:'numeric',month:'short',day:'numeric'};break;case'fullDateWithWeekday':i={weekday:'long',year:'numeric',month:'long',day:'numeric'};break;case'normalDate':const s=o.getDate(),r=new Intl.DateTimeFormat(n,{month:'long'}).format(o);

return`${s} ${r}`;case'normalDateWithWeekday':i={weekday:'short',day:'numeric',month:'short'};break;case'shortDate':i={month:'short',day:'numeric'};break;case'year':i={year:'numeric'};break;case'month':i={month:'long'};break;case'monthShort':i={month:'short'};break;case'monthAndYear':i={month:'long',year:'numeric'};break;case'monthAndDate':i={month:'long',day:'numeric'};break;case'weekday':i={weekday:'long'};break;case'weekdayShort':i={weekday:'short'};break;case'dayOfMonth':return new Intl.NumberFormat(n).format(o.getDate());case'hours12h':i={hour:'numeric',hour12:!0};break;case'hours24h':i={hour:'numeric',hour12:!1};break;case'minutes':i={minute:'numeric'};break;case'seconds':i={second:'numeric'};break;case'fullTime':i={hour:'numeric',minute:'numeric'};break;case'fullTime12h':i={hour:'numeric',minute:'numeric',hour12:!0};break;case'fullTime24h':i={hour:'numeric',minute:'numeric',hour12:!1};break;case'fullDateTime':i={year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric'};break;case'fullDateTime12h':i={year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric',hour12:!0};break;case'fullDateTime24h':i={year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric',hour12:!1};break;case'keyboardDate':i={year:'numeric',month:'2-digit',day:'2-digit'};break;case'keyboardDateTime':return i={year:'numeric',month:'2-digit',day:'2-digit',hour:'numeric',minute:'numeric'},new Intl.DateTimeFormat(n,i).format(o).replace(/, /g,' ');case'keyboardDateTime12h':return i={year:'numeric',month:'2-digit',day:'2-digit',hour:'numeric',minute:'numeric',hour12:!0},new Intl.DateTimeFormat(n,i).format(o).replace(/, /g,' ');case'keyboardDateTime24h':return i={year:'numeric',month:'2-digit',day:'2-digit',hour:'numeric',minute:'numeric',hour12:!1},new Intl.DateTimeFormat(n,i).format(o).replace(/, /g,' ');default:i=a??{timeZone:'UTC',timeZoneName:'short'};}

return new Intl.DateTimeFormat(n,i).format(o);}function By(e,t){const n=e.toJsDate(t),l=n.getFullYear(),o=Zr(String(n.getMonth()+1),2,'0'),a=Zr(String(n.getDate()),2,'0');

return`${l}-${o}-${a}`;}function Ly(e){const[t,n,l]=e.split('-').map(Number);

return new Date(t,n-1,l);}function Ry(e,t){const n=new Date(e);

return n.setMinutes(n.getMinutes()+t),n;}function Ny(e,t){const n=new Date(e);

return n.setHours(n.getHours()+t),n;}function tl(e,t){const n=new Date(e);

return n.setDate(n.getDate()+t),n;}function zy(e,t){const n=new Date(e);

return n.setDate(n.getDate()+t*7),n;}function Hy(e,t){const n=new Date(e);

return n.setDate(1),n.setMonth(n.getMonth()+t),n;}function go(e){return e.getFullYear();}function Wy(e){return e.getMonth();}function jy(e,t,n,l){const o=Po(t),a=n??o?.firstDay??0,i=o?.firstWeekSize??1;

return l!==void 0?Uy(e,t,a,l):Ky(e,t,a,i);}function Uy(e,t,n,l){const o=(7+l-n)%7,a=lo(e,t,n),i=tl(a,6);function s(f){return(7+new Date(f,0,1).getDay()-n)%7;}let r=go(a);r<go(i)&&s(r+1)<=o&&r++;const u=new Date(r,0,1),c=s(r),d=c<=o?tl(u,-c):tl(u,7-c);

return 1+ma(Is(a),ho(d),'weeks');}function Ky(e,t,n,l){const o=lo(e,t,n),a=tl(lo(e,t,n),6);function i(d){const f=new Date(d,0,1);

return 7-ma(f,lo(f,t,n),'days');}let s=go(o);s<go(a)&&i(s+1)>=l&&s++;const r=new Date(s,0,1),u=i(s),c=u>=l?tl(r,u-7):tl(r,u);

return 1+ma(Is(o),ho(c),'weeks');}function Gy(e){return e.getDate();}function Yy(e){return new Date(e.getFullYear(),e.getMonth()+1,1);}function qy(e){return new Date(e.getFullYear(),e.getMonth()-1,1);}function Xy(e){return e.getHours();}function Zy(e){return e.getMinutes();}function Jy(e){return new Date(e.getFullYear(),0,1);}function Qy(e){return new Date(e.getFullYear(),11,31);}function ep(e,t){return va(e,t[0])&&lp(e,t[1]);}function tp(e){const t=new Date(e);

return t instanceof Date&&!isNaN(t.getTime());}function va(e,t){return e.getTime()>t.getTime();}function np(e,t){return va(ho(e),ho(t));}function lp(e,t){return e.getTime()<t.getTime();}function Su(e,t){return e.getTime()===t.getTime();}function op(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear();}function ap(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear();}function ip(e,t){return e.getFullYear()===t.getFullYear();}function ma(e,t,n){const l=new Date(e),o=new Date(t);

switch(n){case'years':return l.getFullYear()-o.getFullYear();case'quarters':return Math.floor((l.getMonth()-o.getMonth()+(l.getFullYear()-o.getFullYear())*12)/4);case'months':return l.getMonth()-o.getMonth()+(l.getFullYear()-o.getFullYear())*12;case'weeks':return Math.floor((l.getTime()-o.getTime())/(1e3*60*60*24*7));case'days':return Math.floor((l.getTime()-o.getTime())/(1e3*60*60*24));case'hours':return Math.floor((l.getTime()-o.getTime())/(1e3*60*60));case'minutes':return Math.floor((l.getTime()-o.getTime())/(1e3*60));case'seconds':return Math.floor((l.getTime()-o.getTime())/1e3);default:return l.getTime()-o.getTime();}}function sp(e,t){const n=new Date(e);

return n.setHours(t),n;}function rp(e,t){const n=new Date(e);

return n.setMinutes(t),n;}function up(e,t){const n=new Date(e);

return n.setMonth(t),n;}function cp(e,t){const n=new Date(e);

return n.setDate(t),n;}function dp(e,t){const n=new Date(e);

return n.setFullYear(t),n;}function ho(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0);}function Is(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59,999);}class fp{constructor(t){this.locale=t.locale,this.formats=t.formats;}date(t){return df(t);}toJsDate(t){return t;}toISO(t){return By(this,t);}parseISO(t){return Ly(t);}addMinutes(t,n){return Ry(t,n);}addHours(t,n){return Ny(t,n);}addDays(t,n){return tl(t,n);}addWeeks(t,n){return zy(t,n);}addMonths(t,n){return Hy(t,n);}getWeekArray(t,n){const l=n!==void 0?Number(n):void 0;

return Iy(t,this.locale,l);}startOfWeek(t,n){const l=n!==void 0?Number(n):void 0;

return lo(t,this.locale,l);}endOfWeek(t){return Fy(t,this.locale);}startOfMonth(t){return uf(t);}endOfMonth(t){return cf(t);}format(t,n){return $y(t,n,this.locale,this.formats);}isEqual(t,n){return Su(t,n);}isValid(t){return tp(t);}isWithinRange(t,n){return ep(t,n);}isAfter(t,n){return va(t,n);}isAfterDay(t,n){return np(t,n);}isBefore(t,n){return!va(t,n)&&!Su(t,n);}isSameDay(t,n){return op(t,n);}isSameMonth(t,n){return ap(t,n);}isSameYear(t,n){return ip(t,n);}setMinutes(t,n){return rp(t,n);}setHours(t,n){return sp(t,n);}setMonth(t,n){return up(t,n);}setDate(t,n){return cp(t,n);}setYear(t,n){return dp(t,n);}getDiff(t,n,l){return ma(t,n,l);}getWeekdays(t,n){const l=t!==void 0?Number(t):void 0;

return Dy(this.locale,l,n);}getYear(t){return go(t);}getMonth(t){return Wy(t);}getWeek(t,n,l){const o=n!==void 0?Number(n):void 0,a=l!==void 0?Number(l):void 0;

return jy(t,this.locale,o,a);}getDate(t){return Gy(t);}getNextMonth(t){return Yy(t);}getPreviousMonth(t){return qy(t);}getHours(t){return Xy(t);}getMinutes(t){return Zy(t);}startOfDay(t){return ho(t);}endOfDay(t){return Is(t);}startOfYear(t){return Jy(t);}endOfYear(t){return Qy(t);}}const vp=Symbol.for('vuetify:date-options'),wu=Symbol.for('vuetify:date-adapter');function mp(e,t){const n=ft({adapter:fp,locale:{af:'af-ZA',bg:'bg-BG',ca:'ca-ES',ckb:'',cs:'cs-CZ',de:'de-DE',el:'el-GR',en:'en-US',et:'et-EE',fa:'fa-IR',fi:'fi-FI',hr:'hr-HR',hu:'hu-HU',he:'he-IL',id:'id-ID',it:'it-IT',ja:'ja-JP',ko:'ko-KR',lv:'lv-LV',lt:'lt-LT',nl:'nl-NL',no:'no-NO',pl:'pl-PL',pt:'pt-PT',ro:'ro-RO',ru:'ru-RU',sk:'sk-SK',sl:'sl-SI',srCyrl:'sr-SP',srLatn:'sr-SP',sv:'sv-SE',th:'th-TH',tr:'tr-TR',az:'az-AZ',uk:'uk-UA',vi:'vi-VN',zhHans:'zh-CN',zhHant:'zh-TW'}},e);

return{options:n,instance:gp(n,t)};}function gp(e,t){const n=et(typeof e.adapter=='function'?new e.adapter({locale:e.locale[t.current.value]??t.current.value,formats:e.formats}):e.adapter);

return ie(t.current,l=>{n.locale=e.locale[l]??l??n.locale;}),n;}const La=['sm','md','lg','xl','xxl'],Hi=Symbol.for('vuetify:display'),Cu={mobileBreakpoint:'lg',thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}},hp=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Cu;

return ft(Cu,e);};function xu(e){return Fe&&!e?window.innerWidth:typeof e=='object'&&e.clientWidth||0;}function ku(e){return Fe&&!e?window.innerHeight:typeof e=='object'&&e.clientHeight||0;}function _u(e){const t=Fe&&!e?window.navigator.userAgent:'ssr';function n(v){return!!t.match(v);}const l=n(/android/i),o=n(/iphone|ipad|ipod/i),a=n(/cordova/i),i=n(/electron/i),s=n(/chrome/i),r=n(/edge/i),u=n(/firefox/i),c=n(/opera/i),d=n(/win/i),f=n(/mac/i),m=n(/linux/i);

return{android:l,ios:o,cordova:a,electron:i,chrome:s,edge:r,firefox:u,opera:c,win:d,mac:f,linux:m,touch:Eh,ssr:t==='ssr'};}function yp(e,t){const{thresholds:n,mobileBreakpoint:l}=hp(e),o=le(ku(t)),a=le(_u(t)),i=et({}),s=le(xu(t));function r(){o.value=ku(),s.value=xu();}function u(){r(),a.value=_u();}

return Ct(()=>{const c=s.value<n.sm,d=s.value<n.md&&!c,f=s.value<n.lg&&!(d||c),m=s.value<n.xl&&!(f||d||c),v=s.value<n.xxl&&!(m||f||d||c),g=s.value>=n.xxl,p=c?'xs':d?'sm':f?'md':m?'lg':v?'xl':'xxl',b=typeof l=='number'?l:n[l],S=s.value<b;i.xs=c,i.sm=d,i.md=f,i.lg=m,i.xl=v,i.xxl=g,i.smAndUp=!c,i.mdAndUp=!(c||d),i.lgAndUp=!(c||d||f),i.xlAndUp=!(c||d||f||m),i.smAndDown=!(f||m||v||g),i.mdAndDown=!(m||v||g),i.lgAndDown=!(v||g),i.xlAndDown=!g,i.name=p,i.height=o.value,i.width=s.value,i.mobile=S,i.mobileBreakpoint=l,i.platform=a.value,i.thresholds=n;}),Fe&&(window.addEventListener('resize',r,{passive:!0}),tt(()=>{window.removeEventListener('resize',r);},!0)),{...fs(i),update:u,ssr:!!t};}const pp=j({mobile:{type:Boolean,default:!1},mobileBreakpoint:[Number,String]},'display');function Fs(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{mobile:null},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();const n=Ie(Hi);

if(!n)throw new Error('Could not find Vuetify display injection');

const l=V(()=>e.mobile?!0:typeof e.mobileBreakpoint=='number'?n.width.value<e.mobileBreakpoint:e.mobileBreakpoint?n.width.value<n.thresholds.value[e.mobileBreakpoint]:e.mobile===null?n.mobile.value:!1);

return{...n,displayClasses:O(()=>t?{[`${t}--mobile`]:l.value}:{}),mobile:l};}const ff=Symbol.for('vuetify:goto');function vf(){return{container:void 0,duration:300,layout:!1,offset:0,easing:'easeInOutCubic',patterns:hy};}function bp(e){return Os(e)??(document.scrollingElement||document.body);}function Os(e){return typeof e=='string'?document.querySelector(e):Rd(e);}function vi(e,t,n){if(typeof e=='number')return t&&n?-e:e;

let l=Os(e),o=0;

for(;l;)o+=t?l.offsetLeft:l.offsetTop,l=l.offsetParent;

return o;}function Sp(e,t){return{rtl:t.isRtl,options:ft(vf(),e)};}async function Au(e,t,n,l){const o=n?'scrollLeft':'scrollTop',a=ft(l?.options??vf(),t),i=l?.rtl.value,s=(typeof e=='number'?e:Os(e))??0,r=a.container==='parent'&&s instanceof HTMLElement?s.parentElement:bp(a.container),u=al()?a.patterns.instant:typeof a.easing=='function'?a.easing:a.patterns[a.easing];

if(!u)throw new TypeError(`Easing function "${a.easing}" not found.`);

let c;

if(typeof s=='number')c=vi(s,n,i);else if(c=vi(s,n,i)-vi(r,n,i),a.layout){const v=window.getComputedStyle(s).getPropertyValue('--v-layout-top');v&&(c-=parseInt(v,10));}

c+=a.offset,c=Cp(r,c,!!i,!!n);const d=r[o]??0;

if(c===d)return Promise.resolve(c);

const f=performance.now();

return new Promise(m=>requestAnimationFrame(function v(g){const b=(g-f)/a.duration,S=Math.floor(d+(c-d)*u(Et(b,0,1)));

if(r[o]=S,b>=1&&Math.abs(S-r[o])<10)return m(c);

if(b>2)return m(r[o]);

requestAnimationFrame(v);}));}function wp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const t=Ie(ff),{isRtl:n}=qt();

if(!t)throw new Error('[Vuetify] Could not find injected goto instance');

const l={...t,rtl:O(()=>t.rtl.value||n.value)};async function o(a,i){return Au(a,ft(e,i),!1,l);}

return o.horizontal=async(a,i)=>Au(a,ft(e,i),!0,l),o;}function Cp(e,t,n,l){const{scrollWidth:o,scrollHeight:a}=e,[i,s]=e===document.scrollingElement?[window.innerWidth,window.innerHeight]:[e.offsetWidth,e.offsetHeight];let r,u;

return l?n?(r=-(o-i),u=0):(r=0,u=o-i):(r=0,u=a+-s),Et(t,r,u);}const yo=Symbol.for('vuetify:theme'),qe=j({theme:String},'theme');function Vu(){return{defaultTheme:'light',prefix:'v-',variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:'#FFFFFF',surface:'#FFFFFF','surface-bright':'#FFFFFF','surface-light':'#EEEEEE','surface-variant':'#424242','on-surface-variant':'#EEEEEE',primary:'#1867C0','primary-darken-1':'#1F5592',secondary:'#48A9A6','secondary-darken-1':'#018786',error:'#B00020',info:'#2196F3',success:'#4CAF50',warning:'#FB8C00'},variables:{'border-color':'#000000','border-opacity':.12,'high-emphasis-opacity':.87,'medium-emphasis-opacity':.6,'disabled-opacity':.38,'idle-opacity':.04,'hover-opacity':.04,'focus-opacity':.12,'selected-opacity':.08,'activated-opacity':.12,'pressed-opacity':.12,'dragged-opacity':.08,'theme-kbd':'#EEEEEE','theme-on-kbd':'#000000','theme-code':'#F5F5F5','theme-on-code':'#000000'}},dark:{dark:!0,colors:{background:'#121212',surface:'#212121','surface-bright':'#ccbfd6','surface-light':'#424242','surface-variant':'#c8c8c8','on-surface-variant':'#000000',primary:'#2196F3','primary-darken-1':'#277CC1',secondary:'#54B6B2','secondary-darken-1':'#48A9A6',error:'#CF6679',info:'#2196F3',success:'#4CAF50',warning:'#FB8C00'},variables:{'border-color':'#FFFFFF','border-opacity':.12,'high-emphasis-opacity':1,'medium-emphasis-opacity':.7,'disabled-opacity':.5,'idle-opacity':.1,'hover-opacity':.04,'focus-opacity':.12,'selected-opacity':.08,'activated-opacity':.12,'pressed-opacity':.16,'dragged-opacity':.08,'theme-kbd':'#424242','theme-on-kbd':'#FFFFFF','theme-code':'#343434','theme-on-code':'#CCCCCC'}}},stylesheetId:'vuetify-theme-stylesheet',scoped:!1,unimportant:!1,utilities:!0};}function xp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vu();const t=Vu();

if(!e)return{...t,isDisabled:!0};

const n={};

for(const[l,o]of Object.entries(e.themes??{})){const a=o.dark||l==='dark'?t.themes?.dark:t.themes?.light;n[l]=ft(a,o);}

return ft(t,{...e,themes:n});}function Gn(e,t,n,l){e.push(`${Vp(t,l)} {
`,...n.map(o=>`  ${o};
`),`}
`);}function Tu(e,t){const n=e.dark?2:1,l=e.dark?1:2,o=[];

for(const[a,i]of Object.entries(e.colors)){const s=an(i);o.push(`--${t}theme-${a}: ${s.r},${s.g},${s.b}`),a.startsWith('on-')||o.push(`--${t}theme-${a}-overlay-multiplier: ${uy(i)>.18?n:l}`);}

for(const[a,i]of Object.entries(e.variables)){const s=typeof i=='string'&&i.startsWith('#')?an(i):void 0,r=s?`${s.r}, ${s.g}, ${s.b}`:void 0;o.push(`--${t}${a}: ${r??i}`);}

return o;}function kp(e,t,n){const l={};

if(n){for(const o of['lighten','darken']){const a=o==='lighten'?sy:ry;

for(const i of Ld(n[o],1))l[`${e}-${o}-${i}`]=oy(a(an(t),i));}}

return l;}function _p(e,t){if(!t)return{};

let n={};

for(const l of t.colors){const o=e[l];o&&(n={...n,...kp(l,o,t)});}

return n;}function Ap(e){const t={};

for(const n of Object.keys(e)){if(n.startsWith('on-')||e[`on-${n}`])continue;

const l=`on-${n}`,o=an(e[n]);t[l]=tf(o);}

return t;}function Vp(e,t){if(!t)return e;

const n=`:where(${t})`;

return e===':root'?n:`${n} ${e}`;}function Tp(e,t,n){const l=Ep(e,t);l&&(l.innerHTML=n);}function Ep(e,t){if(!Fe)return null;

let n=document.getElementById(e);

return n||(n=document.createElement('style'),n.id=e,n.type='text/css',t&&n.setAttribute('nonce',t),document.head.appendChild(n)),n;}function Pp(e){const t=xp(e),n=le(t.defaultTheme),l=L(t.themes),o=le('light'),a=V({get(){return n.value==='system'?o.value:n.value;},set(S){n.value=S;}}),i=V(()=>{const S={};

for(const[w,y]of Object.entries(l.value)){const _={...y.colors,..._p(y.colors,t.variations)};S[w]={...y,colors:{..._,...Ap(_)}};}

return S;}),s=O(()=>i.value[a.value]),r=O(()=>n.value==='system'),u=V(()=>{const S=[],w=t.unimportant?'':' !important',y=t.scoped?t.prefix:'';s.value?.dark&&Gn(S,':root',['color-scheme: dark'],t.scope),Gn(S,':root',Tu(s.value,t.prefix),t.scope);

for(const[k,I]of Object.entries(i.value))Gn(S,`.${t.prefix}theme--${k}`,[`color-scheme: ${I.dark?'dark':'normal'}`,...Tu(I,t.prefix)],t.scope);

if(t.utilities){const k=[],I=[],x=new Set(Object.values(i.value).flatMap(E=>Object.keys(E.colors)));

for(const E of x)E.startsWith('on-')?Gn(I,`.${E}`,[`color: rgb(var(--${t.prefix}theme-${E}))${w}`],t.scope):(Gn(k,`.${y}bg-${E}`,[`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${E}-overlay-multiplier)`,`background-color: rgb(var(--${t.prefix}theme-${E}))${w}`,`color: rgb(var(--${t.prefix}theme-on-${E}))${w}`],t.scope),Gn(I,`.${y}text-${E}`,[`color: rgb(var(--${t.prefix}theme-${E}))${w}`],t.scope),Gn(I,`.${y}border-${E}`,[`--${t.prefix}border-color: var(--${t.prefix}theme-${E})`],t.scope));

t.layers?S.push(`@layer background {
`,...k.map(E=>`  ${E}`),`}
`,`@layer foreground {
`,...I.map(E=>`  ${E}`),`}
`):S.push(...k,...I);}

let _=S.map((k,I)=>I===0?k:`    ${k}`).join('');

return t.layers&&(_=`@layer vuetify.theme {
`+S.map(k=>`  ${k}`).join('')+`
}`),_;}),c=O(()=>t.isDisabled?void 0:`${t.prefix}theme--${a.value}`),d=O(()=>Object.keys(i.value));

if(Dd){let w=function(){o.value=S.matches?'dark':'light';};var b=w;const S=window.matchMedia('(prefers-color-scheme: dark)');w(),S.addEventListener('change',w,{passive:!0}),os()&&tt(()=>{S.removeEventListener('change',w);});}

function f(S){if(t.isDisabled)return;

const w=S._context.provides.usehead;

if(w){let k=function(){return{style:[{textContent:u.value,id:t.stylesheetId,nonce:t.cspNonce||!1}]};};var y=k;

if(w.push){const I=w.push(k);Fe&&ie(u,()=>{I.patch(k);});}else Fe?(w.addHeadObjs(O(k)),Ct(()=>w.updateDOM())):w.addHeadObjs(k());}else{let k=function(){Tp(t.stylesheetId,t.cspNonce,u.value);};var _=k;Fe?ie(u,k,{immediate:!0}):k();}}function m(S){S!=='system'&&!d.value.includes(S)||(a.value=S);}function v(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:d.value;const w=S.indexOf(a.value),y=w===-1?0:(w+1)%S.length;m(S[y]);}function g(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:['light','dark'];v(S);}const p=new Proxy(a,{get(S,w){return Reflect.get(S,w);},set(S,w,y){return w==='value'&&Md(`theme.global.name.value = ${y}`,`theme.change('${y}')`),Reflect.set(S,w,y);}});

return{install:f,change:m,cycle:v,toggle:g,isDisabled:t.isDisabled,isSystem:r,name:a,themes:l,current:s,computedThemes:i,prefix:t.prefix,themeClasses:c,styles:u,global:{name:p,current:s}};}function ot(e){Ye('provideTheme');const t=Ie(yo,null);

if(!t)throw new Error('Could not find Vuetify theme injection');

const n=O(()=>e.theme??t.name.value),a={...t,name:n,current:O(()=>t.themes.value[n.value]),themeClasses:O(()=>t.isDisabled?void 0:`${t.prefix}theme--${n.value}`)};

return vt(yo,a),a;}function Ra(){Ye('useTheme');const e=Ie(yo,null);

if(!e)throw new Error('Could not find Vuetify theme injection');

return e;}function sl(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:'content';const n=Li(),l=L();

if(Fe){const o=new ResizeObserver(a=>{e?.(a,o),a.length&&(t==='content'?l.value=a[0].contentRect:l.value=a[0].target.getBoundingClientRect());});yt(()=>{o.disconnect();}),ie(()=>n.el,(a,i)=>{i&&(o.unobserve(i),l.value=void 0),a&&o.observe(a);},{flush:'post'});}

return{resizeRef:n,contentRect:Al(l)};}const ga=Symbol.for('vuetify:layout'),mf=Symbol.for('vuetify:layout-item'),Eu=1e3,Ip=j({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},'layout'),Fp=j({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},'layout-item');function Op(){const e=Ie(ga);

if(!e)throw new Error('[Vuetify] Could not find injected layout');

return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles};}function Mp(e){const t=Ie(ga);

if(!t)throw new Error('[Vuetify] Could not find injected layout');

const n=e.id??`layout-item-${Gt()}`,l=Ye('useLayoutItem');vt(mf,{id:n});const o=le(!1);hs(()=>o.value=!0),Gc(()=>o.value=!1);const{layoutItemStyles:a,layoutItemScrimStyles:i}=t.register(l,{...e,active:V(()=>o.value?!1:e.active.value),id:n});

return yt(()=>t.unregister(n)),{layoutItemStyles:a,layoutRect:t.layoutRect,layoutItemScrimStyles:i};}const Dp=(e,t,n,l)=>{let o={top:0,left:0,right:0,bottom:0};const a=[{id:'',layer:{...o}}];

for(const i of e){const s=t.get(i),r=n.get(i),u=l.get(i);

if(!s||!r||!u)continue;

const c={...o,[s.value]:parseInt(o[s.value],10)+(u.value?parseInt(r.value,10):0)};a.push({id:i,layer:c}),o=c;}

return a;};function $p(e){const t=Ie(ga,null),n=V(()=>t?t.rootZIndex.value-100:Eu),l=L([]),o=et(new Map),a=et(new Map),i=et(new Map),s=et(new Map),r=et(new Map),{resizeRef:u,contentRect:c}=sl(),d=V(()=>{const k=new Map,I=e.overlaps??[];

for(const x of I.filter(E=>E.includes(':'))){const[E,M]=x.split(':');

if(!l.value.includes(E)||!l.value.includes(M))continue;

const z=o.get(E),P=o.get(M),$=a.get(E),U=a.get(M);!z||!P||!$||!U||(k.set(M,{position:z.value,amount:parseInt($.value,10)}),k.set(E,{position:P.value,amount:-parseInt(U.value,10)}));}

return k;}),f=V(()=>{const k=[...new Set([...i.values()].map(x=>x.value))].sort((x,E)=>x-E),I=[];

for(const x of k){const E=l.value.filter(M=>i.get(M)?.value===x);I.push(...E);}

return Dp(I,o,a,s);}),m=V(()=>!Array.from(r.values()).some(k=>k.value)),v=V(()=>f.value[f.value.length-1].layer),g=O(()=>({'--v-layout-left':se(v.value.left),'--v-layout-right':se(v.value.right),'--v-layout-top':se(v.value.top),'--v-layout-bottom':se(v.value.bottom),...m.value?void 0:{transition:'none'}})),p=V(()=>f.value.slice(1).map((k,I)=>{let{id:x}=k;const{layer:E}=f.value[I],M=a.get(x),z=o.get(x);

return{id:x,...E,size:Number(M.value),position:z.value};})),b=k=>p.value.find(I=>I.id===k),S=Ye('createLayout'),w=le(!1);

return Yt(()=>{w.value=!0;}),vt(ga,{register:(k,I)=>{let{id:x,order:E,position:M,layoutSize:z,elementSize:P,active:$,disableTransitions:U,absolute:Y}=I;i.set(x,E),o.set(x,M),a.set(x,z),s.set(x,$),U&&r.set(x,U);const ee=bl(mf,S?.vnode).indexOf(k);ee>-1?l.value.splice(ee,0,x):l.value.push(x);const te=V(()=>p.value.findIndex(R=>R.id===x)),Se=V(()=>n.value+f.value.length*2-te.value*2),J=V(()=>{const R=M.value==='left'||M.value==='right',q=M.value==='right',ye=M.value==='bottom',Q=P.value??z.value,xe=Q===0?'%':'px',X={[M.value]:0,zIndex:Se.value,transform:`translate${R?'X':'Y'}(${($.value?0:-(Q===0?100:Q))*(q||ye?-1:1)}${xe})`,position:Y.value||n.value!==Eu?'absolute':'fixed',...m.value?void 0:{transition:'none'}};

if(!w.value)return X;

const _e=p.value[te.value],Qe=d.value.get(x);

return Qe&&(_e[Qe.position]+=Qe.amount),{...X,height:R?`calc(100% - ${_e.top}px - ${_e.bottom}px)`:P.value?`${P.value}px`:void 0,left:q?void 0:`${_e.left}px`,right:q?`${_e.right}px`:void 0,top:M.value!=='bottom'?`${_e.top}px`:void 0,bottom:M.value!=='top'?`${_e.bottom}px`:void 0,width:R?P.value?`${P.value}px`:void 0:`calc(100% - ${_e.left}px - ${_e.right}px)`};}),ue=V(()=>({zIndex:Se.value-1}));

return{layoutItemStyles:J,layoutItemScrimStyles:ue,zIndex:Se};},unregister:k=>{i.delete(k),o.delete(k),a.delete(k),s.delete(k),r.delete(k),l.value=l.value.filter(I=>I!==k);},mainRect:v,mainStyles:g,getLayoutItem:b,items:p,layoutRect:c,rootZIndex:n}),{layoutClasses:O(()=>['v-layout',{'v-layout--full-height':e.fullHeight}]),layoutStyles:O(()=>({zIndex:t?n.value:void 0,position:t?'relative':void 0,overflow:t?'hidden':void 0})),getLayoutItem:b,items:p,layoutRect:c,layoutRef:u};}function gf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{blueprint:t,...n}=e,l=ft(t,n),{aliases:o={},components:a={},directives:i={}}=l,s=nl();

return s.run(()=>{const r=dy(l.defaults),u=yp(l.display,l.ssr),c=Pp(l.theme),d=ky(l.icons),f=Ty(l.locale),m=mp(l.date,f),v=Sp(l.goTo,f);function g(b){for(const w in i)b.directive(w,i[w]);

for(const w in a)b.component(w,a[w]);

for(const w in o)b.component(w,$l({...o[w],name:w,aliasName:o[w].name}));

const S=nl();

if(S.run(()=>{c.install(b);}),b.onUnmount(()=>S.stop()),b.provide(Il,r),b.provide(Hi,u),b.provide(yo,c),b.provide(zi,d),b.provide(fa,f),b.provide(vp,m.options),b.provide(wu,m.instance),b.provide(ff,v),Fe&&l.ssr){if(b.$nuxt)b.$nuxt.hook('app:suspense:resolve',()=>{u.update();});else{const{mount:w}=b;b.mount=function(){const y=w(...arguments);

return Be(()=>u.update()),b.mount=w,y;};}}

b.mixin({computed:{$vuetify(){return et({defaults:gl.call(this,Il),display:gl.call(this,Hi),theme:gl.call(this,yo),icons:gl.call(this,zi),locale:gl.call(this,fa),date:gl.call(this,wu)});}}});}function p(){s.stop();}

return{install:g,unmount:p,defaults:r,display:u,theme:c,icons:d,locale:f,date:m,goTo:v};});}const Bp='3.11.8';gf.version=Bp;function gl(e){const t=this.$,n=t.parent?.provides??t.vnode.appContext?.provides;

if(n&&e in n)return n[e];}const oo=3e3,yl=Od('notify',()=>{const e=L(!1),t=L('info'),n=L(''),l=L('');let o=null,a=0,i=oo;function s(m){a=Date.now()+m,o=setTimeout(()=>{u();},m);}function r(m,v,g=''){o&&clearTimeout(o),t.value=m,n.value=v,l.value=g,e.value=!0,i=oo,s(oo);}function u(){e.value=!1,o&&(clearTimeout(o),o=null);}function c(){if(o){if(i=a-Date.now(),i<=0){u();

return;}

clearTimeout(o),o=null;}}function d(){o||i<=0||s(i);}function f(){o&&(clearTimeout(o),o=null);}

return{isVisible:e,type:t,title:n,message:l,show:r,hide:u,pause:c,resume:d,cleanup:f};}),Sl={show:(e,t,n)=>{yl().show(e,t,n);},success:(e,t)=>{yl().show('success',e,t);},error:(e,t)=>{yl().show('error',e,t);},warning:(e,t)=>{yl().show('warning',e,t);},info:(e,t)=>{yl().show('info',e,t);}};function hf(){const e=L(!1),t=L('Carregando...');function n(o){t.value=o??'Carregando...',e.value=!0;}function l(){e.value=!1;}

return{isActive:e,message:t,show:n,hide:l};}let mi=null;function Wi(){return mi||(mi=hf()),mi;}const Lp={show:e=>Wi().show(e),hide:()=>Wi().hide()};function Rp(){return Wi();}const ji=Od('confirm',()=>{const e=L(null);

return{setConfirmRef:l=>{e.value=l;},show:(l,o,a)=>e.value?e.value.confirmDialog(l,o,a):Promise.resolve(!1)};}),Ui={show:(e,t,n)=>ji().show(e,t,n)};function Np(e){const t=e._context,n=t?.provides,l=e.config.globalProperties,o=n?.vuetify||n?.$vuetify||l.$vuetify||l.vuetify,a=n&&Object.getOwnPropertySymbols(n).some(r=>{const u=r.toString();

return u.includes('vuetify')||u.includes('Vuetify');}),i=t?.components&&Object.keys(t.components).some(r=>r.startsWith('V'));}function Ms(e){return ks(()=>{const{class:t,style:n}=zp(e);

return{colorClasses:t,colorStyles:n};});}function Kt(e){const{colorClasses:t,colorStyles:n}=Ms(()=>({text:lt(e)}));

return{textColorClasses:t,textColorStyles:n};}function zt(e){const{colorClasses:t,colorStyles:n}=Ms(()=>({background:lt(e)}));

return{backgroundColorClasses:t,backgroundColorStyles:n};}function zp(e){const t=lt(e),n=[],l={};

if(t.background){if(Ni(t.background)){if(l.backgroundColor=t.background,!t.text&&ny(t.background)){const o=an(t.background);

if(o.a==null||o.a===1){const a=tf(o);l.color=a,l.caretColor=a;}}}else n.push(`bg-${t.background}`);}

return t.text&&(Ni(t.text)?(l.color=t.text,l.caretColor=t.text):n.push(`text-${t.text}`)),{class:n,style:l};}const Hp=['dotted','dashed','solid','double'],Wp=j({color:String,contentOffset:[Number,String,Array],gradient:Boolean,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,variant:{type:String,default:'solid',validator:e=>Hp.includes(e)},...Ce(),...qe()},'VDivider'),po=re()({name:'VDivider',props:Wp(),setup(e,t){let{attrs:n,slots:l}=t;const{themeClasses:o}=ot(e),{textColorClasses:a,textColorStyles:i}=Kt(()=>e.color),s=V(()=>{const u={};

return e.length&&(u[e.vertical?'height':'width']=se(e.length)),e.thickness&&(u[e.vertical?'borderRightWidth':'borderTopWidth']=se(e.thickness)),u;}),r=O(()=>{const u=Array.isArray(e.contentOffset)?e.contentOffset[0]:e.contentOffset,c=Array.isArray(e.contentOffset)?e.contentOffset[1]:0;

return{marginBlock:e.vertical&&u?se(u):void 0,marginInline:!e.vertical&&u?se(u):void 0,transform:c?`translate${e.vertical?'X':'Y'}(${se(c)})`:void 0};});

return me(()=>{const u=T('hr',{class:ce([{'v-divider':!0,'v-divider--gradient':e.gradient&&!l.default,'v-divider--inset':e.inset,'v-divider--vertical':e.vertical},o.value,a.value,e.class]),style:he([s.value,i.value,{'--v-border-opacity':e.opacity},{'border-style':e.variant},e.style]),'aria-orientation':!n.role||n.role==='separator'?e.vertical?'vertical':'horizontal':void 0,role:`${n.role||'separator'}`},null);

return l.default?T('div',{class:ce(['v-divider__wrapper',{'v-divider__wrapper--gradient':e.gradient,'v-divider__wrapper--inset':e.inset,'v-divider__wrapper--vertical':e.vertical}])},[u,T('div',{class:'v-divider__content',style:he(r.value)},[l.default()]),u]):u;}),{};}}),jp={class:'d-flex flex-wrap ga-4'},Up={class:'d-flex flex-wrap ga-4'},Kp={class:'d-flex flex-wrap ga-4 mb-4'},Gp={class:'d-flex flex-wrap ga-4'},Yp=Je({__name:'ButtonsPlayground',setup(e){function t(n){Sl.info('Ação',`Clicou em: ${n}`);}

return(n,l)=>{const o=nt('FzIconToolTip'),a=nt('SectionCard');

return Ve(),$e(a,{title:'FzIconToolTip'},{description:H(()=>[...l[8]||(l[8]=[we(' Botão icônico com tooltip. Útil para ações rápidas em tabelas e listas. ',-1)])]),default:H(()=>[l[9]||(l[9]=T('div',{class:'text-subtitle-2 mb-2'},'Variantes de cor',-1)),T('div',jp,[h(o,{icon:'mdi-pencil',tooltip:'Editar',color:'primary',onClick:l[0]||(l[0]=i=>t('Editar'))}),h(o,{icon:'mdi-delete',tooltip:'Excluir',color:'error',onClick:l[1]||(l[1]=i=>t('Excluir'))}),h(o,{icon:'mdi-content-save',tooltip:'Salvar',color:'success',onClick:l[2]||(l[2]=i=>t('Salvar'))}),h(o,{icon:'mdi-download',tooltip:'Download',color:'info',onClick:l[3]||(l[3]=i=>t('Download'))}),h(o,{icon:'mdi-cog',tooltip:'Configurações',color:'warning',onClick:l[4]||(l[4]=i=>t('Configurações'))})]),h(po,{class:'my-4'}),l[10]||(l[10]=T('div',{class:'text-subtitle-2 mb-2'},'Modo botão (as-button)',-1)),T('div',Up,[h(o,{icon:'mdi-pencil',tooltip:'Clique para editar','as-button':'',color:'primary',onClick:l[5]||(l[5]=i=>t('Editar (botão)'))}),h(o,{icon:'mdi-delete',tooltip:'Clique para excluir','as-button':'',color:'error',onClick:l[6]||(l[6]=i=>t('Excluir (botão)'))}),h(o,{icon:'mdi-content-save',tooltip:'Salvar alterações','as-button':'',color:'success',onClick:l[7]||(l[7]=i=>t('Salvar (botão)'))})]),h(po,{class:'my-4'}),l[11]||(l[11]=T('div',{class:'text-subtitle-2 mb-2'},'Desabilitado sem tooltip',-1)),T('div',Kp,[h(o,{icon:'mdi-pencil',tooltip:'Editar',disabled:'',color:'primary'}),h(o,{icon:'mdi-delete',tooltip:'Excluir',disabled:'',color:'error'}),h(o,{icon:'mdi-pencil',tooltip:'Editar (desabilitado)','as-button':'',disabled:'',color:'primary'})]),l[12]||(l[12]=T('div',{class:'text-subtitle-2 mb-2'},'Desabilitado com motivo (disabledTooltip)',-1)),T('div',Gp,[h(o,{icon:'mdi-pencil',tooltip:'Editar',disabled:'','disabled-tooltip':'Sem permissão para editar',color:'primary'}),h(o,{icon:'mdi-delete',tooltip:'Excluir',disabled:'','disabled-tooltip':'Exclusão bloqueada',color:'error'}),h(o,{icon:'mdi-content-save',tooltip:'Salvar alterações','as-button':'',disabled:'','disabled-tooltip':'Preencha todos os campos obrigatórios',color:'primary'})])]),_:1});};}}),qp={class:'d-flex flex-wrap ga-4'},Xp={style:{'min-width':'280px','max-width':'360px'}},Zp={style:{'min-width':'280px','max-width':'360px'}},Jp={style:{'min-width':'280px','max-width':'360px'}},Qp={class:'d-flex flex-wrap ga-4'},eb={style:{'min-width':'280px','max-width':'360px'}},tb={style:{'min-width':'280px','max-width':'360px'}},nb={style:{'min-width':'280px','max-width':'360px'}},lb={class:'mt-2 text-caption text-medium-emphasis'},ob={class:'d-flex flex-wrap ga-4'},ab={style:{'min-width':'280px','max-width':'360px'}},ib={style:{'min-width':'280px','max-width':'360px'}},sb={style:{'min-width':'280px','max-width':'360px'}},rb={style:{'min-width':'280px','max-width':'360px'}},ub={class:'d-flex flex-wrap ga-4'},cb={style:{'min-width':'280px','max-width':'360px'}},db={style:{'min-width':'280px','max-width':'360px'}},fb={style:{'min-width':'280px','max-width':'360px'}},vb={class:'d-flex flex-wrap ga-4'},mb={style:{'min-width':'280px','max-width':'360px'}},gb={style:{'min-width':'280px','max-width':'360px'}},hb={class:'d-flex flex-wrap ga-6'},yb={style:{'min-width':'400px','max-width':'600px'}},pb={style:{'min-width':'400px','max-width':'600px'}},bb={style:{'min-width':'400px','max-width':'600px'}},Sb=Je({__name:'InputsPlayground',setup(e){const t=L(''),n=L(''),l=L('user@example.com'),o=L(0),a=L(0),i=L(150.5),s=L(0),r=L(0),u=L(42),c=L(0),d=L(''),f=L(''),m=L('11999999999'),v=L(''),g=L(''),p=L({}),b=L({}),S=L({zipCode:'01001000',street:'Praça da Sé',number:'1',complement:'Centro',neighborhood:'Sé',city:'São Paulo',state:'SP'});

return(w,y)=>{const _=nt('FzEmailField'),k=nt('SectionCard'),I=nt('FzMoneyField'),x=nt('FzNumberField'),E=nt('FzPhoneField'),M=nt('FzZipCodeField'),z=nt('FzFullAddress');

return Ve(),ol(ke,null,[h(k,{title:'FzEmailField'},{description:H(()=>[...y[18]||(y[18]=[we(' Campo de e-mail com validação automática e ícone dinâmico. ',-1)])]),default:H(()=>[T('div',qp,[T('div',Xp,[h(_,{modelValue:t.value,'onUpdate:modelValue':y[0]||(y[0]=P=>t.value=P),label:'E-mail'},null,8,['modelValue'])]),T('div',Zp,[h(_,{modelValue:n.value,'onUpdate:modelValue':y[1]||(y[1]=P=>n.value=P),label:'E-mail (obrigatório)',required:''},null,8,['modelValue'])]),T('div',Jp,[h(_,{modelValue:l.value,'onUpdate:modelValue':y[2]||(y[2]=P=>l.value=P),label:'E-mail (desabilitado)',disabled:''},null,8,['modelValue'])])])]),_:1}),h(k,{title:'FzMoneyField'},{description:H(()=>[...y[19]||(y[19]=[we(' Campo monetário com formatação automática em Real (BRL). ',-1)])]),default:H(()=>[T('div',Qp,[T('div',eb,[h(I,{modelValue:o.value,'onUpdate:modelValue':y[3]||(y[3]=P=>o.value=P),label:'Preço'},null,8,['modelValue'])]),T('div',tb,[h(I,{modelValue:a.value,'onUpdate:modelValue':y[4]||(y[4]=P=>a.value=P),label:'Com valor máximo',max:1e3},null,8,['modelValue'])]),T('div',nb,[h(I,{modelValue:i.value,'onUpdate:modelValue':y[5]||(y[5]=P=>i.value=P),label:'Desabilitado',disabled:''},null,8,['modelValue'])])]),T('div',lb,' Valor: '+Ge(o.value),1)]),_:1}),h(k,{title:'FzNumberField'},{description:H(()=>[...y[20]||(y[20]=[we(' Campo numérico com formatação de milhar e casas decimais. ',-1)])]),default:H(()=>[T('div',ob,[T('div',ab,[h(x,{modelValue:s.value,'onUpdate:modelValue':y[6]||(y[6]=P=>s.value=P),label:'Quantidade','decimal-places':0},null,8,['modelValue'])]),T('div',ib,[h(x,{modelValue:r.value,'onUpdate:modelValue':y[7]||(y[7]=P=>r.value=P),label:'Com decimais','decimal-places':2},null,8,['modelValue'])]),T('div',sb,[h(x,{modelValue:u.value,'onUpdate:modelValue':y[8]||(y[8]=P=>u.value=P),label:'Desabilitado',disabled:'','decimal-places':0},null,8,['modelValue'])]),T('div',rb,[h(x,{modelValue:c.value,'onUpdate:modelValue':y[9]||(y[9]=P=>c.value=P),label:'Negativo permitido','decimal-places':2,'allow-negative':!0},null,8,['modelValue'])])])]),_:1}),h(k,{title:'FzPhoneField'},{description:H(()=>[...y[21]||(y[21]=[we(' Campo de telefone com máscara automática (fixo ou celular). ',-1)])]),default:H(()=>[T('div',ub,[T('div',cb,[h(E,{modelValue:d.value,'onUpdate:modelValue':y[10]||(y[10]=P=>d.value=P),label:'Telefone'},null,8,['modelValue'])]),T('div',db,[h(E,{modelValue:f.value,'onUpdate:modelValue':y[11]||(y[11]=P=>f.value=P),label:'Celular',icon:'mdi-cellphone'},null,8,['modelValue'])]),T('div',fb,[h(E,{modelValue:m.value,'onUpdate:modelValue':y[12]||(y[12]=P=>m.value=P),label:'Desabilitado',disabled:''},null,8,['modelValue'])])])]),_:1}),h(k,{title:'FzZipCodeField'},{description:H(()=>[...y[22]||(y[22]=[we(' Campo de CEP com busca automática via ViaCEP. ',-1)])]),default:H(()=>[T('div',vb,[T('div',mb,[h(M,{modelValue:v.value,'onUpdate:modelValue':y[13]||(y[13]=P=>v.value=P),label:'CEP'},null,8,['modelValue'])]),T('div',gb,[h(M,{modelValue:g.value,'onUpdate:modelValue':y[14]||(y[14]=P=>g.value=P),label:'Desabilitado',disabled:''},null,8,['modelValue'])])])]),_:1}),h(k,{title:'FzFullAddress'},{description:H(()=>[...y[23]||(y[23]=[we(' Formulário completo de endereço com busca por CEP. ',-1)])]),default:H(()=>[T('div',hb,[T('div',yb,[y[24]||(y[24]=T('div',{class:'text-subtitle-2 mb-2'},'Padrão',-1)),h(z,{modelValue:p.value,'onUpdate:modelValue':y[15]||(y[15]=P=>p.value=P)},null,8,['modelValue'])]),T('div',pb,[y[25]||(y[25]=T('div',{class:'text-subtitle-2 mb-2'},'Campos bloqueados após CEP',-1)),h(z,{modelValue:b.value,'onUpdate:modelValue':y[16]||(y[16]=P=>b.value=P),'disabled-fields':!0},null,8,['modelValue'])]),T('div',bb,[y[26]||(y[26]=T('div',{class:'text-subtitle-2 mb-2'},'Totalmente desabilitado',-1)),h(z,{modelValue:S.value,'onUpdate:modelValue':y[17]||(y[17]=P=>S.value=P),disabled:''},null,8,['modelValue'])])])]),_:1})],64);};}}),Rn=j({border:[Boolean,Number,String]},'border');function Nn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return{borderClasses:V(()=>{const l=e.border;

return l===!0||l===''?`${t}--border`:typeof l=='string'||l===0?String(l).split(' ').map(o=>`border-${o}`):[];})};}const wb=[null,'default','comfortable','compact'],Dt=j({density:{type:String,default:'default',validator:e=>wb.includes(e)}},'density');function Xt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return{densityClasses:O(()=>`${t}--density-${e.density}`)};}const zn=j({elevation:{type:[Number,String],validator(e){const t=parseInt(e);

return!isNaN(t)&&t>=0&&t<=24;}}},'elevation');function Hn(e){return{elevationClasses:O(()=>{const n=He(e)?e.value:e.elevation;

return n==null?[]:[`elevation-${n}`];})};}const $t=j({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},'rounded');function Bt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return{roundedClasses:V(()=>{const l=He(e)?e.value:e.rounded,o=He(e)?!1:e.tile,a=[];

if(o||l===!1)a.push('rounded-0');else if(l===!0||l==='')a.push(`${t}--rounded`);else if(typeof l=='string'||l===0)for(const i of String(l).split(' '))a.push(`rounded-${i}`);

return a;})};}const Le=j({tag:{type:[String,Object,Function],default:'div'}},'tag'),Cb=['elevated','flat','tonal','outlined','text','plain'];function Bl(e,t){return T(ke,null,[e&&T('span',{key:'overlay',class:ce(`${t}__overlay`)},null),T('span',{key:'underlay',class:ce(`${t}__underlay`)},null)]);}const En=j({color:String,variant:{type:String,default:'elevated',validator:e=>Cb.includes(e)}},'variant');function Ll(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();const n=O(()=>{const{variant:a}=lt(e);

return`${t}--variant-${a}`;}),{colorClasses:l,colorStyles:o}=Ms(()=>{const{variant:a,color:i}=lt(e);

return{[['elevated','flat'].includes(a)?'background':'text']:i};});

return{colorClasses:l,colorStyles:o,variantClasses:n};}const yf=j({baseColor:String,divided:Boolean,direction:{type:String,default:'horizontal'},...Rn(),...Ce(),...Dt(),...zn(),...$t(),...Le(),...qe(),...En()},'VBtnGroup'),Pu=re()({name:'VBtnGroup',props:yf(),setup(e,t){let{slots:n}=t;const{themeClasses:l}=ot(e),{densityClasses:o}=Xt(e),{borderClasses:a}=Nn(e),{elevationClasses:i}=Hn(e),{roundedClasses:s}=Bt(e);Ln({VBtn:{height:O(()=>e.direction==='horizontal'?'auto':null),baseColor:O(()=>e.baseColor),color:O(()=>e.color),density:O(()=>e.density),flat:!0,variant:O(()=>e.variant)}}),me(()=>h(e.tag,{class:ce(['v-btn-group',`v-btn-group--${e.direction}`,{'v-btn-group--divided':e.divided},l.value,a.value,o.value,i.value,s.value,e.class]),style:he(e.style)},n));}}),Ds=j({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},'group'),$s=j({value:null,disabled:Boolean,selectedClass:String},'group-item');function ha(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const l=Ye('useGroupItem');

if(!l)throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');

const o=Gt();vt(Symbol.for(`${t.description}:id`),o);const a=Ie(t,null);

if(!a){if(!n)return a;

throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);}

const i=O(()=>e.value),s=V(()=>!!(a.disabled.value||e.disabled));function r(){a?.register({id:o,value:i,disabled:s},l);}function u(){a?.unregister(o);}r(),yt(()=>u());const c=V(()=>a.isSelected(o)),d=V(()=>a.items.value[0].id===o),f=V(()=>a.items.value[a.items.value.length-1].id===o),m=V(()=>c.value&&[a.selectedClass.value,e.selectedClass]);

return ie(c,v=>{l.emit('group:selected',{value:v});},{flush:'sync'}),{id:o,isSelected:c,isFirst:d,isLast:f,toggle:()=>a.select(o,!c.value),select:v=>a.select(o,v),selectedClass:m,value:i,disabled:s,group:a,register:r,unregister:u};}function Na(e,t){let n=!1;const l=et([]),o=je(e,'modelValue',[],f=>f===void 0?[]:pf(l,f===null?[null]:Nt(f)),f=>{const m=kb(l,f);

return e.multiple?m:m[0];}),a=Ye('useGroup');function i(f,m){const v=f,g=Symbol.for(`${t.description}:id`),b=bl(g,a?.vnode).indexOf(m);Me(v.value)===void 0&&(v.value=b,v.useIndexAsValue=!0),b>-1?l.splice(b,0,v):l.push(v);}function s(f){if(n)return;

r();const m=l.findIndex(v=>v.id===f);l.splice(m,1);}function r(){const f=l.find(m=>!m.disabled);f&&e.mandatory==='force'&&!o.value.length&&(o.value=[f.id]);}Yt(()=>{r();}),yt(()=>{n=!0;}),ys(()=>{for(let f=0;f<l.length;f++)l[f].useIndexAsValue&&(l[f].value=f);});function u(f,m){const v=l.find(g=>g.id===f);

if(!(m&&v?.disabled)){if(e.multiple){const g=o.value.slice(),p=g.findIndex(S=>S===f),b=~p;

if(m=m??!b,b&&e.mandatory&&g.length<=1||!b&&e.max!=null&&g.length+1>e.max)return;

p<0&&m?g.push(f):p>=0&&!m&&g.splice(p,1),o.value=g;}else{const g=o.value.includes(f);

if(e.mandatory&&g||!g&&!m)return;

o.value=m??!g?[f]:[];}}}function c(f){if(e.multiple,o.value.length){const m=o.value[0],v=l.findIndex(b=>b.id===m);let g=(v+f)%l.length,p=l[g];

for(;p.disabled&&g!==v;)g=(g+f)%l.length,p=l[g];

if(p.disabled)return;

o.value=[l[g].id];}else{const m=l.find(v=>!v.disabled);m&&(o.value=[m.id]);}}const d={register:i,unregister:s,selected:o,select:u,disabled:O(()=>e.disabled),prev:()=>c(l.length-1),next:()=>c(1),isSelected:f=>o.value.includes(f),selectedClass:O(()=>e.selectedClass),items:O(()=>l),getItemIndex:f=>xb(l,f)};

return vt(t,d),d;}function xb(e,t){const n=pf(e,[t]);

return n.length?e.findIndex(l=>l.id===n[0]):-1;}function pf(e,t){const n=[];

return t.forEach(l=>{const o=e.find(i=>Mt(l,i.value)),a=e[l];o?.value!==void 0?n.push(o.id):a?.useIndexAsValue&&n.push(a.id);}),n;}function kb(e,t){const n=[];

return t.forEach(l=>{const o=e.findIndex(a=>a.id===l);

if(~o){const a=e[o];n.push(a.value!==void 0?a.value:o);}}),n;}const bf=Symbol.for('vuetify:v-btn-toggle'),_b=j({...yf(),...Ds()},'VBtnToggle');re()({name:'VBtnToggle',props:_b(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const{isSelected:l,next:o,prev:a,select:i,selected:s}=Na(e,bf);

return me(()=>{const r=Pu.filterProps(e);

return h(Pu,ae({class:['v-btn-toggle',e.class]},r,{style:e.style}),{default:()=>[n.default?.({isSelected:l,next:o,prev:a,select:i,selected:s})]});}),{next:o,prev:a,select:i};}});const Ab=j({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},'VDefaultsProvider'),Ue=re(!1)({name:'VDefaultsProvider',props:Ab(),setup(e,t){let{slots:n}=t;const{defaults:l,disabled:o,reset:a,root:i,scoped:s}=fs(e);

return Ln(l,{reset:a,root:i,scoped:s,disabled:o}),()=>n.default?.();}}),Vb=['x-small','small','default','large','x-large'],Io=j({size:{type:[String,Number],default:'default'}},'size');function Fo(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return ks(()=>{const n=e.size;let l,o;

return ra(Vb,n)?l=`${t}--size-${n}`:n&&(o={width:se(n),height:se(n)}),{sizeClasses:l,sizeStyles:o};});}const Tb=j({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:Te,opacity:[String,Number],...Ce(),...Io(),...Le({tag:'i'}),...qe()},'VIcon'),ze=re()({name:'VIcon',props:Tb(),setup(e,t){let{attrs:n,slots:l}=t;const o=le(),{themeClasses:a}=Ra(),{iconData:i}=Sy(()=>o.value||e.icon),{sizeClasses:s}=Fo(e),{textColorClasses:r,textColorStyles:u}=Kt(()=>e.color);

return me(()=>{const c=l.default?.();c&&(o.value=jd(c).filter(f=>f.type===Ao&&f.children&&typeof f.children=='string')[0]?.children);const d=!!(n.onClick||n.onClickOnce);

return h(i.value.component,{tag:e.tag,icon:i.value.icon,class:ce(['v-icon','notranslate',a.value,s.value,r.value,{'v-icon--clickable':d,'v-icon--disabled':e.disabled,'v-icon--start':e.start,'v-icon--end':e.end},e.class]),style:he([{'--v-icon-opacity':e.opacity},s.value?void 0:{fontSize:se(e.size),height:se(e.size),width:se(e.size)},u.value,e.style]),role:d?'button':void 0,'aria-hidden':!d,tabindex:d?e.disabled?-1:0:void 0},{default:()=>[c]});}),{};}});function Sf(e,t){const n=L(),l=le(!1);

if(xs){const o=new IntersectionObserver(a=>{l.value=!!a.find(i=>i.isIntersecting);},t);tt(()=>{o.disconnect();}),ie(n,(a,i)=>{i&&(o.unobserve(i),l.value=!1),a&&o.observe(a);},{flush:'post'});}

return{intersectionRef:n,isIntersecting:l};}const Eb=j({bgColor:String,color:String,indeterminate:[Boolean,String],rounded:Boolean,modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...Ce(),...Io(),...Le({tag:'div'}),...qe()},'VProgressCircular'),Bs=re()({name:'VProgressCircular',props:Eb(),setup(e,t){let{slots:n}=t;const l=20,o=2*Math.PI*l,a=L(),{themeClasses:i}=ot(e),{sizeClasses:s,sizeStyles:r}=Fo(e),{textColorClasses:u,textColorStyles:c}=Kt(()=>e.color),{textColorClasses:d,textColorStyles:f}=Kt(()=>e.bgColor),{intersectionRef:m,isIntersecting:v}=Sf(),{resizeRef:g,contentRect:p}=sl(),b=O(()=>Et(parseFloat(e.modelValue),0,100)),S=O(()=>Number(e.width)),w=O(()=>r.value?Number(e.size):p.value?p.value.width:Math.max(S.value,32)),y=O(()=>l/(1-S.value/w.value)*2),_=O(()=>S.value/w.value*y.value),k=O(()=>{const x=(100-b.value)/100*o;

return e.rounded&&b.value>0&&b.value<100?se(Math.min(o-.01,x+_.value)):se(x);}),I=V(()=>{const x=Number(e.rotate);

return e.rounded?x+_.value/2/o*360:x;});

return Ct(()=>{m.value=a.value,g.value=a.value;}),me(()=>h(e.tag,{ref:a,class:ce(['v-progress-circular',{'v-progress-circular--indeterminate':!!e.indeterminate,'v-progress-circular--visible':v.value,'v-progress-circular--disable-shrink':e.indeterminate&&(e.indeterminate==='disable-shrink'||al())},i.value,s.value,u.value,e.class]),style:he([r.value,c.value,e.style]),role:'progressbar','aria-valuemin':'0','aria-valuemax':'100','aria-valuenow':e.indeterminate?void 0:b.value},{default:()=>[T('svg',{style:{transform:`rotate(calc(-90deg + ${I.value}deg))`},xmlns:'http://www.w3.org/2000/svg',viewBox:`0 0 ${y.value} ${y.value}`},[T('circle',{class:ce(['v-progress-circular__underlay',d.value]),style:he(f.value),fill:'transparent',cx:'50%',cy:'50%',r:l,'stroke-width':_.value,'stroke-dasharray':o,'stroke-dashoffset':0},null),T('circle',{class:'v-progress-circular__overlay',fill:'transparent',cx:'50%',cy:'50%',r:l,'stroke-width':_.value,'stroke-dasharray':o,'stroke-dashoffset':k.value,'stroke-linecap':e.rounded?'round':void 0},null)]),n.default&&T('div',{class:'v-progress-circular__content'},[n.default({value:b.value})])]})),{};}}),cn=j({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},'dimension');function dn(e){return{dimensionStyles:V(()=>{const n={},l=se(e.height),o=se(e.maxHeight),a=se(e.maxWidth),i=se(e.minHeight),s=se(e.minWidth),r=se(e.width);

return l!=null&&(n.height=l),o!=null&&(n.maxHeight=o),a!=null&&(n.maxWidth=a),i!=null&&(n.minHeight=i),s!=null&&(n.minWidth=s),r!=null&&(n.width=r),n;})};}const Iu={center:'center',top:'bottom',bottom:'top',left:'right',right:'left'},za=j({location:String},'location');function Ha(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:l}=qt();

return{locationStyles:V(()=>{if(!e.location)return{};

const{side:a,align:i}=Ri(e.location.split(' ').length>1?e.location:`${e.location} center`,l.value);function s(u){return n?n(u):0;}const r={};

return a!=='center'&&(t?r[Iu[a]]=`calc(100% - ${s(a)}px)`:r[a]=0),i!=='center'?t?r[Iu[i]]=`calc(100% - ${s(i)}px)`:r[i]=0:(a==='center'?r.top=r.left='50%':r[{top:'left',bottom:'left',left:'top',right:'top'}[a]]='50%',r.transform={top:'translateX(-50%)',bottom:'translateX(-50%)',left:'translateY(-50%)',right:'translateY(-50%)',center:'translate(-50%, -50%)'}[a]),r;})};}const Pb=j({chunkCount:{type:[Number,String],default:null},chunkWidth:{type:[Number,String],default:null},chunkGap:{type:[Number,String],default:4}},'chunks');function Ib(e,t){const n=O(()=>!!e.chunkCount||!!e.chunkWidth),l=V(()=>{const s=lt(t);

if(!s)return 0;

if(!e.chunkCount)return Number(e.chunkWidth);

const r=Number(e.chunkCount);

return(s-Number(e.chunkGap)*(r-1))/r;}),o=O(()=>Number(e.chunkGap)),a=V(()=>{if(!n.value)return{};

const s=se(o.value),r=se(l.value);

return{maskRepeat:'repeat-x',maskImage:`linear-gradient(90deg, #000, #000 ${r}, transparent ${r}, transparent)`,maskSize:`calc(${r} + ${s}) 100%`};});function i(s){const r=lt(t);

if(!r)return s;

const u=100*o.value/r,c=100*(l.value+o.value)/r,d=Math.floor((s+u)/c);

return Et(0,d*c-u/2,100);}

return{hasChunks:n,chunksMaskStyles:a,snapValueToChunk:i};}const Fb=j({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...Pb(),...Ce(),...za({location:'top'}),...$t(),...Le(),...qe()},'VProgressLinear'),Ob=re()({name:'VProgressLinear',props:Fb(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=L(),o=je(e,'modelValue'),{isRtl:a,rtlClasses:i}=qt(),{themeClasses:s}=ot(e),{locationStyles:r}=Ha(e),{textColorClasses:u,textColorStyles:c}=Kt(()=>e.color),{backgroundColorClasses:d,backgroundColorStyles:f}=zt(()=>e.bgColor||e.color),{backgroundColorClasses:m,backgroundColorStyles:v}=zt(()=>e.bufferColor||e.bgColor||e.color),{backgroundColorClasses:g,backgroundColorStyles:p}=zt(()=>e.color),{roundedClasses:b}=Bt(e),{intersectionRef:S,isIntersecting:w}=Sf(),y=V(()=>parseFloat(e.max)),_=V(()=>parseFloat(e.height)),k=V(()=>Et(parseFloat(e.bufferValue)/y.value*100,0,100)),I=V(()=>Et(parseFloat(o.value)/y.value*100,0,100)),x=V(()=>a.value!==e.reverse),E=V(()=>e.indeterminate?'fade-transition':'slide-x-transition'),M=le(0),{hasChunks:z,chunksMaskStyles:P,snapValueToChunk:$}=Ib(e,M);_n(z,()=>{const{resizeRef:ee}=sl(te=>M.value=te[0].contentRect.width);Ct(()=>ee.value=l.value);});const U=V(()=>z.value?$(k.value):k.value),Y=V(()=>z.value?$(I.value):I.value);function oe(ee){if(!S.value)return;

const{left:te,right:Se,width:J}=S.value.getBoundingClientRect(),ue=x.value?J-ee.clientX+(Se-J):ee.clientX-te;o.value=Math.round(ue/J*y.value);}

return Ct(()=>{S.value=l.value;}),me(()=>h(e.tag,{ref:l,class:ce(['v-progress-linear',{'v-progress-linear--absolute':e.absolute,'v-progress-linear--active':e.active&&w.value,'v-progress-linear--reverse':x.value,'v-progress-linear--rounded':e.rounded,'v-progress-linear--rounded-bar':e.roundedBar,'v-progress-linear--striped':e.striped,'v-progress-linear--clickable':e.clickable},b.value,s.value,i.value,e.class]),style:he([{bottom:e.location==='bottom'?0:void 0,top:e.location==='top'?0:void 0,height:e.active?se(_.value):0,'--v-progress-linear-height':se(_.value),...e.absolute?r.value:{}},P.value,e.style]),role:'progressbar','aria-hidden':e.active?'false':'true','aria-valuemin':'0','aria-valuemax':e.max,'aria-valuenow':e.indeterminate?void 0:Math.min(parseFloat(o.value),y.value),onClick:e.clickable&&oe},{default:()=>[e.stream&&T('div',{key:'stream',class:ce(['v-progress-linear__stream',u.value]),style:{...c.value,[x.value?'left':'right']:se(-_.value),borderTop:`${se(_.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${se(_.value/4)})`,width:se(100-k.value,'%'),'--v-progress-linear-stream-to':se(_.value*(x.value?1:-1))}},null),T('div',{class:ce(['v-progress-linear__background',d.value]),style:he([f.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}])},null),T('div',{class:ce(['v-progress-linear__buffer',m.value]),style:he([v.value,{opacity:parseFloat(e.bufferOpacity),width:se(U.value,'%')}])},null),h(Ut,{name:E.value},{default:()=>[e.indeterminate?T('div',{class:'v-progress-linear__indeterminate'},[['long','short'].map(ee=>T('div',{key:ee,class:ce(['v-progress-linear__indeterminate',ee,g.value]),style:he(p.value)},null))]):T('div',{class:ce(['v-progress-linear__determinate',g.value]),style:he([p.value,{width:se(Y.value,'%')}])},null)]}),n.default&&T('div',{class:'v-progress-linear__content'},[n.default({value:I.value,buffer:k.value})])]})),{};}}),Ls=j({loading:[Boolean,String]},'loader');function Rs(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return{loaderClasses:O(()=>({[`${t}--loading`]:e.loading}))};}function wf(e,t){let{slots:n}=t;

return T('div',{class:ce(`${e.name}__loader`)},[n.default?.({color:e.color,isActive:e.active})||h(Ob,{absolute:e.absolute,active:e.active,color:e.color,height:'2',indeterminate:!0},null)]);}const Mb=['static','relative','fixed','absolute','sticky'],Ns=j({position:{type:String,validator:e=>Mb.includes(e)}},'position');function zs(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();

return{positionClasses:O(()=>e.position?`${t}--${e.position}`:void 0)};}function Db(){const e=Ye('useRoute');

return V(()=>e?.proxy?.$route);}function $b(){return Ye('useRouter')?.proxy?.$router;}function Wa(e,t){const n=ng('RouterLink'),l=O(()=>!!(e.href||e.to)),o=V(()=>l?.value||Jr(t,'click')||Jr(e,'click'));

if(typeof n=='string'||!('useLink'in n)){const d=O(()=>e.href);

return{isLink:l,isRouterLink:O(()=>!1),isClickable:o,href:d,linkProps:et({href:d})};}

const a=n.useLink({to:O(()=>e.to||''),replace:O(()=>e.replace)}),i=V(()=>e.to?a:void 0),s=Db(),r=V(()=>i.value?e.exact?s.value?i.value.isExactActive?.value&&Mt(i.value.route.value.query,s.value.query):i.value.isExactActive?.value??!1:i.value.isActive?.value??!1:!1),u=V(()=>e.to?i.value?.route.value.href:e.href);

return{isLink:l,isRouterLink:O(()=>!!e.to),isClickable:o,isActive:r,route:i.value?.route,navigate:i.value?.navigate,href:u,linkProps:et({href:u,'aria-current':O(()=>r.value?'page':void 0),'aria-disabled':O(()=>e.disabled&&l.value?'true':void 0),tabindex:O(()=>e.disabled&&l.value?'-1':void 0)})};}const ja=j({href:String,replace:Boolean,to:[String,Object],exact:Boolean},'router');let gi=!1;function Bb(e,t){let n=!1,l,o;Fe&&e?.beforeEach&&(Be(()=>{window.addEventListener('popstate',a),l=e.beforeEach((i,s,r)=>{gi?n?t(r):r():setTimeout(()=>n?t(r):r()),gi=!0;}),o=e?.afterEach(()=>{gi=!1;});}),tt(()=>{window.removeEventListener('popstate',a),l?.(),o?.();}));function a(i){i.state?.replaced||(n=!0,setTimeout(()=>n=!1));}}function Lb(e,t){ie(()=>e.isActive?.value,n=>{e.isLink.value&&n!=null&&t&&Be(()=>{t(n);});},{immediate:!0});}const Ki=Symbol('rippleStop'),Rb=80;function Fu(e,t){e.style.transform=t,e.style.webkitTransform=t;}function Gi(e){return e.constructor.name==='TouchEvent';}function Cf(e){return e.constructor.name==='KeyboardEvent';}const Nb=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},l=0,o=0;

if(!Cf(e)){const d=t.getBoundingClientRect(),f=Gi(e)?e.touches[e.touches.length-1]:e;l=f.clientX-d.left,o=f.clientY-d.top;}

let a=0,i=.3;t._ripple?.circle?(i=.15,a=t.clientWidth/2,a=n.center?a:a+Math.sqrt((l-a)**2+(o-a)**2)/4):a=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const s=`${(t.clientWidth-a*2)/2}px`,r=`${(t.clientHeight-a*2)/2}px`,u=n.center?s:`${l-a}px`,c=n.center?r:`${o-a}px`;

return{radius:a,scale:i,x:u,y:c,centerX:s,centerY:r};},ya={show(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};

if(!t?._ripple?.enabled)return;

const l=document.createElement('span'),o=document.createElement('span');l.appendChild(o),l.className='v-ripple__container',n.class&&(l.className+=` ${n.class}`);const{radius:a,scale:i,x:s,y:r,centerX:u,centerY:c}=Nb(e,t,n),d=`${a*2}px`;o.className='v-ripple__animation',o.style.width=d,o.style.height=d,t.appendChild(l);const f=window.getComputedStyle(t);f&&f.position==='static'&&(t.style.position='relative',t.dataset.previousPosition='static'),o.classList.add('v-ripple__animation--enter'),o.classList.add('v-ripple__animation--visible'),Fu(o,`translate(${s}, ${r}) scale3d(${i},${i},${i})`),o.dataset.activated=String(performance.now()),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove('v-ripple__animation--enter'),o.classList.add('v-ripple__animation--in'),Fu(o,`translate(${u}, ${c}) scale3d(1,1,1)`);});});},hide(e){if(!e?._ripple?.enabled)return;

const t=e.getElementsByClassName('v-ripple__animation');

if(t.length===0)return;

const n=Array.from(t).findLast(a=>!a.dataset.isHiding);

if(n)n.dataset.isHiding='true';else return;

const l=performance.now()-Number(n.dataset.activated),o=Math.max(250-l,0);setTimeout(()=>{n.classList.remove('v-ripple__animation--in'),n.classList.add('v-ripple__animation--out'),setTimeout(()=>{e.getElementsByClassName('v-ripple__animation').length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),n.parentNode?.parentNode===e&&e.removeChild(n.parentNode);},300);},o);}};function xf(e){return typeof e>'u'||!!e;}function bo(e){const t={},n=e.currentTarget;

if(!(!n?._ripple||n._ripple.touched||e[Ki])){if(e[Ki]=!0,Gi(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;

if(t.center=n._ripple.centered||Cf(e),n._ripple.class&&(t.class=n._ripple.class),Gi(e)){if(n._ripple.showTimerCommit)return;

n._ripple.showTimerCommit=()=>{ya.show(e,n,t);},n._ripple.showTimer=window.setTimeout(()=>{n?._ripple?.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null);},Rb);}else ya.show(e,n,t);}}function pa(e){e[Ki]=!0;}function At(e){const t=e.currentTarget;

if(t?._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==='touchend'&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{At(e);});

return;}

window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1);}),ya.hide(t);}}function kf(e){const t=e.currentTarget;t?._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer));}let So=!1;function zb(e,t){!So&&t.includes(e.key)&&(So=!0,bo(e));}function _f(e){So=!1,At(e);}function Af(e){So&&(So=!1,At(e));}function Vf(e,t,n){const{value:l,modifiers:o}=t,a=xf(l);a||ya.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=a,e._ripple.centered=o.center,e._ripple.circle=o.circle;const i=Pl(l)?l:{};i.class&&(e._ripple.class=i.class);const s=i.keys??['Enter','Space'];

if(e._ripple.keyDownHandler=r=>zb(r,s),a&&!n){if(o.stop){e.addEventListener('touchstart',pa,{passive:!0}),e.addEventListener('mousedown',pa);

return;}

e.addEventListener('touchstart',bo,{passive:!0}),e.addEventListener('touchend',At,{passive:!0}),e.addEventListener('touchmove',kf,{passive:!0}),e.addEventListener('touchcancel',At),e.addEventListener('mousedown',bo),e.addEventListener('mouseup',At),e.addEventListener('mouseleave',At),e.addEventListener('keydown',e._ripple.keyDownHandler),e.addEventListener('keyup',_f),e.addEventListener('blur',Af),e.addEventListener('dragstart',At,{passive:!0});}else!a&&n&&Tf(e);}function Tf(e){e.removeEventListener('touchstart',pa),e.removeEventListener('mousedown',pa),e.removeEventListener('touchstart',bo),e.removeEventListener('touchend',At),e.removeEventListener('touchmove',kf),e.removeEventListener('touchcancel',At),e.removeEventListener('mousedown',bo),e.removeEventListener('mouseup',At),e.removeEventListener('mouseleave',At),e._ripple?.keyDownHandler&&e.removeEventListener('keydown',e._ripple.keyDownHandler),e.removeEventListener('keyup',_f),e.removeEventListener('blur',Af),e.removeEventListener('dragstart',At);}function Hb(e,t){Vf(e,t,!1);}function Wb(e){Tf(e),delete e._ripple;}function jb(e,t){if(t.value===t.oldValue)return;

const n=xf(t.oldValue);Vf(e,t,n);}const rn={mounted:Hb,unmounted:Wb,updated:jb},Ef=j({active:{type:Boolean,default:void 0},activeColor:String,baseColor:String,symbol:{type:null,default:bf},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Te,appendIcon:Te,block:Boolean,readonly:Boolean,slim:Boolean,stacked:Boolean,spaced:String,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},...Rn(),...Ce(),...Dt(),...cn(),...zn(),...$s(),...Ls(),...za(),...Ns(),...$t(),...ja(),...Io(),...Le({tag:'button'}),...qe(),...En({variant:'elevated'})},'VBtn'),Xe=re()({name:'VBtn',props:Ef(),emits:{'group:selected':e=>!0},setup(e,t){let{attrs:n,slots:l}=t;const{themeClasses:o}=ot(e),{borderClasses:a}=Nn(e),{densityClasses:i}=Xt(e),{dimensionStyles:s}=dn(e),{elevationClasses:r}=Hn(e),{loaderClasses:u}=Rs(e),{locationStyles:c}=Ha(e),{positionClasses:d}=zs(e),{roundedClasses:f}=Bt(e),{sizeClasses:m,sizeStyles:v}=Fo(e),g=ha(e,e.symbol,!1),p=Wa(e,n),b=V(()=>e.active!==void 0?e.active:p.isRouterLink.value?p.isActive?.value:g?.isSelected.value),S=O(()=>b.value?e.activeColor??e.color:e.color),w=V(()=>({color:g?.isSelected.value&&(!p.isLink.value||p.isActive?.value)||!g||p.isActive?.value?S.value??e.baseColor:e.baseColor,variant:e.variant})),{colorClasses:y,colorStyles:_,variantClasses:k}=Ll(w),I=V(()=>g?.disabled.value||e.disabled),x=O(()=>e.variant==='elevated'&&!(e.disabled||e.flat||e.border)),E=V(()=>{if(!(e.value===void 0||typeof e.value=='symbol'))return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value;});function M(z){I.value||p.isLink.value&&(z.metaKey||z.ctrlKey||z.shiftKey||z.button!==0||n.target==='_blank')||(p.isRouterLink.value?p.navigate?.(z):g?.toggle());}

return Lb(p,g?.select),me(()=>{const z=p.isLink.value?'a':e.tag,P=!!(e.prependIcon||l.prepend),$=!!(e.appendIcon||l.append),U=!!(e.icon&&e.icon!==!0);

return st(h(z,ae(p.linkProps,{type:z==='a'?void 0:'button',class:['v-btn',g?.selectedClass.value,{'v-btn--active':b.value,'v-btn--block':e.block,'v-btn--disabled':I.value,'v-btn--elevated':x.value,'v-btn--flat':e.flat,'v-btn--icon':!!e.icon,'v-btn--loading':e.loading,'v-btn--readonly':e.readonly,'v-btn--slim':e.slim,'v-btn--stacked':e.stacked},e.spaced?['v-btn--spaced',`v-btn--spaced-${e.spaced}`]:[],o.value,a.value,y.value,i.value,r.value,u.value,d.value,f.value,m.value,k.value,e.class],style:[_.value,s.value,c.value,v.value,e.style],'aria-busy':e.loading?!0:void 0,disabled:I.value&&z!=='a'||void 0,tabindex:e.loading||e.readonly?-1:void 0,onClick:M,value:E.value}),{default:()=>[Bl(!0,'v-btn'),!e.icon&&P&&T('span',{key:'prepend',class:'v-btn__prepend'},[l.prepend?h(Ue,{key:'prepend-defaults',disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},l.prepend):h(ze,{key:'prepend-icon',icon:e.prependIcon},null)]),T('span',{class:'v-btn__content','data-no-activator':''},[!l.default&&U?h(ze,{key:'content-icon',icon:e.icon},null):h(Ue,{key:'content-defaults',disabled:!U,defaults:{VIcon:{icon:e.icon}}},{default:()=>[l.default?.()??Ge(e.text)]})]),!e.icon&&$&&T('span',{key:'append',class:'v-btn__append'},[l.append?h(Ue,{key:'append-defaults',disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},l.append):h(ze,{key:'append-icon',icon:e.appendIcon},null)]),!!e.loading&&T('span',{key:'loader',class:'v-btn__loader'},[l.loader?.()??h(Bs,{color:typeof e.loading=='boolean'?void 0:e.loading,indeterminate:!0,width:'2'},null)])]}),[[rn,!I.value&&e.ripple,'',{center:!!e.icon}]]);}),{group:g};}}),Ub=j({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},'transition');function It(e,t,n){return re()({name:e,props:Ub({mode:n,origin:t}),setup(l,o){let{slots:a}=o;const i={onBeforeEnter(s){l.origin&&(s.style.transformOrigin=l.origin);},onLeave(s){if(l.leaveAbsolute){const{offsetTop:r,offsetLeft:u,offsetWidth:c,offsetHeight:d}=s;s._transitionInitialStyles={position:s.style.position,top:s.style.top,left:s.style.left,width:s.style.width,height:s.style.height},s.style.position='absolute',s.style.top=`${r}px`,s.style.left=`${u}px`,s.style.width=`${c}px`,s.style.height=`${d}px`;}

l.hideOnLeave&&s.style.setProperty('display','none','important');},onAfterLeave(s){if(l.leaveAbsolute&&s?._transitionInitialStyles){const{position:r,top:u,left:c,width:d,height:f}=s._transitionInitialStyles;delete s._transitionInitialStyles,s.style.position=r||'',s.style.top=u||'',s.style.left=c||'',s.style.width=d||'',s.style.height=f||'';}}};

return()=>{const s=l.group?Cs:Ut;

return Tn(s,{name:l.disabled?'':e,css:!l.disabled,...l.group?void 0:{mode:l.mode},...l.disabled?{}:i},a.default);};}});}function Pf(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:'in-out';

return re()({name:e,props:{mode:{type:String,default:n},disabled:{type:Boolean,default:al()},group:Boolean},setup(l,o){let{slots:a}=o;const i=l.group?Cs:Ut;

return()=>Tn(i,{name:l.disabled?'':e,css:!l.disabled,...l.disabled?{}:t},a.default);}});}function If(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:'';const n=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?'width':'height',l=ht(`offset-${n}`);

return{onBeforeEnter(i){i._parent=i.parentNode,i._initialStyle={transition:i.style.transition,overflow:i.style.overflow,[n]:i.style[n]};},onEnter(i){const s=i._initialStyle;

if(!s)return;

i.style.setProperty('transition','none','important'),i.style.overflow='hidden';const r=`${i[l]}px`;i.style[n]='0',i.offsetHeight,i.style.transition=s.transition,e&&i._parent&&i._parent.classList.add(e),requestAnimationFrame(()=>{i.style[n]=r;});},onAfterEnter:a,onEnterCancelled:a,onLeave(i){i._initialStyle={transition:'',overflow:i.style.overflow,[n]:i.style[n]},i.style.overflow='hidden',i.style[n]=`${i[l]}px`,i.offsetHeight,requestAnimationFrame(()=>i.style[n]='0');},onAfterLeave:o,onLeaveCancelled:o};

function o(i){e&&i._parent&&i._parent.classList.remove(e),a(i);}function a(i){if(!i._initialStyle)return;

const s=i._initialStyle[n];i.style.overflow=i._initialStyle.overflow,s!=null&&(i.style[n]=s),delete i._initialStyle;}}const Kb=j({target:[Object,Array]},'v-dialog-transition'),hi=new WeakMap,Hs=re()({name:'VDialogTransition',props:Kb(),setup(e,t){let{slots:n}=t;const l={onBeforeEnter(o){o.style.pointerEvents='none',o.style.visibility='hidden';},async onEnter(o,a){await new Promise(f=>requestAnimationFrame(f)),await new Promise(f=>requestAnimationFrame(f)),o.style.visibility='';const i=Mu(e.target,o),{x:s,y:r,sx:u,sy:c,speed:d}=i;

if(hi.set(o,i),al())hn(o,[{opacity:0},{}],{duration:125*d,easing:mu}).finished.then(()=>a());else{const f=hn(o,[{transform:`translate(${s}px, ${r}px) scale(${u}, ${c})`,opacity:0},{}],{duration:225*d,easing:mu});Ou(o)?.forEach(m=>{hn(m,[{opacity:0},{opacity:0,offset:.33},{}],{duration:450*d,easing:mo});}),f.finished.then(()=>a());}},onAfterEnter(o){o.style.removeProperty('pointer-events');},onBeforeLeave(o){o.style.pointerEvents='none';},async onLeave(o,a){await new Promise(f=>requestAnimationFrame(f));let i;!hi.has(o)||Array.isArray(e.target)||e.target.offsetParent||e.target.getClientRects().length?i=Mu(e.target,o):i=hi.get(o);const{x:s,y:r,sx:u,sy:c,speed:d}=i;al()?hn(o,[{},{opacity:0}],{duration:85*d,easing:gu}).finished.then(()=>a()):(hn(o,[{},{transform:`translate(${s}px, ${r}px) scale(${u}, ${c})`,opacity:0}],{duration:125*d,easing:gu}).finished.then(()=>a()),Ou(o)?.forEach(m=>{hn(m,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*d,easing:mo});}));},onAfterLeave(o){o.style.removeProperty('pointer-events');}};

return()=>e.target?h(Ut,ae({name:'dialog-transition'},l,{css:!1}),n):h(Ut,{name:'dialog-transition'},n);}});function Ou(e){const t=e.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')?.children;

return t&&[...t];}function Mu(e,t){const n=Xd(e),l=_s(t),[o,a]=getComputedStyle(t).transformOrigin.split(' ').map(b=>parseFloat(b)),[i,s]=getComputedStyle(t).getPropertyValue('--v-overlay-anchor-origin').split(' ');let r=n.left+n.width/2;i==='left'||s==='left'?r-=n.width/2:(i==='right'||s==='right')&&(r+=n.width/2);let u=n.top+n.height/2;i==='top'||s==='top'?u-=n.height/2:(i==='bottom'||s==='bottom')&&(u+=n.height/2);const c=n.width/l.width,d=n.height/l.height,f=Math.max(1,c,d),m=c/f||0,v=d/f||0,g=l.width*l.height/(window.innerWidth*window.innerHeight),p=g>.12?Math.min(1.5,(g-.12)*10+1):1;

return{x:r-(o+l.left),y:u-(a+l.top),sx:m,sy:v,speed:p};}It('fab-transition','center center','out-in');It('dialog-bottom-transition');It('dialog-top-transition');const Du=It('fade-transition');It('scale-transition');It('scroll-x-transition');It('scroll-x-reverse-transition');It('scroll-y-transition');It('scroll-y-reverse-transition');It('slide-x-transition');It('slide-x-reverse-transition');const Ff=It('slide-y-transition');It('slide-y-reverse-transition');const Of=Pf('expand-transition',If()),Mf=Pf('expand-x-transition',If('',!0));function Gb(e){return{aspectStyles:V(()=>{const t=Number(e.aspectRatio);

return t?{paddingBottom:String(1/t*100)+'%'}:void 0;})};}const Df=j({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...Ce(),...cn()},'VResponsive'),$u=re()({name:'VResponsive',props:Df(),setup(e,t){let{slots:n}=t;const{aspectStyles:l}=Gb(e),{dimensionStyles:o}=dn(e);

return me(()=>T('div',{class:ce(['v-responsive',{'v-responsive--inline':e.inline},e.class]),style:he([o.value,e.style])},[T('div',{class:'v-responsive__sizer',style:he(l.value)},null),n.additional?.(),n.default&&T('div',{class:ce(['v-responsive__content',e.contentClass])},[n.default()])])),{};}}),Oo=j({transition:{type:null,default:'fade-transition',validator:e=>e!==!0}},'transition'),bn=(e,t)=>{let{slots:n}=t;const{transition:l,disabled:o,group:a,...i}=e,{component:s=a?Cs:Ut,...r}=Pl(l)?l:{};let u;

return Pl(l)?u=ae(r,Lh({disabled:o,group:a}),i):u=ae({name:o||!l?'':l},i),Tn(s,u,n);};function Yb(e,t){if(!xs)return;

const n=t.modifiers||{},l=t.value,{handler:o,options:a}=typeof l=='object'?l:{handler:l,options:{}},i=new IntersectionObserver(function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0;const u=e._observe?.[t.instance.$.uid];

if(!u)return;

const c=s.some(d=>d.isIntersecting);o&&(!n.quiet||u.init)&&(!n.once||c||u.init)&&o(c,s,r),c&&n.once?$f(e,t):u.init=!0;},a);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:i},i.observe(e);}function $f(e,t){const n=e._observe?.[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid]);}const wo={mounted:Yb,unmounted:$f},qb=j({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:''},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...Df(),...Ce(),...$t(),...Oo()},'VImg'),Ws=re()({name:'VImg',directives:{vIntersect:wo},props:qb(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:n,slots:l}=t;const{backgroundColorClasses:o,backgroundColorStyles:a}=zt(()=>e.color),{roundedClasses:i}=Bt(e),s=Ye('VImg'),r=le(''),u=L(),c=le(e.eager?'loading':'idle'),d=le(),f=le(),m=V(()=>e.src&&typeof e.src=='object'?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),v=V(()=>m.value.aspect||d.value/f.value||0);ie(()=>e.src,()=>{g(c.value!=='idle');}),ie(v,(P,$)=>{!P&&$&&u.value&&y(u.value);}),_o(()=>g());function g(P){if(!(e.eager&&P)&&!(xs&&!P&&!e.eager)){if(c.value='loading',m.value.lazySrc){const $=new Image;$.src=m.value.lazySrc,y($,null);}

m.value.src&&Be(()=>{n('loadstart',u.value?.currentSrc||m.value.src),setTimeout(()=>{if(!s.isUnmounted){if(u.value?.complete){if(u.value.naturalWidth||b(),c.value==='error')return;

v.value||y(u.value,null),c.value==='loading'&&p();}else v.value||y(u.value),S();}});});}}function p(){s.isUnmounted||(S(),y(u.value),c.value='loaded',n('load',u.value?.currentSrc||m.value.src));}function b(){s.isUnmounted||(c.value='error',n('error',u.value?.currentSrc||m.value.src));}function S(){const P=u.value;P&&(r.value=P.currentSrc||P.src);}let w=-1;yt(()=>{clearTimeout(w);});function y(P){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const U=()=>{if(clearTimeout(w),s.isUnmounted)return;

const{naturalHeight:Y,naturalWidth:oe}=P;Y||oe?(d.value=oe,f.value=Y):!P.complete&&c.value==='loading'&&$!=null?w=window.setTimeout(U,$):(P.currentSrc.endsWith('.svg')||P.currentSrc.startsWith('data:image/svg+xml'))&&(d.value=1,f.value=1);};U();}const _=O(()=>({'v-img__img--cover':e.cover,'v-img__img--contain':!e.cover})),k=()=>{if(!m.value.src||c.value==='idle')return null;

const P=T('img',{class:ce(['v-img__img',_.value]),style:{objectPosition:e.position},crossorigin:e.crossorigin,src:m.value.src,srcset:m.value.srcset,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:u,onLoad:p,onError:b},null),$=l.sources?.();

return h(bn,{transition:e.transition,appear:!0},{default:()=>[st($?T('picture',{class:'v-img__picture'},[$,P]):P,[[cl,c.value==='loaded']])]});},I=()=>h(bn,{transition:e.transition},{default:()=>[m.value.lazySrc&&c.value!=='loaded'&&T('img',{class:ce(['v-img__img','v-img__img--preload',_.value]),style:{objectPosition:e.position},crossorigin:e.crossorigin,src:m.value.lazySrc,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),x=()=>l.placeholder?h(bn,{transition:e.transition,appear:!0},{default:()=>[(c.value==='loading'||c.value==='error'&&!l.error)&&T('div',{class:'v-img__placeholder'},[l.placeholder()])]}):null,E=()=>l.error?h(bn,{transition:e.transition,appear:!0},{default:()=>[c.value==='error'&&T('div',{class:'v-img__error'},[l.error()])]}):null,M=()=>e.gradient?T('div',{class:'v-img__gradient',style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,z=le(!1);{const P=ie(v,$=>{$&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{z.value=!0;});}),P());});}

return me(()=>{const P=$u.filterProps(e);

return st(h($u,ae({class:['v-img',{'v-img--absolute':e.absolute,'v-img--booting':!z.value},o.value,i.value,e.class],style:[{width:se(e.width==='auto'?d.value:e.width)},a.value,e.style]},P,{aspectRatio:v.value,'aria-label':e.alt,role:e.alt?'img':void 0}),{additional:()=>T(ke,null,[h(k,null,null),h(I,null,null),h(M,null,null),h(x,null,null),h(E,null,null)]),default:l.default}),[[wo,{handler:g,options:e.options},null,{once:!0}]]);}),{currentSrc:r,image:u,state:c,naturalWidth:d,naturalHeight:f};}}),Xb=j({start:Boolean,end:Boolean,icon:Te,image:String,text:String,...Rn(),...Ce(),...Dt(),...$t(),...Io(),...Le(),...qe(),...En({variant:'flat'})},'VAvatar'),rl=re()({name:'VAvatar',props:Xb(),setup(e,t){let{slots:n}=t;const{themeClasses:l}=ot(e),{borderClasses:o}=Nn(e),{colorClasses:a,colorStyles:i,variantClasses:s}=Ll(e),{densityClasses:r}=Xt(e),{roundedClasses:u}=Bt(e),{sizeClasses:c,sizeStyles:d}=Fo(e);

return me(()=>h(e.tag,{class:ce(['v-avatar',{'v-avatar--start':e.start,'v-avatar--end':e.end},l.value,o.value,a.value,r.value,u.value,c.value,s.value,e.class]),style:he([i.value,d.value,e.style])},{default:()=>[n.default?h(Ue,{key:'content-defaults',defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[n.default()]}):e.image?h(Ws,{key:'image',src:e.image,alt:'',cover:!0},null):e.icon?h(ze,{key:'icon',icon:e.icon},null):e.text,Bl(!1,'v-avatar')]})),{};}}),Zb=j({text:String,onClick:wt(),...Ce(),...qe()},'VLabel'),Bf=re()({name:'VLabel',props:Zb(),setup(e,t){let{slots:n}=t;

return me(()=>T('label',{class:ce(['v-label',{'v-label--clickable':!!e.onClick},e.class]),style:he(e.style),onClick:e.onClick},[e.text,n.default?.()])),{};}}),Lf=Symbol.for('vuetify:selection-control-group'),Rf=j({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Te,trueIcon:Te,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:Mt},...Ce(),...Dt(),...qe()},'SelectionControlGroup'),Jb=j({...Rf({defaultsTarget:'VSelectionControl'})},'VSelectionControlGroup');re()({name:'VSelectionControlGroup',props:Jb(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=je(e,'modelValue'),o=Gt(),a=O(()=>e.id||`v-selection-control-group-${o}`),i=O(()=>e.name||a.value),s=new Set;

return vt(Lf,{modelValue:l,forceUpdate:()=>{s.forEach(r=>r());},onForceUpdate:r=>{s.add(r),tt(()=>{s.delete(r);});}}),Ln({[e.defaultsTarget]:{color:O(()=>e.color),disabled:O(()=>e.disabled),density:O(()=>e.density),error:O(()=>e.error),inline:O(()=>e.inline),modelValue:l,multiple:O(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:i,falseIcon:O(()=>e.falseIcon),trueIcon:O(()=>e.trueIcon),readonly:O(()=>e.readonly),ripple:O(()=>e.ripple),type:O(()=>e.type),valueComparator:O(()=>e.valueComparator)}}),me(()=>T('div',{class:ce(['v-selection-control-group',{'v-selection-control-group--inline':e.inline},e.class]),style:he(e.style),role:e.type==='radio'?'radiogroup':void 0},[n.default?.()])),{};}});const Nf=j({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...Ce(),...Rf()},'VSelectionControl');function Qb(e){const t=Ie(Lf,void 0),{densityClasses:n}=Xt(e),l=je(e,'modelValue'),o=V(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),a=V(()=>e.falseValue!==void 0?e.falseValue:!1),i=V(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),s=V({get(){const m=t?t.modelValue.value:l.value;

return i.value?Nt(m).some(v=>e.valueComparator(v,o.value)):e.valueComparator(m,o.value);},set(m){if(e.readonly)return;

const v=m?o.value:a.value;let g=v;i.value&&(g=m?[...Nt(l.value),v]:Nt(l.value).filter(p=>!e.valueComparator(p,o.value))),t?t.modelValue.value=g:l.value=g;}}),{textColorClasses:r,textColorStyles:u}=Kt(()=>{if(!(e.error||e.disabled))return s.value?e.color:e.baseColor;}),{backgroundColorClasses:c,backgroundColorStyles:d}=zt(()=>s.value&&!e.error&&!e.disabled?e.color:e.baseColor),f=V(()=>s.value?e.trueIcon:e.falseIcon);

return{group:t,densityClasses:n,trueValue:o,falseValue:a,model:s,textColorClasses:r,textColorStyles:u,backgroundColorClasses:c,backgroundColorStyles:d,icon:f};}const Bu=re()({name:'VSelectionControl',directives:{vRipple:rn},inheritAttrs:!1,props:Nf(),emits:{'update:modelValue':e=>!0},setup(e,t){let{attrs:n,slots:l}=t;const{group:o,densityClasses:a,icon:i,model:s,textColorClasses:r,textColorStyles:u,backgroundColorClasses:c,backgroundColorStyles:d,trueValue:f}=Qb(e),m=Gt(),v=le(!1),g=le(!1),p=L(),b=O(()=>e.id||`input-${m}`),S=O(()=>!e.disabled&&!e.readonly);o?.onForceUpdate(()=>{p.value&&(p.value.checked=s.value);});function w(I){S.value&&(v.value=!0,ua(I.target,':focus-visible')!==!1&&(g.value=!0));}function y(){v.value=!1,g.value=!1;}function _(I){I.stopPropagation();}function k(I){if(!S.value){p.value&&(p.value.checked=s.value);

return;}

e.readonly&&o&&Be(()=>o.forceUpdate()),s.value=I.target.checked;}

return me(()=>{const I=l.label?l.label({label:e.label,props:{for:b.value}}):e.label,[x,E]=Wd(n),M=T('input',ae({ref:p,checked:s.value,disabled:!!e.disabled,id:b.value,onBlur:y,onFocus:w,onInput:k,'aria-disabled':!!e.disabled,'aria-label':e.label,type:e.type,value:f.value,name:e.name,'aria-checked':e.type==='checkbox'?s.value:void 0},E),null);

return T('div',ae({class:['v-selection-control',{'v-selection-control--dirty':s.value,'v-selection-control--disabled':e.disabled,'v-selection-control--error':e.error,'v-selection-control--focused':v.value,'v-selection-control--focus-visible':g.value,'v-selection-control--inline':e.inline},a.value,e.class]},x,{style:e.style}),[T('div',{class:ce(['v-selection-control__wrapper',r.value]),style:he(u.value)},[l.default?.({backgroundColorClasses:c,backgroundColorStyles:d}),st(T('div',{class:ce(['v-selection-control__input'])},[l.input?.({model:s,textColorClasses:r,textColorStyles:u,backgroundColorClasses:c,backgroundColorStyles:d,inputNode:M,icon:i.value,props:{onFocus:w,onBlur:y,id:b.value}})??T(ke,null,[i.value&&h(ze,{key:'icon',icon:i.value},null),M])]),[[rn,!e.disabled&&!e.readonly&&e.ripple,null,{center:!0,circle:!0}]])]),I&&h(Bf,{for:b.value,onClick:_},{default:()=>[I]})]);}),{isFocused:v,input:p};}}),e0=j({indeterminate:Boolean,indeterminateIcon:{type:Te,default:'$checkboxIndeterminate'},...Nf({falseIcon:'$checkboxOff',trueIcon:'$checkboxOn'})},'VCheckboxBtn'),t0=re()({name:'VCheckboxBtn',props:e0(),emits:{'update:modelValue':e=>!0,'update:indeterminate':e=>!0},setup(e,t){let{slots:n}=t;const l=je(e,'indeterminate'),o=je(e,'modelValue');function a(r){l.value&&(l.value=!1);}const i=O(()=>l.value?e.indeterminateIcon:e.falseIcon),s=O(()=>l.value?e.indeterminateIcon:e.trueIcon);

return me(()=>{const r=xt(Bu.filterProps(e),['modelValue']);

return h(Bu,ae(r,{modelValue:o.value,'onUpdate:modelValue':[u=>o.value=u,a],class:['v-checkbox-btn',e.class],style:e.style,type:'checkbox',falseIcon:i.value,trueIcon:s.value,'aria-checked':l.value?'mixed':void 0}),n);}),{};}});function js(e){const{t}=Eo();function n(l){let{name:o,color:a,...i}=l;const s={prepend:'prependAction',prependInner:'prependAction',append:'appendAction',appendInner:'appendAction',clear:'clear'}[o],r=e[`onClick:${o}`];function u(d){d.key!=='Enter'&&d.key!==' '||(d.preventDefault(),d.stopPropagation(),Kd(r,new PointerEvent('click',d)));}const c=r&&s?t(`$vuetify.input.${s}`,e.label??''):void 0;

return h(ze,ae({icon:e[`${o}Icon`],'aria-label':c,onClick:r,onKeydown:u,color:a},i),null);}

return{InputIcon:n};}const n0=j({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...Ce(),...Oo({transition:{component:Ff,leaveAbsolute:!0,group:!0}})},'VMessages'),l0=re()({name:'VMessages',props:n0(),setup(e,t){let{slots:n}=t;const l=V(()=>Nt(e.messages)),{textColorClasses:o,textColorStyles:a}=Kt(()=>e.color);

return me(()=>h(bn,{transition:e.transition,tag:'div',class:ce(['v-messages',o.value,e.class]),style:he([a.value,e.style])},{default:()=>[e.active&&l.value.map((i,s)=>T('div',{class:'v-messages__message',key:`${s}-${l.value}`},[n.message?n.message({message:i}):i]))]})),{};}}),zf=j({focused:Boolean,'onUpdate:focused':wt()},'focus');function Hf(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un();const n=je(e,'focused'),l=O(()=>({[`${t}--focused`]:n.value}));function o(){n.value=!0;}function a(){n.value=!1;}

return{focusClasses:l,isFocused:n,focus:o,blur:a};}const o0=Symbol.for('vuetify:form');function Wf(e){const t=Ie(o0,null);

return{...t,isReadonly:V(()=>!!(e?.readonly??t?.isReadonly.value)),isDisabled:V(()=>!!(e?.disabled??t?.isDisabled.value))};}const a0=Symbol.for('vuetify:rules');function i0(e){const t=Ie(a0,null);

if(!e){if(!t)throw new Error('Could not find Vuetify rules injection');

return t.aliases;}

return t?.resolve(e)??O(e);}const s0=j({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...zf()},'validation');function r0(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:un(),n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gt();const l=je(e,'modelValue'),o=V(()=>e.validationValue===void 0?l.value:e.validationValue),a=Wf(e),i=i0(()=>e.rules),s=L([]),r=le(!0),u=V(()=>!!(Nt(l.value===''?null:l.value).length||Nt(o.value===''?null:o.value).length)),c=V(()=>e.errorMessages?.length?Nt(e.errorMessages).concat(s.value).slice(0,Math.max(0,Number(e.maxErrors))):s.value),d=V(()=>{let y=(e.validateOn??a.validateOn?.value)||'input';y==='lazy'&&(y='input lazy'),y==='eager'&&(y='input eager');const _=new Set(y?.split(' ')??[]);

return{input:_.has('input'),blur:_.has('blur')||_.has('input')||_.has('invalid-input'),invalidInput:_.has('invalid-input'),lazy:_.has('lazy'),eager:_.has('eager')};}),f=V(()=>e.error||e.errorMessages?.length?!1:e.rules.length?r.value?s.value.length||d.value.lazy?null:!0:!s.value.length:!0),m=le(!1),v=V(()=>({[`${t}--error`]:f.value===!1,[`${t}--dirty`]:u.value,[`${t}--disabled`]:a.isDisabled.value,[`${t}--readonly`]:a.isReadonly.value})),g=Ye('validation'),p=V(()=>e.name??Me(n));_o(()=>{a.register?.({id:p.value,vm:g,validate:w,reset:b,resetValidation:S});}),yt(()=>{a.unregister?.(p.value);}),Yt(async()=>{d.value.lazy||await w(!d.value.eager),a.update?.(p.value,f.value,c.value);}),_n(()=>d.value.input||d.value.invalidInput&&f.value===!1,()=>{ie(o,()=>{if(o.value!=null)w();else if(e.focused){const y=ie(()=>e.focused,_=>{_||w(),y();});}});}),_n(()=>d.value.blur,()=>{ie(()=>e.focused,y=>{y||w();});}),ie([f,c],()=>{a.update?.(p.value,f.value,c.value);});async function b(){l.value=null,await Be(),await S();}async function S(){r.value=!0,d.value.lazy?s.value=[]:await w(!d.value.eager);}async function w(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const _=[];m.value=!0;

for(const k of i.value){if(_.length>=Number(e.maxErrors??1))break;

const x=await(typeof k=='function'?k:()=>k)(o.value);

if(x!==!0){if(x!==!1&&typeof x!='string'){console.warn(`${x} is not a valid value. Rule functions must return boolean true or a string.`);continue;}

_.push(x||'');}}

return s.value=_,m.value=!1,r.value=y,s.value;}

return{errorMessages:c,isDirty:u,isDisabled:a.isDisabled,isReadonly:a.isReadonly,isPristine:r,isValid:f,isValidating:m,reset:b,resetValidation:S,validate:w,validationClasses:v};}const jf=j({id:String,appendIcon:Te,baseColor:String,centerAffix:{type:Boolean,default:!0},color:String,glow:Boolean,iconColor:[Boolean,String],prependIcon:Te,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:'horizontal',validator:e=>['horizontal','vertical'].includes(e)},'onClick:prepend':wt(),'onClick:append':wt(),...Ce(),...Dt(),...To(cn(),['maxWidth','minWidth','width']),...qe(),...s0()},'VInput'),Lu=re()({name:'VInput',props:{...jf()},emits:{'update:modelValue':e=>!0},setup(e,t){let{attrs:n,slots:l,emit:o}=t;const{densityClasses:a}=Xt(e),{dimensionStyles:i}=dn(e),{themeClasses:s}=ot(e),{rtlClasses:r}=qt(),{InputIcon:u}=js(e),c=Gt(),d=V(()=>e.id||`input-${c}`),{errorMessages:f,isDirty:m,isDisabled:v,isReadonly:g,isPristine:p,isValid:b,isValidating:S,reset:w,resetValidation:y,validate:_,validationClasses:k}=r0(e,'v-input',d),I=V(()=>e.errorMessages?.length||!p.value&&f.value.length?f.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages),x=O(()=>I.value.length>0),E=O(()=>!e.hideDetails||e.hideDetails==='auto'&&(x.value||!!l.details)),M=V(()=>E.value?`${d.value}-messages`:void 0),z=V(()=>({id:d,messagesId:M,isDirty:m,isDisabled:v,isReadonly:g,isPristine:p,isValid:b,isValidating:S,hasDetails:E,reset:w,resetValidation:y,validate:_})),P=O(()=>e.error||e.disabled?void 0:e.focused?e.color:e.baseColor),$=O(()=>{if(e.iconColor)return e.iconColor===!0?P.value:e.iconColor;});

return me(()=>{const U=!!(l.prepend||e.prependIcon),Y=!!(l.append||e.appendIcon);

return T('div',{class:ce(['v-input',`v-input--${e.direction}`,{'v-input--center-affix':e.centerAffix,'v-input--focused':e.focused,'v-input--glow':e.glow,'v-input--hide-spin-buttons':e.hideSpinButtons},a.value,s.value,r.value,k.value,e.class]),style:he([i.value,e.style])},[U&&T('div',{key:'prepend',class:'v-input__prepend'},[l.prepend?l.prepend(z.value):e.prependIcon&&h(u,{key:'prepend-icon',name:'prepend',color:$.value},null)]),l.default&&T('div',{class:'v-input__control'},[l.default?.(z.value)]),Y&&T('div',{key:'append',class:'v-input__append'},[l.append?l.append(z.value):e.appendIcon&&h(u,{key:'append-icon',name:'append',color:$.value},null)]),E.value&&T('div',{id:M.value,class:'v-input__details',role:'alert','aria-live':'polite'},[h(l0,{active:x.value,messages:I.value},{message:l.message}),l.details?.(z.value)])]);}),{reset:w,resetValidation:y,validate:_,isValid:b,errorMessages:f};}}),yi=Symbol('Forwarded refs');function pi(e,t){let n=e;

for(;n;){const l=Reflect.getOwnPropertyDescriptor(n,t);

if(l)return l;

n=Object.getPrototypeOf(n);}}function Rl(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),l=1;l<t;l++)n[l-1]=arguments[l];

return e[yi]=n,new Proxy(e,{get(o,a){if(Reflect.has(o,a))return Reflect.get(o,a);

if(!(typeof a=='symbol'||a.startsWith('$')||a.startsWith('__'))){for(const i of n){if(i.value&&Reflect.has(i.value,a)){const s=Reflect.get(i.value,a);

return typeof s=='function'?s.bind(i.value):s;}}}},has(o,a){if(Reflect.has(o,a))return!0;

if(typeof a=='symbol'||a.startsWith('$')||a.startsWith('__'))return!1;

for(const i of n)if(i.value&&Reflect.has(i.value,a))return!0;

return!1;},set(o,a,i){if(Reflect.has(o,a))return Reflect.set(o,a,i);

if(typeof a=='symbol'||a.startsWith('$')||a.startsWith('__'))return!1;

for(const s of n)if(s.value&&Reflect.has(s.value,a))return Reflect.set(s.value,a,i);

return!1;},getOwnPropertyDescriptor(o,a){const i=Reflect.getOwnPropertyDescriptor(o,a);

if(i)return i;

if(!(typeof a=='symbol'||a.startsWith('$')||a.startsWith('__'))){for(const s of n){if(!s.value)continue;

const r=pi(s.value,a)??('_'in s.value?pi(s.value._?.setupState,a):void 0);

if(r)return r;}

for(const s of n){const r=s.value&&s.value[yi];

if(!r)continue;

const u=r.slice();

for(;u.length;){const c=u.shift(),d=pi(c.value,a);

if(d)return d;

const f=c.value&&c.value[yi];f&&u.push(...f);}}}}});}function u0(e){let{selectedElement:t,containerElement:n,isRtl:l,isHorizontal:o}=e;const a=Co(o,n),i=Uf(o,l,n),s=Co(o,t),r=Kf(o,t),u=s*.4;

return i>r?r-u:i+a<r+s?r-a+s+u:i;}function c0(e){let{selectedElement:t,containerElement:n,isHorizontal:l}=e;const o=Co(l,n),a=Kf(l,t),i=Co(l,t);

return a-o/2+i/2;}function Ru(e,t){return t?.[e?'scrollWidth':'scrollHeight']||0;}function d0(e,t){return t?.[e?'clientWidth':'clientHeight']||0;}function Uf(e,t,n){if(!n)return 0;

const{scrollLeft:l,offsetWidth:o,scrollWidth:a}=n;

return e?t?a-o+l:l:n.scrollTop;}function Co(e,t){return t?.[e?'offsetWidth':'offsetHeight']||0;}function Kf(e,t){return t?.[e?'offsetLeft':'offsetTop']||0;}const Gf=Symbol.for('vuetify:v-slide-group'),Us=j({centerActive:Boolean,scrollToActive:{type:Boolean,default:!0},contentClass:null,direction:{type:String,default:'horizontal'},symbol:{type:null,default:Gf},nextIcon:{type:Te,default:'$next'},prevIcon:{type:Te,default:'$prev'},showArrows:{type:[Boolean,String],validator:e=>typeof e=='boolean'||['always','desktop','mobile','never'].includes(e)},...Ce(),...pp({mobile:null}),...Le(),...Ds({selectedClass:'v-slide-group-item--active'})},'VSlideGroup'),ba=re()({name:'VSlideGroup',props:Us(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const{isRtl:l}=qt(),{displayClasses:o,mobile:a}=Fs(e),i=Na(e,e.symbol),s=le(!1),r=le(0),u=le(0),c=le(0),d=V(()=>e.direction==='horizontal'),{resizeRef:f,contentRect:m}=sl(),{resizeRef:v,contentRect:g}=sl(),p=wp(),b=V(()=>({container:f.el,duration:200,easing:'easeOutQuart'})),S=V(()=>i.selected.value.length?i.items.value.findIndex(R=>R.id===i.selected.value[0]):-1),w=V(()=>i.selected.value.length?i.items.value.findIndex(R=>R.id===i.selected.value[i.selected.value.length-1]):-1);

if(Fe){let R=-1;ie(()=>[i.selected.value,m.value,g.value,d.value],()=>{cancelAnimationFrame(R),R=requestAnimationFrame(()=>{if(m.value&&g.value){const q=d.value?'width':'height';u.value=m.value[q],c.value=g.value[q],s.value=u.value+1<c.value;}

if(e.scrollToActive&&S.value>=0&&v.el){const q=v.el.children[w.value];_(q,e.centerActive);}});});}

const y=le(!1);function _(R,q){let ye=0;q?ye=c0({containerElement:f.el,isHorizontal:d.value,selectedElement:R}):ye=u0({containerElement:f.el,isHorizontal:d.value,isRtl:l.value,selectedElement:R}),k(ye);}function k(R){if(!Fe||!f.el)return;

const q=Co(d.value,f.el),ye=Uf(d.value,l.value,f.el);

if(!(Ru(d.value,f.el)<=q||Math.abs(R-ye)<16)){if(d.value&&l.value&&f.el){const{scrollWidth:xe,offsetWidth:X}=f.el;R=xe-X-R;}

d.value?p.horizontal(R,b.value):p(R,b.value);}}function I(R){const{scrollTop:q,scrollLeft:ye}=R.target;r.value=d.value?ye:q;}function x(R){if(y.value=!0,!(!s.value||!v.el)){for(const q of R.composedPath()){for(const ye of v.el.children){if(ye===q){_(ye);

return;}}}}}function E(R){y.value=!1;}let M=!1;function z(R){!M&&!y.value&&!(R.relatedTarget&&v.el?.contains(R.relatedTarget))&&Y(),M=!1;}function P(){M=!0;}function $(R){if(!v.el)return;

function q(ye){R.preventDefault(),Y(ye);}d.value?R.key==='ArrowRight'?q(l.value?'prev':'next'):R.key==='ArrowLeft'&&q(l.value?'next':'prev'):R.key==='ArrowDown'?q('next'):R.key==='ArrowUp'&&q('prev'),R.key==='Home'?q('first'):R.key==='End'&&q('last');}function U(R,q){if(!R)return;

let ye=R;do ye=ye?.[q==='next'?'nextElementSibling':'previousElementSibling'];while(ye?.hasAttribute('disabled'));

return ye;}function Y(R){if(!v.el)return;

let q;

if(!R)q=el(v.el)[0];else if(R==='next'){if(q=U(v.el.querySelector(':focus'),R),!q)return Y('first');}else if(R==='prev'){if(q=U(v.el.querySelector(':focus'),R),!q)return Y('last');}else R==='first'?(q=v.el.firstElementChild,q?.hasAttribute('disabled')&&(q=U(q,'next'))):R==='last'&&(q=v.el.lastElementChild,q?.hasAttribute('disabled')&&(q=U(q,'prev')));

q&&q.focus({preventScroll:!0});}function oe(R){const q=d.value&&l.value?-1:1,ye=(R==='prev'?-q:q)*u.value;let Q=r.value+ye;

if(d.value&&l.value&&f.el){const{scrollWidth:xe,offsetWidth:X}=f.el;Q+=xe-X;}

k(Q);}const ee=V(()=>({next:i.next,prev:i.prev,select:i.select,isSelected:i.isSelected})),te=V(()=>s.value||Math.abs(r.value)>0),Se=V(()=>{switch(e.showArrows){case'never':return!1;case'always':return!0;case'desktop':return!a.value;case!0:return te.value;case'mobile':return a.value||te.value;default:return!a.value&&te.value;}}),J=V(()=>Math.abs(r.value)>1),ue=V(()=>{if(!f.value||!te.value)return!1;

const R=Ru(d.value,f.el),q=d0(d.value,f.el);

return R-q-Math.abs(r.value)>1;});

return me(()=>h(e.tag,{class:ce(['v-slide-group',{'v-slide-group--vertical':!d.value,'v-slide-group--has-affixes':Se.value,'v-slide-group--is-overflowing':s.value},o.value,e.class]),style:he(e.style),tabindex:y.value||i.selected.value.length?-1:0,onFocus:z},{default:()=>[Se.value&&T('div',{key:'prev',class:ce(['v-slide-group__prev',{'v-slide-group__prev--disabled':!J.value}]),onMousedown:P,onClick:()=>J.value&&oe('prev')},[n.prev?.(ee.value)??h(Du,null,{default:()=>[h(ze,{icon:l.value?e.nextIcon:e.prevIcon},null)]})]),T('div',{key:'container',ref:f,class:ce(['v-slide-group__container',e.contentClass]),onScroll:I},[T('div',{ref:v,class:'v-slide-group__content',onFocusin:x,onFocusout:E,onKeydown:$},[n.default?.(ee.value)])]),Se.value&&T('div',{key:'next',class:ce(['v-slide-group__next',{'v-slide-group__next--disabled':!ue.value}]),onMousedown:P,onClick:()=>ue.value&&oe('next')},[n.next?.(ee.value)??h(Du,null,{default:()=>[h(ze,{icon:l.value?e.prevIcon:e.nextIcon},null)]})])]})),{selected:i.selected,scrollTo:oe,scrollOffset:r,focus:Y,hasPrev:J,hasNext:ue};}}),Yf=Symbol.for('vuetify:v-chip-group'),f0=j({baseColor:String,column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Mt},...Us({scrollToActive:!1}),...Ce(),...Ds({selectedClass:'v-chip--selected'}),...Le(),...qe(),...En({variant:'tonal'})},'VChipGroup');re()({name:'VChipGroup',props:f0(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:l}=ot(e),{isSelected:o,select:a,next:i,prev:s,selected:r}=Na(e,Yf);

return Ln({VChip:{baseColor:O(()=>e.baseColor),color:O(()=>e.color),disabled:O(()=>e.disabled),filter:O(()=>e.filter),variant:O(()=>e.variant)}}),me(()=>{const u=ba.filterProps(e);

return h(ba,ae(u,{class:['v-chip-group',{'v-chip-group--column':e.column},l.value,e.class],style:e.style}),{default:()=>[n.default?.({isSelected:o,select:a,next:i,prev:s,selected:r.value})]});}),{};}});const v0=j({activeClass:String,appendAvatar:String,appendIcon:Te,baseColor:String,closable:Boolean,closeIcon:{type:Te,default:'$delete'},closeLabel:{type:String,default:'$vuetify.close'},draggable:Boolean,filter:Boolean,filterIcon:{type:Te,default:'$complete'},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Te,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},modelValue:{type:Boolean,default:!0},onClick:wt(),onClickOnce:wt(),...Rn(),...Ce(),...Dt(),...zn(),...$s(),...$t(),...ja(),...Io(),...Le({tag:'span'}),...qe(),...En({variant:'tonal'})},'VChip'),Nu=re()({name:'VChip',directives:{vRipple:rn},props:v0(),emits:{'click:close':e=>!0,'update:modelValue':e=>!0,'group:selected':e=>!0,click:e=>!0},setup(e,t){let{attrs:n,emit:l,slots:o}=t;const{t:a}=Eo(),{borderClasses:i}=Nn(e),{densityClasses:s}=Xt(e),{elevationClasses:r}=Hn(e),{roundedClasses:u}=Bt(e),{sizeClasses:c}=Fo(e),{themeClasses:d}=ot(e),f=je(e,'modelValue'),m=ha(e,Yf,!1),v=ha(e,Gf,!1),g=Wa(e,n),p=O(()=>e.link!==!1&&g.isLink.value),b=V(()=>!e.disabled&&e.link!==!1&&(!!m||e.link||g.isClickable.value)),S=O(()=>({'aria-label':a(e.closeLabel),disabled:e.disabled,onClick(x){x.preventDefault(),x.stopPropagation(),f.value=!1,l('click:close',x);}}));ie(f,x=>{x?(m?.register(),v?.register()):(m?.unregister(),v?.unregister());});const{colorClasses:w,colorStyles:y,variantClasses:_}=Ll(()=>({color:!m||m.isSelected.value?e.color??e.baseColor:e.baseColor,variant:e.variant}));function k(x){l('click',x),b.value&&(g.navigate?.(x),m?.toggle());}function I(x){(x.key==='Enter'||x.key===' ')&&(x.preventDefault(),k(x));}

return()=>{const x=g.isLink.value?'a':e.tag,E=!!(e.appendIcon||e.appendAvatar),M=!!(E||o.append),z=!!(o.close||e.closable),P=!!(o.filter||e.filter)&&m,$=!!(e.prependIcon||e.prependAvatar),U=!!($||o.prepend);

return f.value&&st(h(x,ae(g.linkProps,{class:['v-chip',{'v-chip--disabled':e.disabled,'v-chip--label':e.label,'v-chip--link':b.value,'v-chip--filter':P,'v-chip--pill':e.pill,[`${e.activeClass}`]:e.activeClass&&g.isActive?.value},d.value,i.value,w.value,s.value,r.value,u.value,c.value,_.value,m?.selectedClass.value,e.class],style:[y.value,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:b.value?0:void 0,onClick:k,onKeydown:b.value&&!p.value&&I}),{default:()=>[Bl(b.value,'v-chip'),P&&h(Mf,{key:'filter'},{default:()=>[st(T('div',{class:'v-chip__filter'},[o.filter?h(Ue,{key:'filter-defaults',disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},o.filter):h(ze,{key:'filter-icon',icon:e.filterIcon},null)]),[[cl,m.isSelected.value]])]}),U&&T('div',{key:'prepend',class:'v-chip__prepend'},[o.prepend?h(Ue,{key:'prepend-defaults',disabled:!$,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},o.prepend):T(ke,null,[e.prependIcon&&h(ze,{key:'prepend-icon',icon:e.prependIcon,start:!0},null),e.prependAvatar&&h(rl,{key:'prepend-avatar',image:e.prependAvatar,start:!0},null)])]),T('div',{class:'v-chip__content','data-no-activator':''},[o.default?.({isSelected:m?.isSelected.value,selectedClass:m?.selectedClass.value,select:m?.select,toggle:m?.toggle,value:m?.value.value,disabled:e.disabled})??Ge(e.text)]),M&&T('div',{key:'append',class:'v-chip__append'},[o.append?h(Ue,{key:'append-defaults',disabled:!E,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},o.append):T(ke,null,[e.appendIcon&&h(ze,{key:'append-icon',end:!0,icon:e.appendIcon},null),e.appendAvatar&&h(rl,{key:'append-avatar',end:!0,image:e.appendAvatar},null)])]),z&&T('button',ae({key:'close',class:'v-chip__close',type:'button','data-testid':'close-chip'},S.value),[o.close?h(Ue,{key:'close-defaults',defaults:{VIcon:{icon:e.closeIcon,size:'x-small'}}},o.close):h(ze,{key:'close-icon',icon:e.closeIcon,size:'x-small'},null)])]}),[[rn,b.value&&e.ripple,null]]);};}}),Yi=Symbol.for('vuetify:list');function qf(){let{filterable:e}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{filterable:!1};const t=Ie(Yi,{filterable:!1,hasPrepend:le(!1),updateHasPrepend:()=>null}),n={filterable:t.filterable||e,hasPrepend:le(!1),updateHasPrepend:l=>{l&&(n.hasPrepend.value=l);}};

return vt(Yi,n),t;}function Xf(){return Ie(Yi,null);}const Ks=e=>{const t={activate:n=>{let{id:l,value:o,activated:a}=n;

return l=fe(l),e&&!o&&a.size===1&&a.has(l)||(o?a.add(l):a.delete(l)),a;},in:(n,l,o)=>{let a=new Set;

if(n!=null)for(const i of Nt(n))a=t.activate({id:i,value:!0,activated:new Set(a),children:l,parents:o});

return a;},out:n=>Array.from(n)};

return t;},Zf=e=>{const t=Ks(e);

return{activate:l=>{let{activated:o,id:a,...i}=l;a=fe(a);const s=o.has(a)?new Set([a]):new Set;

return t.activate({...i,id:a,activated:s});},in:(l,o,a)=>{let i=new Set;

if(l!=null){const s=Nt(l);s.length&&(i=t.in(s.slice(0,1),o,a));}

return i;},out:(l,o,a)=>t.out(l,o,a)};},m0=e=>{const t=Ks(e);

return{activate:l=>{let{id:o,activated:a,children:i,...s}=l;

return o=fe(o),i.has(o)?a:t.activate({id:o,activated:a,children:i,...s});},in:t.in,out:t.out};},g0=e=>{const t=Zf(e);

return{activate:l=>{let{id:o,activated:a,children:i,...s}=l;

return o=fe(o),i.has(o)?a:t.activate({id:o,activated:a,children:i,...s});},in:t.in,out:t.out};},h0={open:e=>{let{id:t,value:n,opened:l,parents:o}=e;

if(n){const a=new Set;a.add(t);let i=o.get(t);

for(;i!=null;)a.add(i),i=o.get(i);

return a;}else return l.delete(t),l;},select:()=>null},Jf={open:e=>{let{id:t,value:n,opened:l,parents:o}=e;

if(n){let a=o.get(t);

for(l.add(t);a!=null&&a!==t;)l.add(a),a=o.get(a);

return l;}else l.delete(t);

return l;},select:()=>null},y0={open:Jf.open,select:e=>{let{id:t,value:n,opened:l,parents:o}=e;

if(!n)return l;

const a=[];let i=o.get(t);

for(;i!=null;)a.push(i),i=o.get(i);

return new Set(a);}},Gs=e=>{const t={select:n=>{let{id:l,value:o,selected:a}=n;

if(l=fe(l),e&&!o){const i=Array.from(a.entries()).reduce((s,r)=>{let[u,c]=r;

return c==='on'&&s.push(u),s;},[]);

if(i.length===1&&i[0]===l)return a;}

return a.set(l,o?'on':'off'),a;},in:(n,l,o,a)=>{const i=new Map;

for(const s of n||[])t.select({id:s,value:!0,selected:i,children:l,parents:o,disabled:a});

return i;},out:n=>{const l=[];

for(const[o,a]of n.entries())a==='on'&&l.push(o);

return l;}};

return t;},Qf=e=>{const t=Gs(e);

return{select:l=>{let{selected:o,id:a,...i}=l;a=fe(a);const s=o.has(a)?new Map([[a,o.get(a)]]):new Map;

return t.select({...i,id:a,selected:s});},in:(l,o,a,i)=>l?.length?t.in(l.slice(0,1),o,a,i):new Map,out:(l,o,a)=>t.out(l,o,a)};},p0=e=>{const t=Gs(e);

return{select:l=>{let{id:o,selected:a,children:i,...s}=l;

return o=fe(o),i.has(o)?a:t.select({id:o,selected:a,children:i,...s});},in:t.in,out:t.out};},b0=e=>{const t=Qf(e);

return{select:l=>{let{id:o,selected:a,children:i,...s}=l;

return o=fe(o),i.has(o)?a:t.select({id:o,selected:a,children:i,...s});},in:t.in,out:t.out};},ev=e=>{const t={select:n=>{let{id:l,value:o,selected:a,children:i,parents:s,disabled:r}=n;l=fe(l);const u=new Map(a),c=[l];

for(;c.length;){const f=c.shift();r.has(f)||a.set(fe(f),o?'on':'off'),i.has(f)&&c.push(...i.get(f));}

let d=fe(s.get(l));

for(;d;){let f=!0,m=!0;

for(const v of i.get(d)){const g=fe(v);

if(!r.has(g)&&(a.get(g)!=='on'&&(f=!1),a.has(g)&&a.get(g)!=='off'&&(m=!1),!f&&!m))break;}

a.set(d,f?'on':m?'off':'indeterminate'),d=fe(s.get(d));}

return e&&!o&&Array.from(a.entries()).reduce((m,v)=>{let[g,p]=v;

return p==='on'&&m.push(g),m;},[]).length===0?u:a;},in:(n,l,o)=>{let a=new Map;

for(const i of n||[])a=t.select({id:i,value:!0,selected:a,children:l,parents:o,disabled:new Set});

return a;},out:(n,l)=>{const o=[];

for(const[a,i]of n.entries())i==='on'&&!l.has(a)&&o.push(a);

return o;}};

return t;},S0=e=>{const t=ev(e);

return{select:t.select,in:t.in,out:(l,o,a)=>{const i=[];

for(const[s,r]of l.entries()){if(r==='on'){if(a.has(s)){const u=a.get(s);

if(l.get(u)==='on')continue;}

i.push(s);}}

return i;}};},Fl=Symbol.for('vuetify:nested'),tv={id:le(),root:{itemsRegistration:L('render'),register:()=>null,unregister:()=>null,updateDisabled:()=>null,children:L(new Map),parents:L(new Map),disabled:L(new Set),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:L(!1),selectable:L(!1),opened:L(new Set),activated:L(new Set),selected:L(new Map),selectedValues:L([]),getPath:()=>[]}},w0=j({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean,itemsRegistration:{type:String,default:'render'}},'nested'),C0=(e,t,n)=>{let l=!1;const o=le(new Map),a=le(new Map),i=le(new Set),s=je(e,'opened',e.opened,w=>new Set(Array.isArray(w)?w.map(y=>fe(y)):w),w=>[...w.values()]),r=V(()=>{if(typeof e.activeStrategy=='object')return e.activeStrategy;

if(typeof e.activeStrategy=='function')return e.activeStrategy(e.mandatory);

switch(e.activeStrategy){case'leaf':return m0(e.mandatory);case'single-leaf':return g0(e.mandatory);case'independent':return Ks(e.mandatory);default:return Zf(e.mandatory);}}),u=V(()=>{if(typeof e.selectStrategy=='object')return e.selectStrategy;

if(typeof e.selectStrategy=='function')return e.selectStrategy(e.mandatory);

switch(e.selectStrategy){case'single-leaf':return b0(e.mandatory);case'leaf':return p0(e.mandatory);case'independent':return Gs(e.mandatory);case'single-independent':return Qf(e.mandatory);case'trunk':return S0(e.mandatory);default:return ev(e.mandatory);}}),c=V(()=>{if(typeof e.openStrategy=='object')return e.openStrategy;

switch(e.openStrategy){case'list':return y0;case'single':return h0;default:return Jf;}}),d=je(e,'activated',e.activated,w=>r.value.in(w,o.value,a.value),w=>r.value.out(w,o.value,a.value)),f=je(e,'selected',e.selected,w=>u.value.in(w,o.value,a.value,i.value),w=>u.value.out(w,o.value,a.value));yt(()=>{l=!0;});function m(w){const y=[];let _=fe(w);

for(;_!==void 0;)y.unshift(_),_=a.value.get(_);

return y;}const v=Ye('nested'),g=new Set,p=by(()=>{Be(()=>{o.value=new Map(o.value),a.value=new Map(a.value);});},100);ie(()=>[t.value,lt(n)],()=>{e.itemsRegistration==='props'&&b();},{immediate:!0});function b(){const w=new Map,y=new Map,_=new Set,k=lt(n)?E=>fe(E.raw):E=>E.value,I=[...t.value];let x=0;

for(;x<I.length;){const E=I[x++],M=k(E);

if(E.children){const z=[];

for(const P of E.children){const $=k(P);w.set($,M),z.push($),I.push(P);}

y.set(M,z);}

E.props.disabled&&_.add(M);}

o.value=y,a.value=w,i.value=_;}const S={id:le(),root:{opened:s,activatable:O(()=>e.activatable),selectable:O(()=>e.selectable),activated:d,selected:f,selectedValues:V(()=>{const w=[];

for(const[y,_]of f.value.entries())_==='on'&&w.push(y);

return w;}),itemsRegistration:O(()=>e.itemsRegistration),register:(w,y,_,k)=>{if(g.has(w)){m(w).map(String).join(' -> '),m(y).concat(w).map(String).join(' -> ');

return;}else g.add(w);

y&&w!==y&&a.value.set(w,y),_&&i.value.add(w),k&&o.value.set(w,[]),y!=null&&o.value.set(y,[...o.value.get(y)||[],w]),p();},unregister:w=>{if(l)return;

g.delete(w),o.value.delete(w),i.value.delete(w);const y=a.value.get(w);

if(y){const _=o.value.get(y)??[];o.value.set(y,_.filter(k=>k!==w));}

a.value.delete(w),p();},updateDisabled:(w,y)=>{y?i.value.add(w):i.value.delete(w);},open:(w,y,_)=>{v.emit('click:open',{id:w,value:y,path:m(w),event:_});const k=c.value.open({id:w,value:y,opened:new Set(s.value),children:o.value,parents:a.value,event:_});k&&(s.value=k);},openOnSelect:(w,y,_)=>{const k=c.value.select({id:w,value:y,selected:new Map(f.value),opened:new Set(s.value),children:o.value,parents:a.value,event:_});k&&(s.value=k);},select:(w,y,_)=>{v.emit('click:select',{id:w,value:y,path:m(w),event:_});const k=u.value.select({id:w,value:y,selected:new Map(f.value),children:o.value,parents:a.value,disabled:i.value,event:_});k&&(f.value=k),S.root.openOnSelect(w,y,_);},activate:(w,y,_)=>{if(!e.activatable)return S.root.select(w,!0,_);

v.emit('click:activate',{id:w,value:y,path:m(w),event:_});const k=r.value.activate({id:w,value:y,activated:new Set(d.value),children:o.value,parents:a.value,event:_});

if(k.size!==d.value.size)d.value=k;else{for(const I of k){if(!d.value.has(I)){d.value=k;

return;}}

for(const I of d.value){if(!k.has(I)){d.value=k;

return;}}}},children:o,parents:a,disabled:i,getPath:m}};

return vt(Fl,S),S.root;},nv=(e,t,n)=>{const l=Ie(Fl,tv),o=Symbol('nested item'),a=V(()=>{const s=fe(lt(e));

return s!==void 0?s:o;}),i={...l,id:a,open:(s,r)=>l.root.open(a.value,s,r),openOnSelect:(s,r)=>l.root.openOnSelect(a.value,s,r),isOpen:V(()=>l.root.opened.value.has(a.value)),parent:V(()=>l.root.parents.value.get(a.value)),activate:(s,r)=>l.root.activate(a.value,s,r),isActivated:V(()=>l.root.activated.value.has(a.value)),select:(s,r)=>l.root.select(a.value,s,r),isSelected:V(()=>l.root.selected.value.get(a.value)==='on'),isIndeterminate:V(()=>l.root.selected.value.get(a.value)==='indeterminate'),isLeaf:V(()=>!l.root.children.value.get(a.value)),isGroupActivator:l.isGroupActivator};

return _o(()=>{l.isGroupActivator||l.root.itemsRegistration.value==='props'||Be(()=>{l.root.register(a.value,l.id.value,lt(t),n);});}),yt(()=>{l.isGroupActivator||l.root.itemsRegistration.value==='props'||l.root.unregister(a.value);}),ie(a,(s,r)=>{l.isGroupActivator||l.root.itemsRegistration.value==='props'||(l.root.unregister(r),Be(()=>{l.root.register(s,l.id.value,lt(t),n);}));}),ie(()=>lt(t),s=>{l.root.updateDisabled(a.value,s);}),n&&vt(Fl,i),i;},x0=()=>{const e=Ie(Fl,tv);vt(Fl,{...e,isGroupActivator:!0});};function Ua(){const e=le(!1);

return Yt(()=>{window.requestAnimationFrame(()=>{e.value=!0;});}),{ssrBootStyles:O(()=>e.value?void 0:{transition:'none !important'}),isBooted:Al(e)};}const k0=$l({name:'VListGroupActivator',setup(e,t){let{slots:n}=t;

return x0(),()=>n.default?.();}}),_0=j({activeColor:String,baseColor:String,color:String,collapseIcon:{type:Te,default:'$collapse'},disabled:Boolean,expandIcon:{type:Te,default:'$expand'},rawId:[String,Number],prependIcon:Te,appendIcon:Te,fluid:Boolean,subgroup:Boolean,title:String,value:null,...Ce(),...Le()},'VListGroup'),zu=re()({name:'VListGroup',props:_0(),setup(e,t){let{slots:n}=t;const{isOpen:l,open:o,id:a}=nv(()=>e.value,()=>e.disabled,!0),i=V(()=>`v-list-group--id-${String(e.rawId??a.value)}`),s=Xf(),{isBooted:r}=Ua(),u=Ie(Fl),c=O(()=>u?.root?.itemsRegistration.value==='render');function d(g){['INPUT','TEXTAREA'].includes(g.target?.tagName)||o(!l.value,g);}const f=V(()=>({onClick:d,class:'v-list-group__header',id:i.value})),m=V(()=>l.value?e.collapseIcon:e.expandIcon),v=V(()=>({VListItem:{activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&m.value,appendIcon:e.appendIcon||!e.subgroup&&m.value,title:e.title,value:e.value}}));

return me(()=>h(e.tag,{class:ce(['v-list-group',{'v-list-group--prepend':s?.hasPrepend.value,'v-list-group--fluid':e.fluid,'v-list-group--subgroup':e.subgroup,'v-list-group--open':l.value},e.class]),style:he(e.style)},{default:()=>[n.activator&&h(Ue,{defaults:v.value},{default:()=>[h(k0,null,{default:()=>[n.activator({props:f.value,isOpen:l.value})]})]}),h(bn,{transition:{component:Of},disabled:!r.value},{default:()=>[c.value?st(T('div',{class:'v-list-group__items',role:'group','aria-labelledby':i.value},[n.default?.()]),[[cl,l.value]]):l.value&&T('div',{class:'v-list-group__items',role:'group','aria-labelledby':i.value},[n.default?.()])]})]})),{isOpen:l};}}),A0=j({opacity:[Number,String],...Ce(),...Le()},'VListItemSubtitle'),V0=re()({name:'VListItemSubtitle',props:A0(),setup(e,t){let{slots:n}=t;

return me(()=>h(e.tag,{class:ce(['v-list-item-subtitle',e.class]),style:he([{'--v-list-item-subtitle-opacity':e.opacity},e.style])},n)),{};}}),T0=$a('v-list-item-title'),E0=j({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:Te,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:Te,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,prependGap:[Number,String],subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},value:null,onClick:wt(),onClickOnce:wt(),...Rn(),...Ce(),...Dt(),...cn(),...zn(),...$t(),...ja(),...Le(),...qe(),...En({variant:'text'})},'VListItem'),Sa=re()({name:'VListItem',directives:{vRipple:rn},props:E0(),emits:{click:e=>!0},setup(e,t){let{attrs:n,slots:l,emit:o}=t;const a=Wa(e,n),i=V(()=>e.value===void 0?a.href.value:e.value),{activate:s,isActivated:r,select:u,isOpen:c,isSelected:d,isIndeterminate:f,isGroupActivator:m,root:v,parent:g,openOnSelect:p,id:b}=nv(i,()=>e.disabled,!1),S=Xf(),w=V(()=>e.active!==!1&&(e.active||a.isActive?.value||(v.activatable.value?r.value:d.value))),y=O(()=>e.link!==!1&&a.isLink.value),_=V(()=>!!S&&(v.selectable.value||v.activatable.value||e.value!=null)),k=V(()=>!e.disabled&&e.link!==!1&&(e.link||a.isClickable.value||_.value)),I=V(()=>S?y.value?'link':_.value?'option':'listitem':void 0),x=V(()=>{if(_.value)return v.activatable.value?r.value:v.selectable.value?d.value:w.value;}),E=O(()=>e.rounded||e.nav),M=O(()=>e.color??e.activeColor),z=O(()=>({color:w.value?M.value??e.baseColor:e.baseColor,variant:e.variant}));ie(()=>a.isActive?.value,X=>{X&&P();}),_o(()=>{a.isActive?.value&&Be(()=>P());});function P(){g.value!=null&&v.open(g.value,!0),p(!0);}const{themeClasses:$}=ot(e),{borderClasses:U}=Nn(e),{colorClasses:Y,colorStyles:oe,variantClasses:ee}=Ll(z),{densityClasses:te}=Xt(e),{dimensionStyles:Se}=dn(e),{elevationClasses:J}=Hn(e),{roundedClasses:ue}=Bt(E),R=O(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),q=O(()=>e.ripple!==void 0&&e.ripple&&S?.filterable?{keys:['Enter']}:e.ripple),ye=V(()=>({isActive:w.value,select:u,isOpen:c.value,isSelected:d.value,isIndeterminate:f.value}));function Q(X){o('click',X),!['INPUT','TEXTAREA'].includes(X.target?.tagName)&&k.value&&(a.navigate?.(X),!m&&(v.activatable.value?s(!r.value,X):(v.selectable.value||e.value!=null&&!y.value)&&u(!d.value,X)));}function xe(X){const _e=X.target;['INPUT','TEXTAREA'].includes(_e.tagName)||(X.key==='Enter'||X.key===' '&&!S?.filterable)&&(X.preventDefault(),X.stopPropagation(),X.target.dispatchEvent(new MouseEvent('click',X)));}

return me(()=>{const X=y.value?'a':e.tag,_e=l.title||e.title!=null,Qe=l.subtitle||e.subtitle!=null,We=!!(e.appendAvatar||e.appendIcon),kt=!!(We||l.append),C=!!(e.prependAvatar||e.prependIcon),A=!!(C||l.prepend);

return S?.updateHasPrepend(A),e.activeColor&&Md('active-color',['color','base-color']),st(h(X,ae(a.linkProps,{class:['v-list-item',{'v-list-item--active':w.value,'v-list-item--disabled':e.disabled,'v-list-item--link':k.value,'v-list-item--nav':e.nav,'v-list-item--slim':e.slim,[`${e.activeClass}`]:e.activeClass&&w.value},$.value,U.value,Y.value,te.value,J.value,R.value,ue.value,ee.value,e.class],style:[{'--v-list-prepend-gap':se(e.prependGap)},oe.value,Se.value,e.style],tabindex:k.value?S?-2:0:void 0,'aria-selected':x.value,role:I.value,onClick:Q,onKeydown:k.value&&!y.value&&xe}),{default:()=>[Bl(k.value||w.value,'v-list-item'),A&&T('div',{key:'prepend',class:'v-list-item__prepend'},[l.prepend?h(Ue,{key:'prepend-defaults',disabled:!C,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>[l.prepend?.(ye.value)]}):T(ke,null,[e.prependAvatar&&h(rl,{key:'prepend-avatar',density:e.density,image:e.prependAvatar},null),e.prependIcon&&h(ze,{key:'prepend-icon',density:e.density,icon:e.prependIcon},null)]),T('div',{class:'v-list-item__spacer'},null)]),T('div',{class:'v-list-item__content','data-no-activator':''},[_e&&h(T0,{key:'title'},{default:()=>[l.title?.({title:e.title})??Ge(e.title)]}),Qe&&h(V0,{key:'subtitle'},{default:()=>[l.subtitle?.({subtitle:e.subtitle})??Ge(e.subtitle)]}),l.default?.(ye.value)]),kt&&T('div',{key:'append',class:'v-list-item__append'},[l.append?h(Ue,{key:'append-defaults',disabled:!We,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>[l.append?.(ye.value)]}):T(ke,null,[e.appendIcon&&h(ze,{key:'append-icon',density:e.density,icon:e.appendIcon},null),e.appendAvatar&&h(rl,{key:'append-avatar',density:e.density,image:e.appendAvatar},null)]),T('div',{class:'v-list-item__spacer'},null)])]}),[[rn,k.value&&q.value]]);}),{activate:s,isActivated:r,isGroupActivator:m,isSelected:d,list:S,select:u,root:v,id:b,link:a};}}),P0=j({color:String,inset:Boolean,sticky:Boolean,title:String,...Ce(),...Le()},'VListSubheader'),lv=re()({name:'VListSubheader',props:P0(),setup(e,t){let{slots:n}=t;const{textColorClasses:l,textColorStyles:o}=Kt(()=>e.color);

return me(()=>{const a=!!(n.default||e.title);

return h(e.tag,{class:ce(['v-list-subheader',{'v-list-subheader--inset':e.inset,'v-list-subheader--sticky':e.sticky},l.value,e.class]),style:he([{textColorStyles:o},e.style])},{default:()=>[a&&T('div',{class:'v-list-subheader__text'},[n.default?.()??e.title])]});}),{};}}),I0=j({items:Array,returnObject:Boolean},'VListChildren'),ov=re()({name:'VListChildren',props:I0(),setup(e,t){let{slots:n}=t;

return qf(),()=>n.default?.()??e.items?.map(l=>{let{children:o,props:a,type:i,raw:s}=l;

if(i==='divider')return n.divider?.({props:a})??h(po,a,null);

if(i==='subheader')return n.subheader?.({props:a})??h(lv,a,null);

const r={subtitle:n.subtitle?c=>n.subtitle?.({...c,item:s}):void 0,prepend:n.prepend?c=>n.prepend?.({...c,item:s}):void 0,append:n.append?c=>n.append?.({...c,item:s}):void 0,title:n.title?c=>n.title?.({...c,item:s}):void 0},u=zu.filterProps(a);

return o?h(zu,ae(u,{value:e.returnObject?s:a?.value,rawId:a?.value}),{activator:c=>{let{props:d}=c;const f=ae(a,d,{value:e.returnObject?s:a.value});

return n.header?n.header({props:f}):h(Sa,f,r);},default:()=>h(ov,{items:o,returnObject:e.returnObject},n)}):n.item?n.item({props:a}):h(Sa,ae(a,{value:e.returnObject?s:a.value}),r);});}}),av=j({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:'title'},itemValue:{type:[String,Array,Function],default:'value'},itemChildren:{type:[Boolean,String,Array,Function],default:'children'},itemProps:{type:[Boolean,String,Array,Function],default:'props'},itemType:{type:[Boolean,String,Array,Function],default:'type'},returnObject:Boolean,valueComparator:Function},'list-items'),F0=new Set(['item','divider','subheader']);function _l(e,t){const n=Lt(t,e.itemTitle,t),l=Lt(t,e.itemValue,n),o=Lt(t,e.itemChildren),a=e.itemProps===!0?typeof t=='object'&&t!=null&&!Array.isArray(t)?'children'in t?xt(t,['children']):t:void 0:Lt(t,e.itemProps);let i=Lt(t,e.itemType,'item');F0.has(i)||(i='item');const s={title:n,value:l,...a};

return{type:i,title:String(s.title??''),value:s.value,props:s,children:i==='item'&&Array.isArray(o)?iv(e,o):void 0,raw:t};}_l.neededProps=['itemTitle','itemValue','itemChildren','itemProps','itemType'];function iv(e,t){const n=To(e,_l.neededProps),l=[];

for(const o of t)l.push(_l(n,o));

return l;}function O0(e){const t=V(()=>iv(e,e.items)),n=V(()=>t.value.some(s=>s.value===null)),l=le(new Map),o=le([]);Ct(()=>{const s=t.value,r=new Map,u=[];

for(let c=0;c<s.length;c++){const d=s[c];

if(il(d.value)||d.value===null){let f=r.get(d.value);f||(f=[],r.set(d.value,f)),f.push(d);}else u.push(d);}

l.value=r,o.value=u;});function a(s){const r=l.value,u=t.value,c=o.value,d=n.value,f=e.returnObject,m=!!e.valueComparator,v=e.valueComparator||Mt,g=To(e,_l.neededProps),p=[];

e:for(const b of s){if(!d&&b===null)continue;

if(f&&typeof b=='string'){p.push(_l(g,b));continue;}

const S=r.get(b);

if(m||!S){for(const w of m?u:c)if(v(b,w.value)){p.push(w);continue e;}

p.push(_l(g,b));continue;}

p.push(...S);}

return p;}function i(s){return e.returnObject?s.map(r=>{let{raw:u}=r;

return u;}):s.map(r=>{let{value:u}=r;

return u;});}

return{items:t,transformIn:a,transformOut:i};}const M0=new Set(['item','divider','subheader']);function D0(e,t){const n=il(t)?t:Lt(t,e.itemTitle),l=il(t)?t:Lt(t,e.itemValue,void 0),o=Lt(t,e.itemChildren),a=e.itemProps===!0?xt(t,['children']):Lt(t,e.itemProps);let i=Lt(t,e.itemType,'item');M0.has(i)||(i='item');const s={title:n,value:l,...a};

return{type:i,title:s.title,value:s.value,props:s,children:i==='item'&&o?sv(e,o):void 0,raw:t};}function sv(e,t){const n=[];

for(const l of t)n.push(D0(e,l));

return n;}function $0(e){return{items:V(()=>sv(e,e.items))};}const B0=j({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,filterable:Boolean,expandIcon:Te,collapseIcon:Te,lines:{type:[Boolean,String],default:'one'},slim:Boolean,prependGap:[Number,String],indent:[Number,String],nav:Boolean,'onClick:open':wt(),'onClick:select':wt(),'onUpdate:opened':wt(),...w0({selectStrategy:'single-leaf',openStrategy:'list'}),...Rn(),...Ce(),...Dt(),...cn(),...zn(),...av(),...$t(),...Le(),...qe(),...En({variant:'text'})},'VList'),L0=re()({name:'VList',props:B0(),emits:{'update:selected':e=>!0,'update:activated':e=>!0,'update:opened':e=>!0,'click:open':e=>!0,'click:activate':e=>!0,'click:select':e=>!0},setup(e,t){let{slots:n}=t;const{items:l}=$0(e),{themeClasses:o}=ot(e),{backgroundColorClasses:a,backgroundColorStyles:i}=zt(()=>e.bgColor),{borderClasses:s}=Nn(e),{densityClasses:r}=Xt(e),{dimensionStyles:u}=dn(e),{elevationClasses:c}=Hn(e),{roundedClasses:d}=Bt(e),{children:f,open:m,parents:v,select:g,getPath:p}=C0(e,l,()=>e.returnObject),b=O(()=>e.lines?`v-list--${e.lines}-line`:void 0),S=O(()=>e.activeColor),w=O(()=>e.baseColor),y=O(()=>e.color),_=O(()=>e.selectable||e.activatable);qf({filterable:e.filterable}),Ln({VListGroup:{activeColor:S,baseColor:w,color:y,expandIcon:O(()=>e.expandIcon),collapseIcon:O(()=>e.collapseIcon)},VListItem:{activeClass:O(()=>e.activeClass),activeColor:S,baseColor:w,color:y,density:O(()=>e.density),disabled:O(()=>e.disabled),lines:O(()=>e.lines),nav:O(()=>e.nav),slim:O(()=>e.slim),variant:O(()=>e.variant)}});const k=le(!1),I=L();function x(U){k.value=!0;}function E(U){k.value=!1;}function M(U){!k.value&&!(U.relatedTarget&&I.value?.contains(U.relatedTarget))&&$();}function z(U){const Y=U.target;

if(!(!I.value||Y.tagName==='INPUT'&&['Home','End'].includes(U.key)||Y.tagName==='TEXTAREA')){if(U.key==='ArrowDown')$('next');else if(U.key==='ArrowUp')$('prev');else if(U.key==='Home')$('first');else if(U.key==='End')$('last');else return;

U.preventDefault();}}function P(U){k.value=!0;}function $(U){if(I.value)return no(I.value,U);}

return me(()=>{const U=e.indent??(e.prependGap?Number(e.prependGap)+24:void 0);

return h(e.tag,{ref:I,class:ce(['v-list',{'v-list--disabled':e.disabled,'v-list--nav':e.nav,'v-list--slim':e.slim},o.value,a.value,s.value,r.value,c.value,b.value,d.value,e.class]),style:he([{'--v-list-indent':se(U),'--v-list-group-prepend':U?'0px':void 0,'--v-list-prepend-gap':se(e.prependGap)},i.value,u.value,e.style]),tabindex:e.disabled?-1:0,role:_.value?'listbox':'list','aria-activedescendant':void 0,onFocusin:x,onFocusout:E,onFocus:M,onKeydown:z,onMousedown:P},{default:()=>[h(ov,{items:l.value,returnObject:e.returnObject},n)]});}),{open:m,select:g,focus:$,children:f,parents:v,getPath:p};}});function bi(e,t){return{x:e.x+t.x,y:e.y+t.y};}function R0(e,t){return{x:e.x-t.x,y:e.y-t.y};}function Hu(e,t){if(e.side==='top'||e.side==='bottom'){const{side:n,align:l}=e,o=l==='left'?0:l==='center'?t.width/2:l==='right'?t.width:l,a=n==='top'?0:n==='bottom'?t.height:n;

return bi({x:o,y:a},t);}else if(e.side==='left'||e.side==='right'){const{side:n,align:l}=e,o=n==='left'?0:n==='right'?t.width:n,a=l==='top'?0:l==='center'?t.height/2:l==='bottom'?t.height:l;

return bi({x:o,y:a},t);}

return bi({x:t.width/2,y:t.height/2},t);}const rv={static:H0,connected:j0},N0=j({locationStrategy:{type:[String,Function],default:'static',validator:e=>typeof e=='function'||e in rv},location:{type:String,default:'bottom'},origin:{type:String,default:'auto'},offset:[Number,String,Array],stickToTarget:Boolean,viewportMargin:{type:[Number,String],default:12}},'VOverlay-location-strategies');function z0(e,t){const n=L({}),l=L();Fe&&_n(()=>!!(t.isActive.value&&e.locationStrategy),s=>{ie(()=>e.locationStrategy,s),tt(()=>{window.removeEventListener('resize',o),visualViewport?.removeEventListener('resize',a),visualViewport?.removeEventListener('scroll',i),l.value=void 0;}),window.addEventListener('resize',o,{passive:!0}),visualViewport?.addEventListener('resize',a,{passive:!0}),visualViewport?.addEventListener('scroll',i,{passive:!0}),typeof e.locationStrategy=='function'?l.value=e.locationStrategy(t,e,n)?.updateLocation:l.value=rv[e.locationStrategy](t,e,n)?.updateLocation;});function o(s){l.value?.(s);}function a(s){l.value?.(s);}function i(s){l.value?.(s);}

return{contentStyles:n,updateLocation:l};}function H0(){}function W0(e,t){const n=_s(e);

return t?n.x+=parseFloat(e.style.right||0):n.x-=parseFloat(e.style.left||0),n.y-=parseFloat(e.style.top||0),n;}function j0(e,t,n){(Array.isArray(e.target.value)||py(e.target.value))&&Object.assign(n.value,{position:'fixed',top:0,[e.isRtl.value?'right':'left']:0});const{preferredAnchor:o,preferredOrigin:a}=ks(()=>{const b=Ri(t.location,e.isRtl.value),S=t.origin==='overlap'?b:t.origin==='auto'?ci(b):Ri(t.origin,e.isRtl.value);

return b.side===S.side&&b.align===di(S).align?{preferredAnchor:tu(b),preferredOrigin:tu(S)}:{preferredAnchor:b,preferredOrigin:S};}),[i,s,r,u]=['minWidth','minHeight','maxWidth','maxHeight'].map(b=>V(()=>{const S=parseFloat(t[b]);

return isNaN(S)?1/0:S;})),c=V(()=>{if(Array.isArray(t.offset))return t.offset;

if(typeof t.offset=='string'){const b=t.offset.split(' ').map(parseFloat);

return b.length<2&&b.push(0),b;}

return typeof t.offset=='number'?[t.offset,0]:[0,0];});let d=!1,f=-1;const m=new Mh(4),v=new ResizeObserver(()=>{if(!d)return;

if(requestAnimationFrame(S=>{S!==f&&m.clear(),requestAnimationFrame(w=>{f=w;});}),m.isFull){const S=m.values();

if(Mt(S.at(-1),S.at(-3))&&!Mt(S.at(-1),S.at(-2)))return;}

const b=p();b&&m.push(b.flipped);});let g=new Ot({x:0,y:0,width:0,height:0});ie(e.target,(b,S)=>{S&&!Array.isArray(S)&&v.unobserve(S),Array.isArray(b)?Mt(b,S)||p():b&&v.observe(b);},{immediate:!0}),ie(e.contentEl,(b,S)=>{S&&v.unobserve(S),b&&v.observe(b);},{immediate:!0}),tt(()=>{v.disconnect();});function p(){if(d=!1,requestAnimationFrame(()=>d=!0),!e.target.value||!e.contentEl.value)return;

(Array.isArray(e.target.value)||e.target.value.offsetParent||e.target.value.getClientRects().length)&&(g=Xd(e.target.value));const b=W0(e.contentEl.value,e.isRtl.value),S=da(e.contentEl.value),w=Number(t.viewportMargin);S.length||(S.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(b.x-=parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x')||0),b.y-=parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y')||0)));const y=S.reduce(($,U)=>{const Y=Nh(U);

return $?new Ot({x:Math.max($.left,Y.left),y:Math.max($.top,Y.top),width:Math.min($.right,Y.right)-Math.max($.left,Y.left),height:Math.min($.bottom,Y.bottom)-Math.max($.top,Y.top)}):Y;},void 0);t.stickToTarget?(y.x+=Math.min(w,g.x),y.y+=Math.min(w,g.y),y.width=Math.max(y.width-w*2,g.x+g.width-w),y.height=Math.max(y.height-w*2,g.y+g.height-w)):(y.x+=w,y.y+=w,y.width-=w*2,y.height-=w*2);let _={anchor:o.value,origin:a.value};function k($){const U=new Ot(b),Y=Hu($.anchor,g),oe=Hu($.origin,U);let{x:ee,y:te}=R0(Y,oe);

switch($.anchor.side){case'top':te-=c.value[0];break;case'bottom':te+=c.value[0];break;case'left':ee-=c.value[0];break;case'right':ee+=c.value[0];break;}

switch($.anchor.align){case'top':te-=c.value[1];break;case'bottom':te+=c.value[1];break;case'left':ee-=c.value[1];break;case'right':ee+=c.value[1];break;}

return U.x+=ee,U.y+=te,U.width=Math.min(U.width,r.value),U.height=Math.min(U.height,u.value),{overflows:lu(U,y),x:ee,y:te};}let I=0,x=0;const E={x:0,y:0},M={x:!1,y:!1};let z=-1;

for(;!(z++>10);){const{x:$,y:U,overflows:Y}=k(_);I+=$,x+=U,b.x+=$,b.y+=U;{const oe=nu(_.anchor),ee=Y.x.before||Y.x.after,te=Y.y.before||Y.y.after;let Se=!1;

if(['x','y'].forEach(J=>{if(J==='x'&&ee&&!M.x||J==='y'&&te&&!M.y){const ue={anchor:{..._.anchor},origin:{..._.origin}},R=J==='x'?oe==='y'?di:ci:oe==='y'?ci:di;ue.anchor=R(ue.anchor),ue.origin=R(ue.origin);const{overflows:q}=k(ue);(q[J].before<=Y[J].before&&q[J].after<=Y[J].after||q[J].before+q[J].after<(Y[J].before+Y[J].after)/2)&&(_=ue,Se=M[J]=!0);}}),Se)continue;}Y.x.before&&(I+=Y.x.before,b.x+=Y.x.before),Y.x.after&&(I-=Y.x.after,b.x-=Y.x.after),Y.y.before&&(x+=Y.y.before,b.y+=Y.y.before),Y.y.after&&(x-=Y.y.after,b.y-=Y.y.after);{const oe=lu(b,y);E.x=y.width-oe.x.before-oe.x.after,E.y=y.height-oe.y.before-oe.y.after,I+=oe.x.before,b.x+=oe.x.before,x+=oe.y.before,b.y+=oe.y.before;}break;}

const P=nu(_.anchor);

return Object.assign(n.value,{'--v-overlay-anchor-origin':`${_.anchor.side} ${_.anchor.align}`,transformOrigin:`${_.origin.side} ${_.origin.align}`,top:se(Si(x)),left:e.isRtl.value?void 0:se(Si(I)),right:e.isRtl.value?se(Si(-I)):void 0,minWidth:se(P==='y'?Math.min(i.value,g.width):i.value),maxWidth:se(Wu(Et(E.x,i.value===1/0?0:i.value,r.value))),maxHeight:se(Wu(Et(E.y,s.value===1/0?0:s.value,u.value)))}),{available:E,contentBox:b,flipped:M};}

return ie(()=>[o.value,a.value,t.offset,t.minWidth,t.minHeight,t.maxWidth,t.maxHeight],()=>p()),Be(()=>{const b=p();

if(!b)return;

const{available:S,contentBox:w}=b;w.height>S.y&&requestAnimationFrame(()=>{p(),requestAnimationFrame(()=>{p();});});}),{updateLocation:p};}function Si(e){return Math.round(e*devicePixelRatio)/devicePixelRatio;}function Wu(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio;}let qi=!0;const wa=[];function U0(e){!qi||wa.length?(wa.push(e),Xi()):(qi=!1,e(),Xi());}let ju=-1;function Xi(){cancelAnimationFrame(ju),ju=requestAnimationFrame(()=>{const e=wa.shift();e&&e(),wa.length?Xi():qi=!0;});}const uv={none:null,close:Y0,block:q0,reposition:X0},K0=j({scrollStrategy:{type:[String,Function],default:'block',validator:e=>typeof e=='function'||e in uv}},'VOverlay-scroll-strategies');function G0(e,t){if(!Fe)return;

let n;Ct(async()=>{n?.stop(),t.isActive.value&&e.scrollStrategy&&(n=nl(),await new Promise(l=>setTimeout(l)),n.active&&n.run(()=>{typeof e.scrollStrategy=='function'?e.scrollStrategy(t,e,n):uv[e.scrollStrategy]?.(t,e,n);}));}),tt(()=>{n?.stop();});}function Y0(e){function t(n){e.isActive.value=!1;}cv(Ys(e.target.value,e.contentEl.value),t);}function q0(e,t){const n=e.root.value?.offsetParent,l=Ys(e.target.value,e.contentEl.value),o=[...new Set([...da(l,t.contained?n:void 0),...da(e.contentEl.value,t.contained?n:void 0)])].filter(s=>!s.classList.contains('v-overlay-scroll-blocked')),a=window.innerWidth-document.documentElement.offsetWidth,i=(s=>Es(s)&&s)(n||document.documentElement);i&&e.root.value.classList.add('v-overlay--scroll-blocked'),o.forEach((s,r)=>{s.style.setProperty('--v-body-scroll-x',se(-s.scrollLeft)),s.style.setProperty('--v-body-scroll-y',se(-s.scrollTop)),s!==document.documentElement&&s.style.setProperty('--v-scrollbar-offset',se(a)),s.classList.add('v-overlay-scroll-blocked');}),tt(()=>{o.forEach((s,r)=>{const u=parseFloat(s.style.getPropertyValue('--v-body-scroll-x')),c=parseFloat(s.style.getPropertyValue('--v-body-scroll-y')),d=s.style.scrollBehavior;s.style.scrollBehavior='auto',s.style.removeProperty('--v-body-scroll-x'),s.style.removeProperty('--v-body-scroll-y'),s.style.removeProperty('--v-scrollbar-offset'),s.classList.remove('v-overlay-scroll-blocked'),s.scrollLeft=-u,s.scrollTop=-c,s.style.scrollBehavior=d;}),i&&e.root.value.classList.remove('v-overlay--scroll-blocked');});}function X0(e,t,n){let l=!1,o=-1,a=-1;function i(s){U0(()=>{const r=performance.now();e.updateLocation.value?.(s),l=(performance.now()-r)/(1e3/60)>2;});}a=(typeof requestIdleCallback>'u'?s=>s():requestIdleCallback)(()=>{n.run(()=>{cv(Ys(e.target.value,e.contentEl.value),s=>{l?(cancelAnimationFrame(o),o=requestAnimationFrame(()=>{o=requestAnimationFrame(()=>{i(s);});})):i(s);});});}),tt(()=>{typeof cancelIdleCallback<'u'&&cancelIdleCallback(a),cancelAnimationFrame(o);});}function Ys(e,t){return Array.isArray(e)?document.elementsFromPoint(...e).find(n=>!t?.contains(n)):e??t;}function cv(e,t){const n=[document,...da(e)];n.forEach(l=>{l.addEventListener('scroll',t,{passive:!0});}),tt(()=>{n.forEach(l=>{l.removeEventListener('scroll',t);});});}const Zi=Symbol.for('vuetify:v-menu'),Z0=j({closeDelay:[Number,String],openDelay:[Number,String]},'delay');function J0(e,t){let n=()=>{};function l(i,s){n?.();const r=i?e.openDelay:e.closeDelay,u=Math.max(s?.minDelay??0,Number(r??0));

return new Promise(c=>{n=Dh(u,()=>{t?.(i),c(i);});});}function o(){return l(!0);}function a(i){return l(!1,i);}

return{clearDelay:n,runOpenDelay:o,runCloseDelay:a};}const Q0=j({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Z0()},'VOverlay-activator');function eS(e,t){let{isActive:n,isTop:l,contentEl:o}=t;const a=Ye('useActivator'),i=L();let s=!1,r=!1,u=!0;const c=V(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),d=V(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:f,runCloseDelay:m}=J0(e,x=>{x===(e.openOnHover&&s||c.value&&r)&&!(e.openOnHover&&n.value&&!l.value)&&(n.value!==x&&(u=!0),n.value=x);}),v=L(),g={onClick:x=>{x.stopPropagation(),i.value=x.currentTarget||x.target,n.value||(v.value=[x.clientX,x.clientY]),n.value=!n.value;},onMouseenter:x=>{s=!0,i.value=x.currentTarget||x.target,f();},onMouseleave:x=>{s=!1,m();},onFocus:x=>{ua(x.target,':focus-visible')!==!1&&(r=!0,x.stopPropagation(),i.value=x.currentTarget||x.target,f());},onBlur:x=>{r=!1,x.stopPropagation(),m({minDelay:1});}},p=V(()=>{const x={};

return d.value&&(x.onClick=g.onClick),e.openOnHover&&(x.onMouseenter=g.onMouseenter,x.onMouseleave=g.onMouseleave),c.value&&(x.onFocus=g.onFocus,x.onBlur=g.onBlur),x;}),b=V(()=>{const x={};

if(e.openOnHover&&(x.onMouseenter=()=>{s=!0,f();},x.onMouseleave=()=>{s=!1,m();}),c.value&&(x.onFocusin=E=>{E.target.matches(':focus-visible')&&(r=!0,f());},x.onFocusout=()=>{r=!1,m({minDelay:1});}),e.closeOnContentClick){const E=Ie(Zi,null);x.onClick=()=>{n.value=!1,E?.closeParents();};}

return x;}),S=V(()=>{const x={};

return e.openOnHover&&(x.onMouseenter=()=>{u&&(s=!0,u=!1,f());},x.onMouseleave=()=>{s=!1,m();}),x;});ie(l,x=>{x&&(e.openOnHover&&!s&&(!c.value||!r)||c.value&&!r&&(!e.openOnHover||!s))&&!o.value?.contains(document.activeElement)&&(n.value=!1);}),ie(n,x=>{x||setTimeout(()=>{v.value=void 0;});},{flush:'post'});const w=Li();Ct(()=>{w.value&&Be(()=>{i.value=w.el;});});const y=Li(),_=V(()=>e.target==='cursor'&&v.value?v.value:y.value?y.el:dv(e.target,a)||i.value),k=V(()=>Array.isArray(_.value)?void 0:_.value);let I;

return ie(()=>!!e.activator,x=>{x&&Fe?(I=nl(),I.run(()=>{tS(e,a,{activatorEl:i,activatorEvents:p});})):I&&I.stop();},{flush:'post',immediate:!0}),tt(()=>{I?.stop();}),{activatorEl:i,activatorRef:w,target:_,targetEl:k,targetRef:y,activatorEvents:p,contentEvents:b,scrimEvents:S};}function tS(e,t,n){let{activatorEl:l,activatorEvents:o}=n;ie(()=>e.activator,(r,u)=>{if(u&&r!==u){const c=s(u);c&&i(c);}

r&&Be(()=>a());},{immediate:!0}),ie(()=>e.activatorProps,()=>{a();}),tt(()=>{i();});function a(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&zh(r,ae(o.value,u));}function i(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&Hh(r,ae(o.value,u));}function s(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const u=dv(r,t);

return l.value=u?.nodeType===Node.ELEMENT_NODE?u:void 0,l.value;}}function dv(e,t){if(!e)return;

let n;

if(e==='parent'){let l=t?.proxy?.$el?.parentNode;

for(;l?.hasAttribute('data-no-activator');)l=l.parentNode;

n=l;}else typeof e=='string'?n=document.querySelector(e):'$el'in e?n=e.$el:n=e;

return n;}const nS=j({retainFocus:Boolean,captureFocus:Boolean,disableInitialFocus:Boolean},'focusTrap'),Zo=new Map;let Uu=0;function Ku(e){const t=document.activeElement;

if(e.key!=='Tab'||!t)return;

const n=Array.from(Zo.values()).filter(u=>{let{isActive:c,contentEl:d}=u;

return c.value&&d.value?.contains(t);}).map(u=>u.contentEl.value);let l,o=t.parentElement;

for(;o;){if(n.includes(o)){l=o;break;}

o=o.parentElement;}

if(!l)return;

const a=el(l).filter(u=>u.tabIndex>=0);

if(!a.length)return;

const i=document.activeElement;

if(a.length===1&&a[0].classList.contains('v-list')&&a[0].contains(i)){e.preventDefault();

return;}

const s=a[0],r=a[a.length-1];e.shiftKey&&(i===s||s.classList.contains('v-list')&&s.contains(i))&&(e.preventDefault(),r.focus()),!e.shiftKey&&(i===r||r.classList.contains('v-list')&&r.contains(i))&&(e.preventDefault(),s.focus());}function lS(e,t){let{isActive:n,localTop:l,contentEl:o}=t;const a=Symbol('trap');let i=!1,s=-1;async function r(){i=!0,s=window.setTimeout(()=>{i=!1;},100);}async function u(f){const m=f.relatedTarget,v=f.target;document.removeEventListener('pointerdown',r),document.removeEventListener('keydown',c),await Be(),n.value&&!i&&m!==v&&o.value&&lt(l)&&![document,o.value].includes(v)&&!o.value.contains(v)&&el(o.value)[0]?.focus();}function c(f){if(f.key==='Tab'&&(document.removeEventListener('keydown',c),n.value&&o.value&&f.target&&!o.value.contains(f.target))){const m=el(document.documentElement);

if(f.shiftKey&&f.target===m.at(0)||!f.shiftKey&&f.target===m.at(-1)){const v=el(o.value);v.length>0&&(f.preventDefault(),v[0].focus());}}}const d=O(()=>n.value&&e.captureFocus&&!e.disableInitialFocus);Fe&&(ie(()=>e.retainFocus,f=>{f?Zo.set(a,{isActive:n,contentEl:o}):Zo.delete(a);},{immediate:!0}),ie(d,f=>{f?(document.addEventListener('pointerdown',r),document.addEventListener('focusin',u,{once:!0}),document.addEventListener('keydown',c)):(document.removeEventListener('pointerdown',r),document.removeEventListener('focusin',u),document.removeEventListener('keydown',c));},{immediate:!0}),Uu++<1&&document.addEventListener('keydown',Ku)),tt(()=>{Zo.delete(a),clearTimeout(s),document.removeEventListener('pointerdown',r),document.removeEventListener('focusin',u),document.removeEventListener('keydown',c),--Uu<1&&document.removeEventListener('keydown',Ku);});}function oS(){if(!Fe)return le(!1);

const{ssr:e}=Fs();

if(e){const t=le(!1);

return Yt(()=>{t.value=!0;}),t;}else return le(!0);}const fv=j({eager:Boolean},'lazy');function vv(e,t){const n=le(!1),l=O(()=>n.value||e.eager||t.value);ie(t,()=>n.value=!0);function o(){e.eager||(n.value=!1);}

return{isBooted:n,hasContent:l,onAfterLeave:o};}function Mo(){const t=Ye('useScopeId').vnode.scopeId;

return{scopeId:t?{[t]:''}:void 0};}const Gu=Symbol.for('vuetify:stack'),Kl=et([]);function aS(e,t,n){const l=Ye('useStack'),o=!n,a=Ie(Gu,void 0),i=et({activeChildren:new Set});vt(Gu,i);const s=le(Number(lt(t)));_n(e,()=>{const c=Kl.at(-1)?.[1];s.value=c?c+10:Number(lt(t)),o&&Kl.push([l.uid,s.value]),a?.activeChildren.add(l.uid),tt(()=>{if(o){const d=fe(Kl).findIndex(f=>f[0]===l.uid);Kl.splice(d,1);}

a?.activeChildren.delete(l.uid);});});const r=le(!0);

return o&&Ct(()=>{const c=Kl.at(-1)?.[0]===l.uid;setTimeout(()=>r.value=c);}),{globalTop:Al(r),localTop:O(()=>!i.activeChildren.size),stackStyles:O(()=>({zIndex:s.value}))};}function iS(e){return{teleportTarget:V(()=>{const n=e();

if(n===!0||!Fe)return;

const l=n===!1?document.body:typeof n=='string'?document.querySelector(n):n;

if(l==null)return;

let o=[...l.children].find(a=>a.matches('.v-overlay-container'));

return o||(o=document.createElement('div'),o.className='v-overlay-container',l.appendChild(o)),o;})};}function sS(){return!0;}function mv(e,t,n){if(!e||gv(e,n)===!1)return!1;

const l=nf(t);

if(typeof ShadowRoot<'u'&&l instanceof ShadowRoot&&l.host===e.target)return!1;

const o=(typeof n.value=='object'&&n.value.include||(()=>[]))();

return o.push(t),!o.some(a=>a?.contains(e.target));}function gv(e,t){return(typeof t.value=='object'&&t.value.closeConditional||sS)(e);}function rS(e,t,n){const l=typeof n.value=='function'?n.value:n.value.handler;e.shadowTarget=e.target,t._clickOutside.lastMousedownWasOutside&&mv(e,t,n)&&setTimeout(()=>{gv(e,n)&&l&&l(e);},0);}function Yu(e,t){const n=nf(e);t(document),typeof ShadowRoot<'u'&&n instanceof ShadowRoot&&t(n);}const Ji={mounted(e,t){const n=o=>rS(o,e,t),l=o=>{e._clickOutside.lastMousedownWasOutside=mv(o,e,t);};Yu(e,o=>{o.addEventListener('click',n,!0),o.addEventListener('mousedown',l,!0);}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:n,onMousedown:l};},beforeUnmount(e,t){e._clickOutside&&(Yu(e,n=>{if(!n||!e._clickOutside?.[t.instance.$.uid])return;

const{onClick:l,onMousedown:o}=e._clickOutside[t.instance.$.uid];n.removeEventListener('click',l,!0),n.removeEventListener('mousedown',o,!0);}),delete e._clickOutside[t.instance.$.uid]);}};function uS(e){const{modelValue:t,color:n,...l}=e;

return h(Ut,{name:'fade-transition',appear:!0},{default:()=>[e.modelValue&&T('div',ae({class:['v-overlay__scrim',e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},l),null)]});}const Ka=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Q0(),...Ce(),...cn(),...fv(),...N0(),...K0(),...nS(),...qe(),...Oo()},'VOverlay'),Ol=re()({name:'VOverlay',directives:{vClickOutside:Ji},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...xt(Ka(),['disableInitialFocus'])},emits:{'click:outside':e=>!0,'update:modelValue':e=>!0,keydown:e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{slots:n,attrs:l,emit:o}=t;const a=Ye('VOverlay'),i=L(),s=L(),r=L(),u=je(e,'modelValue'),c=V({get:()=>u.value,set:X=>{X&&e.disabled||(u.value=X);}}),{themeClasses:d}=ot(e),{rtlClasses:f,isRtl:m}=qt(),{hasContent:v,onAfterLeave:g}=vv(e,c),p=zt(()=>typeof e.scrim=='string'?e.scrim:null),{globalTop:b,localTop:S,stackStyles:w}=aS(c,()=>e.zIndex,e._disableGlobalStack),{activatorEl:y,activatorRef:_,target:k,targetEl:I,targetRef:x,activatorEvents:E,contentEvents:M,scrimEvents:z}=eS(e,{isActive:c,isTop:S,contentEl:r}),{teleportTarget:P}=iS(()=>{const X=e.attach||e.contained;

if(X)return X;

const _e=y?.value?.getRootNode()||a.proxy?.$el?.getRootNode();

return _e instanceof ShadowRoot?_e:!1;}),{dimensionStyles:$}=dn(e),U=oS(),{scopeId:Y}=Mo();ie(()=>e.disabled,X=>{X&&(c.value=!1);});const{contentStyles:oe,updateLocation:ee}=z0(e,{isRtl:m,contentEl:r,target:k,isActive:c});G0(e,{root:i,contentEl:r,targetEl:I,target:k,isActive:c,updateLocation:ee});function te(X){o('click:outside',X),e.persistent?ye():c.value=!1;}function Se(X){return c.value&&S.value&&(!e.scrim||X.target===s.value||X instanceof MouseEvent&&X.shadowTarget===s.value);}lS(e,{isActive:c,localTop:S,contentEl:r}),Fe&&ie(c,X=>{X?window.addEventListener('keydown',J):window.removeEventListener('keydown',J);},{immediate:!0}),yt(()=>{Fe&&window.removeEventListener('keydown',J);});function J(X){X.key==='Escape'&&b.value&&(r.value?.contains(document.activeElement)||o('keydown',X),e.persistent?ye():(c.value=!1,r.value?.contains(document.activeElement)&&y.value?.focus()));}function ue(X){X.key==='Escape'&&!b.value||o('keydown',X);}const R=$b();_n(()=>e.closeOnBack,()=>{Bb(R,X=>{b.value&&c.value?(X(!1),e.persistent?ye():c.value=!1):X();});});const q=L();ie(()=>c.value&&(e.absolute||e.contained)&&P.value==null,X=>{if(X){const _e=Ts(i.value);_e&&_e!==document.scrollingElement&&(q.value=_e.scrollTop);}});function ye(){e.noClickAnimation||r.value&&hn(r.value,[{transformOrigin:'center'},{transform:'scale(1.03)'},{transformOrigin:'center'}],{duration:150,easing:mo});}function Q(){o('afterEnter');}function xe(){g(),o('afterLeave');}

return me(()=>T(ke,null,[n.activator?.({isActive:c.value,targetRef:x,props:ae({ref:_},E.value,e.activatorProps)}),U.value&&v.value&&h(Nc,{disabled:!P.value,to:P.value},{default:()=>[T('div',ae({class:['v-overlay',{'v-overlay--absolute':e.absolute||e.contained,'v-overlay--active':c.value,'v-overlay--contained':e.contained},d.value,f.value,e.class],style:[w.value,{'--v-overlay-opacity':e.opacity,top:se(q.value)},e.style],ref:i,onKeydown:ue},Y,l),[h(uS,ae({color:p,modelValue:c.value&&!!e.scrim,ref:s},z.value),null),h(bn,{appear:!0,persisted:!0,transition:e.transition,target:k.value,onAfterEnter:Q,onAfterLeave:xe},{default:()=>[st(T('div',ae({ref:r,class:['v-overlay__content',e.contentClass],style:[$.value,oe.value]},M.value,e.contentProps),[n.default?.({isActive:c})]),[[cl,c.value],[Ji,{handler:te,closeConditional:Se,include:()=>[y.value]}]])]})])]})])),{activatorEl:y,scrimEl:s,target:k,animateClick:ye,contentEl:r,rootEl:i,globalTop:b,localTop:S,updateLocation:ee};}}),cS=j({id:String,submenu:Boolean,...xt(Ka({captureFocus:!0,closeDelay:250,closeOnContentClick:!0,locationStrategy:'connected',location:void 0,openDelay:300,scrim:!1,scrollStrategy:'reposition',transition:{component:Hs}}),['absolute'])},'VMenu'),hv=re()({name:'VMenu',props:cS(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=je(e,'modelValue'),{scopeId:o}=Mo(),{isRtl:a}=qt(),i=Gt(),s=O(()=>e.id||`v-menu-${i}`),r=L(),u=Ie(Zi,null),c=le(new Set);vt(Zi,{register(){c.value.add(i);},unregister(){c.value.delete(i);},closeParents(g){setTimeout(()=>{!c.value.size&&!e.persistent&&(g==null||r.value?.contentEl&&!$h(g,r.value.contentEl))&&(l.value=!1,u?.closeParents());},40);}}),yt(()=>u?.unregister()),hs(()=>l.value=!1),ie(l,g=>{g?u?.register():u?.unregister();},{immediate:!0});function d(g){u?.closeParents(g);}function f(g){if(!e.disabled){if(g.key==='Tab'||g.key==='Enter'&&!e.closeOnContentClick){if(g.key==='Enter'&&(g.target instanceof HTMLTextAreaElement||g.target instanceof HTMLInputElement&&g.target.closest('form')))return;

g.key==='Enter'&&g.preventDefault(),!Gd(el(r.value?.contentEl,!1),g.shiftKey?'prev':'next',b=>b.tabIndex>=0)&&!e.retainFocus&&(l.value=!1,r.value?.activatorEl?.focus());}else e.submenu&&g.key===(a.value?'ArrowRight':'ArrowLeft')&&(l.value=!1,r.value?.activatorEl?.focus());}}function m(g){if(e.disabled)return;

const p=r.value?.contentEl;p&&l.value?g.key==='ArrowDown'?(g.preventDefault(),g.stopImmediatePropagation(),no(p,'next')):g.key==='ArrowUp'?(g.preventDefault(),g.stopImmediatePropagation(),no(p,'prev')):e.submenu&&(g.key===(a.value?'ArrowRight':'ArrowLeft')?l.value=!1:g.key===(a.value?'ArrowLeft':'ArrowRight')&&(g.preventDefault(),no(p,'first'))):(e.submenu?g.key===(a.value?'ArrowLeft':'ArrowRight'):['ArrowDown','ArrowUp'].includes(g.key))&&(l.value=!0,g.preventDefault(),setTimeout(()=>setTimeout(()=>m(g))));}const v=V(()=>ae({'aria-haspopup':'menu','aria-expanded':String(l.value),'aria-controls':s.value,'aria-owns':s.value,onKeydown:m},e.activatorProps));

return me(()=>{const g=Ol.filterProps(e);

return h(Ol,ae({ref:r,id:s.value,class:['v-menu',e.class],style:e.style},g,{modelValue:l.value,'onUpdate:modelValue':p=>l.value=p,absolute:!0,activatorProps:v.value,location:e.location??(e.submenu?'end':'bottom'),'onClick:outside':d,onKeydown:f},o),{activator:n.activator,default:function(){for(var p=arguments.length,b=new Array(p),S=0;S<p;S++)b[S]=arguments[S];

return h(Ue,{root:'VMenu'},{default:()=>[n.default?.(...b)]});}});}),Rl({id:s,ΨopenChildren:c},r);}}),dS=j({active:Boolean,disabled:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...Ce(),...Oo({transition:{component:Ff}})},'VCounter'),fS=re()({name:'VCounter',functional:!0,props:dS(),setup(e,t){let{slots:n}=t;const l=O(()=>e.max?`${e.value} / ${e.max}`:String(e.value));

return me(()=>h(bn,{transition:e.transition},{default:()=>[st(T('div',{class:ce(['v-counter',{'text-error':e.max&&!e.disabled&&parseFloat(e.value)>parseFloat(e.max)},e.class]),style:he(e.style)},[n.default?n.default({counter:l.value,max:e.max,value:e.value}):l.value]),[[cl,e.active]])]})),{};}}),vS=j({floating:Boolean,...Ce()},'VFieldLabel'),Uo=re()({name:'VFieldLabel',props:vS(),setup(e,t){let{slots:n}=t;

return me(()=>h(Bf,{class:ce(['v-field-label',{'v-field-label--floating':e.floating},e.class]),style:he(e.style)},n)),{};}}),mS=['underlined','outlined','filled','solo','solo-inverted','solo-filled','plain'],yv=j({appendInnerIcon:Te,bgColor:String,clearable:Boolean,clearIcon:{type:Te,default:'$clear'},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},glow:Boolean,error:Boolean,flat:Boolean,iconColor:[Boolean,String],label:String,persistentClear:Boolean,prependInnerIcon:Te,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:'filled',validator:e=>mS.includes(e)},'onClick:clear':wt(),'onClick:appendInner':wt(),'onClick:prependInner':wt(),...Ce(),...Ls(),...$t(),...qe()},'VField'),qu=re()({name:'VField',inheritAttrs:!1,props:{id:String,details:Boolean,labelId:String,...zf(),...yv()},emits:{'update:focused':e=>!0,'update:modelValue':e=>!0},setup(e,t){let{attrs:n,emit:l,slots:o}=t;const{themeClasses:a}=ot(e),{loaderClasses:i}=Rs(e),{focusClasses:s,isFocused:r,focus:u,blur:c}=Hf(e),{InputIcon:d}=js(e),{roundedClasses:f}=Bt(e),{rtlClasses:m}=qt(),v=O(()=>e.dirty||e.active),g=O(()=>!!(e.label||o.label)),p=O(()=>!e.singleLine&&g.value),b=Gt(),S=V(()=>e.id||`input-${b}`),w=O(()=>e.details?`${S.value}-messages`:void 0),y=L(),_=L(),k=L(),I=V(()=>['plain','underlined'].includes(e.variant)),x=V(()=>e.error||e.disabled?void 0:v.value&&r.value?e.color:e.baseColor),E=V(()=>{if(!(!e.iconColor||e.glow&&!r.value))return e.iconColor===!0?x.value:e.iconColor;}),{backgroundColorClasses:M,backgroundColorStyles:z}=zt(()=>e.bgColor),{textColorClasses:P,textColorStyles:$}=Kt(x);ie(v,te=>{if(p.value&&!al()){const Se=y.value.$el,J=_.value.$el;requestAnimationFrame(()=>{const ue=_s(Se),R=J.getBoundingClientRect(),q=R.x-ue.x,ye=R.y-ue.y-(ue.height/2-R.height/2),Q=R.width/.75,xe=Math.abs(Q-ue.width)>1?{maxWidth:se(Q)}:void 0,X=getComputedStyle(Se),_e=getComputedStyle(J),Qe=parseFloat(X.transitionDuration)*1e3||150,We=parseFloat(_e.getPropertyValue('--v-field-label-scale')),kt=_e.getPropertyValue('color');Se.style.visibility='visible',J.style.visibility='hidden',hn(Se,{transform:`translate(${q}px, ${ye}px) scale(${We})`,color:kt,...xe},{duration:Qe,easing:mo,direction:te?'normal':'reverse'}).finished.then(()=>{Se.style.removeProperty('visibility'),J.style.removeProperty('visibility');});});}},{flush:'post'});const U=V(()=>({isActive:v,isFocused:r,controlRef:k,iconColor:E,blur:c,focus:u})),Y=O(()=>{const te=!v.value;

return{'aria-hidden':te,for:te?void 0:S.value};}),oe=O(()=>{const te=p.value&&v.value;

return{'aria-hidden':te,for:te?void 0:S.value};});function ee(te){te.target!==document.activeElement&&te.preventDefault();}

return me(()=>{const te=e.variant==='outlined',Se=!!(o['prepend-inner']||e.prependInnerIcon),J=!!(e.clearable||o.clear)&&!e.disabled,ue=!!(o['append-inner']||e.appendInnerIcon||J),R=()=>o.label?o.label({...U.value,label:e.label,props:{for:S.value}}):e.label;

return T('div',ae({class:['v-field',{'v-field--active':v.value,'v-field--appended':ue,'v-field--center-affix':e.centerAffix??!I.value,'v-field--disabled':e.disabled,'v-field--dirty':e.dirty,'v-field--error':e.error,'v-field--glow':e.glow,'v-field--flat':e.flat,'v-field--has-background':!!e.bgColor,'v-field--persistent-clear':e.persistentClear,'v-field--prepended':Se,'v-field--reverse':e.reverse,'v-field--single-line':e.singleLine,'v-field--no-label':!R(),[`v-field--variant-${e.variant}`]:!0},a.value,M.value,s.value,i.value,f.value,m.value,e.class],style:[z.value,e.style],onClick:ee},n),[T('div',{class:'v-field__overlay'},null),h(wf,{name:'v-field',active:!!e.loading,color:e.error?'error':typeof e.loading=='string'?e.loading:e.color},{default:o.loader}),Se&&T('div',{key:'prepend',class:'v-field__prepend-inner'},[o['prepend-inner']?o['prepend-inner'](U.value):e.prependInnerIcon&&h(d,{key:'prepend-icon',name:'prependInner',color:E.value},null)]),T('div',{class:'v-field__field','data-no-activator':''},[['filled','solo','solo-inverted','solo-filled'].includes(e.variant)&&p.value&&h(Uo,ae({key:'floating-label',ref:_,class:[P.value],floating:!0},Y.value,{style:$.value}),{default:()=>[R()]}),g.value&&h(Uo,ae({key:'label',ref:y,id:e.labelId},oe.value),{default:()=>[R()]}),o.default?.({...U.value,props:{id:S.value,class:'v-field__input','aria-describedby':w.value},focus:u,blur:c})??T('div',{id:S.value,class:'v-field__input','aria-describedby':w.value},null)]),J&&h(Mf,{key:'clear'},{default:()=>[st(T('div',{class:'v-field__clearable',onMousedown:q=>{q.preventDefault(),q.stopPropagation();}},[h(Ue,{defaults:{VIcon:{icon:e.clearIcon}}},{default:()=>[o.clear?o.clear({...U.value,props:{onFocus:u,onBlur:c,onClick:e['onClick:clear'],tabindex:-1}}):h(d,{name:'clear',onFocus:u,onBlur:c,tabindex:-1},null)]})]),[[cl,e.dirty]])]}),ue&&T('div',{key:'append',class:'v-field__append-inner'},[o['append-inner']?o['append-inner'](U.value):e.appendInnerIcon&&h(d,{key:'append-icon',name:'appendInner',color:E.value},null)]),T('div',{class:ce(['v-field__outline',P.value]),style:he($.value)},[te&&T(ke,null,[T('div',{class:'v-field__outline__start'},null),p.value&&T('div',{class:'v-field__outline__notch'},[h(Uo,ae({ref:_,floating:!0},Y.value),{default:()=>[R()]})]),T('div',{class:'v-field__outline__end'},null)]),I.value&&p.value&&h(Uo,ae({ref:_,floating:!0},Y.value),{default:()=>[R()]})])]);}),{controlRef:k,fieldIconColor:E};}}),gS=j({autocomplete:String},'autocomplete');function pv(e){const t=Gt(),n=le(0),l=O(()=>e.autocomplete==='suppress');

return{isSuppressing:l,fieldAutocomplete:O(()=>l.value?'off':e.autocomplete),fieldName:O(()=>{if(e.name)return l.value?`${e.name}-${t}-${n.value}`:e.name;}),update:()=>n.value=new Date().getTime()};}function hS(e){function t(n,l){if(!e.autofocus||!n)return;

const o=l[0].target;(o.matches('input,textarea')?o:o.querySelector('input,textarea'))?.focus();}

return{onIntersect:t};}const yS=['color','file','time','date','datetime-local','week','month'],bv=j({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:'text'},modelModifiers:Object,...gS(),...xt(jf(),['direction']),...yv()},'VTextField'),St=re()({name:'VTextField',directives:{vIntersect:wo},inheritAttrs:!1,props:bv(),emits:{'click:control':e=>!0,'mousedown:control':e=>!0,'update:focused':e=>!0,'update:modelValue':e=>!0},setup(e,t){let{attrs:n,emit:l,slots:o}=t;const a=je(e,'modelValue'),{isFocused:i,focus:s,blur:r}=Hf(e),{onIntersect:u}=hS(e),c=V(()=>typeof e.counterValue=='function'?e.counterValue(a.value):typeof e.counterValue=='number'?e.counterValue:(a.value??'').toString().length),d=V(()=>{if(n.maxlength)return n.maxlength;

if(!(!e.counter||typeof e.counter!='number'&&typeof e.counter!='string'))return e.counter;}),f=V(()=>['plain','underlined'].includes(e.variant)),m=L(),v=L(),g=L(),p=pv(e),b=V(()=>yS.includes(e.type)||e.persistentPlaceholder||i.value||e.active);function S(){p.isSuppressing.value&&p.update(),i.value||s(),Be(()=>{g.value!==document.activeElement&&g.value?.focus();});}function w(I){l('mousedown:control',I),I.target!==g.value&&(S(),I.preventDefault());}function y(I){l('click:control',I);}function _(I,x){I.stopPropagation(),S(),Be(()=>{x(),Kd(e['onClick:clear'],I);});}function k(I){const x=I.target;

if(!(e.modelModifiers?.trim&&['text','search','password','tel','url'].includes(e.type))){a.value=x.value;

return;}

const E=x.value,M=x.selectionStart,z=x.selectionEnd;a.value=E,Be(()=>{let P=0;E.trimStart().length===x.value.length&&(P=E.length-x.value.length),M!=null&&(x.selectionStart=M-P),z!=null&&(x.selectionEnd=z-P);});}

return me(()=>{const I=!!(o.counter||e.counter!==!1&&e.counter!=null),x=!!(I||o.details),[E,M]=Wd(n),{modelValue:z,...P}=Lu.filterProps(e),$=qu.filterProps(e);

return h(Lu,ae({ref:m,modelValue:a.value,'onUpdate:modelValue':U=>a.value=U,class:['v-text-field',{'v-text-field--prefixed':e.prefix,'v-text-field--suffixed':e.suffix,'v-input--plain-underlined':f.value},e.class],style:e.style},E,P,{centerAffix:!f.value,focused:i.value}),{...o,default:U=>{let{id:Y,isDisabled:oe,isDirty:ee,isReadonly:te,isValid:Se,hasDetails:J,reset:ue}=U;

return h(qu,ae({ref:v,onMousedown:w,onClick:y,'onClick:clear':R=>_(R,ue),role:e.role},xt($,['onClick:clear']),{id:Y.value,labelId:`${Y.value}-label`,active:b.value||ee.value,dirty:ee.value||e.dirty,disabled:oe.value,focused:i.value,details:J.value,error:Se.value===!1}),{...o,default:R=>{let{props:{class:q,...ye},controlRef:Q}=R;const xe=T('input',ae({ref:X=>g.value=Q.value=X,value:a.value,onInput:k,autofocus:e.autofocus,readonly:te.value,disabled:oe.value,name:p.fieldName.value,autocomplete:p.fieldAutocomplete.value,placeholder:e.placeholder,size:1,role:e.role,type:e.type,onFocus:s,onBlur:r,'aria-labelledby':`${Y.value}-label`},ye,M),null);

return T(ke,null,[e.prefix&&T('span',{class:'v-text-field__prefix'},[T('span',{class:'v-text-field__prefix__text'},[e.prefix])]),st(o.default?T('div',{class:ce(q),'data-no-activator':''},[o.default({id:Y}),xe]):kn(xe,{class:q}),[[wo,u,null,{once:!0}]]),e.suffix&&T('span',{class:'v-text-field__suffix'},[T('span',{class:'v-text-field__suffix__text'},[e.suffix])])]);}});},details:x?U=>T(ke,null,[o.details?.(U),I&&T(ke,null,[T('span',null,null),h(fS,{active:e.persistentCounter||i.value,value:c.value,max:d.value,disabled:e.disabled},o.counter)])]):void 0});}),Rl({},m,v,g);}}),pS=j({renderless:Boolean,...Ce()},'VVirtualScrollItem'),bS=re()({name:'VVirtualScrollItem',inheritAttrs:!1,props:pS(),emits:{'update:height':e=>!0},setup(e,t){let{attrs:n,emit:l,slots:o}=t;const{resizeRef:a,contentRect:i}=sl(void 0,'border');ie(()=>i.value?.height,s=>{s!=null&&l('update:height',s);}),me(()=>e.renderless?T(ke,null,[o.default?.({itemRef:a})]):T('div',ae({ref:a,class:['v-virtual-scroll__item',e.class],style:e.style},n),[o.default?.()]));}}),SS=-1,wS=1,wi=100,CS=j({itemHeight:{type:[Number,String],default:null},itemKey:{type:[String,Array,Function],default:null},height:[Number,String]},'virtual');function xS(e,t){const n=Fs(),l=le(0);Ct(()=>{l.value=parseFloat(e.itemHeight||0);});const o=le(0),a=le(Math.ceil((parseInt(e.height)||n.height.value)/(l.value||16))||1),i=le(0),s=le(0),r=L(),u=L();let c=0;const{resizeRef:d,contentRect:f}=sl();Ct(()=>{d.value=r.value;});const m=V(()=>r.value===document.documentElement?n.height.value:f.value?.height||parseInt(e.height)||0),v=V(()=>!!(r.value&&u.value&&m.value&&l.value));let g=Array.from({length:t.value.length}),p=Array.from({length:t.value.length});const b=le(0);let S=-1;function w(J){return g[J]||l.value;}const y=Fh(()=>{const J=performance.now();p[0]=0;const ue=t.value.length;

for(let R=1;R<=ue;R++)p[R]=(p[R-1]||0)+w(R-1);

b.value=Math.max(b.value,performance.now()-J);},b),_=ie(v,J=>{J&&(_(),c=u.value.offsetTop,y.immediate(),oe(),~S&&Be(()=>{Fe&&window.requestAnimationFrame(()=>{te(S),S=-1;});}));});tt(()=>{y.clear();});function k(J,ue){const R=g[J],q=l.value;l.value=q?Math.min(l.value,ue):ue,(R!==ue||q!==l.value)&&(g[J]=ue,y());}function I(J){J=Et(J,0,t.value.length);const ue=Math.floor(J),R=J%1,q=ue+1,ye=p[ue]||0,Q=p[q]||ye;

return ye+(Q-ye)*R;}function x(J){return kS(p,J);}let E=0,M=0,z=0;ie(m,(J,ue)=>{oe(),J<ue&&requestAnimationFrame(()=>{M=0,oe();});});let P=-1;function $(){if(!r.value||!u.value)return;

const J=r.value.scrollTop,ue=performance.now();ue-z>500?(M=Math.sign(J-E),c=u.value.offsetTop):M=J-E,E=J,z=ue,window.clearTimeout(P),P=window.setTimeout(U,500),oe();}function U(){!r.value||!u.value||(M=0,z=0,window.clearTimeout(P),oe());}let Y=-1;function oe(){cancelAnimationFrame(Y),Y=requestAnimationFrame(ee);}function ee(){if(!r.value||!m.value||!l.value)return;

const J=E-c,ue=Math.sign(M),R=Math.max(0,J-wi),q=Et(x(R),0,t.value.length),ye=J+m.value+wi,Q=Et(x(ye)+1,q+1,t.value.length);

if((ue!==SS||q<o.value)&&(ue!==wS||Q>a.value)){const xe=I(o.value)-I(q),X=I(Q)-I(a.value);Math.max(xe,X)>wi?(o.value=q,a.value=Q):(q<=0&&(o.value=q),Q>=t.value.length&&(a.value=Q));}

i.value=I(o.value),s.value=I(t.value.length)-I(a.value);}function te(J){const ue=I(J);!r.value||J&&!ue?S=J:r.value.scrollTop=ue;}const Se=V(()=>t.value.slice(o.value,a.value).map((J,ue)=>{const R=ue+o.value;

return{raw:J,index:R,key:Lt(J,e.itemKey,R)};}));

return ie(t,()=>{g=Array.from({length:t.value.length}),p=Array.from({length:t.value.length}),y.immediate(),oe();},{deep:1}),{calculateVisibleItems:oe,containerRef:r,markerRef:u,computedItems:Se,paddingTop:i,paddingBottom:s,scrollToIndex:te,handleScroll:$,handleScrollend:U,handleItemResize:k};}function kS(e,t){let n=e.length-1,l=0,o=0,a=null,i=-1;

if(e[n]<t)return n;

for(;l<=n;)if(o=l+n>>1,a=e[o],a>t)n=o-1;else if(a<t)i=o,l=o+1;else return a===t?o:l;

return i;}const _S=j({items:{type:Array,default:()=>[]},renderless:Boolean,...CS(),...Ce(),...cn()},'VVirtualScroll'),AS=re()({name:'VVirtualScroll',props:_S(),setup(e,t){let{slots:n}=t;const l=Ye('VVirtualScroll'),{dimensionStyles:o}=dn(e),{calculateVisibleItems:a,containerRef:i,markerRef:s,handleScroll:r,handleScrollend:u,handleItemResize:c,scrollToIndex:d,paddingTop:f,paddingBottom:m,computedItems:v}=xS(e,O(()=>e.items));

return _n(()=>e.renderless,()=>{function g(){const b=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?'addEventListener':'removeEventListener';i.value===document.documentElement?(document[b]('scroll',r,{passive:!0}),document[b]('scrollend',u)):(i.value?.[b]('scroll',r,{passive:!0}),i.value?.[b]('scrollend',u));}Yt(()=>{i.value=Ts(l.vnode.el,!0),g(!0);}),tt(g);}),me(()=>{const g=v.value.map(p=>h(bS,{key:p.key,renderless:e.renderless,'onUpdate:height':b=>c(p.index,b)},{default:b=>n.default?.({item:p.raw,index:p.index,...b})}));

return e.renderless?T(ke,null,[T('div',{ref:s,class:'v-virtual-scroll__spacer',style:{paddingTop:se(f.value)}},null),g,T('div',{class:'v-virtual-scroll__spacer',style:{paddingBottom:se(m.value)}},null)]):T('div',{ref:i,class:ce(['v-virtual-scroll',e.class]),onScrollPassive:r,onScrollend:u,style:he([o.value,e.style])},[T('div',{ref:s,class:'v-virtual-scroll__container',style:{paddingTop:se(f.value),paddingBottom:se(m.value)}},[g])]);}),{calculateVisibleItems:a,scrollToIndex:d};}});function VS(e,t){const n=le(!1);let l;function o(s){cancelAnimationFrame(l),n.value=!0,l=requestAnimationFrame(()=>{l=requestAnimationFrame(()=>{n.value=!1;});});}async function a(){await new Promise(s=>requestAnimationFrame(s)),await new Promise(s=>requestAnimationFrame(s)),await new Promise(s=>requestAnimationFrame(s)),await new Promise(s=>{if(n.value){const r=ie(n,()=>{r(),s();});}else s();});}async function i(s){if(s.key==='Tab'&&t.value?.focus(),!['PageDown','PageUp','Home','End'].includes(s.key))return;

const r=e.value?.$el;

if(!r)return;

(s.key==='Home'||s.key==='End')&&r.scrollTo({top:s.key==='Home'?0:r.scrollHeight,behavior:'smooth'}),await a();const u=r.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)');

if(s.key==='PageDown'||s.key==='Home'){const c=r.getBoundingClientRect().top;

for(const d of u)if(d.getBoundingClientRect().top>=c){d.focus();break;}}else{const c=r.getBoundingClientRect().bottom;

for(const d of[...u].reverse())if(d.getBoundingClientRect().bottom<=c){d.focus();break;}}}

return{onScrollPassive:o,onKeydown:i};}const TS=j({closeText:{type:String,default:'$vuetify.close'},openText:{type:String,default:'$vuetify.open'}},'autocomplete');function ES(e,t){const n=Gt(),l=V(()=>`menu-${n}`);

return{menuId:l,ariaExpanded:O(()=>lt(t)),ariaControls:O(()=>l.value)};}const PS=j({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Te,default:'$dropdown'},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:'$vuetify.noDataText'},openOnClear:Boolean,itemColor:String,noAutoScroll:Boolean,...TS(),...av({itemChildren:!1})},'Select'),IS=j({...PS(),...xt(bv({modelValue:null,role:'combobox'}),['validationValue','dirty']),...Oo({transition:{component:Hs}})},'VSelect'),qs=re()({name:'VSelect',props:IS(),emits:{'update:focused':e=>!0,'update:modelValue':e=>!0,'update:menu':e=>!0},setup(e,t){let{slots:n}=t;const{t:l}=Eo(),o=L(),a=L(),i=L(),{items:s,transformIn:r,transformOut:u}=O0(e),c=je(e,'modelValue',[],Q=>r(Q===null?[null]:Nt(Q)),Q=>{const xe=u(Q);

return e.multiple?xe:xe[0]??null;}),d=V(()=>typeof e.counterValue=='function'?e.counterValue(c.value):typeof e.counterValue=='number'?e.counterValue:c.value.length),f=Wf(e),m=pv(e),v=V(()=>c.value.map(Q=>Q.value)),g=le(!1),p=O(()=>e.closableChips&&!f.isReadonly.value&&!f.isDisabled.value),{InputIcon:b}=js(e);let S='',w=0,y;const _=V(()=>e.hideSelected?s.value.filter(Q=>!c.value.some(xe=>(e.valueComparator||Mt)(xe,Q))):s.value),k=V(()=>e.hideNoData&&!_.value.length||f.isReadonly.value||f.isDisabled.value),I=je(e,'menu'),x=V({get:()=>I.value,set:Q=>{I.value&&!Q&&a.value?.ΨopenChildren.size||Q&&k.value||(I.value=Q);}}),{menuId:E,ariaExpanded:M,ariaControls:z}=ES(e,x),P=V(()=>({...e.menuProps,activatorProps:{...e.menuProps?.activatorProps||{},'aria-haspopup':'listbox'}})),$=L(),U=VS($,o);function Y(Q){e.openOnClear&&(x.value=!0);}function oe(){k.value||(x.value=!x.value);}function ee(Q){Qr(Q)&&te(Q);}function te(Q){if(!Q.key||f.isReadonly.value)return;

if(['Enter',' ','ArrowDown','ArrowUp','Home','End'].includes(Q.key)&&Q.preventDefault(),['Enter','ArrowDown',' '].includes(Q.key)&&(x.value=!0),['Escape','Tab'].includes(Q.key)&&(x.value=!1),e.clearable&&Q.key==='Backspace'){Q.preventDefault(),c.value=[],Y();

return;}

Q.key==='Home'?$.value?.focus('first'):Q.key==='End'&&$.value?.focus('last');const xe=1e3;

if(!Qr(Q))return;

const X=performance.now();X-y>xe&&(S='',w=0),S+=Q.key.toLowerCase(),y=X;const _e=_.value;function Qe(){let F=We();

return F||S.at(-1)===S.at(-2)&&(S=S.slice(0,-1),w++,F=We(),F)||(w=0,F=We(),F)?F:(S=Q.key.toLowerCase(),We());}function We(){for(let F=w;F<_e.length;F++){const N=_e[F];

if(N.title.toLowerCase().startsWith(S))return[N,F];}}const kt=Qe();

if(!kt)return;

const[C,A]=kt;w=A,$.value?.focus(A),e.multiple||(c.value=[C]);}function Se(Q){let xe=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;

if(!Q.props.disabled){if(e.multiple){const X=c.value.findIndex(Qe=>(e.valueComparator||Mt)(Qe.value,Q.value)),_e=xe??!~X;

if(~X){const Qe=_e?[...c.value,Q]:[...c.value];Qe.splice(X,1),c.value=Qe;}else _e&&(c.value=[...c.value,Q]);}else{const X=xe!==!1;c.value=X?[Q]:[],Be(()=>{x.value=!1;});}}}function J(Q){$.value?.$el.contains(Q.relatedTarget)||(x.value=!1);}function ue(){e.eager&&i.value?.calculateVisibleItems();}function R(){g.value&&o.value?.focus();}function q(Q){g.value=!0;}function ye(Q){if(Q==null)c.value=[];else if(ua(o.value,':autofill')||ua(o.value,':-webkit-autofill')){const xe=s.value.find(X=>X.title===Q);xe&&Se(xe);}else o.value&&(o.value.value='');}

return ie(x,()=>{if(!e.hideSelected&&x.value&&c.value.length){const Q=_.value.findIndex(xe=>c.value.some(X=>(e.valueComparator||Mt)(X.value,xe.value)));Fe&&!e.noAutoScroll&&window.requestAnimationFrame(()=>{Q>=0&&i.value?.scrollToIndex(Q);});}}),ie(s,(Q,xe)=>{x.value||g.value&&e.hideNoData&&!xe.length&&Q.length&&(x.value=!0);}),me(()=>{const Q=!!(e.chips||n.chip),xe=!!(!e.hideNoData||_.value.length||n['prepend-item']||n['append-item']||n['no-data']),X=c.value.length>0,_e=St.filterProps(e),Qe=X||!g.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;

return h(St,ae({ref:o},_e,{modelValue:c.value.map(We=>We.props.title).join(', '),name:void 0,'onUpdate:modelValue':ye,focused:g.value,'onUpdate:focused':We=>g.value=We,validationValue:c.externalValue,counterValue:d.value,dirty:X,class:['v-select',{'v-select--active-menu':x.value,'v-select--chips':!!e.chips,[`v-select--${e.multiple?'multiple':'single'}`]:!0,'v-select--selected':c.value.length,'v-select--selection-slot':!!n.selection},e.class],style:e.style,inputmode:'none',placeholder:Qe,'onClick:clear':Y,'onMousedown:control':oe,onBlur:J,onKeydown:te,'aria-expanded':M.value,'aria-controls':z.value}),{...n,default:We=>{let{id:kt}=We;

return T(ke,null,[T('select',{hidden:!0,multiple:e.multiple,name:m.fieldName.value},[s.value.map(C=>T('option',{key:C.value,value:C.value,selected:v.value.includes(C.value)},null))]),h(hv,ae({id:E.value,ref:a,modelValue:x.value,'onUpdate:modelValue':C=>x.value=C,activator:'parent',contentClass:'v-select__content',disabled:k.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:ue,onAfterLeave:R},P.value),{default:()=>[xe&&h(L0,ae({ref:$,selected:v.value,selectStrategy:e.multiple?'independent':'single-independent',onMousedown:C=>C.preventDefault(),onKeydown:ee,onFocusin:q,tabindex:'-1',selectable:!!_.value.length,'aria-live':'polite','aria-labelledby':`${kt.value}-label`,'aria-multiselectable':e.multiple,color:e.itemColor??e.color},U,e.listProps),{default:()=>[n['prepend-item']?.(),!_.value.length&&!e.hideNoData&&(n['no-data']?.()??h(Sa,{key:'no-data',title:l(e.noDataText)},null)),h(AS,{ref:i,renderless:!0,items:_.value,itemKey:'value'},{default:C=>{let{item:A,index:F,itemRef:N}=C;const D=Bh(A.props),B=ae(A.props,{ref:N,key:A.value,onClick:()=>Se(A,null),'aria-posinset':F+1,'aria-setsize':_.value.length});

return A.type==='divider'?n.divider?.({props:A.raw,index:F})??h(po,ae(A.props,{key:`divider-${F}`}),null):A.type==='subheader'?n.subheader?.({props:A.raw,index:F})??h(lv,ae(A.props,{key:`subheader-${F}`}),null):n.item?.({item:A,index:F,props:B})??h(Sa,ae(B,{role:'option'}),{prepend:K=>{let{isSelected:Z}=K;

return T(ke,null,[e.multiple&&!e.hideSelected?h(t0,{key:A.value,modelValue:Z,ripple:!1,tabindex:'-1','aria-hidden':!0,onClick:G=>G.preventDefault()},null):void 0,D.prependAvatar&&h(rl,{image:D.prependAvatar},null),D.prependIcon&&h(ze,{icon:D.prependIcon},null)]);}});}}),n['append-item']?.()]})]}),c.value.map((C,A)=>{function F(K){K.stopPropagation(),K.preventDefault(),Se(C,!1);}const N=ae(Nu.filterProps(C.props),{'onClick:close':F,onKeydown(K){K.key!=='Enter'&&K.key!==' '||(K.preventDefault(),K.stopPropagation(),F(K));},onMousedown(K){K.preventDefault(),K.stopPropagation();},modelValue:!0,'onUpdate:modelValue':void 0}),D=Q?!!n.chip:!!n.selection,B=D?Yd(Q?n.chip({item:C,index:A,props:N}):n.selection({item:C,index:A})):void 0;

if(!(D&&!B))return T('div',{key:C.value,class:'v-select__selection'},[Q?n.chip?h(Ue,{key:'chip-defaults',defaults:{VChip:{closable:p.value,size:'small',text:C.title}}},{default:()=>[B]}):h(Nu,ae({key:'chip',closable:p.value,size:'small',text:C.title,disabled:C.props.disabled},N),null):B??T('span',{class:'v-select__selection-text'},[C.title,e.multiple&&A<c.value.length-1&&T('span',{class:'v-select__selection-comma'},[we(',')])])]);})]);},'append-inner':function(){for(var We=arguments.length,kt=new Array(We),C=0;C<We;C++)kt[C]=arguments[C];

return T(ke,null,[n['append-inner']?.(...kt),e.menuIcon?h(ze,{class:'v-select__menu-icon',color:o.value?.fieldIconColor,icon:e.menuIcon,'aria-hidden':!0},null):void 0,e.appendInnerIcon&&h(b,{key:'append-icon',name:'appendInner',color:kt[0].iconColor.value},null)]);}});}),Rl({isFocused:g,menu:x,select:Se},o);}}),FS={class:'d-flex flex-wrap ga-4'},OS=Je({__name:'ModalPlayground',setup(e){const t=L(!1),n=L(!1),l=L(''),o=L(''),a=[{text:'Cancelar',color:'secondary',handler:()=>{t.value=!1;}},{text:'Confirmar',color:'primary',handler:()=>{t.value=!1;}}],i=[{text:'Salvar',color:'primary',handler:()=>{n.value=!1;}},{text:'Fechar',color:'secondary',handler:()=>{n.value=!1;}}];

return(s,r)=>{const u=nt('FzModalBase'),c=nt('SectionCard');

return Ve(),$e(c,{title:'FzModalBase'},{description:H(()=>[...r[6]||(r[6]=[we(' Modal base com ações customizáveis e suporte a teclado (Enter/Esc). ',-1)])]),default:H(()=>[T('div',FS,[h(Xe,{color:'primary',onClick:r[0]||(r[0]=d=>t.value=!0)},{default:H(()=>[...r[7]||(r[7]=[we(' Abrir Modal ',-1)])]),_:1}),h(Xe,{color:'secondary',onClick:r[1]||(r[1]=d=>n.value=!0)},{default:H(()=>[...r[8]||(r[8]=[we(' Modal Grande ',-1)])]),_:1})]),h(u,{modelValue:t.value,'onUpdate:modelValue':r[2]||(r[2]=d=>t.value=d),title:'Confirmar ação',message:'Deseja realmente executar esta ação?',actions:a},null,8,['modelValue']),h(u,{modelValue:n.value,'onUpdate:modelValue':r[5]||(r[5]=d=>n.value=d),title:'Modal com conteúdo personalizado',actions:i,'max-width':600},{default:H(()=>[h(St,{modelValue:l.value,'onUpdate:modelValue':r[3]||(r[3]=d=>l.value=d),label:'Nome do item',variant:'outlined',density:'comfortable'},null,8,['modelValue']),h(qs,{modelValue:o.value,'onUpdate:modelValue':r[4]||(r[4]=d=>o.value=d),items:['Opção 1','Opção 2','Opção 3'],label:'Categoria',variant:'outlined',density:'comfortable'},null,8,['modelValue'])]),_:1},8,['modelValue'])]),_:1});};}}),MS=$a('v-alert-title'),DS=j({iconSize:[Number,String],iconSizes:{type:Array,default:()=>[['x-small',10],['small',16],['default',24],['large',28],['x-large',32]]}},'iconSize');function $S(e,t){return{iconSize:V(()=>{const l=new Map(e.iconSizes),o=e.iconSize??t()??'default';

return l.has(o)?l.get(o):o;})};}const BS=['success','info','warning','error'],LS=j({border:{type:[Boolean,String],validator:e=>typeof e=='boolean'||['top','end','bottom','start'].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:Te,default:'$close'},closeLabel:{type:String,default:'$vuetify.close'},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>BS.includes(e)},...Ce(),...Dt(),...cn(),...zn(),...DS(),...za(),...Ns(),...$t(),...Le(),...qe(),...En({variant:'flat'})},'VAlert'),Xs=re()({name:'VAlert',props:LS(),emits:{'click:close':e=>!0,'update:modelValue':e=>!0},setup(e,t){let{emit:n,slots:l}=t;const o=je(e,'modelValue'),a=O(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon;}),{iconSize:i}=$S(e,()=>e.prominent?44:void 0),{themeClasses:s}=ot(e),{colorClasses:r,colorStyles:u,variantClasses:c}=Ll(()=>({color:e.color??e.type,variant:e.variant})),{densityClasses:d}=Xt(e),{dimensionStyles:f}=dn(e),{elevationClasses:m}=Hn(e),{locationStyles:v}=Ha(e),{positionClasses:g}=zs(e),{roundedClasses:p}=Bt(e),{textColorClasses:b,textColorStyles:S}=Kt(()=>e.borderColor),{t:w}=Eo(),y=O(()=>({'aria-label':w(e.closeLabel),onClick(_){o.value=!1,n('click:close',_);}}));

return()=>{const _=!!(l.prepend||a.value),k=!!(l.title||e.title),I=!!(l.close||e.closable),x={density:e.density,icon:a.value,size:e.iconSize||e.prominent?i.value:void 0};

return o.value&&h(e.tag,{class:ce(['v-alert',e.border&&{'v-alert--border':!!e.border,[`v-alert--border-${e.border===!0?'start':e.border}`]:!0},{'v-alert--prominent':e.prominent},s.value,r.value,d.value,m.value,g.value,p.value,c.value,e.class]),style:he([u.value,f.value,v.value,e.style]),role:'alert'},{default:()=>[Bl(!1,'v-alert'),e.border&&T('div',{key:'border',class:ce(['v-alert__border',b.value]),style:he(S.value)},null),_&&T('div',{key:'prepend',class:'v-alert__prepend'},[l.prepend?h(Ue,{key:'prepend-defaults',disabled:!a.value,defaults:{VIcon:{...x}}},l.prepend):h(ze,ae({key:'prepend-icon'},x),null)]),T('div',{class:'v-alert__content'},[k&&h(MS,{key:'title'},{default:()=>[l.title?.()??e.title]}),l.text?.()??e.text,l.default?.()]),l.append&&T('div',{key:'append',class:'v-alert__append'},[l.append()]),I&&T('div',{key:'close',class:'v-alert__close'},[l.close?h(Ue,{key:'close-defaults',defaults:{VBtn:{icon:e.closeIcon,size:'x-small',variant:'text'}}},{default:()=>[l.close?.({props:y.value})]}):h(Xe,ae({key:'close-btn',icon:e.closeIcon,size:'x-small',variant:'text'},y.value),null)])]});};}}),RS={class:'d-flex flex-wrap ga-2'},NS={class:'d-flex flex-wrap ga-2'},zS=Je({__name:'MessagesPlayground',setup(e){const t=L(null);function n(){Sl.success('Sucesso','Operação realizada com sucesso.');}function l(){Sl.error('Erro','Ocorreu um erro ao executar a operação.');}function o(){Sl.warning('Atenção','Verifique os dados antes de continuar.');}function a(){Sl.info('Informação','Esta é uma notificação informativa.');}async function i(){t.value=await Ui.show('Excluir','Deseja realmente excluir este item?',{confirmText:'Sim, excluir',confirmColor:'error'});}async function s(){t.value=await Ui.show('Informação','Esta ação não pode ser desfeita.',{confirmText:'OK',cancelText:'Fechar',confirmColor:'info'});}

return(r,u)=>{const c=nt('SectionCard');

return Ve(),ol(ke,null,[h(c,{title:'Notificações (FzFloatingNotify)'},{description:H(()=>[...u[0]||(u[0]=[we(' Notificações flutuantes com auto-hide. Use o utilitário ',-1),T('code',null,'notify',-1),we('. ',-1)])]),default:H(()=>[T('div',RS,[h(Xe,{color:'success',onClick:n},{default:H(()=>[...u[1]||(u[1]=[we(' Sucesso ',-1)])]),_:1}),h(Xe,{color:'error',onClick:l},{default:H(()=>[...u[2]||(u[2]=[we(' Erro ',-1)])]),_:1}),h(Xe,{color:'warning',onClick:o},{default:H(()=>[...u[3]||(u[3]=[we(' Aviso ',-1)])]),_:1}),h(Xe,{color:'info',onClick:a},{default:H(()=>[...u[4]||(u[4]=[we(' Informação ',-1)])]),_:1})])]),_:1}),h(c,{title:'Confirmação (FzConfirmDialog)'},{description:H(()=>[...u[5]||(u[5]=[we(' Diálogo de confirmação assíncrono. Use o utilitário ',-1),T('code',null,'confirm',-1),we('. ',-1)])]),default:H(()=>[T('div',NS,[h(Xe,{color:'primary',onClick:i},{default:H(()=>[...u[6]||(u[6]=[we(' Excluir item ',-1)])]),_:1}),h(Xe,{color:'secondary',onClick:s},{default:H(()=>[...u[7]||(u[7]=[we(' Informação ',-1)])]),_:1})]),t.value!==null?(Ve(),$e(Xs,{key:0,type:t.value?'success':'warning',class:'mt-3',density:'compact',variant:'tonal'},{default:H(()=>[we(Ge(t.value?'Usuário confirmou':'Usuário cancelou'),1)]),_:1},8,['type'])):Bn('',!0)]),_:1})],64);};}}),HS={class:'d-flex flex-wrap align-center ga-4'},WS=Je({__name:'LayoutPlayground',setup(e){const t=hf(),n=L(3);let l=null;function o(){l&&clearTimeout(l),t.show('Carregando...'),l=setTimeout(()=>{t.hide(),l=null;},n.value*1e3);}

return(a,i)=>{const s=nt('FzNumberField'),r=nt('SectionCard');

return Ve(),$e(r,{title:'Loading Overlay (FzLoadingOverlay)'},{description:H(()=>[...i[1]||(i[1]=[we(' Overlay de carregamento com delay configurável. Use o composable ',-1),T('code',null,'useLoading()',-1),we('. ',-1)])]),default:H(()=>[T('div',HS,[h(Xe,{color:'primary',onClick:o},{default:H(()=>[...i[2]||(i[2]=[we(' Mostrar Loading ',-1)])]),_:1}),h(s,{modelValue:n.value,'onUpdate:modelValue':i[0]||(i[0]=u=>n.value=u),label:'Segundos','decimal-places':0,min:1,max:30,style:{'max-width':'160px'}},null,8,['modelValue'])])]),_:1});};}}),jS=j({...Ce(),...xt(Ip(),['fullHeight']),...qe()},'VApp'),US=re()({name:'VApp',props:jS(),setup(e,t){let{slots:n}=t;const l=ot(e),{layoutClasses:o,getLayoutItem:a,items:i,layoutRef:s}=$p({...e,fullHeight:!0}),{rtlClasses:r}=qt();

return me(()=>T('div',{ref:s,class:ce(['v-application',l.themeClasses.value,o.value,r.value,e.class]),style:he([e.style])},[T('div',{class:'v-application__wrap'},[n.default?.()])])),{getLayoutItem:a,items:i,theme:l};}}),Sv=j({text:String,...Ce(),...Le()},'VToolbarTitle'),wv=re()({name:'VToolbarTitle',props:Sv(),setup(e,t){let{slots:n}=t;

return me(()=>{const l=!!(n.default||n.text||e.text);

return h(e.tag,{class:ce(['v-toolbar-title',e.class]),style:he(e.style)},{default:()=>[l&&T('div',{class:'v-toolbar-title__placeholder'},[n.text?n.text():e.text,n.default?.()])]});}),{};}}),KS=[null,'prominent','default','comfortable','compact'],Cv=j({absolute:Boolean,collapse:Boolean,collapsePosition:{type:String,default:'start'},color:String,density:{type:String,default:'default',validator:e=>KS.includes(e)},extended:{type:Boolean,default:null},extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Rn(),...Ce(),...zn(),...$t(),...Le({tag:'header'}),...qe()},'VToolbar'),Xu=re()({name:'VToolbar',props:Cv(),setup(e,t){let{slots:n}=t;const{backgroundColorClasses:l,backgroundColorStyles:o}=zt(()=>e.color),{borderClasses:a}=Nn(e),{elevationClasses:i}=Hn(e),{roundedClasses:s}=Bt(e),{themeClasses:r}=ot(e),{rtlClasses:u}=qt(),c=le(e.extended===null?!!n.extension?.():e.extended),d=V(()=>parseInt(Number(e.height)+(e.density==='prominent'?Number(e.height):0)-(e.density==='comfortable'?8:0)-(e.density==='compact'?16:0),10)),f=V(()=>c.value?parseInt(Number(e.extensionHeight)+(e.density==='prominent'?Number(e.extensionHeight):0)-(e.density==='comfortable'?4:0)-(e.density==='compact'?8:0),10):0);

return Ln({VBtn:{variant:'text'}}),me(()=>{const m=!!(e.title||n.title),v=!!(n.image||e.image),g=n.extension?.();

return c.value=e.extended===null?!!g:e.extended,h(e.tag,{class:ce(['v-toolbar',`v-toolbar--collapse-${e.collapsePosition}`,{'v-toolbar--absolute':e.absolute,'v-toolbar--collapse':e.collapse,'v-toolbar--flat':e.flat,'v-toolbar--floating':e.floating,[`v-toolbar--density-${e.density}`]:!0},l.value,a.value,i.value,s.value,r.value,u.value,e.class]),style:he([o.value,e.style])},{default:()=>[v&&T('div',{key:'image',class:'v-toolbar__image'},[n.image?h(Ue,{key:'image-defaults',disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},n.image):h(Ws,{key:'image-img',cover:!0,src:e.image},null)]),h(Ue,{defaults:{VTabs:{height:se(d.value)}}},{default:()=>[T('div',{class:'v-toolbar__content',style:{height:se(d.value)}},[n.prepend&&T('div',{class:'v-toolbar__prepend'},[n.prepend?.()]),m&&h(wv,{key:'title',text:e.title},{text:n.title}),n.default?.(),n.append&&T('div',{class:'v-toolbar__append'},[n.append?.()])])]}),h(Ue,{defaults:{VTabs:{height:se(f.value)}}},{default:()=>[h(Of,null,{default:()=>[c.value&&T('div',{class:'v-toolbar__extension',style:{height:se(f.value)}},[g])]})]})]});}),{contentHeight:d,extensionHeight:f};}}),GS=j({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},'scroll');function YS(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:n,layoutSize:l}=t;let o=0,a=0;const i=L(null),s=le(0),r=le(0),u=le(0),c=le(!1),d=le(!1),f=le(!1),m=le(!1),v=le(!0),g=V(()=>Number(e.scrollThreshold)),p=V(()=>Et((g.value-s.value)/g.value||0));function b(_){const k='window'in _?window.innerHeight:_.clientHeight,I='window'in _?document.documentElement.scrollHeight:_.scrollHeight;

return{clientHeight:k,scrollHeight:I};}function S(){const _=i.value;

if(!_)return;

const{clientHeight:k,scrollHeight:I}=b(_),x=I-k,E=l?.value||0,M=g.value+E;v.value=x>M;}function w(){S();}function y(){const _=i.value;

if(!_||n&&!n.value)return;

o=s.value,s.value='window'in _?_.pageYOffset:_.scrollTop;const k=_ instanceof Window?document.documentElement.scrollHeight:_.scrollHeight;a!==k&&(k>a&&S(),a=k),d.value=s.value<o,u.value=Math.abs(s.value-g.value);const{clientHeight:I,scrollHeight:x}=b(_),E=s.value+I>=x-5;!d.value&&E&&s.value>=g.value&&v.value&&(m.value=!0);const M=Math.abs(s.value-o)>100,z=s.value<=5;(d.value&&o-s.value>1&&!E||M&&s.value<g.value||z)&&(m.value=!1),f.value=E;}

return ie(d,()=>{r.value=r.value||s.value;}),ie(c,()=>{r.value=0;}),Yt(()=>{ie(()=>e.scrollTarget,_=>{const k=_?document.querySelector(_):window;k&&k!==i.value&&(i.value?.removeEventListener('scroll',y),i.value=k,i.value.addEventListener('scroll',y,{passive:!0}),Promise.resolve().then(()=>{S();}));},{immediate:!0}),window.addEventListener('resize',w,{passive:!0});}),yt(()=>{i.value?.removeEventListener('scroll',y),window.removeEventListener('resize',w);}),n&&ie(n,y,{immediate:!0}),{scrollThreshold:g,currentScroll:s,currentThreshold:u,isScrollActive:c,scrollRatio:p,isScrollingUp:d,savedScroll:r,isAtBottom:f,reachedBottomWhileScrollingDown:m,hasEnoughScrollableSpace:v};}const qS=j({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:'top',validator:e=>['top','bottom'].includes(e)},...Cv(),...Fp(),...GS(),height:{type:[Number,String],default:64}},'VAppBar'),XS=re()({name:'VAppBar',props:qS(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=L(),o=je(e,'modelValue'),a=V(()=>{const k=new Set(e.scrollBehavior?.split(' ')??[]);

return{hide:k.has('hide'),fullyHide:k.has('fully-hide'),inverted:k.has('inverted'),collapse:k.has('collapse'),elevate:k.has('elevate'),fadeImage:k.has('fade-image')};}),i=V(()=>{const k=a.value;

return k.hide||k.fullyHide||k.inverted||k.collapse||k.elevate||k.fadeImage||!o.value;}),s=V(()=>{const k=l.value?.contentHeight??0,I=l.value?.extensionHeight??0;

return k+I;}),{currentScroll:r,scrollThreshold:u,isScrollingUp:c,scrollRatio:d,isAtBottom:f,reachedBottomWhileScrollingDown:m,hasEnoughScrollableSpace:v}=YS(e,{canScroll:i,layoutSize:s}),g=O(()=>a.value.hide||a.value.fullyHide),p=V(()=>e.collapse||a.value.collapse&&(a.value.inverted?d.value>0:d.value===0)),b=V(()=>e.flat||a.value.fullyHide&&!o.value||a.value.elevate&&(a.value.inverted?r.value>0:r.value===0)),S=V(()=>a.value.fadeImage?a.value.inverted?1-d.value:d.value:void 0),w=V(()=>{if(a.value.hide&&a.value.inverted)return 0;

const k=l.value?.contentHeight??0,I=l.value?.extensionHeight??0;

return g.value?r.value<u.value||a.value.fullyHide?k+I:k:k+I;});_n(()=>!!e.scrollBehavior,()=>{Ct(()=>{if(!g.value){o.value=!0;

return;}

if(a.value.inverted){o.value=r.value>u.value;

return;}

if(!v.value){o.value=!0;

return;}

if(m.value){o.value=!1;

return;}

o.value=c.value&&!f.value||r.value<u.value;});});const{ssrBootStyles:y}=Ua(),{layoutItemStyles:_}=Mp({id:e.name,order:V(()=>parseInt(e.order,10)),position:O(()=>e.location),layoutSize:w,elementSize:le(void 0),active:o,absolute:O(()=>e.absolute)});

return me(()=>{const k=Xu.filterProps(e);

return h(Xu,ae({ref:l,class:['v-app-bar',{'v-app-bar--bottom':e.location==='bottom'},e.class],style:[{..._.value,'--v-toolbar-image-opacity':S.value,height:void 0,...y.value},e.style]},k,{collapse:p.value,flat:b.value}),n);}),{};}}),ZS=re()({name:'VAppBarTitle',props:Sv(),setup(e,t){let{slots:n}=t;

return me(()=>h(wv,ae(e,{class:'v-app-bar-title'}),n)),{};}}),JS=j({scrollable:Boolean,...Ce(),...cn(),...Le({tag:'main'})},'VMain'),QS=re()({name:'VMain',props:JS(),setup(e,t){let{slots:n}=t;const{dimensionStyles:l}=dn(e),{mainStyles:o}=Op(),{ssrBootStyles:a}=Ua();

return me(()=>h(e.tag,{class:ce(['v-main',{'v-main--scrollable':e.scrollable},e.class]),style:he([o.value,a.value,l.value,e.style])},{default:()=>[e.scrollable?T('div',{class:'v-main__scroller'},[n.default?.()]):n.default?.()]})),{};}}),Zs=Symbol.for('vuetify:v-tabs'),xv=j({fixed:Boolean,sliderColor:String,sliderTransition:String,sliderTransitionDuration:[String,Number],hideSlider:Boolean,inset:Boolean,direction:{type:String,default:'horizontal'},...xt(Ef({selectedClass:'v-tab--selected',variant:'text'}),['active','block','flat','location','position','symbol'])},'VTab'),pl=re()({name:'VTab',props:xv(),setup(e,t){let{slots:n,attrs:l}=t;const{textColorClasses:o,textColorStyles:a}=Kt(()=>e.sliderColor),{backgroundColorClasses:i,backgroundColorStyles:s}=zt(()=>e.sliderColor),r=L(),u=L(),c=V(()=>e.direction==='horizontal'),d=V(()=>r.value?.group?.isSelected.value??!1);function f(p,b){return{opacity:[0,1]};}function m(p,b){return e.direction==='vertical'?{transform:['scaleY(0)','scaleY(1)']}:{transform:['scaleX(0)','scaleX(1)']};}function v(p,b){const S=b.getBoundingClientRect(),w=p.getBoundingClientRect(),y=c.value?'x':'y',_=c.value?'X':'Y',k=c.value?'right':'bottom',I=c.value?'width':'height',x=S[y],E=w[y],M=x>E?S[k]-w[k]:S[y]-w[y],z=Math.sign(M)>0?c.value?'right':'bottom':Math.sign(M)<0?c.value?'left':'top':'center',$=(Math.abs(M)+(Math.sign(M)<0?S[I]:w[I]))/Math.max(S[I],w[I])||0,U=S[I]/w[I]||0,Y=1.5;

return{transform:[`translate${_}(${M}px) scale${_}(${U})`,`translate${_}(${M/Y}px) scale${_}(${($-1)/Y+1})`,'none'],transformOrigin:Array(3).fill(z)};}function g(p){let{value:b}=p;

if(b){const S=r.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider'),w=u.value;

if(!S||!w)return;

const y=getComputedStyle(S).color,_={fade:f,grow:m,shift:v}[e.sliderTransition??'shift']??v,k=Number(e.sliderTransitionDuration)||({fade:400,grow:350,shift:225}[e.sliderTransition??'shift']??225);hn(w,{backgroundColor:[y,'currentcolor'],..._(w,S)},{duration:k,easing:mo});}}

return me(()=>{const p=Xe.filterProps(e);

return h(Xe,ae({symbol:Zs,ref:r,class:['v-tab',e.class,d.value&&e.inset?i.value:[]],style:[e.style,d.value&&e.inset?s.value:[]],tabindex:d.value?0:-1,role:'tab','aria-selected':String(d.value),active:!1},p,l,{block:e.fixed,maxWidth:e.fixed?300:void 0,'onGroup:selected':g}),{...n,default:()=>T(ke,null,[n.default?.()??e.text,!e.hideSlider&&T('div',{ref:u,class:ce(['v-tab__slider',o.value]),style:he(a.value)},null)])});}),Rl({},r);}}),ew=e=>{const{touchstartX:t,touchendX:n,touchstartY:l,touchendY:o}=e,a=.5,i=16;e.offsetX=n-t,e.offsetY=o-l,Math.abs(e.offsetY)<a*Math.abs(e.offsetX)&&(e.left&&n<t-i&&e.left(e),e.right&&n>t+i&&e.right(e)),Math.abs(e.offsetX)<a*Math.abs(e.offsetY)&&(e.up&&o<l-i&&e.up(e),e.down&&o>l+i&&e.down(e));};function tw(e,t){const n=e.changedTouches[0];t.touchstartX=n.clientX,t.touchstartY=n.clientY,t.start?.({originalEvent:e,...t});}function nw(e,t){const n=e.changedTouches[0];t.touchendX=n.clientX,t.touchendY=n.clientY,t.end?.({originalEvent:e,...t}),ew(t);}function lw(e,t){const n=e.changedTouches[0];t.touchmoveX=n.clientX,t.touchmoveY=n.clientY,t.move?.({originalEvent:e,...t});}function ow(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};

return{touchstart:n=>tw(n,t),touchend:n=>nw(n,t),touchmove:n=>lw(n,t)};}function aw(e,t){const n=t.value,l=n?.parent?e.parentElement:e,o=n?.options??{passive:!0},a=t.instance?.$.uid;

if(!l||a===void 0)return;

const i=ow(t.value);l._touchHandlers=l._touchHandlers??Object.create(null),l._touchHandlers[a]=i,Nd(i).forEach(s=>{l.addEventListener(s,i[s],o);});}function iw(e,t){const n=t.value?.parent?e.parentElement:e,l=t.instance?.$.uid;

if(!n?._touchHandlers||l===void 0)return;

const o=n._touchHandlers[l];Nd(o).forEach(a=>{n.removeEventListener(a,o[a]);}),delete n._touchHandlers[l];}const Ca={mounted:aw,unmounted:iw},kv=Symbol.for('vuetify:v-window'),_v=Symbol.for('vuetify:v-window-group'),Av=j({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:'$next'},prevIcon:{type:[Boolean,String,Function,Object],default:'$prev'},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=='boolean'||e==='hover'},verticalArrows:[Boolean,String],touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:'horizontal'},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:'v-window-item--active'},mandatory:{type:[Boolean,String],default:'force'},crossfade:Boolean,transitionDuration:Number,...Ce(),...Le(),...qe()},'VWindow'),Qi=re()({name:'VWindow',directives:{vTouch:Ca},props:Av(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:l}=ot(e),{isRtl:o}=qt(),{t:a}=Eo(),i=Na(e,_v),s=L(),r=V(()=>o.value?!e.reverse:e.reverse),u=le(!1),c=V(()=>{if(e.crossfade)return'v-window-crossfade-transition';

const y=e.direction==='vertical'?'y':'x',k=(r.value?!u.value:u.value)?'-reverse':'';

return`v-window-${y}${k}-transition`;}),d=le(0),f=L(void 0),m=V(()=>i.items.value.findIndex(y=>i.selected.value.includes(y.id)));ie(m,(y,_)=>{let k;const I={left:0,top:0};Fe&&_>=0&&(k=Ts(s.value),I.left=k?.scrollLeft,I.top=k?.scrollTop);const x=i.items.value.length,E=x-1;x<=2?u.value=y<_:y===E&&_===0?u.value=!1:y===0&&_===E?u.value=!0:u.value=y<_,Be(()=>{if(!Fe||!k)return;

k.scrollTop!==I.top&&k.scrollTo({...I,behavior:'instant'}),requestAnimationFrame(()=>{if(!k)return;

k.scrollTop!==I.top&&k.scrollTo({...I,behavior:'instant'});});});},{flush:'sync'}),vt(kv,{transition:c,isReversed:u,transitionCount:d,transitionHeight:f,rootRef:s});const v=O(()=>e.continuous||m.value!==0),g=O(()=>e.continuous||m.value!==i.items.value.length-1);function p(){v.value&&i.prev();}function b(){g.value&&i.next();}const S=V(()=>{const y=[],_={icon:o.value?e.nextIcon:e.prevIcon,class:`v-window__${r.value?'right':'left'}`,onClick:i.prev,'aria-label':a('$vuetify.carousel.prev')};y.push(v.value?n.prev?n.prev({props:_}):h(Xe,_,null):T('div',null,null));const k={icon:o.value?e.prevIcon:e.nextIcon,class:`v-window__${r.value?'left':'right'}`,onClick:i.next,'aria-label':a('$vuetify.carousel.next')};

return y.push(g.value?n.next?n.next({props:k}):h(Xe,k,null):T('div',null,null)),y;}),w=V(()=>e.touch===!1?e.touch:{...{left:()=>{r.value?p():b();},right:()=>{r.value?b():p();},start:_=>{let{originalEvent:k}=_;k.stopPropagation();}},...e.touch===!0?{}:e.touch});

return me(()=>st(h(e.tag,{ref:s,class:ce(['v-window',{'v-window--show-arrows-on-hover':e.showArrows==='hover','v-window--vertical-arrows':!!e.verticalArrows,'v-window--crossfade':!!e.crossfade},l.value,e.class]),style:he([e.style,{'--v-window-transition-duration':al()?null:se(e.transitionDuration,'ms')}])},{default:()=>[T('div',{class:'v-window__container',style:{height:f.value}},[n.default?.({group:i}),e.showArrows!==!1&&T('div',{class:ce(['v-window__controls',{'v-window__controls--left':e.verticalArrows==='left'||e.verticalArrows===!0},{'v-window__controls--right':e.verticalArrows==='right'}])},[S.value])]),n.additional?.({group:i})]}),[[Ca,w.value]])),{group:i};}}),sw=j({...xt(Av(),['continuous','nextIcon','prevIcon','showArrows','touch','mandatory'])},'VTabsWindow'),rw=re()({name:'VTabsWindow',props:sw(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=Ie(Zs,null),o=je(e,'modelValue'),a=V({get(){return o.value!=null||!l?o.value:l.items.value.find(i=>l.selected.value.includes(i.id))?.value;},set(i){o.value=i;}});

return me(()=>{const i=Qi.filterProps(e);

return h(Qi,ae({_as:'VTabsWindow'},i,{modelValue:a.value,'onUpdate:modelValue':s=>a.value=s,class:['v-tabs-window',e.class],style:e.style,mandatory:!1,touch:!1}),n);}),{};}}),Vv=j({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...Ce(),...$s(),...fv()},'VWindowItem'),Xn=re()({name:'VWindowItem',directives:{vTouch:Ca},props:Vv(),emits:{'group:selected':e=>!0},setup(e,t){let{slots:n}=t;const l=Ie(kv),o=ha(e,_v),{isBooted:a}=Ua();

if(!l||!o)throw new Error('[Vuetify] VWindowItem must be used inside VWindow');

const i=le(!1),s=V(()=>a.value&&(l.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function r(){!i.value||!l||(i.value=!1,l.transitionCount.value>0&&(l.transitionCount.value-=1,l.transitionCount.value===0&&(l.transitionHeight.value=void 0)));}function u(){i.value||!l||(i.value=!0,l.transitionCount.value===0&&(l.transitionHeight.value=se(l.rootRef.value?.clientHeight)),l.transitionCount.value+=1);}function c(){r();}function d(v){i.value&&Be(()=>{!s.value||!i.value||!l||(l.transitionHeight.value=se(v.clientHeight));});}const f=V(()=>{const v=l.isReversed.value?e.reverseTransition:e.transition;

return s.value?{name:typeof v!='string'?l.transition.value:v,onBeforeEnter:u,onAfterEnter:r,onEnterCancelled:c,onBeforeLeave:u,onAfterLeave:r,onLeaveCancelled:c,onEnter:d}:!1;}),{hasContent:m}=vv(e,o.isSelected);

return me(()=>h(bn,{transition:f.value,disabled:!a.value},{default:()=>[st(T('div',{class:ce(['v-window-item',o.selectedClass.value,e.class]),style:he(e.style)},[m.value&&n.default?.()]),[[cl,o.isSelected.value]])]})),{groupItem:o};}}),uw=j({...Vv()},'VTabsWindowItem'),cw=re()({name:'VTabsWindowItem',props:uw(),setup(e,t){let{slots:n}=t;

return me(()=>{const l=Xn.filterProps(e);

return h(Xn,ae({_as:'VTabsWindowItem'},l,{class:['v-tabs-window-item',e.class],style:e.style}),n);}),{};}});function dw(e){return e?e.map(t=>Pl(t)?t:{text:t,value:t}):[];}const fw=j({alignTabs:{type:String,default:'start'},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,inset:Boolean,insetPadding:[String,Number],insetRadius:[String,Number],sliderColor:String,...To(xv(),['spaced','sliderTransition','sliderTransitionDuration']),...Us({mandatory:'force',selectedClass:'v-tab-item--selected'}),...Dt(),...Le()},'VTabs'),vw=re()({name:'VTabs',props:fw(),emits:{'update:modelValue':e=>!0},setup(e,t){let{attrs:n,slots:l}=t;const o=je(e,'modelValue'),a=V(()=>dw(e.items)),{densityClasses:i}=Xt(e),{backgroundColorClasses:s,backgroundColorStyles:r}=zt(()=>e.bgColor),{scopeId:u}=Mo();

return Ln({VTab:{color:O(e,'color'),direction:O(e,'direction'),stacked:O(e,'stacked'),fixed:O(e,'fixedTabs'),inset:O(e,'inset'),sliderColor:O(e,'sliderColor'),sliderTransition:O(e,'sliderTransition'),sliderTransitionDuration:O(e,'sliderTransitionDuration'),hideSlider:O(e,'hideSlider')}}),me(()=>{const c=ba.filterProps(e),d=!!(l.window||e.items.length>0);

return T(ke,null,[h(ba,ae(c,{modelValue:o.value,'onUpdate:modelValue':f=>o.value=f,class:['v-tabs',`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{'v-tabs--fixed-tabs':e.fixedTabs,'v-tabs--grow':e.grow,'v-tabs--inset':e.inset,'v-tabs--stacked':e.stacked},i.value,s.value,e.class],style:[{'--v-tabs-height':se(e.height),'--v-tabs-inset-padding':e.inset?se(e.insetPadding):void 0,'--v-tabs-inset-radius':e.inset?se(e.insetRadius):void 0},r.value,e.style],role:'tablist',symbol:Zs},u,n),{default:l.default??(()=>a.value.map(f=>l.tab?.({item:f})??h(pl,ae(f,{key:f.text,value:f.value,spaced:e.spaced}),{default:l[`tab.${f.value}`]?()=>l[`tab.${f.value}`]?.({item:f}):void 0}))),prev:l.prev,next:l.next}),d&&h(rw,ae({modelValue:o.value,'onUpdate:modelValue':f=>o.value=f,key:'tabs-window'},u),{default:()=>[a.value.map(f=>l.item?.({item:f})??h(cw,{value:f.value},{default:()=>l[`item.${f.value}`]?.({item:f})})),l.window?.()]})]);}),{};}}),mw={style:{height:'calc(100dvh - 200px)','overflow-y':'auto'}},Zu='playground-theme',Ju='playground-tab',gw=Je({__name:'App',setup(e){const t=L(localStorage.getItem(Ju)||'botoes'),{isActive:n,message:l}=Rp(),o=Ra(),a=V(()=>o.global.current.value.dark),i=V(()=>a.value?'mdi-weather-sunny':'mdi-weather-night');function s(){const r=a.value?'light':'dark';o.change(r),localStorage.setItem(Zu,r);}

return ie(t,r=>{localStorage.setItem(Ju,r);}),Yt(()=>{const r=localStorage.getItem(Zu);r==='dark'&&!a.value&&s(),r==='light'&&a.value&&s();}),(r,u)=>{const c=nt('FzFloatingNotify'),d=nt('FzLoadingOverlay'),f=nt('FzConfirmDialog');

return Ve(),$e(US,null,{default:H(()=>[h(XS,{color:'primary',density:'compact'},{append:H(()=>[h(Xe,{icon:i.value,variant:'text',onClick:s},null,8,['icon'])]),default:H(()=>[h(ZS,{class:'text-body-1 font-weight-bold'},{default:H(()=>[...u[2]||(u[2]=[we(' Forizi UI — Playground ',-1)])]),_:1})]),_:1}),h(QS,null,{default:H(()=>[h(vw,{modelValue:t.value,'onUpdate:modelValue':u[0]||(u[0]=m=>t.value=m),color:'primary',grow:''},{default:H(()=>[h(pl,{value:'botoes'},{default:H(()=>[...u[3]||(u[3]=[we('Botões',-1)])]),_:1}),h(pl,{value:'inputs'},{default:H(()=>[...u[4]||(u[4]=[we('Inputs',-1)])]),_:1}),h(pl,{value:'modal'},{default:H(()=>[...u[5]||(u[5]=[we('Modal',-1)])]),_:1}),h(pl,{value:'mensagens'},{default:H(()=>[...u[6]||(u[6]=[we('Mensagens',-1)])]),_:1}),h(pl,{value:'layout'},{default:H(()=>[...u[7]||(u[7]=[we('Layout',-1)])]),_:1})]),_:1},8,['modelValue']),h(po),T('div',mw,[h(Qi,{modelValue:t.value,'onUpdate:modelValue':u[1]||(u[1]=m=>t.value=m)},{default:H(()=>[h(Xn,{value:'botoes',class:'pa-6'},{default:H(()=>[h(Yp)]),_:1}),h(Xn,{value:'inputs',class:'pa-6'},{default:H(()=>[h(Sb)]),_:1}),h(Xn,{value:'modal',class:'pa-6'},{default:H(()=>[h(OS)]),_:1}),h(Xn,{value:'mensagens',class:'pa-6'},{default:H(()=>[h(zS)]),_:1}),h(Xn,{value:'layout',class:'pa-6'},{default:H(()=>[h(WS)]),_:1})]),_:1},8,['modelValue'])])]),_:1}),h(c),h(d,{'is-loading':Me(n),message:Me(l)},null,8,['is-loading','message']),h(f)]),_:1});};}});function hw(e,t){const n=t.modifiers||{},l=t.value,{once:o,immediate:a,...i}=n,s=!Object.keys(i).length,{handler:r,options:u}=typeof l=='object'?l:{handler:l,options:{attributes:i?.attr??s,characterData:i?.char??s,childList:i?.child??s,subtree:i?.sub??s}},c=new MutationObserver(function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],f=arguments.length>1?arguments[1]:void 0;r?.(d,f),o&&Tv(e,t);});a&&r?.([],c),e._mutate=Object(e._mutate),e._mutate[t.instance.$.uid]={observer:c},c.observe(e,u);}function Tv(e,t){e._mutate?.[t.instance.$.uid]&&(e._mutate[t.instance.$.uid].observer.disconnect(),delete e._mutate[t.instance.$.uid]);}const yw={mounted:hw,unmounted:Tv};function pw(e,t){const n=t.value,l={passive:!t.modifiers?.active};window.addEventListener('resize',n,l),e._onResize=Object(e._onResize),e._onResize[t.instance.$.uid]={handler:n,options:l},t.modifiers?.quiet||n();}function bw(e,t){if(!e._onResize?.[t.instance.$.uid])return;

const{handler:n,options:l}=e._onResize[t.instance.$.uid];window.removeEventListener('resize',n,l),delete e._onResize[t.instance.$.uid];}const Sw={mounted:pw,unmounted:bw};function Ev(e,t){const{self:n=!1}=t.modifiers??{},l=t.value,o=typeof l=='object'&&l.options||{passive:!0},a=typeof l=='function'||'handleEvent'in l?l:l.handler,i=n?e:t.arg?document.querySelector(t.arg):window;i&&(i.addEventListener('scroll',a,o),e._onScroll=Object(e._onScroll),e._onScroll[t.instance.$.uid]={handler:a,options:o,target:n?void 0:i});}function Pv(e,t){if(!e._onScroll?.[t.instance.$.uid])return;

const{handler:n,options:l,target:o=e}=e._onScroll[t.instance.$.uid];o.removeEventListener('scroll',n,l),delete e._onScroll[t.instance.$.uid];}function ww(e,t){t.value!==t.oldValue&&(Pv(e,t),Ev(e,t));}const Cw={mounted:Ev,unmounted:Pv,updated:ww},xw=j({id:String,interactive:Boolean,text:String,...xt(Ka({closeOnBack:!1,location:'end',locationStrategy:'connected',eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:'auto',scrim:!1,scrollStrategy:'reposition',transition:null}),['absolute','retainFocus','captureFocus','disableInitialFocus'])},'VTooltip'),Js=re()({name:'VTooltip',props:xw(),emits:{'update:modelValue':e=>!0},setup(e,t){let{slots:n}=t;const l=je(e,'modelValue'),{scopeId:o}=Mo(),a=Gt(),i=O(()=>e.id||`v-tooltip-${a}`),s=L(),r=V(()=>e.location.split(' ').length>1?e.location:e.location+' center'),u=V(()=>e.origin==='auto'||e.origin==='overlap'||e.origin.split(' ').length>1||e.location.split(' ').length>1?e.origin:e.origin+' center'),c=O(()=>e.transition!=null?e.transition:l.value?'scale-transition':'fade-transition'),d=V(()=>ae({'aria-describedby':i.value},e.activatorProps));

return me(()=>{const f=Ol.filterProps(e);

return h(Ol,ae({ref:s,class:['v-tooltip',{'v-tooltip--interactive':e.interactive},e.class],style:e.style,id:i.value},f,{modelValue:l.value,'onUpdate:modelValue':m=>l.value=m,transition:c.value,absolute:!0,location:r.value,origin:u.value,role:'tooltip',activatorProps:d.value,_disableGlobalStack:!0},o),{activator:n.activator,default:function(){for(var m=arguments.length,v=new Array(m),g=0;g<m;g++)v[g]=arguments[g];

return n.default?.(...v)??e.text;}});}),Rl({},s);}});function kw(e,t){const n=typeof e=='string'?nt(e):e,l=_w(n,t);

return{mounted:l,updated:l,unmounted(o){Td(null,o);}};}function _w(e,t){return function(n,l,o){const a=typeof t=='function'?t(l):t,i=l.value?.text??l.value??a?.text,s=Pl(l.value)?l.value:{},r=()=>i??n.textContent,u=(o.ctx===l.instance.$?Aw(o,l.instance.$)?.provides:o.ctx?.provides)??l.instance.$.provides,c=Tn(e,ae(a,s),r);c.appContext=Object.assign(Object.create(null),l.instance.$.appContext,{provides:u}),Td(c,n);};}function Aw(e,t){const n=new Set,l=a=>{for(const i of a){if(!i)continue;

if(i===e||i.el&&e.el&&i.el===e.el)return!0;

n.add(i);let s;

if(i.suspense?s=l([i.ssContent]):Array.isArray(i.children)?s=l(i.children):i.component?.vnode&&(s=l([i.component?.subTree])),s)return s;

n.delete(i);}

return!1;};

if(!l([t.subTree]))return t;

const o=Array.from(n).reverse();

for(const a of o)if(a.component)return a.component;

return t;}const Vw=kw(Js,e=>({activator:(Pl(e.value)?!e.value.text:['',!1,null].includes(e.value))?null:'parent',location:e.arg?.replace('-',' '),text:typeof e.value=='boolean'?void 0:e.value})),Tw=Object.freeze(Object.defineProperty({__proto__:null,ClickOutside:Ji,Intersect:wo,Mutate:yw,Resize:Sw,Ripple:rn,Scroll:Cw,Tooltip:Vw,Touch:Ca},Symbol.toStringTag,{value:'Module'})),Ew=Je({__name:'FzIconToolTip',props:{icon:{},tooltip:{default:void 0},color:{default:'primary'},asButton:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledTooltip:{default:void 0}},emits:['click'],setup(e,{emit:t}){const n=e,l=t,o=V(()=>n.disabled?!!n.disabledTooltip:!!n.tooltip),a=V(()=>n.disabled?n.disabledTooltip??'':n.tooltip??'');function i(s){n.disabled||l('click',s);}

return(s,r)=>(Ve(),$e(Js,{text:a.value,location:'top',disabled:!o.value},{activator:H(({props:u})=>[T('span',ae(u,{class:['d-inline-flex',{'opacity-50':e.disabled&&!e.asButton}]}),[e.asButton?(Ve(),$e(Xe,{key:0,icon:e.icon,color:e.color,variant:'text',disabled:e.disabled,onClick:r[0]||(r[0]=c=>s.$emit('click',c))},null,8,['icon','color','disabled'])):(Ve(),$e(ze,{key:1,icon:e.icon,color:e.color,class:ce({'cursor-pointer':!e.disabled}),onClick:i},null,8,['icon','color','class']))],16)]),_:1},8,['text','disabled']));}}),Pw=j({...Ce(),...Le()},'VCardActions'),Ga=re()({name:'VCardActions',props:Pw(),setup(e,t){let{slots:n}=t;

return Ln({VBtn:{slim:!0,variant:'text'}}),me(()=>h(e.tag,{class:ce(['v-card-actions',e.class]),style:he(e.style)},n)),{};}}),Iw=j({opacity:[Number,String],...Ce(),...Le()},'VCardSubtitle'),Fw=re()({name:'VCardSubtitle',props:Iw(),setup(e,t){let{slots:n}=t;

return me(()=>h(e.tag,{class:ce(['v-card-subtitle',e.class]),style:he([{'--v-card-subtitle-opacity':e.opacity},e.style])},n)),{};}}),Do=$a('v-card-title'),Ow=j({appendAvatar:String,appendIcon:Te,prependAvatar:String,prependIcon:Te,subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...Ce(),...Dt(),...Le()},'VCardItem'),Iv=re()({name:'VCardItem',props:Ow(),setup(e,t){let{slots:n}=t;

return me(()=>{const l=!!(e.prependAvatar||e.prependIcon),o=!!(l||n.prepend),a=!!(e.appendAvatar||e.appendIcon),i=!!(a||n.append),s=!!(e.title!=null||n.title),r=!!(e.subtitle!=null||n.subtitle);

return h(e.tag,{class:ce(['v-card-item',e.class]),style:he(e.style)},{default:()=>[o&&T('div',{key:'prepend',class:'v-card-item__prepend'},[n.prepend?h(Ue,{key:'prepend-defaults',disabled:!l,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},n.prepend):T(ke,null,[e.prependAvatar&&h(rl,{key:'prepend-avatar',density:e.density,image:e.prependAvatar},null),e.prependIcon&&h(ze,{key:'prepend-icon',density:e.density,icon:e.prependIcon},null)])]),T('div',{class:'v-card-item__content'},[s&&h(Do,{key:'title'},{default:()=>[n.title?.()??Ge(e.title)]}),r&&h(Fw,{key:'subtitle'},{default:()=>[n.subtitle?.()??Ge(e.subtitle)]}),n.default?.()]),i&&T('div',{key:'append',class:'v-card-item__append'},[n.append?h(Ue,{key:'append-defaults',disabled:!a,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},n.append):T(ke,null,[e.appendIcon&&h(ze,{key:'append-icon',density:e.density,icon:e.appendIcon},null),e.appendAvatar&&h(rl,{key:'append-avatar',density:e.density,image:e.appendAvatar},null)])])]});}),{};}}),Mw=j({opacity:[Number,String],...Ce(),...Le()},'VCardText'),$o=re()({name:'VCardText',props:Mw(),setup(e,t){let{slots:n}=t;

return me(()=>h(e.tag,{class:ce(['v-card-text',e.class]),style:he([{'--v-card-text-opacity':e.opacity},e.style])},n)),{};}}),Dw=j({appendAvatar:String,appendIcon:Te,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:Te,ripple:{type:[Boolean,Object],default:!0},subtitle:{type:[String,Number,Boolean],default:void 0},text:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...Rn(),...Ce(),...Dt(),...cn(),...zn(),...Ls(),...za(),...Ns(),...$t(),...ja(),...Le(),...qe(),...En({variant:'elevated'})},'VCard'),Ya=re()({name:'VCard',directives:{vRipple:rn},props:Dw(),setup(e,t){let{attrs:n,slots:l}=t;const{themeClasses:o}=ot(e),{borderClasses:a}=Nn(e),{colorClasses:i,colorStyles:s,variantClasses:r}=Ll(e),{densityClasses:u}=Xt(e),{dimensionStyles:c}=dn(e),{elevationClasses:d}=Hn(e),{loaderClasses:f}=Rs(e),{locationStyles:m}=Ha(e),{positionClasses:v}=zs(e),{roundedClasses:g}=Bt(e),p=Wa(e,n),b=le(void 0);

return ie(()=>e.loading,(S,w)=>{b.value=!S&&typeof w=='string'?w:typeof S=='boolean'?void 0:S;},{immediate:!0}),me(()=>{const S=e.link!==!1&&p.isLink.value,w=!e.disabled&&e.link!==!1&&(e.link||p.isClickable.value),y=S?'a':e.tag,_=!!(l.title||e.title!=null),k=!!(l.subtitle||e.subtitle!=null),I=_||k,x=!!(l.append||e.appendAvatar||e.appendIcon),E=!!(l.prepend||e.prependAvatar||e.prependIcon),M=!!(l.image||e.image),z=I||E||x,P=!!(l.text||e.text!=null);

return st(h(y,ae(p.linkProps,{class:['v-card',{'v-card--disabled':e.disabled,'v-card--flat':e.flat,'v-card--hover':e.hover&&!(e.disabled||e.flat),'v-card--link':w},o.value,a.value,i.value,u.value,d.value,f.value,v.value,g.value,r.value,e.class],style:[s.value,c.value,m.value,e.style],onClick:w&&p.navigate,tabindex:e.disabled?-1:void 0}),{default:()=>[M&&T('div',{key:'image',class:'v-card__image'},[l.image?h(Ue,{key:'image-defaults',disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},l.image):h(Ws,{key:'image-img',cover:!0,src:e.image},null)]),h(wf,{name:'v-card',active:!!e.loading,color:b.value},{default:l.loader}),z&&h(Iv,{key:'item',prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:l.item,prepend:l.prepend,title:l.title,subtitle:l.subtitle,append:l.append}),P&&h($o,{key:'text'},{default:()=>[l.text?.()??e.text]}),l.default?.(),l.actions&&h(Ga,null,{default:l.actions}),Bl(w,'v-card')]}),[[rn,w&&e.ripple]]);}),{};}}),$w=j({fullscreen:Boolean,scrollable:Boolean,...xt(Ka({captureFocus:!0,origin:'center center',scrollStrategy:'block',transition:{component:Hs},zIndex:2400,retainFocus:!0}),['disableInitialFocus'])},'VDialog'),Fv=re()({name:'VDialog',props:$w(),emits:{'update:modelValue':e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{emit:n,slots:l}=t;const o=je(e,'modelValue'),{scopeId:a}=Mo(),i=L();function s(){n('afterEnter'),(e.scrim||e.retainFocus)&&i.value?.contentEl&&!i.value.contentEl.contains(document.activeElement)&&i.value.contentEl.focus({preventScroll:!0});}function r(){n('afterLeave');}

return ie(o,async u=>{u||(await Be(),i.value.activatorEl?.focus({preventScroll:!0}));}),me(()=>{const u=Ol.filterProps(e),c=ae({'aria-haspopup':'dialog'},e.activatorProps),d=ae({tabindex:-1},e.contentProps);

return h(Ol,ae({ref:i,class:['v-dialog',{'v-dialog--fullscreen':e.fullscreen,'v-dialog--scrollable':e.scrollable},e.class],style:e.style},u,{modelValue:o.value,'onUpdate:modelValue':f=>o.value=f,'aria-modal':'true',activatorProps:c,contentProps:d,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:'dialog',onAfterEnter:s,onAfterLeave:r},a),{activator:l.activator,default:function(){for(var f=arguments.length,m=new Array(f),v=0;v<f;v++)m[v]=arguments[v];

return h(Ue,{root:'VDialog'},{default:()=>[l.default?.(...m)]});}});}),Rl({},i);}}),Ov=La.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}),Mv=La.reduce((e,t)=>{const n='offset'+An(t);

return e[n]={type:[String,Number],default:null},e;},{}),Dv=La.reduce((e,t)=>{const n='order'+An(t);

return e[n]={type:[String,Number],default:null},e;},{}),Qu={col:Object.keys(Ov),offset:Object.keys(Mv),order:Object.keys(Dv)};function Bw(e,t,n){let l=e;

if(!(n==null||n===!1)){if(t){const o=t.replace(e,'');l+=`-${o}`;}

return e==='col'&&(l='v-'+l),e==='col'&&(n===''||n===!0)||(l+=`-${n}`),l.toLowerCase();}}const Lw=['auto','start','end','center','baseline','stretch'],Rw=j({cols:{type:[Boolean,String,Number],default:!1},...Ov,offset:{type:[String,Number],default:null},...Mv,order:{type:[String,Number],default:null},...Dv,alignSelf:{type:String,default:null,validator:e=>Lw.includes(e)},...Ce(),...Le()},'VCol'),On=re()({name:'VCol',props:Rw(),setup(e,t){let{slots:n}=t;const l=V(()=>{const o=[];let a;

for(a in Qu)Qu[a].forEach(s=>{const r=e[s],u=Bw(a,s,r);u&&o.push(u);});

const i=o.some(s=>s.startsWith('v-col-'));

return o.push({'v-col':!i||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),o;});

return()=>Tn(e.tag,{class:[l.value,e.class],style:e.style},n.default?.());}}),Qs=['start','end','center'],$v=['space-between','space-around','space-evenly'];function er(e,t){return La.reduce((n,l)=>{const o=e+An(l);

return n[o]=t(),n;},{});}const Nw=[...Qs,'baseline','stretch'],Bv=e=>Nw.includes(e),Lv=er('align',()=>({type:String,default:null,validator:Bv})),zw=[...Qs,...$v],Rv=e=>zw.includes(e),Nv=er('justify',()=>({type:String,default:null,validator:Rv})),Hw=[...Qs,...$v,'stretch'],zv=e=>Hw.includes(e),Hv=er('alignContent',()=>({type:String,default:null,validator:zv})),ec={align:Object.keys(Lv),justify:Object.keys(Nv),alignContent:Object.keys(Hv)},Ww={align:'align',justify:'justify',alignContent:'align-content'};function jw(e,t,n){let l=Ww[e];

if(n!=null){if(t){const o=t.replace(e,'');l+=`-${o}`;}

return l+=`-${n}`,l.toLowerCase();}}const Uw=j({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:Bv},...Lv,justify:{type:String,default:null,validator:Rv},...Nv,alignContent:{type:String,default:null,validator:zv},...Hv,...Ce(),...Le()},'VRow'),Wv=re()({name:'VRow',props:Uw(),setup(e,t){let{slots:n}=t;const l=V(()=>{const o=[];let a;

for(a in ec)ec[a].forEach(i=>{const s=e[i],r=jw(a,i,s);r&&o.push(r);});

return o.push({'v-row--no-gutters':e.noGutters,'v-row--dense':e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),o;});

return()=>Tn(e.tag,{class:['v-row',l.value,e.class],style:e.style},n.default?.());}}),jv=$a('v-spacer','div','VSpacer'),Kw=Je({__name:'FzModalBase',props:{modelValue:{type:Boolean},title:{default:void 0},message:{default:''},maxWidth:{default:500},persistent:{type:Boolean,default:!0},actions:{default:()=>[]},contentClass:{default:void 0},fullscreen:{type:Boolean,default:!1},titleIcon:{default:void 0}},emits:['update:modelValue'],setup(e,{emit:t}){const n=e,l=t,o=Ra(),a=V({get:()=>n.modelValue,set:v=>l('update:modelValue',v)}),i=V(()=>`v-theme--${o.global.name.value}`),s=V(()=>n.contentClass?`${i.value} ${n.contentClass}`:i.value);function r(){return n.actions.find(v=>v.color==='secondary'||v.color==='error');}function u(){return n.actions.find(v=>v.color==='primary'||!v.color&&n.actions.indexOf(v)===n.actions.length-1);}function c(v){return v.tagName==='TEXTAREA';}function d(v){return!v||v==='primary'?'elevated':v==='secondary'||v==='error'?'outlined':'text';}async function f(v){v.handler&&await v.handler();}function m(v){if(n.actions.length!==0){if(v.key==='Escape'){const g=r();

if(!g)return;

v.preventDefault(),v.stopPropagation(),f(g);

return;}

if(v.key==='Enter'&&!v.shiftKey&&!v.ctrlKey&&!v.altKey){const g=v.target;

if(c(g))return;

const p=u();

if(!p)return;

v.preventDefault(),v.stopPropagation(),f(p);}}}

return(v,g)=>(Ve(),$e(Fv,{modelValue:a.value,'onUpdate:modelValue':g[0]||(g[0]=p=>a.value=p),'max-width':e.maxWidth,persistent:e.persistent,'content-class':s.value,fullscreen:e.fullscreen,scrollable:'','z-index':2400,onKeydown:m},{default:H(()=>[h(Ya,null,{default:H(()=>[e.title?(Ve(),$e(Do,{key:0,class:'text-h5 d-flex align-center px-6 pt-6 modal-title'},{default:H(()=>[e.titleIcon?(Ve(),$e(ze,{key:0,class:'mr-2'},{default:H(()=>[we(Ge(e.titleIcon),1)]),_:1})):Bn('',!0),T('span',null,Ge(e.title),1)]),_:1})):Bn('',!0),h($o,{class:'px-6 pt-4'},{default:H(()=>[Pt(v.$slots,'default',{},()=>[we(Ge(e.message),1)],!0)]),_:3}),h(Ga,null,{default:H(()=>[h(jv),(Ve(!0),ol(ke,null,lg(e.actions,(p,b)=>(Ve(),$e(Xe,{key:b,color:p.color||'primary','prepend-icon':p.icon,variant:p.variant||d(p.color),type:'button',class:'text-none',onClick:S=>f(p)},{default:H(()=>[we(Ge(p.text),1)]),_:2},1032,['color','prepend-icon','variant','onClick']))),128))]),_:1})]),_:3})]),_:3},8,['modelValue','max-width','persistent','content-class','fullscreen']));}}),Nl=(e,t)=>{const n=e.__vccOpts||e;

for(const[l,o]of t)n[l]=o;

return n;},Gw=Nl(Kw,[['__scopeId','data-v-2cebfe9d']]),Yw={class:'text-h6 font-weight-medium'},qw=Je({__name:'FzCustomConfirmDialog',setup(e,{expose:t}){const n=L(!1),l=L(''),o=L(''),a=L(!0),i=L(''),s=L(''),r=L('primary'),u=L('secondary');let c=null;const d=(g,p,b)=>(l.value=g,o.value=p,a.value=b?.persistent??!0,i.value=b?.confirmText??'Sim',s.value=b?.cancelText??'Não',r.value=b?.confirmColor??'primary',u.value=b?.cancelColor??'secondary',n.value=!0,new Promise(S=>{c=S;}));Yt(()=>{ji().setConfirmRef({confirmDialog:d});}),Fa(()=>{ji().setConfirmRef({confirmDialog:()=>Promise.resolve(!1)});});const f=()=>{c&&c(!0),n.value=!1;},m=()=>{c&&c(!1),n.value=!1;},v=()=>{a.value||m();};

return t({confirmDialog:d}),(g,p)=>(Ve(),$e(Nc,{to:'body'},[h(Ut,{name:'dialog-fade'},{default:H(()=>[n.value?(Ve(),ol('div',{key:0,class:'custom-dialog-overlay d-flex align-center justify-center pa-4',onClick:ph(v,['self'])},[h(Ya,{class:'flex-grow-1','max-width':'500',elevation:12},{default:H(()=>[h(Do,{class:'d-flex align-center ga-3 px-6 pb-4 pt-6'},{default:H(()=>[h(ze,{color:'warning',size:'28'},{default:H(()=>[...p[0]||(p[0]=[we('mdi-help-circle',-1)])]),_:1}),T('span',Yw,Ge(l.value),1)]),_:1}),o.value?(Ve(),$e($o,{key:0,class:'px-6 pb-4 text-body-2'},{default:H(()=>[we(Ge(o.value),1)]),_:1})):Bn('',!0),h(Ga,{class:'d-flex justify-end ga-2 px-6 pb-6 pt-2'},{default:H(()=>[h(Xe,{color:u.value,variant:'outlined',class:'text-none',onClick:m},{default:H(()=>[we(Ge(s.value),1)]),_:1},8,['color']),h(Xe,{color:r.value,variant:'elevated',class:'text-none',onClick:f},{default:H(()=>[we(Ge(i.value),1)]),_:1},8,['color'])]),_:1})]),_:1})])):Bn('',!0)]),_:1})]));}}),Uv=Nl(qw,[['__scopeId','data-v-3dc6e15b']]),Xw=Je({__name:'FzConfirmDialog',setup(e,{expose:t}){const n=L(null);

return t({confirmDialog:(o,a,i)=>n.value?n.value.confirmDialog(o,a,i):Promise.resolve(!1)}),(o,a)=>(Ve(),$e(Uv,{ref_key:'customDialogRef',ref:n},null,512));}}),Zw=350,Jw='#1E1E1E',Qw=Je({__name:'FzFloatingNotify',setup(e){const t=Ra(),n=yl(),l=L(null),o=L(100),a=V(()=>t.global.name.value==='dark'),i={success:'#4CAF50',error:'#F44336',warning:'#FF9800',info:'#2196F3'},s=V(()=>{try{const S=t.global.current.value.colors?.[n.type];

if(typeof S=='string'&&S.startsWith('#'))return S;}catch{}

return i[n.type]||i.info;}),r={success:'#E8F5E9',error:'#FFEBEE',warning:'#FFF3E0',info:'#E3F2FD'},u=V(()=>({backgroundColor:a.value?Jw:r[n.type]||r.info,borderInlineStart:`4px solid ${s.value}`})),c=V(()=>a.value?'rgba(255, 255, 255, 0.05)':r[n.type]||r.info),d=V(()=>s.value);function f(){if(!n.isVisible)return;

const b=Date.now()>=g&&(l.value?.matches(':hover')??!1);

if(b&&!p){p=!0,m+=Date.now()-v,n.pause(),requestAnimationFrame(f);

return;}

if(!b&&p&&(p=!1,v=Date.now(),n.resume()),p){requestAnimationFrame(f);

return;}

const S=Date.now()-v,w=m+S,y=oo-w;

if(y<=0){o.value=0;

return;}

o.value=y/oo*100,requestAnimationFrame(f);}let m=0,v=0,g=0,p=!1;

return ie(()=>n.isVisible,b=>{if(b){m=0,v=Date.now(),g=Date.now()+Zw,p=!1,o.value=100,requestAnimationFrame(f);

return;}

p=!1,o.value=100;}),Fa(()=>{n.cleanup();}),(b,S)=>(Ve(),$e(Ut,{name:'slide-fade'},{default:H(()=>[Me(n).isVisible?(Ve(),ol('div',{key:0,ref_key:'notificationRef',ref:l,class:'floating-notify elevation-6',style:he(u.value)},[h(Xs,{type:Me(n).type,title:Me(n).title,text:Me(n).message,variant:'text',closable:'',class:'floating-notify-alert','onClick:close':S[0]||(S[0]=w=>Me(n).hide())},null,8,['type','title','text']),T('div',{class:'progress-track',style:he({backgroundColor:c.value})},[T('div',{class:'progress-fill',style:he({width:o.value+'%',backgroundColor:d.value})},null,4)],4)],4)):Bn('',!0)]),_:1}));}}),eC=Nl(Qw,[['__scopeId','data-v-cddec1c9']]),tC={key:0,class:'loading-overlay d-flex align-center justify-center'},nC={key:0,class:'d-flex flex-column align-center'},lC={class:'text-white text-body-1 font-weight-medium mt-3'},oC=Je({__name:'FzLoadingOverlay',props:{isLoading:{type:Boolean,default:!1},message:{default:'Carregando...'},delay:{default:300}},setup(e){const t=e,n=L(!1);let l=null;

return ie(()=>t.isLoading,o=>{if(o){l=setTimeout(()=>{n.value=!0;},t.delay);

return;}

l&&(clearTimeout(l),l=null),n.value=!1;}),yt(()=>{l&&clearTimeout(l);}),(o,a)=>(Ve(),$e(Ut,{name:'fade'},{default:H(()=>[e.isLoading?(Ve(),ol('div',tC,[h(Ut,{name:'fade-delayed'},{default:H(()=>[n.value?(Ve(),ol('div',nC,[h(Bs,{indeterminate:'',color:'primary',size:30,width:5}),T('div',lC,Ge(e.message),1)])):Bn('',!0)]),_:1})])):Bn('',!0)]),_:1}));}}),aC=Nl(oC,[['__scopeId','data-v-a81a27b1']]),iC=['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];function Kv(e,t,n,l){const o=L('');function a(){const u=document.activeElement;Be(()=>{!u||u.value==null||u.setSelectionRange(u.value.length,u.value.length);});}function i(u){const c=l(u);t(c),Be(()=>{o.value=n(c);});}function s(){a();}function r(){a();}

return ie(()=>e.value,u=>{const c=u??0;o.value=n(c);},{immediate:!0}),{formattedValue:o,moveCursorToEnd:a,handleInput:i,handleFocus:s,handleClick:r};}function Gv(e,t,n,l){return o=>{const{allowNegative:a=!0}=l?.()??{};

if(!o.target)return;

if(iC.includes(o.key)||o.ctrlKey||o.metaKey){if(o.key==='Backspace'||o.key==='Delete'){o.preventDefault();const f=e.value.replace(/\D/g,'');

if(f.length===0)return;

const m=a&&e.value.startsWith('-'),v=f.slice(0,-1),g=n(v,m);t(g);}

return;}

if(!/[\d-]/.test(o.key)){o.preventDefault();

return;}

if(o.preventDefault(),o.key==='-'){if(!a)return;

const f=e.value.replace(/\D/g,''),m=!e.value.startsWith('-'),v=n(f,m);t(v);

return;}

const r=e.value.replace(/\D/g,''),u=a&&e.value.startsWith('-'),c=r+o.key,d=n(c,u);t(d);};}const sC=' ',rC=Je({__name:'FzMoneyField',props:{modelValue:{default:0},label:{default:''},rules:{default:()=>[]},disabled:{type:Boolean,default:!1},hint:{default:''},persistentHint:{type:Boolean,default:!1},currency:{default:'BRL'},locale:{default:'pt-BR'},variant:{default:'underlined'},max:{default:999e6},min:{default:void 0}},emits:['update:modelValue'],setup(e,{emit:t}){const n=e,l=t;function o(v){const g=Math.abs(v);try{const b=g.toLocaleString(n.locale,{style:'currency',currency:n.currency,minimumFractionDigits:2,maximumFractionDigits:2}).split(sC).join(' ');

return v<0?`-${b}`:b;}catch{const p=n.currency,b=g.toLocaleString(n.locale,{minimumFractionDigits:2,maximumFractionDigits:2});

return v<0?`-${p} ${b}`:`${p} ${b}`;}}function a(v){const g=v.includes('-'),p=v.replace(/\D/g,'');

if(!p)return 0;

const b=parseInt(p)/100;

return Number((g?-b:b).toFixed(2));}const{formattedValue:i,moveCursorToEnd:s,handleInput:r,handleFocus:u,handleClick:c}=Kv(O(n,'modelValue'),v=>l('update:modelValue',v),o,a);function d(v){n.max!==void 0&&v>n.max||n.min!==void 0&&v<n.min||(l('update:modelValue',v),i.value=o(v),s());}function f(v,g){const p=parseInt(v||'0')/100;

return g?-p:p;}const m=Gv(i,d,f);

return(v,g)=>(Ve(),$e(St,{'model-value':Me(i),label:e.label,rules:e.rules,disabled:e.disabled,hint:e.hint,'persistent-hint':e.persistentHint,variant:e.variant,inputmode:'decimal','onUpdate:modelValue':Me(r),onFocus:Me(u),onClick:Me(c),onKeydown:Me(m)},Ml({_:2},[v.$slots.prepend?{name:'prepend',fn:H(()=>[Pt(v.$slots,'prepend',{},void 0,!0)]),key:'0'}:void 0,v.$slots.append?{name:'append',fn:H(()=>[Pt(v.$slots,'append',{},void 0,!0)]),key:'1'}:void 0]),1032,['model-value','label','rules','disabled','hint','persistent-hint','variant','onUpdate:modelValue','onFocus','onClick','onKeydown']));}}),uC=Nl(rC,[['__scopeId','data-v-23cdbd5a']]),cC=Je({__name:'FzEmailField',props:{modelValue:{default:''},label:{default:'Email'},rules:{default:()=>[]},disabled:{type:Boolean,default:!1},hint:{default:''},required:{type:Boolean,default:!1},validateOnBlur:{type:Boolean,default:!0},requiredMessage:{default:''},invalidMessage:{default:''},variant:{default:'underlined'},maxlength:{default:100}},emits:['update:modelValue','isValid'],setup(e,{emit:t}){const n=e,l=t,o=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,a=L(!1),i=V(()=>!!n.hint),s=V(()=>a.value?'mdi-email-check':'mdi-email-outline'),r=V(()=>a.value?'success':void 0),u=V({get:()=>n.modelValue,set:v=>{n.validateOnBlur||f(v),l('update:modelValue',v);}}),c=V(()=>[d,...n.rules]);function d(v){return v?o.test(v)?!0:n.invalidMessage||'Formato de e-mail inválido':n.required?n.requiredMessage||'Email é obrigatório':!0;}function f(v){const g=d(v);a.value=g===!0,l('isValid',a.value);}function m(){n.validateOnBlur&&f(u.value);}

return(v,g)=>(Ve(),$e(St,{modelValue:u.value,'onUpdate:modelValue':g[0]||(g[0]=p=>u.value=p),label:e.label,rules:c.value,disabled:e.disabled,hint:e.hint,'persistent-hint':i.value,required:e.required,variant:e.variant,maxlength:e.maxlength,type:'email',inputmode:'email',autocomplete:'email',onBlur:m},Ml({_:2},[v.$slots.prepend?{name:'prepend',fn:H(()=>[Pt(v.$slots,'prepend')]),key:'0'}:void 0,v.$slots.append?{name:'append',fn:H(()=>[Pt(v.$slots,'append')]),key:'1'}:void 0,v.$slots.prepend?void 0:{name:'prepend-inner',fn:H(()=>[h(ze,{color:r.value},{default:H(()=>[we(Ge(s.value),1)]),_:1},8,['color'])]),key:'2'}]),1032,['modelValue','label','rules','disabled','hint','persistent-hint','required','variant','maxlength']));}}),dC=Je({__name:'FzNumberField',props:{modelValue:{default:0},label:{default:''},rules:{default:()=>[]},disabled:{type:Boolean,default:!1},hint:{default:''},persistentHint:{type:Boolean,default:!1},decimalPlaces:{default:0},locale:{default:'pt-BR'},allowNegative:{type:Boolean,default:!0},variant:{default:'underlined'},max:{default:999e6},min:{default:void 0}},emits:['update:modelValue'],setup(e,{emit:t}){const n=e,l=t;function o(v){const p=Math.abs(v).toLocaleString(n.locale,{minimumFractionDigits:n.decimalPlaces,maximumFractionDigits:n.decimalPlaces});

return v<0?'-'+p:p;}function a(v){const g=v.includes('-'),p=v.replace(/\D/g,'');

if(!p)return 0;

let b;

if(n.decimalPlaces===0)b=parseInt(p);else{const w=Math.pow(10,n.decimalPlaces);b=parseInt(p)/w;}

const S=Number(b.toFixed(n.decimalPlaces));

return g&&n.allowNegative?-S:S;}const{formattedValue:i,moveCursorToEnd:s,handleInput:r,handleFocus:u,handleClick:c}=Kv(O(n,'modelValue'),v=>l('update:modelValue',v),o,a);function d(v){n.max!==void 0&&v>n.max||n.min!==void 0&&v<n.min||(l('update:modelValue',v),i.value=o(v),s());}function f(v,g){if(!v)return 0;

let p;

if(n.decimalPlaces===0)p=parseInt(v);else{const S=Math.pow(10,n.decimalPlaces);p=parseInt(v)/S;}

const b=Number(p.toFixed(n.decimalPlaces));

return g?-b:b;}const m=Gv(i,d,f,()=>({allowNegative:n.allowNegative}));

return(v,g)=>(Ve(),$e(St,{'model-value':Me(i),label:e.label,rules:e.rules,disabled:e.disabled,hint:e.hint,'persistent-hint':e.persistentHint,variant:e.variant,inputmode:'decimal','onUpdate:modelValue':Me(r),onFocus:Me(u),onClick:Me(c),onKeydown:Me(m)},Ml({_:2},[v.$slots.prepend?{name:'prepend',fn:H(()=>[Pt(v.$slots,'prepend',{},void 0,!0)]),key:'0'}:void 0,v.$slots.append?{name:'append',fn:H(()=>[Pt(v.$slots,'append',{},void 0,!0)]),key:'1'}:void 0]),1032,['model-value','label','rules','disabled','hint','persistent-hint','variant','onUpdate:modelValue','onFocus','onClick','onKeydown']));}}),fC=Nl(dC,[['__scopeId','data-v-5b338064']]);var vC=Object.defineProperty,mC=(e,t,n)=>t in e?vC(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ao=(e,t,n)=>mC(e,typeof t!='symbol'?t+'':t,n);const tc={'#':{pattern:/[0-9]/},'@':{pattern:/[a-zA-Z]/},'*':{pattern:/[a-zA-Z0-9]/}},nc=(e,t,n)=>e.replaceAll(t,'').replace(n,'.').replace('..','.').replace(/[^.\d]/g,''),lc=(e,t,n)=>{var l;

return new Intl.NumberFormat(((l=n.number)==null?void 0:l.locale)??'en',{minimumFractionDigits:e,maximumFractionDigits:t,roundingMode:'trunc'});},gC=(e,t=!0,n)=>{var l,o,a,i;const s=((l=n.number)==null?void 0:l.unsigned)!==!0&&e.startsWith('-')?'-':'',r=((o=n.number)==null?void 0:o.fraction)??0;let u=lc(0,r,n);const c=u.formatToParts(1000.12),d=((a=c.find(p=>p.type==='group'))==null?void 0:a.value)??' ',f=((i=c.find(p=>p.type==='decimal'))==null?void 0:i.value)??'.',m=nc(e,d,f);

if(Number.isNaN(parseFloat(m)))return s;

const v=m.split('.');

if(v[1]!=null&&v[1].length>=1){const p=v[1].length<=r?v[1].length:r;u=lc(p,r,n);}

let g=u.format(parseFloat(m));

return t?r>0&&m.endsWith('.')&&!m.slice(0,-1).includes('.')&&(g+=f):g=nc(g,d,f),s+g;},Yv=e=>JSON.parse(e.replaceAll("'",'"')),hC=(e,t={})=>{const n={...t};e.dataset.maska!=null&&e.dataset.maska!==''&&(n.mask=yC(e.dataset.maska)),e.dataset.maskaEager!=null&&(n.eager=Ko(e.dataset.maskaEager)),e.dataset.maskaReversed!=null&&(n.reversed=Ko(e.dataset.maskaReversed)),e.dataset.maskaTokensReplace!=null&&(n.tokensReplace=Ko(e.dataset.maskaTokensReplace)),e.dataset.maskaTokens!=null&&(n.tokens=pC(e.dataset.maskaTokens));const l={};

return e.dataset.maskaNumberLocale!=null&&(l.locale=e.dataset.maskaNumberLocale),e.dataset.maskaNumberFraction!=null&&(l.fraction=parseInt(e.dataset.maskaNumberFraction)),e.dataset.maskaNumberUnsigned!=null&&(l.unsigned=Ko(e.dataset.maskaNumberUnsigned)),(e.dataset.maskaNumber!=null||Object.values(l).length>0)&&(n.number=l),n;},Ko=e=>e!==''?!!JSON.parse(e):!0,yC=e=>e.startsWith('[')&&e.endsWith(']')?Yv(e):e,pC=e=>{if(e.startsWith('{')&&e.endsWith('}'))return Yv(e);

const t={};

return e.split('|').forEach(n=>{const l=n.split(':');t[l[0]]={pattern:qv()?new RegExp(l[1],'u'):new RegExp(l[1]),optional:l[2]==='optional',multiple:l[2]==='multiple',repeated:l[2]==='repeated'};}),t;},qv=()=>{try{return new RegExp('\\p{L}','u'),!0;}catch{return!1;}};class tr{constructor(t={}){ao(this,'opts',{}),ao(this,'memo',new Map);const n={...t};

if(n.tokens!=null){n.tokens=n.tokensReplace?{...n.tokens}:{...tc,...n.tokens};

for(const l of Object.values(n.tokens))typeof l.pattern=='string'&&(l.pattern=qv()?new RegExp(l.pattern,'u'):new RegExp(l.pattern));}else n.tokens=tc;

Array.isArray(n.mask)&&(n.mask.length>1?n.mask=[...n.mask].sort((l,o)=>l.length-o.length):n.mask=n.mask[0]??''),n.mask===''&&(n.mask=null),this.opts=n;}masked(t){return this.process(String(t),this.findMask(String(t)));}unmasked(t){return this.process(String(t),this.findMask(String(t)),!1);}isEager(){return this.opts.eager===!0;}isReversed(){return this.opts.reversed===!0;}completed(t){const n=this.findMask(String(t));

if(this.opts.mask==null||n==null)return!1;

const l=this.process(String(t),n).length;

return typeof this.opts.mask=='string'?l>=this.opts.mask.length:l>=n.length;}findMask(t){const n=this.opts.mask;

if(n==null)return null;

if(typeof n=='string')return n;

if(typeof n=='function')return n(t);

const l=this.process(t,n.slice(-1).pop()??'',!1);

return n.find(o=>this.process(t,o,!1).length>=l.length)??'';}escapeMask(t){const n=[],l=[];

return t.split('').forEach((o,a)=>{o==='!'&&t[a-1]!=='!'?l.push(a-l.length):n.push(o);}),{mask:n.join(''),escaped:l};}process(t,n,l=!0){if(this.opts.number!=null)return gC(t,l,this.opts);

if(n==null)return t;

const o=`v=${t},mr=${n},m=${l?1:0}`;

if(this.memo.has(o))return this.memo.get(o);

const{mask:a,escaped:i}=this.escapeMask(n),s=[],r=this.opts.tokens!=null?this.opts.tokens:{},u=this.isReversed()?-1:1,c=this.isReversed()?'unshift':'push',d=this.isReversed()?0:a.length-1,f=this.isReversed()?()=>p>-1&&b>-1:()=>p<a.length&&b<t.length,m=w=>!this.isReversed()&&w<=d||this.isReversed()&&w>=d;let v,g=-1,p=this.isReversed()?a.length-1:0,b=this.isReversed()?t.length-1:0,S=!1;

for(;f();){const w=a.charAt(p),y=r[w],_=y?.transform!=null?y.transform(t.charAt(b)):t.charAt(b);

if(!i.includes(p)&&y!=null?(_.match(y.pattern)!=null?(s[c](_),y.repeated?(g===-1?g=p:p===d&&p!==g&&(p=g-u),d===g&&(p-=u)):y.multiple&&(S=!0,p-=u),p+=u):y.multiple?S&&(p+=u,b-=u,S=!1):_===v?v=void 0:y.optional&&(p+=u,b-=u),b+=u):(l&&!this.isEager()&&s[c](w),_===w&&!this.isEager()?b+=u:v=w,this.isEager()||(p+=u)),this.isEager()){for(;m(p)&&(r[a.charAt(p)]==null||i.includes(p));){if(l){if(s[c](a.charAt(p)),t.charAt(b)===a.charAt(p)){p+=u,b+=u;continue;}}else a.charAt(p)===t.charAt(b)&&(b+=u);

p+=u;}}}

return this.memo.set(o,s.join('')),this.memo.get(o);}}class bC{constructor(t,n={}){ao(this,'items',new Map),ao(this,'eventAbortController'),ao(this,'onInput',l=>{if(l instanceof CustomEvent&&l.type==='input'&&!l.isTrusted&&!l.bubbles)return;

const o=l.target,a=this.items.get(o);

if(a===void 0)return;

const i='inputType'in l&&l.inputType.startsWith('delete'),s=a.isEager(),r=i&&s&&a.unmasked(o.value)===''?'':o.value;this.fixCursor(o,i,()=>this.setValue(o,r));}),this.options=n,this.eventAbortController=new AbortController,this.init(this.getInputs(t));}update(t={}){this.options={...t},this.init(Array.from(this.items.keys()));}updateValue(t){var n;t.value!==''&&t.value!==((n=this.processInput(t))==null?void 0:n.masked)&&this.setValue(t,t.value);}destroy(){this.eventAbortController.abort(),this.items.clear();}init(t){const n=this.getOptions(this.options);

for(const l of t){if(!this.items.has(l)){const{signal:a}=this.eventAbortController;l.addEventListener('input',this.onInput,{capture:!0,signal:a});}

const o=new tr(hC(l,n));this.items.set(l,o),queueMicrotask(()=>this.updateValue(l)),l.selectionStart===null&&o.isEager()&&console.warn('Maska: input of `%s` type is not supported',l.type);}}getInputs(t){return typeof t=='string'?Array.from(document.querySelectorAll(t)):'length'in t?Array.from(t):[t];}getOptions(t){const{onMaska:n,preProcess:l,postProcess:o,...a}=t;

return a;}fixCursor(t,n,l){var o,a;const i=t.selectionStart,s=t.value;

if(l(),i===null||i===s.length&&!n)return;

const r=t.value,u=s.slice(0,i),c=r.slice(0,i),d=(o=this.processInput(t,u))==null?void 0:o.unmasked,f=(a=this.processInput(t,c))==null?void 0:a.unmasked;

if(d===void 0||f===void 0)return;

let m=i;u!==c&&(m+=n?r.length-s.length:d.length-f.length),t.setSelectionRange(m,m);}setValue(t,n){const l=this.processInput(t,n);l!==void 0&&(t.value=l.masked,this.options.onMaska!=null&&(Array.isArray(this.options.onMaska)?this.options.onMaska.forEach(o=>o(l)):this.options.onMaska(l)),t.dispatchEvent(new CustomEvent('maska',{detail:l})),t.dispatchEvent(new CustomEvent('input',{detail:l.masked})));}processInput(t,n){const l=this.items.get(t);

if(l===void 0)return;

let o=n??t.value;this.options.preProcess!=null&&(o=this.options.preProcess(o));let a=l.masked(o);

return this.options.postProcess!=null&&(a=this.options.postProcess(a)),{masked:a,unmasked:l.unmasked(o),completed:l.completed(o)};}}const Ci=new WeakMap,SC=(e,t)=>{if(e.arg==null||e.instance==null)return;

const n='setup'in e.instance.$.type;e.arg in e.instance?e.instance[e.arg]=t:n&&console.warn('Maska: please expose `%s` using defineExpose',e.arg);},Xv=(e,t)=>{var n;const l=e instanceof HTMLInputElement?e:e.querySelector('input');

if(l==null||l?.type==='file')return;

let o={};

if(t.value!=null&&(o=typeof t.value=='string'?{mask:t.value}:{...t.value}),t.arg!=null){const a=i=>{const s=t.modifiers.unmasked?i.unmasked:t.modifiers.completed?i.completed:i.masked;SC(t,s);};o.onMaska=o.onMaska==null?a:Array.isArray(o.onMaska)?[...o.onMaska,a]:[o.onMaska,a];}

Ci.has(l)?(n=Ci.get(l))==null||n.update(o):Ci.set(l,new bC(l,o));},wC=Je({__name:'FzPhoneField',props:{modelValue:{default:''},label:{default:'Telefone'},rules:{default:()=>[]},disabled:{type:Boolean},hint:{default:''},icon:{default:'mdi-phone-outline'},variant:{default:'underlined'}},emits:['update:modelValue'],setup(e,{emit:t}){const n=e,l=t,o=new tr({mask:['(##) ####-####','(##) #####-####'],eager:!0}),a=V(()=>o.masked(n.modelValue??'')),i=V(()=>!!n.hint),s={mask:['(##) ####-####','(##) #####-####'],eager:!0,onMaska:r=>{l('update:modelValue',r.unmasked);}};

return(r,u)=>st((Ve(),$e(St,{'model-value':a.value,label:e.label,rules:e.rules,disabled:e.disabled,hint:e.hint,'persistent-hint':i.value,variant:e.variant,inputmode:'tel',autocomplete:'tel'},Ml({'prepend-inner':H(()=>[h(ze,null,{default:H(()=>[we(Ge(e.icon),1)]),_:1})]),_:2},[r.$slots.prepend?{name:'prepend',fn:H(()=>[Pt(r.$slots,'prepend')]),key:'0'}:void 0,r.$slots.append?{name:'append',fn:H(()=>[Pt(r.$slots,'append')]),key:'1'}:void 0]),1032,['model-value','label','rules','disabled','hint','persistent-hint','variant'])),[[Me(Xv),s]]);}}),Zv=Je({__name:'FzZipCodeField',props:{modelValue:{default:''},label:{default:'CEP'},rules:{default:()=>[]},disabled:{type:Boolean,default:!1},hint:{default:''},variant:{default:'underlined'}},emits:['update:modelValue','zip-code-found','zip-code-not-found'],setup(e,{emit:t}){const n=e,l=t,o=L(!1);let a=null;const i=new tr({mask:'#####-###',eager:!0}),s=V(()=>i.masked(n.modelValue??'')),r=V(()=>!!n.hint);function u(f){return{zipCode:f.cep??'',street:f.logradouro??'',complement:f.complemento??'',neighborhood:f.bairro??'',city:f.localidade??'',state:f.uf??'',error:f.erro};}async function c(f){a?.abort(),a=new AbortController,o.value=!0;try{const v=await(await fetch(`https://viacep.com.br/ws/${f}/json/`,{signal:a.signal})).json(),g=u(v);

if(g.error){l('zip-code-not-found');

return;}

l('zip-code-found',g);}catch{l('zip-code-not-found');}finally{o.value=!1;}}const d={mask:'#####-###',eager:!0,onMaska:f=>{l('update:modelValue',f.unmasked),f.completed&&c(f.unmasked);}};

return yt(()=>{a?.abort();}),(f,m)=>st((Ve(),$e(St,{'model-value':s.value,label:e.label,rules:e.rules,disabled:e.disabled,hint:e.hint,'persistent-hint':r.value,variant:e.variant,loading:o.value,inputmode:'numeric'},Ml({'prepend-inner':H(()=>[h(ze,null,{default:H(()=>[...m[0]||(m[0]=[we('mdi-map-marker-outline',-1)])]),_:1})]),_:2},[f.$slots.prepend?{name:'prepend',fn:H(()=>[Pt(f.$slots,'prepend')]),key:'0'}:void 0,f.$slots.append?{name:'append',fn:H(()=>[Pt(f.$slots,'append')]),key:'1'}:void 0]),1032,['model-value','label','rules','disabled','hint','persistent-hint','variant','loading'])),[[Me(Xv),d]]);}}),CC=Je({__name:'FzFullAddress',props:{modelValue:{default:()=>({})},disabled:{type:Boolean,default:!1},disabledFields:{type:Boolean,default:!1},labels:{default:()=>({})},variant:{default:'underlined'}},emits:['update:modelValue'],setup(e,{emit:t}){const n=e,l=t;let o=!1;const a=[{uf:'AC',name:'AC - Acre'},{uf:'AL',name:'AL - Alagoas'},{uf:'AP',name:'AP - Amapá'},{uf:'AM',name:'AM - Amazonas'},{uf:'BA',name:'BA - Bahia'},{uf:'CE',name:'CE - Ceará'},{uf:'DF',name:'DF - Distrito Federal'},{uf:'ES',name:'ES - Espírito Santo'},{uf:'GO',name:'GO - Goiás'},{uf:'MA',name:'MA - Maranhão'},{uf:'MT',name:'MT - Mato Grosso'},{uf:'MS',name:'MS - Mato Grosso do Sul'},{uf:'MG',name:'MG - Minas Gerais'},{uf:'PA',name:'PA - Pará'},{uf:'PB',name:'PB - Paraíba'},{uf:'PR',name:'PR - Paraná'},{uf:'PE',name:'PE - Pernambuco'},{uf:'PI',name:'PI - Piauí'},{uf:'RJ',name:'RJ - Rio de Janeiro'},{uf:'RN',name:'RN - Rio Grande do Norte'},{uf:'RS',name:'RS - Rio Grande do Sul'},{uf:'RO',name:'RO - Rondônia'},{uf:'RR',name:'RR - Roraima'},{uf:'SC',name:'SC - Santa Catarina'},{uf:'SP',name:'SP - São Paulo'},{uf:'SE',name:'SE - Sergipe'},{uf:'TO',name:'TO - Tocantins'}],i=et({zipCode:'',street:'',number:'',complement:'',neighborhood:'',city:'',state:'',...n.modelValue}),s=L(!1),r=V(()=>({zipCode:n.labels.zipCode??'CEP',street:n.labels.street??'Logradouro',number:n.labels.number??'Número',complement:n.labels.complement??'Complemento',neighborhood:n.labels.neighborhood??'Bairro',city:n.labels.city??'Cidade',state:n.labels.state??'Estado'})),u=V(()=>n.disabled||n.disabledFields&&s.value);function c(f){i.street=f.street,i.neighborhood=f.neighborhood,i.city=f.city,i.state=f.state,s.value=!0;}function d(){s.value=!1;}

return ie(()=>n.modelValue,f=>{f&&(o=!0,Object.assign(i,f),Be(()=>{o=!1;}));},{deep:!0,immediate:!0}),ie(i,f=>{o||l('update:modelValue',{...f});},{deep:!0}),(f,m)=>(Ve(),$e(Wv,null,{default:H(()=>[h(On,{cols:'12',md:'4'},{default:H(()=>[h(Zv,{modelValue:i.zipCode,'onUpdate:modelValue':m[0]||(m[0]=v=>i.zipCode=v),disabled:e.disabled,onZipCodeFound:c,onZipCodeNotFound:d},null,8,['modelValue','disabled'])]),_:1}),h(On,{cols:'12',md:'8'},{default:H(()=>[h(St,{modelValue:i.street,'onUpdate:modelValue':m[1]||(m[1]=v=>i.street=v),label:r.value.street,disabled:u.value,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1}),h(On,{cols:'12',md:'3'},{default:H(()=>[h(St,{modelValue:i.number,'onUpdate:modelValue':m[2]||(m[2]=v=>i.number=v),label:r.value.number,disabled:e.disabled,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1}),h(On,{cols:'12',md:'5'},{default:H(()=>[h(St,{modelValue:i.complement,'onUpdate:modelValue':m[3]||(m[3]=v=>i.complement=v),label:r.value.complement,disabled:e.disabled,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1}),h(On,{cols:'12',md:'4'},{default:H(()=>[h(St,{modelValue:i.neighborhood,'onUpdate:modelValue':m[4]||(m[4]=v=>i.neighborhood=v),label:r.value.neighborhood,disabled:u.value,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1}),h(On,{cols:'12',md:'6'},{default:H(()=>[h(St,{modelValue:i.city,'onUpdate:modelValue':m[5]||(m[5]=v=>i.city=v),label:r.value.city,disabled:u.value,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1}),h(On,{cols:'12',md:'6'},{default:H(()=>[h(qs,{modelValue:i.state,'onUpdate:modelValue':m[6]||(m[6]=v=>i.state=v),label:r.value.state,items:a,'item-title':'name','item-value':'uf',disabled:u.value,variant:e.variant},null,8,['modelValue','label','disabled','variant'])]),_:1})]),_:1}));}}),xC=Object.freeze(Object.defineProperty({__proto__:null,FzConfirmDialog:Xw,FzCustomConfirmDialog:Uv,FzEmailField:cC,FzFloatingNotify:eC,FzFullAddress:CC,FzIconToolTip:Ew,FzLoadingOverlay:aC,FzModalBase:Gw,FzMoneyField:uC,FzNumberField:fC,FzPhoneField:wC,FzZipCodeField:Zv},Symbol.toStringTag,{value:'Module'})),kC={install(e){e.config.globalProperties.$notify=Sl,e.config.globalProperties.$loading=Lp,e.config.globalProperties.$confirm=Ui;}},_C={VAlert:Xs,VBtn:Xe,VCard:Ya,VCardActions:Ga,VCardText:$o,VCardTitle:Do,VCol:On,VDialog:Fv,VIcon:ze,VMenu:hv,VProgressCircular:Bs,VRow:Wv,VSelect:qs,VSpacer:jv,VTextField:St,VTooltip:Js},AC=xC;function VC(e){Object.entries(AC).forEach(([t,n])=>{e.component(t,n);});}function TC(e){e.use(kC);}function EC(e){Np(e),VC(e),TC(e);}const PC={primary:'#1867C0',secondary:'#5CBBF6',accent:'#005CAF',error:'#FF5252',info:'#2196F3',success:'#4CAF50',warning:'#FB8C00',background:'#FFFFFF',surface:'#FFFFFF'},IC={primary:'#2196F3',secondary:'#424242',accent:'#82B1FF',error:'#FF5252',info:'#2196F3',success:'#4CAF50',warning:'#FFA726',background:'#121212',surface:'#212121'},FC=gf({components:{..._C},directives:Tw,theme:{defaultTheme:'light',themes:{light:{dark:!1,colors:PC},dark:{dark:!0,colors:IC}}},defaults:{VTextField:{variant:'underlined',density:'comfortable'},VTextarea:{variant:'underlined'},VSelect:{variant:'underlined'},VAutocomplete:{variant:'underlined'},VCombobox:{variant:'underlined'}}}),OC=Je({__name:'SectionCard',props:{title:{}},setup(e){return(t,n)=>(Ve(),$e(Ya,{class:'mb-6',flat:'',border:''},{default:H(()=>[h(Iv,null,Ml({default:H(()=>[h(Do,{class:'text-h6 font-weight-bold'},{default:H(()=>[we(Ge(e.title),1)]),_:1})]),_:2},[t.$slots.description?{name:'subtitle',fn:H(()=>[Pt(t.$slots,'description')]),key:'0'}:void 0]),1024),h($o,null,{default:H(()=>[Pt(t.$slots,'default')]),_:3})]),_:3}));}}),Bo=Sh(gw),MC=xh();Bo.use(MC);Bo.use(FC);EC(Bo);Bo.component('SectionCard',OC);Bo.mount('#app');
