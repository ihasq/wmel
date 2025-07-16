let establishedListener = "\0"

const

	targetMap = new WeakMap(),

	getTarget = targetMap.get.bind(targetMap),
	setTarget = targetMap.set.bind(targetMap),

	listen = function (

		target: EventTarget,
		type: keyof WindowEventMap,
		listener: (this: Window, ev: Event) => any

	): () => void {

		establishedListener.includes(`\0${type}\0`)
			? 0
			: (
				addEventListener(type, (e: any) => getTarget(e.target)?.[type]?.forEach?.((fn: Function) => fn?.(e)), { passive: true }),
				establishedListener += type + "\0"
			)
		;

		let fnMap = getTarget(target);

		fnMap ? 0 : setTarget(target, fnMap = {});

		const index = (fnMap[type] ||= []).push(listener) - 1;

		return function () {

			fnMap[type][index] = void 0

		};
	}
;

export { listen }