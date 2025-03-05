import mongoose from "mongoose";

export function dbConnection() {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(conn.connection.host);
    })
    .catch((err) => {
      console.error(`db error : ${err}`);
    });
}
