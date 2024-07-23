const con = require('../route/mysql_con');


const reg = (req, res) => {
    res.header('content-type', 'application/json');
    try {
      const { Status, ConsultingID, PatientName, HCR, SickType, Assignee, Date, View, Edit, Delete } = req.body;
  
      // Check if ConsultingID already exists
      const checkQuery = 'SELECT COUNT(*) AS count FROM Dashboard WHERE ConsultingID = ?';
      con.query(checkQuery, [ConsultingID], (checkErr, checkResult) => {
        if (checkErr) {
          console.error('Error checking ConsultingID:', checkErr);
          res.status(500).send('Error checking ConsultingID');
        } else {
          const count = checkResult[0].count;
          if (count > 0) {
            res.status(409).send('Duplicate ConsultingID. Entry already exists.');
          } else {
            // Insert the data if ConsultingID does not exist
            const query = `
              INSERT INTO Dashboard (Status, ConsultingID, PatientName, HCR, SickType, Assignee, Date, View, Edit, \`Delete\`)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [Status, ConsultingID, PatientName, HCR, SickType, Assignee, Date, View, Edit, Delete];
            con.query(query, values, (err, result) => {
              if (err) {
                console.error('Error adding entry:', err);
                res.status(500).send('Error adding entry');
              } else {
                res.status(201).send('Entry added successfully');
              }
            });
          }
        }
      });
    } catch (ex) {
      console.error('Error:', ex);
      res.status(500).json({ Result: "Failure", message: ex.message });
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