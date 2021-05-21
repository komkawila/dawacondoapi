const express = require("express");
const mysql = require("mysql");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
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
    db.query("UPDATE state SET status=" + state + " WHERE id=1", function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
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

app.get("/adminnews", (req, res) => {
    db.query("SELECT * FROM `news_tb`", function (err, result, fields) {
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
    db.query("SELECT * FROM `news_tb` WHERE user_id = " + user_id + " OR user_id = 0", function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

app.post("/addnews1", (req, res) => {
    const user_id = req.body.user_id;
    const news = req.body.news;
    console.log(user_id);
    // db.query("INSERT INTO news_tb(user_id, news) VALUES (?,\'?\')",[user_id,news], function (err, result, fields) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.send(result);
    //         console.log(result);
    //     }
    // });
});


app.post("/addnews", (req, res) => {
    const user_id = req.body.user_id;
    const news = req.body.news;
    
    console.log("user_id = ");
    console.log(user_id);
    console.log("news = ");
    console.log(news);
    res.send("result");
    // db.query("INSERT INTO users_tb(uid, email, name, phonenumber, status, address, namestore, typeStore, food, addressStore, gender) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    // [uid,email,name,phonenumber,status,address,namestore,typeStore,food,addressStore,gender], function (err, result, fields) {
    //   if (err) {
    //     console.log(err);
    //     res.send("[]");
    //   } else {
    //     res.send(result);
    //     console.log(result);
    //   }
    // });
  });

// app.get("/news", (req, res) => {
//     db.query("SELECT * FROM `news_tb` WHERE", function (err, result, fields) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//             console.log(result);
//         }
//     });
// });

app.listen(3001, () => console.log("Server Started..."));