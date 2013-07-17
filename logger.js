module.exports =
(function () {
	"use strict";

	Logger.defaultLevel = 1;

	var levels = {
		'error': 0,
		'warn': 1,
		'info': 2,
		'silly': 3
	};
	function Logger(name, level) {
		this.name = name;
		this.level = levels[level] || Logger.defaultLevel;
		this.silly = log.bind(this, 'silly', this.name);
		this.info = log.bind(this, 'info', this.name);
		this.warn = log.bind(this, 'warn', this.name);
		this.error = log.bind(this, 'error', this.name);
	}

	var lastday = null,
		lasttime = null;

	var GREEN = '\x1B[1;32m',
		green = '\x1B[32m',
		cyan  = '\x1B[36m',
		yellow= '\x1B[33m',
		RED   = '\x1B[1;31m',
		reset = '\x1B[0m';

	var inspect = (function () {
		if (typeof phantom !== 'undefined') return function (obj) { return obj; }
		if (typeof module !== 'undefined') return require('util').inspect;
	})();

	function log(type, name, msg) {
		if (levels[type] > this.level) return false;
		msg = Array.prototype.slice.call(arguments, 2);
		if (arguments.length < 3) return true;
		
		var out = '',
			now = new Date(),
			day =
				now.getFullYear() + '.' +
				(now.getMonth()+1) + '.' + 
				now.getDate(),
			time =
				('0'+now.getHours()).slice(-2) + ':' +
				('0'+now.getMinutes()).slice(-2) +  '.' +
				('0'+now.getSeconds()).slice(-2);
		if (day != lastday) {
			lastday = day;
			console.log(GREEN + '---' + day + '---' + reset);
		}
		if (time != lasttime) {
			lasttime = time;
			out += time + ' ';
		} else {
			out += '         ';
		}
		var newLine = '\n             ';
		if (!msg instanceof Array) msg = [msg];
		msg.forEach(function (val, idx, arr) {
			if (val instanceof Error) {
				arr[idx].logged = true;
				val = val.stack.toString();
			} else if (typeof val !== 'string') {
				val = inspect(val);
			} else {
				val = val.toString();
			}
			arr[idx] = val
				.split('\n')
				.join(newLine)
			;
		});
		msg = msg.join(newLine);

		switch (type) {
			case 'silly':
				console.log(GREEN + out + reset + green + '[s] ' + name + ': ' + reset + msg);
				break;
			case 'info':
				console.log(GREEN + out + reset + cyan + '[i] ' + name + ': ' + reset + msg);
				break;
			case 'warn':
				console.log(GREEN + out + reset + yellow + '[w] ' + name + ': ' + reset + msg);
				break;
			case 'error':
				console.log(GREEN + out + reset + RED + '[e] ' + name + ': ' + reset + msg);
				break;
		}
		return true;
	};
	
	return Logger;
})();
