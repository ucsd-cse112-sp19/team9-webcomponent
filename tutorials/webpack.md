# Webpack

Webpack is a utility for bundling javascript code. This allows use to organize
our code into multiple files and use `require()` and `import` in javascript
meant to run in the browser.

Webpack works by resolving dependincies and concatenating javascript files into
a single `bundle.js`.

Run webpack by typing `npm run build`. `bundle.js` will appear in `./dist/`.

# Webpack Dev Server

`webpack-dev-server` is a package for running a javascript development server.

Start the server by typing `npm start`. Any changes you make will cause the
server to rebuild your bundle and reload your browser tab.

## Bundling

The dev server will serve a generated html page. It is currently configured to
use `./web_component/HelloAxios.html` as a template to generate the page.
The files specified in `module.exports.entry.components` are the target files
to bundle, and will have `<script>` tags automatically inserted into the
generated page.

## Request Proxying

The dev server is configured to proxy requests to another server if they can't
be served from the base directory. The proxy targets are defined in
`webpack.config.js`:`module.exports.devServer.proxy`.

This setup allows us to avoid __CORS__ issues with our backend server.