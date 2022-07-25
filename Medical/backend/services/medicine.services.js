const connection = require('../config/Connection');

const addmedicine = async (med_name, med_desc, class_id) =>{
   const [med] = await connection.query("INSERT INTO tbl_medicine (med_name, med_desc, class_id) VALUES (?,?,?)", 
        [med_name, med_desc, class_id]);
   return med;
}

const getmedicine = async () => {
    let query = `SELECT m.med_id, m.med_name, m.med_desc, c.class_type FROM tbl_medicine as m, tbl_classification as c WHERE m.class_id = c.class_id`;
    const [medicine] = await connection.query(query);
    return medicine; 
}

const updatemedicine = async (med_name, med_desc, class_id, params) =>{
    const [update] = await connection.query('UPDATE tbl_medicine SET med_name=?, med_desc=?, class_id=? WHERE med_id = ?', 
    [med_name, med_desc, class_id, params]);
    return update;
}

const deletemedById = async (id) => {
    const query = 'DELETE FROM tbl_medicine WHERE med_id = ?';
    return await connection.query(query, id);
};

const checkmedicine = async (medname) => {
   const [meds] = await connection.query('SELECT * FROM tbl_medicine WHERE med_name = ?', [medname]);
   return meds.length;
}

module.exports = {
   checkmedicine,
   addmedicine,
   getmedicine,
   updatemedicine,
   deletemedById
}