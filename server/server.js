
const app = require("./src/app");
const pool = require("./src/config/db"); // from db.js


const PORT = process.env.PORT || 5000;

/* test local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

pool.connect()
  .then(() => {
    console.log("PostgresSQL connected success");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

