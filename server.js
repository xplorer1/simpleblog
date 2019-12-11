const express = require('express')
const app = express();
const port = 8050;
const api = require("./app/routes/api");

app.use("/api", api);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))