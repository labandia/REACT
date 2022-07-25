const connection = require('../config/Connection');


const getinventory = async () => {
    let query = `SELECT tbl_stocks.stockin_id  ,tbl_medicine.med_name AS description, tbl_medicine.med_id, tbl_stocks.exp_date as exp,  tbl_stocks.qty as quantity, tbl_stocks.price as price  FROM tbl_stocks, tbl_medicine WHERE tbl_stocks.med_id = tbl_medicine.med_id`;
    const [store] = await connection.query(query);
    return store; 
}



module.exports = {
   getinventory
}