const targetMap = new WeakMap();

let establishedListener = "\0"

/**
 * 
 * @param { EventTarget } target 
 * @param { keyofWindowEventMap } type 
 * @param { (this: Window, ev: Event) => any } listener 
 */
export const add = (target, type, listener) => {
	establishedListener.includes(`\0${type}\0`)
		? (
			globalThis.addEventListener(type, e => targetMap.get(e.target)?.[type].forEach(fn => fn(e)), { passive: true }),
			establishedListener += type + "\0"
		) : 0
	;
	let fnMap = targetMap.get(target);
	fnMap ? 0 : targetMap.set(target, fnMap = []);
	fnMap.push(listener);
	return listener;
};

export const remove = (target, type, listener) => {

}