const medicinService = require('../services/medicine.services');

const createmedicineController = async (req, res) =>{
   const {med_name, med_desc, class_id} = req.body;

   try {
       await medicinService.addmedicine(med_name, med_desc, class_id);
       res.json({ success: true, message: 'New medicine added in the database'});
   } catch (error) {
      res.status(400).json({ error })
   }
}

const getmedicineController = async (req, res)=>{
   try {
      let med = await medicinService.getmedicine();
      res.json({ success: true, payload: med});
   } catch (error) {
      res.status(403).json({ error });
   }
}

const updatemedicineController = async (req, res)=>{
   const {med_name, med_desc, class_id, med_id} = req.body;
   try {
      await medicinService.updatemedicine(med_name, med_desc, class_id, med_id);
      res.json({ success: true, message: 'Update medicine'});
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the medicine" });
   }
}

const deletemedicineController = async (req, res)=>{
   let id = req.params.id;

   try {
      await medicinService.deletemedById(id);
      res.json({ message: 'Deleted Successfully' });
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the medicine" });
   }
}

module.exports = {
   createmedicineController,
   getmedicineController,
   updatemedicineController,
   deletemedicineController
}