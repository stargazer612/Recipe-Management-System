const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "dbms",
});

app.post("/api/insert_user", (req, res) => {
  
  const name=req.body.name
  const uname=req.body.uname
  const password=req.body.password
  const city=req.body.city
  const state=req.body.state
  const sqlInsert="INSERT INTO user_info (name,uname,password,city,state) VALUES(?,?,?,?,?)"
  db.query(sqlInsert,[name,uname,password,city,state],(err,result)=>{
    console.log("error=",err);
    res.send(result);
  })
});

app.post("/api/insert_ingrediant", (req, res) => {
  
  const Iname=req.body.Iname
  const Rname=req.body.Rname
  const proportion=req.body.Proportion
  const sqlInsert="INSERT INTO ingrediant_table (Iname,Rname,proportion) VALUES(?,?,?)"
  db.query(sqlInsert,[Iname,Rname,proportion],(err,result)=>{
    console.log("ing error=",err);
    console.log(result);
    res.send(result);
  })
});

app.post("/api/insert_step", (req, res) => {
  const Rname=req.body.Recname
  const dis=req.body.Step
  const sqlInsert="INSERT INTO step (recname,dis) VALUES(?,?)"
  db.query(sqlInsert,[Rname,dis],(err,result)=>{
    console.log("ing error=",err);
    console.log(result);
    res.send(result);
  })
});

app.post("/api/insert_recipe", (req, res) => {
  
  const Rname=req.body.Rname
  const uname=req.body.uname
  const category=req.body.category
  const cuisine=req.body.cuisine
  const dis=req.body.Dis
  const sqlInsert="INSERT INTO rec_table (Rname,uname,category,cuisine,Description) VALUES(?,?,?,?,?)"
  db.query(sqlInsert,[Rname,uname,category,cuisine,dis],(err,result)=>{
    console.log("error=",err);
    res.send(result);
  })
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM user_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get_allrecipe", (req, res) => {
  db.query("SELECT * FROM rec_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get_cat", (req, res) => {
  db.query("SELECT DISTINCT category FROM rec_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get_recipe", (req, res) => {
  const cat =req.query.category
  const cuisine=req.query.Cuisine
  console.log(cuisine)
  db.query("SELECT DISTINCT * FROM rec_table WHERE cuisine=? AND category=?", [cuisine,cat],(err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get_r", (req, res) => {
  const Rname =req.query.r
  console.log("query",req.query.r)
    db.query("SELECT  * FROM rec_table WHERE Rname = ?", Rname,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get_i", (req, res) => {
  const Rname =req.query.r
  console.log("query",req.query.r)
    db.query("SELECT  * FROM ingrediant_table WHERE Rname = ?", Rname,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get_s", (req, res) => {
  const Rname =req.query.r
  console.log("query",req.query.r)
    db.query("SELECT  * FROM step WHERE recname = ?", Rname,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get_cuisine/:category", (req, res) => {
  const category=req.params.category
  console.log(category)
  db.query("SELECT DISTINCT cuisine FROM rec_table WHERE category=?",category, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/login", (req, res) => {
  const uname=req.body.uname
  const password=req.body.password
  const sqlInsert="SELECT * FROM user_info WHERE uname = ? AND password = ?"
  db.query(sqlInsert,[uname,password],(err,result)=>{
    if(err){
      res.send({ err: err });
    }

    if(result.length > 0){
      // console.log(err);
      console.log(result);
      res.send(result);
    }
    else{
      res.send({message : "Wrong username/password!" });
    }
  })
});

app.delete("/api/delete/:uname", (req, res) => {
  const uname = req.params.uname;
  db.query("DELETE FROM user_info WHERE uname = ?", uname, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/api/delete_ing", (req, res) => {
  const Iid = req.query.Iid;
  db.query("DELETE FROM ingrediant_table WHERE Iid = ?", Iid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/delete_rec/:R", (req, res) => {
  const Rname = req.params.R;
  db.query("DELETE FROM rec_table WHERE Rname = ?", Rname, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const uname = req.body.Uname;
  const newuname=req.body.NewUname
  const name = req.body.name;
  const city = req.body.city;
  const state = req.body.state;
  db.query(
    "UPDATE user_info SET  uname=? , name=?, city=?, state=? WHERE uname = ?",
    [newuname,name,city,state,uname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.put("/api/update_R", (req, res) => {
  const Rname = req.body.Rname;
  const newr = req.body.newr;
  const Cat = req.body.Cat;
  const Cus = req.body.Cus;
  const des = req.body.des;
  db.query(
    "UPDATE rec_table SET  Rname=?, category=?, cuisine=?, Description=? WHERE Rname = ?",
    [newr,Cat,Cus,des,Rname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.put("/api/update_ing", (req, res) => {
  const Iid = req.body.Iid;
  const Iname = req.body.Iname;
  const proportion=req.body.proportion;
  db.query(
    "UPDATE ingrediant_table SET Iname=? , proportion=? WHERE Iid = ?",
    [Iname,proportion,Iid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
app.put("/api/update_step", (req, res) => {
  const idstep = req.body.idstep;
  const dis = req.body.dis;
  db.query(
    "UPDATE step SET dis = ? WHERE idstep = ?",
    [dis,idstep],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

// app.post("/api/insert", (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   db.query(
//     "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.get("/employees", (req, res) => {
//   db.query("SELECT * FROM employees", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});