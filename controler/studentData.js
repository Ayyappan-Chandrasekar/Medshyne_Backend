const con = require("../route/mysql_con");

const reg = (req, res) => {
  res.header("content-type", "application/json");
  try {
    const {
      Profile, Name, Division, HCR, ParentContact, LastUpdate, View, Edit, Delete,} = req.body;
    const checkQuery =
      "select count(*) as count from student where Profile =? and Name =?";
    con.query(checkQuery, [Profile, Name], (err, result) => {
      if (result[0].count > 0) {
        return res.send("Record already created Profile and Name is same");
      } else {
        const query =
          "INSERT INTO student (Profile, Name, Division, HCR, ParentContact, LastUpdate, View, Edit,  `Delete`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [Profile, Name, Division, HCR, ParentContact, LastUpdate, View, Edit, Delete,];
        con.query(query, values, (err, resuld) => {
          if (err) {
            console.error("You cannot add register:", err);
            console.log("You cannot add register:", err);
            res.status(404).send("Error adding student");
          } else {
            res.status(201).send("Student added successfully");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Result: "Failure", message: ex.message });
  }
};

const view = (req, res) => {
  const query = "SELECT * FROM student";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving student:", err);
      return res
        .status(500)
        .json({ Result: "Failure", message: "Error retrieving student" });
    }
    res.status(200).json({ Result: "Success", data: results });
  });
};

const edit = (req, res) => {
  try {
    const { id } = req.params;
    const { Division, HCR, ParentContact, LastUpdate } = req.body;
    const query =
      "UPDATE student SET Division = ?, HCR = ?, ParentContact = ?, LastUpdate = ? WHERE id = ?";
    console.log(`Updating entry for staff with ID: ${id}`);
    con.query(
      query,
      [Division, HCR, ParentContact, LastUpdate, id],
      (err, result) => {
        if (err) {
          console.error("Error updating the staff entry", err);
          return res.status(500).send("Error updating staff");
        } else if (result.affectedRows === 0) {
          console.log(`No entry found with ID: ${id}`);
          return res.status(404).send("Entry not found");
        } else {
          console.log(`Entry updated for staff with ID: ${id}`);
          res.status(200).send("staff entry updated successfully");
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Result: "Failure", message: error.message });
  }
};

const deleteConsu = (req, res) => {
  try {
    const { id } = req.params; // Use req.params to get id from URL
    const query = "DELETE FROM student WHERE id = ?";
    console.log(`Deleting student entry with ID: ${id}`);

    con.query(query, [id], (err, result) => {
      if (err) {
        console.log("Error deleting the student entry", err);
        return res.status(500).send("Error deleting student entry");
      } else if (result.affectedRows === 0) {
        console.log(`No student entry found with ID: ${id}`);
        return res.status(404).send("student entry not found");
      } else {
        console.log(`student entry deleted with ID: ${id}`);
        res.status(200).send("student entry deleted successfully");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Result: "Failure", message: error.message });
  }
};

module.exports = {
  reg,
  view,
  deleteConsu,
  edit,
};
