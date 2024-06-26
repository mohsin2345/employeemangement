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
    const { id, name, currentsalaryallowence, fuelallowence, presentallowence, Healthcareallowence, otherallowence, deuction, absentleave } = req.body;

    const query = `
        INSERT INTO salaryallowence
        (id, name, current_salary, fuel_allowance, present_allowance, healthcare_allowance, other_allowance, deuction, absentleave) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        current_salary = VALUES(current_salary),
        fuel_allowance = VALUES(fuel_allowance),
        present_allowance = VALUES(present_allowance),
        healthcare_allowance = VALUES(healthcare_allowance),
        other_allowance = VALUES(other_allowance),
        deuction = VALUES(deuction),
        absentleave = VALUES(absentleave)
    `;

    con.query(query, [id, name, currentsalaryallowence, fuelallowence, presentallowence, Healthcareallowence, otherallowence, deuction, absentleave], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ Status: false, Error: err.sqlMessage });
        } else {
            res.json({ Status: true });
        }
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


  router.get('/attendance/:date', (req, res) => {
    const dateStr = req.params.date;

    const selectQuery = `
        SELECT a.*, e.name AS employee_name
        FROM attendance a
        JOIN employees e ON a.employee_id = e.id
        WHERE a.date = ?
    `;
    
    con.query(selectQuery, [dateStr], (err, results) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            return res.json({ Status: false, Error: err.message });
        }

        return res.json({ Status: true, Result: results });
    });
});


// Save attendance for a specific date
router.post('/attendance', (req, res) => {
    const { date, attendance } = req.body;
    const dateStr = new Date(date).toISOString().split('T')[0];

    // First, delete existing attendance records for the date
    const deleteQuery = 'DELETE FROM attendance WHERE date = ?';
    con.query(deleteQuery, [dateStr], (err) => {
        if (err) {
            console.error('Error deleting old attendance:', err);
            return res.json({ Status: false, Error: err.message });
        }

        // Then, insert the new attendance records
        const insertQuery = 'INSERT INTO attendance (date, employee_id, status) VALUES ?';
        const attendanceData = attendance.map(emp => [dateStr, emp.employee_id, emp.status]);
        console.log(attendance);

        con.query(insertQuery, [attendanceData], (err) => {
            if (err) {
                console.error('Error saving attendance:', err);
                return res.json({ Status: false, Error: err.message });
            }

            return res.json({ Status: true, Message: 'Attendance saved successfully' });
        });
    });
});






export { router as adminRouter };
