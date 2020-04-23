import babel from 'rollup-plugin-babel';
import {
    uglify
} from "rollup-plugin-uglify";
const needUglify = process.argv.includes('--uglify')
export default {
    input: 'src/index.js',
    output: [{
        file: 'util.js',
        format: 'umd',
        name: 'util'
    }],
    plugins: [
        babel({
            "extensions": [".js", ".ts"]
        }),
        needUglify && uglify()
    ]
};