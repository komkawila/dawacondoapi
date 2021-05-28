const express = require("express");
const app = express();
const mysql = require("mysql");
var cors = require("cors");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dawaconda",
// });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vJPD6yy9HoiGWM",
    database: "dawacondo",
  });


app.get("/state", (req, res) => {
  db.query("SELECT * FROM state WHERE id=1", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
      console.log(result[0]);
    }
  });
});

app.get("/updatestate/:state", (req, res) => {
  const state = req.params.state;
  db.query(
    "UPDATE state SET status=" + state + " WHERE id=1",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM `user_tb`", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get("/news", (req, res) => {
  db.query("SELECT * FROM `news_tb` ORDER BY id DESC", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get("/news/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT * FROM `news_tb` WHERE user_id = " + user_id + " OR user_id = 0 ORDER BY id DESC",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/getrooms", (req, res) => {
  //   "SELECT rooms FROM user_tb GROUP BY rooms order by status asc";
  db.query(
    "SELECT rooms FROM user_tb GROUP BY rooms order by status asc",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});
app.post("/insertnews", (req, res) => {
  var user_id = 0;
  const news = req.body.news;
  const room = req.body.room;

  console.log("room = ");
  console.log(room);
  console.log("news = ");
  console.log(news);
  if (room == "ADMIN") {
    db.query(
      "INSERT INTO news_tb(user_id, news,room) VALUES (?,?,?)",
      [0, news, room],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.send(result);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  } else {
    db.query(
      'SELECT id FROM user_tb WHERE rooms = "' + room + '"',
      function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          // res.send(result);
          user_id = result[0].id;
          console.log(result[0].id);
          db.query(
            "INSERT INTO news_tb(user_id, news,room) VALUES (?,?,?)",
            [user_id, news, room],
            function (err, result, fields) {
              if (err) {
                console.log(err);
                res.send(result);
              } else {
                res.send(result);
                console.log(result);
              }
            }
          );
        }
      }
    );
  }

  //   db.query(
  //     "INSERT INTO news_tb(user_id, news,room) VALUES (?,?,?)",
  //     [user_id, news, room],
  //     function (err, result, fields) {
  //       if (err) {
  //         console.log(err);
  //         res.send(result);
  //       } else {
  //         res.send(result);
  //         console.log(result);
  //       }
  //     }
  //   );
});
app.delete("/deletenews/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM news_tb WHERE id = " + id,
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send(result);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/insertusers", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const status = 1;
  const rooms = req.body.rooms;

  console.log("username = ");
  console.log(username);
  console.log("password = ");
  console.log(password);
  console.log("status = ");
  console.log(status);
  console.log("rooms = ");
  console.log(rooms);
  db.query(
    "INSERT INTO user_tb(username, password, status, rooms) VALUES (?,?,?,?)",
    [username, password, status, rooms],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send(result);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.listen(3001, () => console.log("Server Started..."));

