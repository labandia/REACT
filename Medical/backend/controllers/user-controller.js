const userServices = require('../services/user.services');

const getalluserController = async (req, res) =>{
   try {
      let data = await userServices.getUser();
       res.json({ success: true, payload: data});
   } catch (error) {
      res.status(403).json({ error });
   }
}

const getuserbyIdController = async (req, res) =>{
   let id = req.params.id;
   try {
      let data = await userServices.getUserById(id);
      res.json({ success: true, payload: data});
   } catch (error) {
      res.status(403).json({ error });
   }
}

const updatemuserController = async (req, res)=>{
   try {
        await userServices.updateusers(req.body);
        res.json({ success: true, message: 'Update Successful'});
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the users" });
   }
}

const deleteuserController = async (req, res)=>{
   let id = req.params.id;

   try {
      await userServices.deleteuser(id);
      res.json({ message: 'Deleted Successfully' });
   } catch (error) {
      res.status(401).json({ success: false, msg: "Failed to edit the medicine" });
   }
}

module.exports = {
   getalluserController,
   getuserbyIdController,
   deleteuserController,
   updatemuserController
}