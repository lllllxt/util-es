import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import info from '../package.json'
const needUglify = process.argv.includes('--uglify')

export default {
    input: 'src/index.ts',
    output: {
        file: 'util.js',
        format: 'umd',
        name: 'util',
        exports: 'named',
        banner: '/* util-es version ' + info.version + ', follow me on Github! @lllllxt */',
    },

    plugins: [
        resolve({
            extensions: ['.ts'],
        }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts'],
        }),
        needUglify &&
            uglify({
                output: {
                    comments: function (node, comment) {
                        return comment.value.indexOf('@lllllxt') >= 0
                    },
                },
            }),
    ],
}
