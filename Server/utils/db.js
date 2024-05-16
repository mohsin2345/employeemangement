import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee"
});

con.connect(function(err) {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

export default con;
