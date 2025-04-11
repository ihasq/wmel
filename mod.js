const targetMap = new WeakMap();

let establishedListener = "\0"

/**
 * 
 * @param { EventTarget } target 
 * @param { keyofWindowEventMap } type 
 * @param { (this: Window, ev: Event) => any } listener 
 * 
 * @returns { (() => void) | void }
 */
export const add = (target, type, listener) => {

	if(!(target && type && listener)) return;

	establishedListener.includes(`\0${type}\0`)
		? 0
		: (
			addEventListener(type, e => targetMap.get(e.target)?.[type]?.forEach?.(fn => fn?.(e)), { passive: true }),
			establishedListener += type + "\0"
		)
	;

	let fnMap = targetMap.get(target);

	fnMap ? 0 : targetMap.set(target, fnMap = {});

	const index = (fnMap[type] ||= []).push(listener) - 1;

	return () => fnMap[type][index] = void 0;
};