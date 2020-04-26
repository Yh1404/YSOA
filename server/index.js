const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(require("cors")());
app.use(express.json());
app.use(cookieParser());

require("./plugins/db")(app);
require("./router/web/index")(app);
require("./router/admin/index")(app);

app.listen(3000, function () {
  console.log("http://localhost:3000");
});
