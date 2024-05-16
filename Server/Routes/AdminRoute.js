import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path';



const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 
router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employees 
    (name, email, password, address, salary, image, category_id, DOJ) 
    VALUES (?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id,
            req.body.DOJ
        ];

        console.log("Values to be inserted:", values);

        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({ Status: false, Error: err });
            }

            console.log("Employee added successfully");
            return res.json({ Status: true });
        });
    });
});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id =?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employees set name= ?, email= ?, salary=?,address=?,category_id=? Where id =?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})
router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employees where id =?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })

    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})


router.post('/edit_salary', (req, res) => {
    // Extracting data from the request body
    const { id, name,   currentsalaryallowence,  presentallowence,  Healthcareallowence, fuelallowence,  otherallowence } = req.body;

    // Assuming you have a table named 'salary_allowances' with appropriate columns

    // SQL query to insert data into the 'salary_allowances' table
    const sql = `
        INSERT INTO salaryallowence
        (id, name, current_salary,fuel_allowance, present_allowance, healthcare_allowance, other_allowance) 
        VALUES (?, ?, ?, ?, ?, ?,?)
    `;

    // Values to be inserted into the table
    const values = [
     id,
     name,
     currentsalaryallowence,
     presentallowence,
     Healthcareallowence,
     fuelallowence,
     otherallowence,
    ];

    // Executing the query
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.json({ Status: false, Error: err });
        }

        console.log("Salary allowance added successfully");
        return res.json({ Status: true });
    });
});


router.post('/salary_slip', (req, res) => {
    const employeeId = req.body.id;
    const sql = "SELECT * FROM salaryallowence WHERE id = ?";
    con.query(sql, [employeeId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      if (result.length === 0) {
        return res.json({ Status: false, Error: "Employee not found" });
      }
      return res.json({ Status: true, Result: result });
    });
  });



export { router as adminRouter };
