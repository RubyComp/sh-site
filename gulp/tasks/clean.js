import {deleteSync} from 'del';
import config from '../config.js';

export default (cb) => {
	deleteSync(config.dest.root);
	cb();
}