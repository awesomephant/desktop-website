var cssSpring = require('css-spring')
var keyframes = cssSpring.spring(
    { left: '.1'},
    { left: '1'},
    { preset: 'wobbly', precision: 5 }
);

console.log(cssSpring.toString(keyframes))