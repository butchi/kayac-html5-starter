'use strict';

// import
import gulp from 'gulp';
import sass from 'gulp-sass';
import pleeease from 'gulp-pleeease';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import watch from 'gulp-watch';
import eslint from 'gulp-eslint';

import transform from './lib/vinyl-transform';


// const
const SRC = './src';
const CONFIG = './src/config';
const DEST = './public';


// css
gulp.task('sass', () => {
    const config = readConfig(`${CONFIG}/pleeease.json`);
    return gulp.src(`${SRC}/scss/style.scss`)
        .pipe(sass())
        .pipe(pleeease(config))
        .pipe(gulp.dest(`${DEST}/css`));
});

gulp.task('css', gulp.series('sass'));


// html
gulp.task('pug', () => {
    const locals = readConfig(`${CONFIG}/meta.json`);

    return gulp.src(`${SRC}/pug/*.pug`)
        .pipe(pug({
            locals: locals,
            pretty: true
        }))
        .pipe(gulp.dest(`${DEST}`));
});

gulp.task('html', gulp.series('pug'));


// serve
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: DEST
        }
    });

    watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
    watch([
        `${SRC}/pug/**/*.pug`,
        `${SRC}/config/meta.json`
    ], gulp.series('pug', browserSync.reload));
});

gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('css', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
