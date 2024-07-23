const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "medshyne",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");

  // const checkTableStaff = `
  //   SELECT * 
  //   FROM information_schema.tables 
  //   WHERE table_schema = 'medshyne' 
  //     AND table_name = 'staff';
  // `;

  // con.query(checkTableStaff, (error, results) => {
  //   if (error) {
  //     console.error('Error checking table existence:', error);
  //     return;
  //   }
  //   if (results.length > 0) {
  //     console.log('Table "staff" already exists.');
  //   } else {
  //     const tableStaff = `
  //       CREATE TABLE staff (
  //         id INT AUTO_INCREMENT PRIMARY KEY,
  //         Profile VARCHAR(250),
  //         Name VARCHAR(250),
  //         Designation VARCHAR(250),
  //         HCR VARCHAR(250),
  //         staff_contact INT,
  //         Last_update DATE,
  //         View VARCHAR(250),
  //         Edit VARCHAR(250),
  //         \`Delete\` VARCHAR(250)
  //       );
  //     `;
  //     con.query(tableStaff, (error) => {
  //       if (error) {
  //         console.error("Error creating table:", error);
  //         return;
  //       }
  //       console.log("Successfully created table 'staff'.");
  //     });
  //   }
  //   // Close the connection after all queries are done
  //   con.end();
  // });
});

module.exports = con;