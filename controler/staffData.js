const con = require('../route/mysql_con');

const reg = (req, res) => {
    res.header('content-type', 'application/json');
    try {
        // Extracting data from req.body
        const {
            profile,
            name,
            id_number,
            password,
            address,
            gender,
            state,
            pincode,
            division,
            date_of_birth,
            blood_group,
            department,
            designation,
            allergies,
            allergy_details,
            any_disease,
            disease_details,
            current_health_report,
            past_health_report,
            hcr,
            mobile_number
        } = req.body;
        

         // Accessing `class` with bracket notation
         const studentClass = req.body['class'];

         // Validation
         if (!id_number || typeof id_number !== 'string') {
             return res.status(400).json({ Result: "Failure", message: 'Invalid id_number' });
         }
 
         // Check if id_number already exists
         const checkQuery = 'SELECT COUNT(*) AS count FROM staffregister WHERE id_number = ?';
         con.query(checkQuery, [id_number], (err, result) => {
 
             if (result[0].count > 0) {
                 // If id_number exists, return a conflict response
                 return res.status(409).json({ Result: "Failure", message: 'id_number already exists' });
             } else {
                 // Validate other fields
                 if (!['Male', 'Female', 'Other'].includes(gender)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid gender' });
                 }
 
                 if (!/^\d{6}$/.test(pincode)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid pincode. Must be 6 digits.' });
                 }
 
                 if (!['Yes', 'No'].includes(allergies)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid allergies value' });
                 }
 
                 if (!['Yes', 'No'].includes(any_disease)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid any_disease value' });
                 }
 
                 if (!['Yes', 'No'].includes(hcr)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid hcr value' });
                 }
 
                 if (!/^\d{10}$/.test(mobile_number)) {
                     return res.status(400).json({ Result: "Failure", message: 'Invalid mobile_number. Must be 10 digits.' });
                 }
 
                 // SQL query to insert a new record into staffregister
                 const insertQuery = `
                     INSERT INTO staffregister (
                        profile, name, id_number, password, address, gender, state, pincode, class, division, date_of_birth, blood_group, department, designation, allergies, allergy_details, any_disease, disease_details, current_health_report, past_health_report, hcr, mobile_number
                     ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                     )
                 `;
                 const values = [
                    profile,name, id_number, password, address, gender, state, pincode, studentClass, division, date_of_birth, blood_group, department, designation, allergies, allergy_details, any_disease, disease_details, current_health_report, past_health_report, hcr, mobile_number
                 ];
 
                 // Execute the query
                 con.query(insertQuery, values, (err, result) => {
                     if (err) {
                         console.error('Error adding record:', err);
                         return res.status(500).json({ Result: "Failure", message: 'Error adding record' });
                     } else {
                         return res.status(201).send('Record added successfully');
                     }
                 });
             }
         });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ Result: "Failure", message: error.message });
    }
};


const view = (req, res) => {
    const query = 'SELECT * FROM staff'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving staff:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving staff' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
}

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const {Profile, Name, Designation, HCR, staff_contact, Last_update} = req.body;
        const query = 'UPDATE staff SET  Profile = ?, Name = ?, Designation =?, HCR = ?, staff_contact = ?, Last_update = ? WHERE id = ?';
        console.log(`Updating entry for staff with ID: ${id}`);
        con.query(query, [Profile, Name, Designation, HCR, staff_contact, Last_update, id], (err, result) => {
            if (err) {
                console.error("Error updating the staff entry", err);
                return res.status(500).send('Error updating staff');
            } else if (result.affectedRows === 0) {
                console.log(`No entry found with ID: ${id}`);
                return res.status(404).send('Entry not found');
            } else {
                console.log(`Entry updated for staff with ID: ${id}`);
                res.status(200).send('staff entry updated successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}

const deleteConsu = (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get id from URL
        const query = 'DELETE FROM staff WHERE id = ?';
        console.log(`Deleting staff entry with ID: ${id}`);
        
        con.query(query, [id], (err, result) => {
            if (err) {
                console.log("Error deleting the Dashboard entry", err);
                return res.status(500).send('Error deleting Dashboard entry');
            } else if (result.affectedRows === 0) {
                console.log(`No staff entry found with ID: ${id}`);
                return res.status(404).send('staff entry not found');
            } else {
                console.log(`staff entry deleted with ID: ${id}`);
                res.status(200).send('staff entry deleted successfully');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ Result: "Failure", message: error.message });
    }
}


module.exports ={
    reg,
    view,
    deleteConsu,
    edit,
}