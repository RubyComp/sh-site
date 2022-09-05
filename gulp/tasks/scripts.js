import gulp from 'gulp';
import config from '../config.js';
import plumber from 'gulp-plumber';

export const jsBuild = (cb) => {

	gulp.src(`${config.src.js}/**/*.js`)
		.pipe(plumber())
		.pipe(gulp.dest(config.dest.js));

	cb();

}

export const jsWatch = () => {
	gulp.watch(`${config.src.js}/**/*.js`, jsBuild);
	console.log('js');
}