module.exports = {
 entry: "./index.js",
 output: {
 path: __dirname,
 filename: "bundle.js"
 },
 module: {
 rules: [
 {
 test: /\.js$/,
 exclude: /(node_modules)/,
 loader: 'babel-loader',
 query: {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react" ]
 }
 }
 ]
 }
}