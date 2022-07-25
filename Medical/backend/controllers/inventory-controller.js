const inventoryservices = require('../services/inventory.services');

const getinventoryController = async (req, res)=>{
   try {
      let data = await inventoryservices.getinventory();
      res.json({ success: true, payload: data});
   } catch (error) {
      res.status(403).json({ error });
   }
}


module.exports = {
   getinventoryController,   
}