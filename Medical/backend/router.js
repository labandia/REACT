const express = require('express');
const multer = require('multer');
const utils = require('./lib/util');
const router = express.Router();
const path = require('path');
const connection = require('./config/Connection');
const bcrypt = require('bcryptjs');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const dir = './upload/'+file.fieldname;
        if(file.fieldname === 'images'){
            cb(null, dir);
        }if(file.fieldname === 'profiles'){
            cb(null, dir);
        }
    },
    filename: function(req, file, cb){
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
    
})


const upload = multer({
    storage: storage
})



// GET DATA FOR DASHBOARD // 

router.get('/sales', (req, res)=>{
    connection.query("select year(date) as year,MONTHNAME(date) as month,sum(total_sales) as totalsales from tbl_sales group by year(date),month(date) order by year(date),month(date)",  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})


router.get('/low', (req, res)=>{
    connection.query("SELECT (SELECT sum(qty) from tbl_stocks WHERE qty <= 10) as low, (SELECT sum(qty) FROM tbl_stocks WHERE qty >= 10) as remain,(SELECT sum(qty) FROM tbl_stockin WHERE status = 'undone') as upcoming",  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})


router.get('/remain', (req, res)=>{
    connection.query("SELECT sum(qty) as remain FROM tbl_stocks WHERE qty >= 10",  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})


router.get('/handles', (req, res)=>{
    connection.query("SELECT sum(qty) as handle FROM tbl_stockin WHERE status = 'undone'",  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})


// GET DATA FOR SUPPLIERS // 

router.get('/getsuppliers', (req, res)=>{
    connection.query("SELECT * FROM tbl_suppliers",  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})


router.get('/getsupbyId/:id', (req, res)=>{
    let id = req.params.id;

    connection.query("SELECT * FROM tbl_suppliers WHERE sup_id = ? ", [id],  (err, result) => {
        if(result.length > 0){
            res.status(200).json({ success: true, data: result});
        }else{
            res.status(401).json({ success: false, msg: "Failed to get the data" });
        }
    });
})







// POST DATA FOR MEDICINE // 
router.use('/viewmed', express.static('upload/images'));


router.post('/addsupplier', (req, res) => {
    const supplies = req.body;
    try {
        connection.query("INSERT INTO tbl_suppliers (sup_name, sup_address, sup_contact) VALUES (?,?,?)", 
        [supplies.name, supplies.address, supplies.contact],  
            (err, response) => {
            if(response.length != 0){
                res.status(201).json({ success: true, message: 'Supplier added Created', data: response[0]});
            }else{
                res.status(401).json({ success: false, msg: "Failed to insert" });
            }
        });
    } catch (error) {
        res.send({error: error.message})
    }
});

router.post('/editsupplier', (req, res) => {
    const supplies = req.body;
    
    connection.query('UPDATE tbl_suppliers SET sup_name=?, sup_address=?, sup_contact=? WHERE sup_id = ?', 
    [supplies.sup_name, supplies.sup_address, supplies.sup_contact, supplies.sup_id],
    (err, result) => {
        if(result){
            res.status(200).json({ success: true, message: 'Update success'});
        }else{
            res.status(401).json({ success: false, msg: "Failed to edit the user" });
        }
    });
});


router.post('/deletesupplier/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM tbl_suppliers WHERE sup_id = ?", [id], (err, result) => {
        if(result){
            res.status(200).json({ success: true, message: 'Delete success'});
        }else{
            res.status(401).json({ success: false, msg: "Failed to delete the user" });
        }
    });
});


// ============== UPLOAD IMAGE DATA ================== // 

router.post('/upload', upload.any(), (req, res)=>{
    res.json({
        success: 1,
        profile_url: `http://localhost:5000/view/${req.files[0].filename}`
    })
})



// ============ EXPORT ALL ROUTERS ========================= //
module.exports = router;