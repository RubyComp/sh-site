import gulp from 'gulp';
import GulpPug from 'gulp-pug';
import config from '../config.js';
import plumber from 'gulp-plumber';

export const pugBuild = (cb) => {

	gulp.src(`${config.src.pug}/*.pug`)
		.pipe(plumber())
		.pipe(GulpPug({
			pretty:true
		}))
		.pipe(gulp.dest(config.dest.html));

	cb();

}

export const pugWatch = () => {
	gulp.watch(`${config.src.pug}/**/*.pug`, pugBuild);
}