const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

require("./routes/customer.routes.js")(app);
require("./routes/runner.routes.js")(app);
require("./routes/department.routes.js")(app);

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})