const mysql = require('mysql');
const express = require('express')
var app = express();
const bodyparser = require('body-parser')
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'superMarketDB',
    multipleStatements:true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB Connection succeded')
    else
        console.log('DB Connection failed \n Error : ' + JSON.stringify(err, undefined, 2))

});

app.listen(3000, () => console.log('Express server at port no: 3000 '))

//get all supermarket item
app.get('/supermarket', (req, res) => {
    mysqlConnection.query('SELECT * FROM supermarket', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
        
    })
});

//get particular supermarket item
app.get('/supermarket/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM supermarket WHERE Id =?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
});

//Delete supermarket item
app.delete('/supermarket/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM supermarket WHERE Id =?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted Successfully');
            else
                console.log(err);
        })
});
//Insert supermarket item
app.post('/supermarket', (req, res) => {
    let sm = req.body;
    var sql = "SET @Id = ?;SET @Name = ?; SET @Cost = ?; SET @Description = ?;\
    CALL supermarketAddOrEdit(@Id,@Name,@Cost,@Description);";
    mysqlConnection.query(sql, [sm.Id, sm.Name, sm.Cost, sm.Description],(err, rows, fields) => {
        if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                      res.send('Inserted id: '+element[0].Id);
                });
            else
                console.log(err);
        })
});

//Update supermarket item
app.put('/supermarket', (req, res) => {
    let sm = req.body;
    var sql = "SET @Id = ?;SET @Name = ?; SET @Cost = ?; SET @Description = ?;\
    CALL supermarketAddOrEdit(@Id,@Name,@Cost,@Description);";
    mysqlConnection.query(sql, [sm.Id, sm.Name, sm.Cost, sm.Description], (err, rows, fields) => {
        if (!err)
                    res.send('Updated Successfully');
           
        else
            console.log(err);
    })
});















