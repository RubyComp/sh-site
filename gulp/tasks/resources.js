import gulp from 'gulp';
import config from '../config.js';

const allRes = `${config.src.res}/**/*`;

export const resBuild = (cb) => {

  gulp.src(allRes)
    .pipe(gulp.dest(config.dest.res));

  cb();

}

export const resWatch = () => {
  gulp.watch(allRes, resBuild);
}