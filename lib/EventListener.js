
// S.

"use stirct";

class EventListener {
	constructor(events) {
		this.events = events || {};
	}

	on(event, callback) {
		check(event, callback);

		if(this.events[event] === undefined) this.events[event] = new Array();

		this.events[event].push({
			"_fn": callback
		});
	}

	once(event, callback) {
		check(event, callback);

		if(this.events[event] === undefined) this.events[event] = new Array();

		this.events[event].push({
			"temporal": true,
			"_fn": callback
		});
	}

	emit(event, ...args) {
		check(event, null, true);

		if(this.events[event] === undefined) {
			if(this.events["error"] !== undefined) {
				this.emit("error", new Error("called event does not exsist"), event);
			} else return;
		}

		if(this.events[event].length === 0) {
			if(this.events["error"] !== undefined) {
				this.emit("error", new Error("no listeners for called event"), event);
			} else return;
		}

		for(let i = 0; i < this.events[event].length; i++) {
			this.events[event][i]._fn(...args);

			if(this.events[event][i].temporal === true) {
				delete this.events[event][i];

				this.events[event] = this.events[event].filter(n => n);
			}
		}
	}
}

function check(event, callback, skipcallback) {
	if(typeof event !== "string") {
		throw new TypeError(
			"EventListener: typeof \"event\" must be \"string\", got: \"" + typeof event + "\""
		);
	}

	if(skipcallback === false && typeof callback !== "function") {
		throw new TypeError(
			"EventListener: typeof \"callback\" must be \"function\", got: \"" + typeof callback + "\""
		);
	}
}

module.exports = EventListener;
