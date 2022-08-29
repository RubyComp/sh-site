import browserSync from 'browser-sync';
import config from '../config.js';

const server = (cb) => {
	browserSync.create().init({
		server: {
			baseDir: config.dest.root
		},
		files: [
			`${config.dest.html}/*.html`,
			`${config.dest.css}/*.css`,
			`${config.dest.js}/*.js`,
			// `${config.dest.images}/**/*`
		],
		// open: false
		// notify: false
	});

	console.log('changed');

	cb();
}

export default server;