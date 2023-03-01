require('./bootstrap');


import React from 'react';
import {render} from 'react-dom';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';


const appName = window.document.getElementsByTagName('title')[0]?.innerText || window.title;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Apps/Start/Page/${name}`),
    setup({el, App, props}) {
        return render(<App {...props} />, el);
    },
});


InertiaProgress.init({color: '#4B5563'});

