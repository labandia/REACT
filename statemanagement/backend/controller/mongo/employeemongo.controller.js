const Employee = require("../../data/Employee");

const getallEmployee = async (req, res) => {
   const employee = await Employee.find();
   if (!employee) return res.status(204).json({ message: "No employee found" });
   res.json(employee);
};

const createEmployee = async (req, res) => {
   const { firstname, lastname } = req.body;

   if (!firstname || !lastname)
      return res.status(400).json({
         message: "Firstname and lastname is required",
      });

   try {
      const result = await Employee.create({
         firstname: firstname,
         lastname: lastname,
      });

      res.status(201).json(result);
   } catch (error) {}
};

const updateEmployee = async (req, res) => {
   const { firstname, lastname, id } = req.body;
   const employee = await Employee.findOne({ _id: id }).exec();

   if (!employee) {
      return res.status(204).json({ message: `Employee ID ${id} not found` });
   }

   if (firstname) employee.firstname = firstname;
   if (lastname) employee.lastname = lastname;

   const result = await employee.save();

   res.json(result);
};

const deleteEmployee = async (req, res) => {
   const id = req.body.id;

   if (!id) return res.status(400).json({ message: "Employee ID required" });

   const employee = await Employee.findOne({ _id: id }).exec();

   if (!employee)
      return res.status(204).json({ message: `Employee ID ${id} not found` });

   const result = await employee.deleteOne({ _id: id });

   res.json(result);
};

const getallEmployeeByID = async (req, res) => {
   const id = req.params.id;

   if (!id) return res.status(400).json({ message: "Employee ID required" });
   const employee = await Employee.findOne({ _id: id }).exec();
   if (!employee) {
      return res.status(204).json({ message: `Employee ID ${id} not found` });
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
