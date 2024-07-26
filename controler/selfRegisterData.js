const con = require('../route/mysql_con');

const reg = (req, res) => {
    res.header('Content-Type', 'application/json');
    try {
        const {
            Organ_Name, Organ_Type, Email_ID, Organ_Mobile_Number, Address,
            State, Pincode, GST_Number, Count_of_Students, Count_of_Staffs,
            Organ_Registration_number, Upload_Documents, Referral_Code,
            How_Did_You_Hear_About_Us, Contact_Name, Contact_Designation,
            Contact_Email_ID, Contact_Mobile_Number, Username, Password
        } = req.body;

        // Validate Email_ID and Contact_Email_ID
        const emailPattern = /^[^\s@]+@[^\s@]+\.com$/i;
        if (!emailPattern.test(Email_ID) || !Email_ID.endsWith('@gmail.com') ||
            !emailPattern.test(Contact_Email_ID) || !Contact_Email_ID.endsWith('@gmail.com')) {
            return res.status(400).json({
                Result: 'Failure',
                message: 'Invalid email address. Emails must end with @gmail.com'
            });
        }

        // Validate Mobile Numbers
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(Organ_Mobile_Number) || !mobilePattern.test(Contact_Mobile_Number)) {
            return res.status(400).json({
                Result: 'Failure',
                message: 'Mobile numbers must be exactly 10 digits'
            });
        }

        // SQL query to insert data
        const query = `
            INSERT INTO selfregister (
                Organ_Name, Organ_Type, Email_ID, Organ_Mobile_Number, Address,
                State, Pincode, GST_Number, Count_of_Students, Count_of_Staffs,
                Organ_Registration_number, Upload_Documents, Referral_Code,
                How_Did_You_Hear_About_Us, Contact_Name, Contact_Designation,
                Contact_Email_ID, Contact_Mobile_Number, Username, Password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        con.query(query, [
            Organ_Name, Organ_Type, Email_ID, Organ_Mobile_Number, Address,
            State, Pincode, GST_Number, Count_of_Students, Count_of_Staffs,
            Organ_Registration_number, Upload_Documents, Referral_Code,
            How_Did_You_Hear_About_Us, Contact_Name, Contact_Designation,
            Contact_Email_ID, Contact_Mobile_Number, Username, Password
        ], (err, result) => {
            if (err) {
                console.error('Error adding organization:', err);
                res.status(500).json({
                    Result: 'Failure',
                    message: 'Error adding organization',
                    error: err.message
                });
            } else {
                res.status(201).send('Student added successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            Result: 'Failure',
            message: error.message
        });
    }
};

const regList = (req, res) => {
    const query = 'SELECT * FROM reg'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
}

const login = (req, res) => {
    try {
        const { Username, Password } = req.body;

        const checkData = 'SELECT Password FROM selfregister WHERE Username = ? AND Password = ?';
        con.query(checkData, [Username, Password], (error, results) => {
            // if (error) {
            //     console.error('Error executing query:', error);
            //     return res.status(500).json({ Result: "Failure", message: "Error executing query" });
            // }
            if (results.length > 0) {
                return res.status(200).json({ Result: "Success", message: "User successfully logged in" });
            } else {
                return res.status(401).json({ Result: "Failure", message: "Invalid username or password" });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}

const loginDelete = (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
        console.log(`Deleting user with ID: ${id}`);
        con.query(query, [id], (err, result) => {
            if (err) {
                console.log("Error deleting the user", err);
                return res.status(500).send('Error deleting user');
            } else if (result.affectedRows === 0) {
                console.log(`No user found with ID: ${id}`);
                return res.status(404).send('User not found');
            } else {
                console.log(`User deleted with ID: ${id}`);
                res.status(200).send('User deleted successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}

const loginList = (req, res) => {
    const query = 'SELECT * FROM users';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).send({ Result: 'Success', data: results });
    });
}

const forgot =  (req, res) => {
    try {
        const { id } = req.params;
        const { new_password } = req.body;
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        console.log(`Updating password for user with ID: ${id}`);
        con.query(query, [new_password, id], (err, result) => {
            if (err) {
                console.log("Error updating the password", err);
                return res.status(500).send('Error updating password');
            } else if (result.affectedRows === 0) {
                console.log(`No user found with ID: ${id}`);
                return res.status(404).send('User not found');
            } else {
                console.log(`Password updated for user with ID: ${id}`);
                res.status(200).send('Password updated successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}

module.exports ={
    reg,
    regList,
    login,
    loginList,
    loginDelete,
    forgot,
}