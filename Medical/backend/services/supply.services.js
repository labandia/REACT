const connection = require('../config/Connection');

const addsupply = async (med_name, med_desc, class_id) =>{
   const [data] = await connection.query("INSERT INTO tbl_medicine (med_name, med_desc, class_id) VALUES (?,?,?)", 
        [med_name, med_desc, class_id]);
   return data;
}

const getsupply = async () => {
    let query = `SELECT * FROM tbl_suppliers`;
    const [data] = await connection.query(query);
    return data; 
}

const getsupplyById = async(params)=>{
    const query = 'SELECT * FROM tbl_suppliers WHERE sup_id = ?';
    const [data] = await connection.query(query, params);
    return data;
}

const updatesupply = async (med_name, med_desc, class_id, params) =>{
    const [data] = await connection.query('UPDATE tbl_medicine SET med_name=?, med_desc=?, class_id=? WHERE med_id = ?', 
    [med_name, med_desc, class_id, params]);
    return data;
}

const deletesupplyById = async (id) => {
    const query = 'DELETE FROM tbl_medicine WHERE med_id = ?';
    return await connection.query(query, id);
};

const checksupply = async (medname) => {
   const [data] = await connection.query('SELECT * FROM tbl_medicine WHERE med_name = ?', [medname]);
   return data.length;
}

module.exports = {
   checksupply,
   addsupply,
   getsupply,
   updatesupply,
   deletesupplyById,
   getsupplyById
}