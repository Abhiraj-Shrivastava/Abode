var mysql=require('mysql')
var pools=mysql.createPool({

    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'abode',
    connectionLimit:100
})
module.exports = pools;