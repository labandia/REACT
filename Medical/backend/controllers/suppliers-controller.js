const supplyServices = require('../services/supply.services');

const createsupplycontroller = async (req, res) =>{
   try {
       await medicinService.addmedicine(req.body);
       res.json({ success: true, message: 'New Supplier added in the database'});
   } catch (error) {
      res.status(400).json({ error })
   }
}

const getsupplyController = async (req, res)=>{
   try {
      let med = await supplyServices.getsupply();
      res.json({ success: true, payload: med});
   } catch (error) {
      res.status(403).json({ error });
   }
}

const getsupplybyIdController = async (req, res) =>{
   let id = req.params.id;
   try {
      let data = await supplyServices.getsupplyById(id);
      res.json({ success: true, payload: data});
   } catch (error) {
      res.status(403).json({ error });
   }
}

const updatesupplyController = async (req, res)=>{
   try {
      await medicinService.updatemedicine(req.body);
      res.json({ success: true, message: 'Update medicine'});
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the medicine" });
   }
}

const deletesupplyController = async (req, res)=>{
   let id = req.params.id;

   try {
      await medicinService.deletemedById(id);
      res.json({ message: 'Deleted Successfully' });
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the medicine" });
   }
}

module.exports = {
   createsupplycontroller,
   getsupplyController,
   updatesupplyController,
   deletesupplyController,
   getsupplybyIdController
}