const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  /* Punto de entrada a la aplicacion */
  entry: "./src/index.js",

  /* Punto de salida a la aplicacion: A donde enviamos lo que prepara webpack */
  output: {
    path: path.resolve(__dirname, "dist"), // Seleccionamos el path/folder donde guardamos nuestro poryecto.

    // Para identificar cada build de nuestro proyecto con un build cambiamos el filename de "main.js" a "[name].[contenthash].js"
    filename: "[name].[contenthash].js", // Colocamos nombre final al resultante del js unificado. Tambien suele nombrarse: bundle.js
    assetModuleFilename: "assets/images/[hash][ext][query]" //Esta instrucción hace que webpack le agregue un hash ( un hash es una serie de caracteres aleatorios) y su extencion por medio de esas variables en el string
  },

  /* Establecemos la extenciones que debe identificar webpack para leerlas correctamente */
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  /* Añadimos configuración y reglas para trabajar con webpack. */
  module: {
    rules: [
      {
        // Lee los archivos con extension .js e ignora node_modules
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Revisa las dos extensiones css y styl para aplicar los loaders css y stylus
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        // Loader interno a webpack, no tenemos que instalarlo. Mejora nuestros archivos png, los convierte a B64
        test: /\.png/,
        type: "asset/resource",
      },
      {
        // Loader para optimizar el formato woff de las fonts
        test: /\.(woff|woff2)%/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000, // O un bolean. Habilita o deshabilita la transformación de archivos en base64.
            mimetype: "aplication/font-woff",  // Especifica el tipo MIME con el que se alineará el archivo. 
            // Los MIME Types (Multipurpose Internet Mail Extensions). Son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            outputPath: './assets/fonts/', 
            publicPath: './assets/fonts/',
            esModule: false, // Avisar explicitamente si es un modulo.
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      // Inyecta el bundle al template HTML
      template: "./public/index.html",
      // Nombre final del archivo
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // Movemos el css a los assets, conservar su nombre pero que genere un content hash.
      filename: "assets/[name].[contenthash].css"
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          // Copiamos la carpeta src/assets/images y la creamos en dist/ (Previamente a correr run dev, cambiamos la fuente de las imagenes en Template.js)
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // Plugin de optimizacion para css.
      new TerserPlugin(), // Plugin de optimizacion para javascrip.
    ]
  }
};
