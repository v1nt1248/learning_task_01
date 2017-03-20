"use strict";

const gulp = require("gulp");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const ts = require("gulp-typescript");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const browser = require("browser-sync");

gulp.task("delete", function() {
	return del("./dist/index.js");
});

gulp.task("clean", function() {
	return del("./src/**/*.js");
});

gulp.task("tsc", function() {
	var tsProject = ts.createProject("tsconfig.json");
	var tsResult = tsProject.src()
		.pipe(sourcemaps.init())
		.pipe(tsProject());
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./src"));
});

gulp.task("browserify", function() {
	const b = browserify({
		entries: "./src/index.js",
		debug: true
	});

	return b.bundle()
			.pipe(source("index.js"))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest("./dist/"));
});

gulp.task("browser", function() {
 browser({
	 server: {
		 baseDir: "./dist"
	 },
	 port: 9090,
	 open: true,
	 notify: false
 });
});

gulp.task("build", gulp.series("delete" ,"tsc", "browserify", "clean"));
gulp.task("watch", function() {
	gulp.watch("./src/**/*.ts", gulp.series("build"));
});
gulp.task("default", gulp.series("build"));