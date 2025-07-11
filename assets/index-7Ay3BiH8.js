import{C as xe,V as g,M as A,T as R,Q as ee,S as te,a as m,R as _e,P as ye,b as be,c as H,O as Ce,B as we,F as ie,d as C,U as F,W as U,H as I,N as X,e as ue,f as w,A as Pe,g as Te,h as G,i as De,j as ce,k as Me,l as Ee,m as Se,n as Re,o as de,p as fe,D as Ae,q as ae,r as Ue,L as se,E as Oe}from"./three-DsEJN48d.js";import{g as Q}from"./gsap-CH_iu5NA.js";import{P as Le}from"./tweakpane-BXg6ZhiP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const oe={type:"change"},$={type:"start"},pe={type:"end"},V=new _e,ne=new ye,Be=Math.cos(70*be.DEG2RAD),v=new g,_=2*Math.PI,u={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},W=1e-6;class He extends xe{constructor(e,t=null){super(e,t),this.state=u.NONE,this.target=new g,this.cursor=new g,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:A.ROTATE,MIDDLE:A.DOLLY,RIGHT:A.PAN},this.touches={ONE:R.ROTATE,TWO:R.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new g,this._lastQuaternion=new ee,this._lastTargetPosition=new g,this._quat=new ee().setFromUnitVectors(e.up,new g(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new te,this._sphericalDelta=new te,this._scale=1,this._panOffset=new g,this._rotateStart=new m,this._rotateEnd=new m,this._rotateDelta=new m,this._panStart=new m,this._panEnd=new m,this._panDelta=new m,this._dollyStart=new m,this._dollyEnd=new m,this._dollyDelta=new m,this._dollyDirection=new g,this._mouse=new m,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ke.bind(this),this._onPointerDown=Fe.bind(this),this._onPointerUp=ze.bind(this),this._onContextMenu=qe.bind(this),this._onMouseWheel=Ve.bind(this),this._onKeyDown=Ie.bind(this),this._onTouchStart=Ze.bind(this),this._onTouchMove=Ye.bind(this),this._onMouseDown=Ne.bind(this),this._onMouseMove=je.bind(this),this._interceptControlDown=Ke.bind(this),this._interceptControlUp=We.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(oe),this.update(),this.state=u.NONE}update(e=null){const t=this.object.position;v.copy(t).sub(this.target),v.applyQuaternion(this._quat),this._spherical.setFromVector3(v),this.autoRotate&&this.state===u.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(a)&&isFinite(n)&&(a<-Math.PI?a+=_:a>Math.PI&&(a-=_),n<-Math.PI?n+=_:n>Math.PI&&(n-=_),a<=n?this._spherical.theta=Math.max(a,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+n)/2?Math.max(a,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=r!=this._spherical.radius}if(v.setFromSpherical(this._spherical),v.applyQuaternion(this._quatInverse),t.copy(this.target).add(v),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const c=v.length();r=this._clampDistance(c*this._scale);const f=c-r;this.object.position.addScaledVector(this._dollyDirection,f),this.object.updateMatrixWorld(),o=!!f}else if(this.object.isOrthographicCamera){const c=new g(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=f!==this.object.zoom;const S=new g(this._mouse.x,this._mouse.y,0);S.unproject(this.object),this.object.position.sub(S).add(c),this.object.updateMatrixWorld(),r=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(V.origin.copy(this.object.position),V.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(V.direction))<Be?this.object.lookAt(this.target):(ne.setFromNormalAndCoplanarPoint(this.object.up,this.target),V.intersectPlane(ne,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>W||8*(1-this._lastQuaternion.dot(this.object.quaternion))>W||this._lastTargetPosition.distanceToSquared(this.target)>W?(this.dispatchEvent(oe),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?_/60*this.autoRotateSpeed*e:_/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){v.setFromMatrixColumn(t,0),v.multiplyScalar(-e),this._panOffset.add(v)}_panUp(e,t){this.screenSpacePanning===!0?v.setFromMatrixColumn(t,1):(v.setFromMatrixColumn(t,0),v.crossVectors(this.object.up,v)),v.multiplyScalar(e),this._panOffset.add(v)}_pan(e,t){const a=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;v.copy(n).sub(this.target);let o=v.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/a.clientHeight,this.object.matrix),this._panUp(2*t*o/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),n=e-a.left,o=t-a.top,r=a.width,c=a.height;this._mouse.x=n/r*2-1,this._mouse.y=-(o/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(_*this._rotateDelta.x/t.clientHeight),this._rotateUp(_*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-_*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(a,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(a,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),a=e.pageX-t.x,n=e.pageY-t.y,o=Math.sqrt(a*a+n*n);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),n=.5*(e.pageX+a.x),o=.5*(e.pageY+a.y);this._rotateEnd.set(n,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(_*this._rotateDelta.x/t.clientHeight),this._rotateUp(_*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(a,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),a=e.pageX-t.x,n=e.pageY-t.y,o=Math.sqrt(a*a+n*n);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(r,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new m,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,a={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function Fe(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function ke(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function ze(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pe),this.state=u.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ne(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case A.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=u.DOLLY;break;case A.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=u.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=u.ROTATE}break;case A.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=u.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=u.PAN}break;default:this.state=u.NONE}this.state!==u.NONE&&this.dispatchEvent($)}function je(s){switch(this.state){case u.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case u.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case u.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Ve(s){this.enabled===!1||this.enableZoom===!1||this.state!==u.NONE||(s.preventDefault(),this.dispatchEvent($),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(pe))}function Ie(s){this.enabled!==!1&&this._handleKeyDown(s)}function Ze(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case R.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=u.TOUCH_ROTATE;break;case R.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=u.TOUCH_PAN;break;default:this.state=u.NONE}break;case 2:switch(this.touches.TWO){case R.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=u.TOUCH_DOLLY_PAN;break;case R.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=u.TOUCH_DOLLY_ROTATE;break;default:this.state=u.NONE}break;default:this.state=u.NONE}this.state!==u.NONE&&this.dispatchEvent($)}function Ye(s){switch(this._trackPointer(s),this.state){case u.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case u.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case u.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case u.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=u.NONE}}function qe(s){this.enabled!==!1&&s.preventDefault()}function Ke(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function We(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ge=`//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float getPerlinNoise2d(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
} 

varying float vElevation;
uniform float uTime;
varying vec2 vUv;

uniform float uElevation;
uniform float uElevationValleyFrequency;
uniform float uElevationValley;
uniform float uElevationGeneral;
uniform float uElevationGeneralFrequency;
uniform float uElevationDetails;
uniform float uElevationDetailsFrequency;


float getElevation(vec2 _position)
{
    float elevation = 0.0;

    // Valley
    float valleyStrength = cos(_position.y * uElevationValleyFrequency + 3.1415) * 0.5 + 0.5;
    elevation += valleyStrength * uElevationValley;

    // General elevation
    elevation += getPerlinNoise2d(_position * uElevationGeneralFrequency) * uElevationGeneral * (valleyStrength + 0.1);
    
    // Smaller details
    elevation += getPerlinNoise2d(_position * uElevationDetailsFrequency + 123.0) * uElevationDetails * (valleyStrength + 0.1);

    elevation *= uElevation;

    return elevation;
}


void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = getElevation(modelPosition.xz + vec2(uTime * 0.03, uTime * 0.0));

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vElevation = elevation;
    vUv = uv;
}`,Qe=`uniform sampler2D uTexture;
uniform float uTime;
uniform float uTextureFrequency;
uniform float uTextureOffset;
uniform float uHslHue;
uniform float uHslHueOffset;
uniform float uHslHueFrequency;
uniform float uHslTimeFrequency;
uniform float uHslLightness;
uniform float uHslLightnessVariation;
uniform float uHslLightnessFrequency;

varying float vElevation;
varying vec2 vUv;

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float getPerlinNoise2d(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}



vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

vec3 getRainbowColor()
{
    vec2 uv = vUv;
    uv.y += uTime * uHslTimeFrequency;

    float hue = uHslHueOffset + getPerlinNoise2d(uv * uHslHueFrequency) * uHslHue;
    float lightness = uHslLightness + getPerlinNoise2d(uv * uHslLightnessFrequency + 1234.5) * uHslLightnessVariation;
    vec3 hslColor = vec3(hue, 1.0, lightness);
    vec3 rainbowColor = hsl2rgb(hslColor);

    return rainbowColor;
}

void main(){
    vec3 uColor = vec3(1.0, 1.0, 1.0);
    vec3 rainbowColor = getRainbowColor();
    vec4 textureColor = texture2D(uTexture, vec2(0.0, vElevation * uTextureFrequency));
    vec3 color = mix(uColor, rainbowColor, textureColor.r);
    float fadeSideAmplitude = 0.2;
    float sideAlpha = 1.0 - max(
        smoothstep(0.5 - fadeSideAmplitude, 0.5, abs(vUv.x - 0.5)),
        smoothstep(0.5 - fadeSideAmplitude, 0.5, abs(vUv.y - 0.5))
    );

    gl_FragColor = vec4(color, textureColor.a * sideAlpha);
}`,Xe=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}`,$e=`#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}`,Je=`varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}`,et=`uniform vec3 uVignetteColor;
uniform float uVignetteMultiplier;
uniform float uVignetteOffset;
uniform vec3 uOverlayColor;
uniform float uOverlayAlpha;

varying vec2 vUv;

void main()
{
    float distanceToCenter = smoothstep(0.0, 1.0, length(vUv - 0.5));

    float vignetteStrength = clamp(distanceToCenter * uVignetteMultiplier + uVignetteOffset, 0.0, 1.0);

    vec3 color = mix(uVignetteColor, uOverlayColor, (1.0 - vignetteStrength) * uOverlayAlpha);

    float alpha = vignetteStrength + uOverlayAlpha;

    gl_FragColor = vec4(color, alpha);
}`,Z={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class L{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const tt=new Ce(-1,1,1,-1,0,1);class it extends we{constructor(){super(),this.setAttribute("position",new ie([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ie([0,2,0,0,2,0],2))}}const at=new it;class J{constructor(e){this._mesh=new H(at,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,tt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class st extends L{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof C?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=F.clone(e.uniforms),this.material=new C({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new J(this.material)}render(e,t,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class re extends L{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const n=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,c;this.inverse?(r=0,c=1):(r=1,c=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),o.buffers.stencil.setFunc(n.ALWAYS,r,4294967295),o.buffers.stencil.setClear(c),o.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(n.EQUAL,1,4294967295),o.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),o.buffers.stencil.setLocked(!0)}}class ot extends L{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class nt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new m);this._width=a.width,this._height=a.height,t=new U(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:I}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new st(Z),this.copyPass.material.blending=X,this.clock=new ue}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let n=0,o=this.passes.length;n<o;n++){const r=this.passes[n];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),r.needsSwap){if(a){const c=this.renderer.getContext(),f=this.renderer.state.buffers.stencil;f.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),f.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}re!==void 0&&(r instanceof re?a=!0:r instanceof ot&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new m);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(a,n),this.renderTarget2.setSize(a,n);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(a,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class rt extends L{constructor(e,t,a=null,n=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=n,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new w}render(e,t,a){const n=e.autoClear;e.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=n}}const lt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new w(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class O extends L{constructor(e,t=1,a,n){super(),this.strength=t,this.radius=a,this.threshold=n,this.resolution=e!==void 0?new m(e.x,e.y):new m(256,256),this.clearColor=new w(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new U(o,r,{type:I}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let x=0;x<this.nMips;x++){const b=new U(o,r,{type:I});b.texture.name="UnrealBloomPass.h"+x,b.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(b);const K=new U(o,r,{type:I});K.texture.name="UnrealBloomPass.v"+x,K.texture.generateMipmaps=!1,this.renderTargetsVertical.push(K),o=Math.round(o/2),r=Math.round(r/2)}const c=lt;this.highPassUniforms=F.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new C({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const f=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let x=0;x<this.nMips;x++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(f[x])),this.separableBlurMaterials[x].uniforms.invSize.value=new m(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const S=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=S,this.bloomTintColors=[new g(1,1,1),new g(1,1,1),new g(1,1,1),new g(1,1,1),new g(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=F.clone(Z.uniforms),this.blendMaterial=new C({uniforms:this.copyUniforms,vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,blending:Pe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new w,this._oldClearAlpha=1,this._basic=new Te,this._fsQuad=new J(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(a,n);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(a,n),this.renderTargetsVertical[o].setSize(a,n),this.separableBlurMaterials[o].uniforms.invSize.value=new m(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2)}render(e,t,a,n,o){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let f=0;f<this.nMips;f++)this._fsQuad.material=this.separableBlurMaterials[f],this.separableBlurMaterials[f].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[f].uniforms.direction.value=O.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[f]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[f].uniforms.colorTexture.value=this.renderTargetsHorizontal[f].texture,this.separableBlurMaterials[f].uniforms.direction.value=O.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[f]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[f];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new C({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new m(.5,.5)},direction:{value:new m(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new C({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}O.BlurDirectionX=new m(1,0);O.BlurDirectionY=new m(0,1);const le={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class ht extends L{constructor(e,t,a){super(),this.scene=e,this.camera=t;const n=a.focus!==void 0?a.focus:1,o=a.aspect!==void 0?a.aspect:t.aspect,r=a.aperture!==void 0?a.aperture:.025,c=a.maxblur!==void 0?a.maxblur:1,f=a.width||window.innerWidth||1,S=a.height||window.innerHeight||1;this.renderTargetDepth=new U(f,S,{minFilter:G,magFilter:G}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new De,this.materialDepth.depthPacking=ce,this.materialDepth.blending=X,le===void 0&&console.error("THREE.BokehPass relies on BokehShader");const x=le,b=F.clone(x.uniforms);b.tDepth.value=this.renderTargetDepth.texture,b.focus.value=n,b.aspect.value=o,b.aperture.value=r,b.maxblur.value=c,b.nearClip.value=t.near,b.farClip.value=t.far,this.materialBokeh=new C({defines:Object.assign({},x.defines),uniforms:b,vertexShader:x.vertexShader,fragmentShader:x.fragmentShader}),this.uniforms=b,this.needsSwap=!1,this.fsQuad=new J(this.materialBokeh),this._oldClearColor=new w}render(e,t,a){this.scene.traverse(r=>{r instanceof H&&typeof r.userData.noBokeh>"u"&&(r.userData.originalMaterial=r.material,r.userData.depthMaterial?r.material=r.userData.depthMaterial:r.material=this.materialDepth)}),e.getClearColor(this._oldClearColor);const n=e.getClearAlpha(),o=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=a.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.traverse(r=>{r instanceof H&&typeof r.userData.noBokeh>"u"&&(r.material=r.userData.originalMaterial)}),e.setClearColor(this._oldClearColor),e.setClearAlpha(n),e.autoClear=o}}const ut=document.querySelector("canvas.webgl"),D=new Le({container:document.getElementById("pane-container")});function ct(){document.getElementById("pane-container").classList.toggle("hidden")}window.addEventListener("keydown",s=>{s.key==="h"&&ct()});const d={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)},E=new Me;E.background=new w(524324);const dt={background:"0x080024"};D.addBinding(dt,"background",{view:"color",label:"Background"}).on("change",s=>E.background.set(s.value));const p={};p.position=new g;p.rotation=new Oe;p.rotation.reorder("YXZ");p.instance=new Ee(75,d.width/d.height,.01,100);p.instance.rotation.reorder("YXZ");E.add(p.instance);window.camera=p.instance;window.addEventListener("resize",()=>{d.height=window.innerHeight,d.width=window.innerWidth,p.instance.aspect=d.width/d.height,p.instance.updateProjectionMatrix(),P.setSize(d.width,d.height),P.setPixelRatio(Math.min(window.devicePixelRatio,2)),T.setSize(d.width,d.height),T.setPixelRatio(Math.min(window.devicePixelRatio,2))});const i={};i.texture={};i.texture.linesCount=5;i.texture.bigLineWidth=.08;i.texture.smallLineWidth=.01;i.texture.smallLineAlpha=.5;i.texture.width=32;i.texture.height=128;i.texture.canvas=document.createElement("canvas");i.texture.canvas.width=i.texture.width;i.texture.canvas.height=i.texture.height;i.texture.canvas.style.position="fixed";i.texture.canvas.style.top=0;i.texture.canvas.style.left=0;i.texture.canvas.style.width="50px";i.texture.canvas.style.height=`${i.texture.height}px`;i.texture.canvas.style.zIndex=1;i.texture.visible=!0;document.body.append(i.texture.canvas);i.texture.context=i.texture.canvas.getContext("2d");i.texture.instance=new Re(i.texture.canvas);i.texture.instance.wrapS=de;i.texture.instance.wrapT=de;i.texture.instance.magFilter=G;i.texture.update=()=>{i.texture.context.clearRect(0,0,i.texture.width,i.texture.height),i.texture.context.fillStyle="#ffffff",i.texture.context.globalAlpha=1,i.texture.context.fillRect(0,0,i.texture.width,Math.round(i.texture.height*i.texture.bigLineWidth));const s=i.texture.linesCount-1;for(let e=0;e<s;e++)i.texture.context.globalAlpha=i.texture.smallLineAlpha,i.texture.context.fillStyle="#ffffff",i.texture.context.fillRect(0,Math.round(i.texture.height/i.texture.linesCount)*(e+1),i.texture.width,Math.round(i.texture.height*i.texture.smallLineWidth));i.texture.instance.needsUpdate=!0};i.texture.update();const me=D.addFolder({title:"Terrain"}),N=me.addFolder({title:"Terrain Texture"});N.addBinding(i.texture,"visible",{label:"Show Texture Canvas"}).on("change",()=>{i.texture.visible?document.body.append(i.texture.canvas):document.body.contains(i.texture.canvas)&&document.body.removeChild(i.texture.canvas)});N.addBinding(i.texture,"linesCount",{min:1,max:100,step:1,label:"Lines Count"}).on("change",()=>i.texture.update());N.addBinding(i.texture,"bigLineWidth",{min:0,max:.5,step:.001,label:"Big Line Width"}).on("change",()=>i.texture.update());N.addBinding(i.texture,"smallLineWidth",{min:0,max:.1,step:.001,label:"Small Line Width"}).on("change",()=>i.texture.update());N.addBinding(i.texture,"smallLineAlpha",{min:0,max:1,step:.1,label:"Small Line Alpha"}).on("change",()=>i.texture.update());i.geometry=new fe(1,1,1e3,1e3);i.geometry.rotateX(-Math.PI/2);i.material=new C({vertexShader:Ge,fragmentShader:Qe,transparent:!0,side:Ae,uniforms:{uTexture:{value:i.texture.instance},uElevation:{value:2},uElevationValley:{value:.4},uElevationValleyFrequency:{value:1.5},uElevationGeneral:{value:.2},uElevationGeneralFrequency:{value:.2},uElevationDetails:{value:.2},uElevationDetailsFrequency:{value:2.012},uTextureFrequency:{value:10},uTextureOffset:{value:.585},uTime:{value:0},uHslHue:{value:1},uHslHueOffset:{value:0},uHslHueFrequency:{value:10},uHslTimeFrequency:{value:.05},uHslLightness:{value:.75},uHslLightnessVariation:{value:.25},uHslLightnessFrequency:{value:20}}});const y=me.addFolder({title:"Terrain Material"});y.addBinding(i.material.uniforms.uElevation,"value",{min:0,max:5,step:.001,label:"uElevation"});y.addBinding(i.material.uniforms.uElevationValley,"value",{min:0,max:1,step:.001,label:"uElevationValley"});y.addBinding(i.material.uniforms.uElevationValleyFrequency,"value",{min:0,max:10,step:.001,label:"uElevationValleyFrequency"});y.addBinding(i.material.uniforms.uElevationGeneral,"value",{min:0,max:1,step:.001,label:"uElevationGeneral"});y.addBinding(i.material.uniforms.uElevationGeneralFrequency,"value",{min:0,max:10,step:.001,label:"uElevationGeneralFrequency"});y.addBinding(i.material.uniforms.uElevationDetails,"value",{min:0,max:1,step:.001,label:"uElevationDetails"});y.addBinding(i.material.uniforms.uElevationDetailsFrequency,"value",{min:0,max:10,step:.001,label:"uElevationDetailsFrequency"});y.addBinding(i.material.uniforms.uTextureFrequency,"value",{min:.01,max:100,step:.01,label:"uTextureFrequency"});y.addBinding(i.material.uniforms.uHslHue,"value",{min:0,max:1,step:.001,label:"uHslHue"});y.addBinding(i.material.uniforms.uHslHueOffset,"value",{min:0,max:1,step:.001,label:"uHslHueOffset"});y.addBinding(i.material.uniforms.uHslHueFrequency,"value",{min:0,max:200,step:.01,label:"uHslHueFrequency"});y.addBinding(i.material.uniforms.uHslLightness,"value",{min:0,max:1,step:.001,label:"uHslLightness"});y.addBinding(i.material.uniforms.uHslLightnessVariation,"value",{min:0,max:1,step:.001,label:"uHslLightnessVariation"});y.addBinding(i.material.uniforms.uHslLightnessFrequency,"value",{min:0,max:50,step:.01,label:"uHslLightnessFrequency"});const ft=F.merge([ae.common,ae.displacementmap]);i.depthMaterial=new C({vertexShader:Xe,fragmentShader:$e,uniforms:ft});i.depthMaterial.depthPacking=ce;i.depthMaterial.blending=X;i.depthMaterial.morphTargets=!1;i.depthMaterial.map=null;i.depthMaterial.alphaMap=null;i.depthMaterial.displacementMap=null;i.depthMaterial.displacementScale=1;i.depthMaterial.displacementBias=0;i.depthMaterial.wireframe=!1;i.depthMaterial.wireframeLinewidth=1;i.depthMaterial.fog=!1;i.depthMaterial.depthPacking;i.mesh=new H(i.geometry,i.material);i.mesh.scale.set(10,10,10);E.add(i.mesh);const h={};h.vignetteColor={};h.vignetteColor.value="#4f1f96";h.vignetteColor.instance=new w(h.vignetteColor.value);h.overlayColor={};h.overlayColor.value="#130621";h.overlayColor.instance=new w(h.overlayColor.value);h.geometry=new fe(2,2);h.material=new C({uniforms:{uVignetteColor:{value:h.vignetteColor.instance},uVignetteMultiplier:{value:1.16},uVignetteOffset:{value:-1},uOverlayColor:{value:h.overlayColor.instance},uOverlayAlpha:{value:.5},uColor:{value:new w("#130621")},uStrength:{value:1}},vertexShader:Je,fragmentShader:et,transparent:!0,depthTest:!1});h.mesh=new H(h.geometry,h.material);h.mesh.userData.noBokeh=!0;h.mesh.frustumCulled=!1;E.add(h.mesh);const j=D.addFolder({title:"Overlay"});j.addBinding(h.vignetteColor,"value",{label:"Vignette Color",type:"color"}).on("change",()=>h.vignetteColor.instance.set(h.vignetteColor.value));j.addBinding(h.overlayColor,"value",{label:"Color",type:"color",format:"hex"}).on("change",()=>h.vignetteColor.instance.set(h.overlayColor.value));j.addBinding(h.material.uniforms.uVignetteMultiplier,"value",{label:"uVignetteMultiplier",min:0,max:5,step:.001});j.addBinding(h.material.uniforms.uVignetteOffset,"value",{label:"uVignetteOffset",min:-2,max:2,step:.001});j.addBinding(h.material.uniforms.uOverlayAlpha,"value",{label:"uOverlayAlpha",min:0,max:1,step:.01});const P=new Se({canvas:ut});P.setClearColor(1118481,1);P.outputEncoding=void 0;P.setSize(d.width,d.height);P.setPixelRatio(Math.min(d.pixelRatio,2));new U(800,600,{minFilter:se,magFilter:se,format:Ue,encoding:void 0});const T=new nt(P);T.setSize(d.width,d.height);T.setPixelRatio(Math.min(d.pixelRatio,2));const pt=new rt(E,p.instance);T.addPass(pt);const M=new ht(E,p.instance,{focus:1,aperture:.015,maxblur:.01,width:d.width*d.pixelRatio,height:d.height*d.pixelRatio});M.enabled=!0;T.addPass(M);const Y=D.addFolder({title:"Bokeh Pass"});Y.addBinding(M,"enabled",{label:"Enabled"});const mt=Y.addBinding(M.materialBokeh.uniforms.focus,"value",{min:0,max:10,step:.01,label:"Focus"});Y.addBinding(M.materialBokeh.uniforms.aperture,"value",{min:.002,max:.1,step:1e-4,label:"Aperture"});Y.addBinding(M.materialBokeh.uniforms.maxblur,"value",{min:0,max:.02,step:1e-4,label:"Max Blur"});const k=new He(p.instance,P.domElement);k.enableDamping=!0;k.enabled=!1;const vt=D.addFolder({title:"Controls"});vt.addBinding(k,"enabled",{label:"Enabled"});const B=new O(new m(d.width,d.height),1.5,.4,.85);B.enabled=!1;T.addPass(B);const q=D.addFolder({title:"Unreal Bloom Pass",expanded:!0});q.addBinding(B,"enabled",{label:"Enabled"});q.addBinding(B,"threshold",{label:"Threshold",min:0,max:1,step:1e-4});q.addBinding(B,"strength",{label:"Strength",min:0,max:3,step:1e-4});q.addBinding(B,"radius",{label:"Radius",min:0,max:1,step:1e-4});const l={};l.index=0;l.settings=[{position:{x:0,y:2.125,z:-.173},rotation:{x:-1.489,y:-Math.PI,z:0},focus:2.14,parallaxMultiplier:.25},{position:{x:1,y:1.1,z:0},rotation:{x:-.833,y:1.596,z:1.651},focus:1.1,parallaxMultiplier:.12},{position:{x:1,y:.87,z:-.97},rotation:{x:-.638,y:2.33,z:0},focus:1.36,parallaxMultiplier:.12},{position:{x:-1.43,y:.33,z:-.144},rotation:{x:-.312,y:-1.67,z:0},focus:1.25,parallaxMultiplier:.12}];l.parallax={};l.parallax.target={};l.parallax.target.x=0;l.parallax.target.y=0;l.parallax.eased={};l.parallax.eased.x=0;l.parallax.eased.y=0;l.parallax.eased.multiplier=4;l.parallax.multiplier=.25;window.addEventListener("mousemove",s=>{l.parallax.target.x=(s.clientX/d.width-.5)*l.parallax.multiplier,l.parallax.target.y=-(s.clientY/d.height-.5)*l.parallax.multiplier});l.current=l.settings[l.index];l.apply=()=>{p.position.copy(l.current.position),p.rotation.x=l.current.rotation.x,p.rotation.y=l.current.rotation.y,M.materialBokeh.uniforms.focus.value=l.current.focus,l.parallax.multiplier=l.current.parallaxMultiplier};l.change=s=>{l.index=s,l.current=l.settings[s],Q.to(h.material.uniforms.uOverlayAlpha,{duration:1.25,value:1,delay:1,ease:"power2.inOut",onComplete:()=>{l.apply(),Q.to(h.material.uniforms.uOverlayAlpha,{duration:1,value:0,ease:"power2.inOut"})}})};l.apply();window.setInterval(()=>{l.change((l.index+1)%l.settings.length)},7500);const gt=D.addFolder({title:"View"});for(const s in l.settings)gt.addButton({title:`View ${Number(s)+1}`}).on("click",()=>l.change(s));const ve=()=>{Q.to(M.materialBokeh.uniforms.focus,{duration:.5+Math.random()*3,ease:"power2.inOut",onComplete:ve,value:l.current.focus+Math.random(),onUpdate:()=>{mt.refresh()}})};ve();const z={};z.settings=[{vignetteColor:"#4f1f96",overlayColor:"#130621",clearColor:"#080024",terrainHue:1,terrainHueOffset:0},{vignetteColor:"#590826",overlayColor:"#21060b",clearColor:"#240004",terrainHue:.145,terrainHueOffset:.86},{vignetteColor:"#1f6a96",overlayColor:"#050e1c",clearColor:"#000324",terrainHue:.12,terrainHueOffset:.5},{vignetteColor:"#1f9682",overlayColor:"#02100c",clearColor:"#00240c",terrainHue:.12,terrainHueOffset:.2}];z.apply=s=>{const e=z.settings[s];h.vignetteColor.instance.set(e.vignetteColor),h.overlayColor.instance.set(e.overlayColor),i.material.uniforms.uHslHue.value=e.terrainHue,i.material.uniforms.uHslHueOffset.value=e.terrainHueOffset,P.setClearColor(e.clearColor,1)};const xt=D.addFolder({title:"presets",expanded:!0});for(const s in z.settings)xt.addButton({title:`apply(${s})`}).on("click",()=>{z.apply(s)});const _t=new ue;let he=0;const ge=()=>{const s=_t.getElapsedTime(),e=s-he;he=s,i.material.uniforms.uTime.value=s,k.enabled&&k.update(),p.instance.position.copy(p.position),l.parallax.eased.x+=(l.parallax.target.x-l.parallax.eased.x)*e*l.parallax.eased.multiplier,l.parallax.eased.y+=(l.parallax.target.y-l.parallax.eased.y)*e*l.parallax.eased.multiplier,p.instance.translateY(l.parallax.eased.y),p.instance.translateX(l.parallax.eased.x),p.instance.rotation.x=p.rotation.x,p.instance.rotation.y=p.rotation.y,T.render(),window.requestAnimationFrame(ge)};ge();
