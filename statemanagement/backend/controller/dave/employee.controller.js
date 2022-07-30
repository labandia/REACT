const employeeDB = {
   employee: require("../../data/employee.json"),
   setemployee: function (data) {
      this.employee = data;
   },
};

const fsPromises = require("fs").promises;
const path = require("path");
const genPassword = require("../../middleware/utils").genPassword;
const { v4: uuidv4 } = require("uuid");

const getallEmployee = (req, res) => {
   res.json(employeeDB.employee);
};

const createEmployee = async (req, res) => {
   const newEmployee = {
      id: employeeDB.employee[employeeDB.employee.length - 1].id + 1 || 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
   };

   if (!newEmployee.firstname || !newEmployee.lastname) {
      return res.status(400).json({
         message: "Firstname and lastname is required",
      });
   }

   employeeDB.setemployee([...employeeDB.employee, newEmployee]);

   await fsPromises.writeFile(
      path.join(__dirname, "../..", "data", "employee.json"),
      JSON.stringify(employeeDB.employee, null, 3)
   );

   res.json(employeeDB.employee);
};

const updateEmployee = (req, res) => {
   const employee = employeeDB.employee.find(
      (emp) => emp.id === parseInt(req.body.id)
   );

   if (!employee) {
      return res
         .status(400)
         .json({ message: `Employee ID ${req.body.id} not found` });
   }

   if (req.body.firstname) employee.firstname = req.body.firstname;
   if (req.body.lastname) employee.lastname = req.body.lastname;

   const filteredArray = employeeDB.employee.filter(
      (emp) => emp.id !== parseInt(req.body.id)
   );
   const unsortedArray = [...filteredArray, employee];
   employeeDB.setemployee(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
   );
   res.json(employeeDB.employee);
};

const deleteEmployee = (req, res) => {
   const employee = employeeDB.employee.find(
      (emp) => emp.id === parseInt(req.body.id)
   );
   if (!employee) {
      return res
         .status(400)
         .json({ message: `Employee ID ${req.body.id} not found` });
   }
   const filteredArray = employeeDB.employee.filter(
      (emp) => emp.id !== parseInt(req.body.id)
   );
   employeeDB.setemployee([...filteredArray]);
   res.json(employeeDB.employee);
};

const getallEmployeeByID = (req, res) => {
   const employee = employeeDB.employee.find(
      (emp) => emp.id === parseInt(req.params.id)
   );
   if (!employee) {
      return res
         .status(400)
         .json({ message: `Employee ID ${req.params.id} not found` });
   }
   res.json(employee);
};

module.exports = {
   getallEmployee,
   getallEmployeeByID,
   updateEmployee,
   createEmployee,
   deleteEmployee,
};
