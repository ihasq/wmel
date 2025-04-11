# WMEL
WeakMap-based Event Listener.

```javascript
import { listen } from "wmel"

// Add listener

const abort = listen(
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