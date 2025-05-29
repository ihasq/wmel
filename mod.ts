let establishedListener = "\0"

const

	targetMap = new WeakMap(),

	listen = function (

		target: EventTarget,
		type: keyof WindowEventMap,
		listener: (this: Window, ev: Event) => any

	): () => void {

		establishedListener.includes(`\0${type}\0`)
			? 0
			: (
				addEventListener(type, (e: any) => targetMap.get(e.target)?.[type]?.forEach?.((fn: Function) => fn?.(e)), { passive: true }),
				establishedListener += type + "\0"
			)
		;

		let fnMap = targetMap.get(target);

		fnMap ? 0 : targetMap.set(target, fnMap = {});

		const index = (fnMap[type] ||= []).push(listener) - 1;

		return function () {

			fnMap[type][index] = void 0

		};
	}
;

export { listen }