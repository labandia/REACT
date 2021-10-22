const express = require('express');
const app = express();

const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'reactdb_sample'
});


//
app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    db.query('INSERT INTO sample_tbl (name, email) VALUES (?,?)', [name, email], 
    (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send("VALUES INSERT SUCCESS");
        }
    })
});

app.get('/fulldetails', (req, res) => {
    db.query("SELECT * FROM sample_tbl", (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
});

app.put('/updateinfo', (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.name;
    db.query("UPDATE sample_tbl SET  name = ?, email = ? WHERE id = ?", [name, email, id], 
    (err, result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
});

app.delete('/del/:id', (req, res)=>{
    const id = req.params.id;
    db.query("DELETE FROM sample_tbl WHERE id = ?", id, 
    (err, result)=>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})


app.listen(3001, ()=>{
    console.log("server running a port 3001")
})