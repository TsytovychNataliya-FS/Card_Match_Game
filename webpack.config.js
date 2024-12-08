const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts", // Your entry point (TypeScript file)
  output: {
    filename: "bundle.js", // Output file
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Handle TypeScript files
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // Use ts-loader to handle TypeScript files
        },
      },
      {
        test: /\.js$/, // Handle JavaScript files (you already have this)
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/, // Handle SCSS files
        use: [
          "style-loader", // Inject styles into DOM
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Handle image files
        type: "asset/resource", // Emit files and return their URLs
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Resolve .ts and .tsx files
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Your HTML template file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve static files from 'dist'
    },
    compress: true,
    port: 9001, // Development server port
    hot: false, // Disable Hot Module Replacement (HMR) for now
  },
  mode: "development", // Development mode
};
