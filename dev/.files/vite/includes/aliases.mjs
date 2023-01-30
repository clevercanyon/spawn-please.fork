/**
 * Vite config file.
 *
 * Vite is not aware of this config file's location.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 *
 * @see https://vitejs.dev/config/
 */
/* eslint-env es2021, node */

import path from 'node:path';
import { dirname } from 'desm';

const __dirname = dirname(import.meta.url);
const projDir = path.resolve(__dirname, '../../../..');
const srcDir = path.resolve(projDir, './src');

/**
 * Defines vite resolution aliases.
 */
export default [
	// See also: `../typescript/config.json`.
	{
		find: /^@\/~(.+)$/u,
		replacement: path.resolve(srcDir, './$1'),
	},
];
