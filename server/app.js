const express = require('express')
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require('body-parser');

const leaguesRoute = require('./routes/leaguesRoute')
const standingsRoute = require('./routes/standingsRoute')

app.use(cors());

app.use("/Leagues", leaguesRoute);
app.use("/Standings", standingsRoute);
app.use(express.json());
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})