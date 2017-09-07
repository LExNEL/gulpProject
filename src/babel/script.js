/*global module:true*/

import map from './map'

if (module.hot)
    module.hot.accept();

(() => {
    map()
})()
