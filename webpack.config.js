const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const isDev = env === "dev";
  const isProd = env === "prod";
  const isQA = env === "qa";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: `./.env.${env}`,
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      open: true,
    },
  };
};
