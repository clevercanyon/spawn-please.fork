/**
 * Tailwind brand acquisition.
 *
 * @note PLEASE DO NOT EDIT THIS FILE!
 * @note This entire file will be updated automatically.
 * @note Instead of editing here, please review <https://github.com/clevercanyon/skeleton>.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { $brand, $fn, $json, $str } from '../../../node_modules/@clevercanyon/utilities/dist/index.js';

// `__dirname` already exists when loaded by Tailwind via Jiti / commonjs.
// eslint-disable-next-line no-undef -- `__dirname` is not actually missing.
const curDir = __dirname; // Current directory.
const projDir = path.resolve(curDir, '../../..');

const pkgFile = path.resolve(projDir, './package.json');
const pkg = $json.parse(fs.readFileSync(pkgFile).toString());

/**
 * Acquires app’s brand for configuration of Tailwind themes.
 *
 * Jiti, which is used by Tailwind to load ESM config files, doesn’t support top-level await. Thus, we cannot use async
 * functionality here. Consider using a CLI request to acquire resources, if necessary. {@see https://o5p.me/1odhxy}.
 */
export default /* not async compatible */ () => {
    let brand = $fn.try(() => $brand.get(pkg.name), undefined)();
    if (brand) return brand; // That was’t such a chore, now was it?

    const baseURL = // Acquires base URL.
        process.env._MODE_AWARE_APP_BASE_URL || // Mode-aware.
        $str.trim(execSync('./cli-sync/base-url.mjs', { cwd: curDir }).toString());
    if (!baseURL) return; // Not possible; i.e., app has no base URL.

    const brandConfig = $json.parse(execSync('./cli-sync/brand-config.mjs', { cwd: curDir }).toString());
    if (!brandConfig) throw new Error('Missing brand config for Tailwind themes.');

    return $brand.addApp({ pkgName: pkg.name, baseURL, props: brandConfig });
};
