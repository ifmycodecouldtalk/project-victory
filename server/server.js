const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const publicPath = path.join(__dirname, '..', 'build');
const app = express();
const db = require("./models");
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8081"
};

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/
db.sequelize.sync();

app.use(express.static(publicPath));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
}