
// S.

"use strict";

// Example on how to pre-initialize event listeners 

const EventListener = require("../");

let a = new EventListener({
	"message": [{
		"temporal": true,
		"_fn": message => {
			console.log("Message: " + message);
		}
	}]
});

a.on("error", () => {
	console.log("Whooops...");
});

a.emit("message", "hi");
a.emit("message", "hi");
