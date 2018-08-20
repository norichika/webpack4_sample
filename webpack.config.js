const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//sourceファイル
const sourcePath = "./src";

//公開ディレクトリ
const distPath   = "dist";

//Entry Point配列
const entries    = {};
//書き出さないファイル（除外リスト）
const targets    = glob.sync([`${sourcePath}/**/*.js`, `!${sourcePath}/**/_util/*.js`, `!${sourcePath}/**/[_]*.js`]);

targets.forEach(value => {
  const re = new RegExp(`${sourcePath}/`);
  const key = value.replace(re, '');
  entries[key] = value;
});

module.exports = {

  // メインとなるJavaScriptファイル（エントリーポイント）
  // entry: entries,
  entry: {
    'js/app01.js': './src/js/app01.js',
    'js/main.js': './src/js/main.js',
  },
  mode : 'development',


  // ファイルの出力設定
  output: {
    // 出力先のフォルダー名
    path: `${__dirname}/${distPath}`,

    // 出力ファイル名
    filename: '[name]'
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        // node_modules は除外する
        exclude: /node_modules/,
      },
      {
        test: /\.ejs$/,
        use: 'ejs-compiled-loader'
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
              context: 'src'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ],
      }

    ]
  },

  optimization: {
    splitChunks: {
      name: '/common/js/vendor.js',
      chunks: 'initial',
      minChunks: 2,
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.ejs'
    })
  ],

};
