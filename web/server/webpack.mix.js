let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.react('resources/js/apps/WindowReplacer/AppMain.js', 'static/build/app.js')
    .sass('resources/sass/window_replacer.scss', 'static/build/window_replacer.css')
    .setPublicPath('static');