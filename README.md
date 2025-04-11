# WMEL
WeakMap-based Event Listener.

```javascript
import { add } from "wmel"

// Add listener

const abort = add(
	document.querySelector("#some-button"), // target
	"click",                                // type
	({ target }) => console.log("clicked")  // listener
);


// Abort listener

abort();
```

## Install
```sh
npm i wmel
```