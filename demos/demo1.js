
// S.

"use strict";

const EventListener = require("../");

class A extends EventListener {
	constructor() {
		super();
	}
}

let a = new A();

a.on("message", message => {
	console.log("Message: " + message);
});

a.on("other", other => {
	console.log("Something else: " + other);
});

a.on("_uncaughtException", (event, args) => {
	console.log("Uncaught exception: event: " + event + ", arguments: " + JSON.stringify(args));
});

a.emit("message", "hi");
a.emit("other", 100);

a.emit("catch me", {
	"meow": true
});
