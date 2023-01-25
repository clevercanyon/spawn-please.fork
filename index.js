module.exports = (command, args, stdin, options) => {
	if (!options && typeof stdin === 'object') {
		options = stdin;
		stdin = undefined;
	}
	options = options || {};

	if (undefined === options.rejectOnError) {
		options.rejectOnError = true;
	}
	let stdout = ''; // Initialize.
	let stderr = ''; // Initialize.

	const child = require('cross-spawn')(command, args, options);

	return new Promise((resolve, reject) => {
		if (stdin !== undefined && stdin !== null && child.stdin) {
			child.stdin.write(stdin);
		}
		if (child.stdin) child.stdin.end();

		if (child.stdout) {
			child.stdout.on('data', (data) => {
				stdout += data;

				if (options.stdout) {
					options.stdout(data);
				}
			});
		}

		if (child.stderr) {
			child.stderr.on('data', (data) => {
				stderr += data;

				if (options.stderr) {
					options.stderr(data);
				}
			});
		}

		if (options.rejectOnError) {
			child.addListener('error', reject);
		}
		child.on('close', (code) => {
			if (0 !== code && options.rejectOnError) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
};
