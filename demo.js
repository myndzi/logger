var Logger = require('./logger'),
	log = new Logger('System', 'info');


// returns false if not displayed
log.silly('Hello, World', 'lots of debugging info might go here') ||
log.info('Hello, World');

log.warn('Warning! ANSI colors ahoy!', {
	GREEN: '\x1B[1;32mGREEN',
	green: '\x1B[32mgreen',
	cyan : '\x1B[36mcyan',
	yellow: '\x1B[33myellow',
	RED  : '\x1B[1;31mRED',
});
log.info('These are based on the solarized theme for PuTTY');

setTimeout(function () {
	log.info('Timestamps are only drawn when the time changes');
	log.error(new Error('That\'s all'));
}, 1500);
