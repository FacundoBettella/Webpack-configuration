const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  /* Punto de entrada a la aplicacion */
  entry: "./src/index.js",

  /* Punto de salida a la aplicacion: A donde enviamos lo que prepara webpack */
  output: {
    path: path.resolve(__dirname, "dist"), // Seleccionamos el path/folder donde guardamos nuestro poryecto.
    filename: "main.js", // Colocamos nombre al resultante del js unificado. Tambien suele nombrarse: bundle.js
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
        use: [
            MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"
        ]
      },
      {
        // Loader interno a webpack, no tenemos que instalarlo. Mejora nuestros archivos png, los convierte a B64
        test: /\.png/,
        type: "asset/resource"
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        // Inyecta el bundle al template HTML
        template: "./public/index.html",
        // Nombre final del archivo
        filename: "./index.html"
    }),
    new MiniCssExtractPlugin(),

    new CopyWebpackPlugin({
        patterns: [
            {
                // Copiamos la carpeta src/assets/images y la creamos en dist/ (Previamente a correr run dev, cambiamos la fuente de las imagenes en Template.js)
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }
        ]
    })
  ]
};
