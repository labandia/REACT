const connection = require('../config/Connection');

const getdataanayltics = async () =>{
    const [sales] = await connection.query('select year(date) as year,MONTHNAME(date) as month,sum(total_sales) as totalsales from tbl_sales group by year(date),month(date) order by year(date),month(date)');
    const [low] = await connection.query(`SELECT (SELECT sum(qty) from tbl_stocks WHERE qty <= 10) as low, (SELECT sum(qty) FROM tbl_stocks WHERE qty >= 10) as remain,(SELECT sum(qty) FROM tbl_stockin WHERE status = 'undone') as upcoming`);
    const [remain] = await connection.query(`SELECT sum(qty) as remain FROM tbl_stocks WHERE qty >= 10`);

    return {sales, low, remain}; 
}

module.exports = {
   getdataanayltics
}