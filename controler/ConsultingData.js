const { application } = require('express');
const con = require('../route/mysql_con');

const reg = (req, res) => {
  res.header('content-type', 'application/json');
  
  try {
    const {Doctor_Name, ID_number, Name, Class, Division, Sick_Type, symtoms_desc, Rolles, From_Time } = req.body;

    // Check if ID_number already exists
    const checkID = 'SELECT COUNT(*) AS count FROM culsulting_details WHERE ID_number = ?';
    con.query(checkID, [ID_number], (error, result) => {
      if (error) {
        console.error("Error checking ID number:", error);
        return res.status(500).json({ Result: "Failure", message: 'Error checking ID number' });
      }

      if (result[0].count > 0) {
        console.log("ID number already registered");
        return res.status(400).json({ Result: "Failure", message: 'ID number already registered' });
      }

      // Insert data if ID number does not exist
      const query = `
        INSERT INTO culsulting_details (Doctor_Name, ID_number, Name, Class, Division, Sick_Type, symtoms_desc, Rolles, From_Time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [Doctor_Name, ID_number, Name, Class, Division, Sick_Type, symtoms_desc, Rolles, From_Time];
      
      con.query(query, values, (error, result) => {
        if (error) {
          console.error("Error adding entry:", error);
          return res.status(500).json({ Result: "Failure", message: 'Error adding entry' });
        } else {
          return res.status(201).json({ Result: "Success", message: 'Entry added successfully' });
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ Result: "Failure", message: error.message });
  }
};

const view = (req, res) => {
    const query = 'SELECT * FROM Dashboard'; 
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            return res.status(500).json({ Result: 'Failure', message: 'Error retrieving students' });
        }
        res.status(200).json({ Result: 'Success', data: results });
    });
}

const edit = (req, res) => {
    try {
        const { id } = req.params;
        const { Status, SickType, Assignee } = req.body;
        const query = 'UPDATE Dashboard SET Status = ?, SickType = ?, Assignee = ? WHERE id = ?';
        console.log(`Updating entry for Dashboard with ID: ${id}`);
        con.query(query, [Status, SickType, Assignee, id], (err, result) => {
            if (err) {
                console.log("Error updating the Dashboard entry", err);
                return res.status(500).send('Error updating Dashboard');
            } else if (result.affectedRows === 0) {
                console.log(`No entry found with ID: ${id}`);
                return res.status(404).send('Entry not found');
            } else {
                console.log(`Entry updated for Dashboard with ID: ${id}`);
                res.status(200).send('Dashboard entry updated successfully');
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
        const query = 'DELETE FROM Dashboard WHERE id = ?';
        console.log(`Deleting Dashboard entry with ID: ${id}`);
        
        con.query(query, [id], (err, result) => {
            if (err) {
                console.log("Error deleting the Dashboard entry", err);
                return res.status(500).send('Error deleting Dashboard entry');
            } else if (result.affectedRows === 0) {
                console.log(`No Dashboard entry found with ID: ${id}`);
                return res.status(404).send('Dashboard entry not found');
            } else {
                console.log(`Dashboard entry deleted with ID: ${id}`);
                res.status(200).send('Dashboard entry deleted successfully');
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