import gulp from 'gulp';
import config from '../config.js';
import plumber from 'gulp-plumber';

const allRes = `${config.src.res}/**/*`;

export const resBuild = (cb) => {

	gulp.src(allRes)
		.pipe(plumber())
		.pipe(gulp.dest(config.dest.res));

	gulp.src(`${config.src.root}/favicon.ico`)
		.pipe(plumber())
		.pipe(gulp.dest(config.dest.root));

	cb();

}

export const resWatch = () => {
	gulp.watch(allRes, resBuild);
}