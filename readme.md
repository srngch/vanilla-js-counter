# Counter

A simple counter app for learning Class Syntax in vanilla JavaScript.

## Deployment

[https://srngch.github.io/vanilla-js-counter/](https://srngch.github.io/vanilla-js-counter/)

## Requirements Specification

- Make a `Counter` class with a separate file module
- Create multiple counters instance and render them on the screen
- Create a button to add a counter
- Each counter display a number
- Each counter has three buttons: 'increase', 'decrease', 'reset to zero'
- When a button of a specific counter is pressed, the value of another counter should not change
- Store all current counter numbers in local storage

## Todo

- [x] Add multiple counters
- [x] Apply an icon to buttons
- [x] Set meta tags including Open Graph
- [x] Compile using the [Babel](https://babeljs.io/)
- [x] Apply the webpack(js, css, assets)
- [x] Style: match the buttons in columns regardless of the width of numbers
- [x] Style: Fix the `Add a new counter` button position
- [x] Separate util functions into file
- [ ] Fix the problem that counter deletion isn't stored
- [ ] Apply [WebpackManifestPlugin](https://github.com/shellscape/webpack-manifest-plugin) for `.webmanifest` file
- [ ] Apply [html-loader](https://webpack.js.org/loaders/html-loader/) & [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [ ] `counter.js`: Make `id` property in Counter class
- [ ] `index.js`: Change the `App` function to class.
- [ ] `npm run start`
- [ ] Minimize

## Preview

![preview](./src/assets/preview.png)
