import gulp from 'gulp';
import config from '../config.js';

export const jsBuild = (cb) => {

  gulp.src(`${config.src.js}/**/*.js`)
    .pipe(gulp.dest(config.dest.js));

  cb();

}

export const jsWatch = () => {
  gulp.watch(`${config.src.js}/**/*.js`, jsBuild);
	console.log('js');
}