import gulp from 'gulp';
import config from '../config.js';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';

export const jsBuild = (cb) => {

	gulp.src([
		`${config.src.js}/_start.js`,
		`${config.src.js}/main.js`,
		`${config.src.js}/test.js`,
		`${config.src.js}/_end.js`,
	])
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(config.dest.js));

	cb();

}

export const jsWatch = () => {
	gulp.watch(`${config.src.js}/**/*.js`, jsBuild);
	console.log('js');
}