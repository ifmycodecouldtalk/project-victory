const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Task = db.task;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { task } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
        res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
    // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
exports.createTask = (req, res) => {
  Task.create({
      name: req.body.name,
      description: req.body.description
    }).then(task => {
    if(req.body.username) {
      User.findOne({
      where: {
        username: req.body.username
      }
      }).then(user => {
        task.setUser(user).then(() => {
          res.send({ message: "Task created successfully!" });
        })
      })
    }
  })
};
exports.getUserTasks = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.getTasks().then(tasks => {
      res.send({tasks})
    })
  })
}
exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      username: req.body.username
    }
  }).then(res.send({message: "User has been deleted"}));
}
// * I need another controller that returns all tasks that belong to a user           [X]
// * I also need something that will sort and search through a user's tasks           [X]
// * Tasks need to be dated, which I think Sequelize does automatically. That way calendar view works. This
//   needs to be handled in the frontend.                                             [X]
// * I need to create a controller to delete the right tasks as well                  [ ]
// * Put controller to update tasks and user information (username, password, email)  [ ]
// * Controller to change date on task                                                [ ]
// * Delete user account controller (as well as all tasks that are attached to said user account)     [ ]
// * Tasks need a start_date, start_time, and duration column for tracking when tasks should be done  [ ]