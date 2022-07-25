const dataServices = require('../services/data.services');

const readdataController = async (req, res) =>{
   try {
       let data = await dataServices.getdataanayltics();
       res.json({ success: true, data});
   } catch (error) {
      res.status(400).json({ error })
   }
}

module.exports = {
   readdataController
}