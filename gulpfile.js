/**
 * Gulp file for base64util project.
 *
 * @author  Dumitru Uzun (DUzun.me)
 * @version  1.0.0
 */

/*jshint
    node: true,
    esversion: 6
*/

const fs              = require('fs');
const path            = require('path');

const requireJSON     = require('require-json5');
const gulp            = require('gulp');
const $               = require('gulp-load-plugins')();

// -----------------------------------------------------------------------------
gulp.task('default', ['js', 'js-min']);

// -----------------------------------------------------------------------------
gulp.task('js', function task_js() {
    return procES6('src/base64.js', 'src/', 'dist/', false, false);
});

gulp.task('js-min', function task_js() {
    return procES6('src/base64.js', 'src/', 'dist/', false, true);
});

// -----------------------------------------------------------------------------
/// Process JS ES6/7 with babel
function procES6(src, base, dest = '', handle_error = false, min = false) {
    const babelOptions = requireJSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
    let bo = Object.assign(babelOptions);
    let bplg = bo.plugins || (bo.plugins = []);
    bplg.push("external-helpers");
    bo.exclude = "node_modules/**";

    let plugins = [
        // require('rollup-plugin-strip')(),
        require('rollup-plugin-babel')(bo),
    ];

    if ( min ) {
        plugins.push(require('rollup-plugin-uglify')({
            output: {
                comments: function(node, comment) {
                    let { value, type } = comment;
                    // multiline comment
                    if (type === "comment2") {
                        return /@preserve|@license|@cc_on/i.test(value);
                    }
                },
            },
        }));
    }

    let s = gulp.src(src, { base })
        .pipe($.sourcemaps.init({loadMaps:true}))
        // .pipe($.babel(babelOptions))

        .pipe($.betterRollup({ plugins }, 'umd'))
        // .pipe($.rename((fn)=>{fn.basename = path.basename(fn.basename, '.es')}))
    ;
    if ( handle_error ) {
        handle_stream_error(s);
    }
    if ( min ) {
        s = s.pipe($.rename({extname: '.min.js'}));
    }
    s = s.pipe($.sourcemaps.write('.'));
    if ( dest ) {
        s = s.pipe(gulp.dest(dest));
    }
    return s;
}
// -----------------------------------------------------------------------------
function handle_stream_error(stream) {
    return stream.on('error', function (/*error*/) {
        // console.error(error);
        $.util.log.apply(this, arguments);
        stream.end();
    });
}
