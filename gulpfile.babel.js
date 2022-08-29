import gulp from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import {pugBuild, pugWatch} from './gulp/tasks/pug.js';
import {lessBuild, lessWatch} from './gulp/tasks/less.js';
import {jsBuild, jsWatch}  from './gulp/tasks/scripts.js';
import {resBuild, resWatch}  from './gulp/tasks/resources.js';

// series parallel

export const build = (cb) => {

	gulp.series(
		clean
	)(cb);

	gulp.parallel(
		pugBuild,
		lessBuild,
		jsBuild,
		resBuild
	)(cb);

  cb();
}

export const watch = (cb) => {
	gulp.series(
		build,
		server,
	)(cb);
	gulp.parallel(
		pugWatch,
		lessWatch,
		jsWatch,
		resWatch
	)(cb);
  cb();
};