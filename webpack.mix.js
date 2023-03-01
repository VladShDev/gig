const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */


/**
 * Application
 */
mix.sass('resources/sass/store.scss', 'public/css');
mix.js('resources/js/app.jsx', 'public/js/store.js')
    .react()
    .sourceMaps(false, 'source-map')
    //.postCss('resources/css/store.css', 'public/css', [require('tailwindcss'), require('autoprefixer')])
    .alias({
        '@': 'resources/js',
    });


/**
 * Admin
 */
mix.sass('resources/sass/admin.scss', 'public/css');
mix.js('resources/js/admin.jsx', 'public/js')
    .react()
    .sourceMaps(false, 'source-map')
    .alias({
        '@': 'resources/js',
    });


/**
 * Start
 */
mix.sass('resources/sass/start.scss', 'public/css');
mix.js('resources/js/start.jsx', 'public/js')
    .react()
    .sourceMaps(false, 'source-map')
    .alias({
        '@': 'resources/js',
    });


mix.browserSync('localhost:80');


if (mix.inProduction()) {
    console.log("PRODUCTIONS");
    mix.version();
}else {
    console.log("DEVELOPMENT");
}


module.exports = {

    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "os": false
        },
    }
}