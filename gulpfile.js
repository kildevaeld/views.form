'use strict';

const gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    webpack = require('webpack-stream'),
    merge = require('merge2'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    bump = require('gulp-bump');


const project = tsc.createProject('./tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('typescript', () => {
    let result = project.src()
    .pipe(tsc(project))
    
    let js = result.js
    .pipe(babel({
        presets:['es2015']
        }))
    .pipe(gulp.dest('lib'));
    
    let dts = result.dts.pipe(gulp.dest('lib'));
    
    return merge([js,dts]);
    
});

gulp.task('uglify', ['bundle'] ,() => {
    return gulp.src('./dist/views.form.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rename('views.form.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
})

gulp.task('bundle', ['typescript'], () => {
    return gulp.src('./lib/index.js')
    //.pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(webpack({
        devtool: 'source-map',
        output: {
            libraryTarget: 'umd',
            library: ['views', 'form'],
            filename: 'views.form.js'
        },
        externals: {
            "views": 'views',
            "collection": "collection",
            "orange": "orange"
            //'stick/lib/template': 'stick' 
        }/*,
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/, query: { presets: ['es2015']}}
            ]
        }*/
    }))

    //.pipe(sourcemaps.write('dist'))
    .pipe(gulp.dest('dist'))
});


gulp.task('bump', () => {
    gulp.src('package.json')
    .pipe(bump())
    .pipe(gulp.dest('.'))
    })

gulp.task('default', ['bundle', 'uglify']);

gulp.task('watch', () => {
    return gulp.watch('./src/**/*.ts', ['bundle']);
});