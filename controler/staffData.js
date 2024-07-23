const con = require('../route/mysql_con');

const reg = (req, res) => {
    res.header('content-type', 'application/json');
    try {
        const { Profile, Name, Designation, HCR, staff_contact, Last_update, View, Edit, Delete } = req.body;
        
        const checkQuery = 'SELECT COUNT(*) AS count FROM staff WHERE Profile = ? AND Name = ?';
        con.query(checkQuery, [Profile, Name], (err, result) => {
            if (result[0].count > 0) {
                return res.status(409).send('Record with the same Profile and Name already exists');
            } else {
                const query = 'INSERT INTO staff (Profile, Name, Designation, HCR, staff_contact, Last_update, View, Edit, `Delete`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [Profile, Name, Designation, HCR, staff_contact, Last_update, View, Edit, Delete];

                con.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error adding register:', err);
                        return res.status(500).send('Error adding student');
                    } else {
                        return res.status(201).send('Student added successfully');
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