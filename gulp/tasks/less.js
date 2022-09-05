import gulp from 'gulp';
import less from 'gulp-less';
import config from '../config.js';
import plumber from 'gulp-plumber';

export const lessBuild = (cb) => {

	gulp.src(`${config.src.less}/main.less`)
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest(config.dest.css));

	cb();

}

export const lessWatch = () => {
	gulp.watch(`${config.src.less}/**/*.less`, lessBuild);
}