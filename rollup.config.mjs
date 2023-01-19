// rollup.config.js
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import packageJson from './package.json' assert { type: "json" };
const { module, main, unpkg } = packageJson;

export default {
    input: module,
    plugins: [
        babel() // convert to ES5
    ],
    output: [
        {
            file: main,
            name: 'base64',
            format: 'umd',
            sourcemap: true,
        },
        {
            file: unpkg,
            name: 'base64',
            format: 'umd',
            sourcemap: true,
            plugins: [
                terser(), // minify JS/ES
            ],
        },
    ]
};
