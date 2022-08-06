const pool = require("../config/mysql-database");
const formatDate = require("../middleware/utils").formatDate;

async function codegenerator(code, table, filter) {
   let datename = new Date().getFullYear();
   let codestart = `${code}${datename.toString()}`;
   let lastelement = 0;
   try {
      let [res] = await pool.query(
         `SELECT * FROM ${table} ORDER BY ${filter} DESC LIMIT 1`
      );

      lastelement = res[0].postcode_fld.substr(-5);
      lastelement = parseInt(lastelement) + 1;
      let newcode = lastelement.toString();
      let ordercode = codestart + newcode.padStart(5, "0");

      return ordercode;
   } catch (error) {
      console.log(error);
   }
}

const uploadfiles = async (req, res) => {
   let files = req.files;
   let array = [];

   files.forEach((element) => {
      let a = `${element.originalname} ? ${element.path}`;
      array.push(a);
   });

   let filepath = array.join(":");
   res.json({ message: "Upload files successfull", filepath: filepath });
};

const classpost = async (req, res) => {
   const { classcode_fld, authorid_fld, content_fld, withfile_fld, dir_fld } =
      req.body.data;

   let postcode = await codegenerator("CP", "classpost_tbl", "postcode_fld");

   let datetime = formatDate(new Date());

   try {
      await pool.query(
         "INSERT INTO classpost_tbl (postcode_fld, classcode_fld, authorid_fld, content_fld, withfile_fld, dir_fld, datetime_fld) VALUES (?,?,?,?,?,?,?)",
         [
            postcode,
            classcode_fld,
            authorid_fld,
            content_fld,
            withfile_fld,
            dir_fld,
            datetime,
         ]
      );

      res.status(200).json({ message: "post added" });
   } catch (error) {
      res.status(500).json({ message: error });
   }
};

module.exports = {
   uploadfiles,
   classpost,
};
