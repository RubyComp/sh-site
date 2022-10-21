import gulp from 'gulp';
import less from 'gulp-less';
import config from '../config.js';
import plumber from 'gulp-plumber';
import cleanCSS from 'gulp-clean-css';

export const lessBuild = (cb) => {

	gulp.src(`${config.src.less}/main.less`)
		.pipe(plumber())
		.pipe(less())
		// .pipe(cleanCSS())
		.pipe(gulp.dest(config.dest.css));

	cb();

}

export const lessWatch = () => {
	gulp.watch(`${config.src.less}/**/*.less`, lessBuild);
}