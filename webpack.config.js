const path = require("path");

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
    ],
  },
};
