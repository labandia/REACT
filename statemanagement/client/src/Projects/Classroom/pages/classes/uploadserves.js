import axios from "../../api/axios";

export const Filepath = async (data, id) => {
   let formdata = new FormData();
   formdata = upload(data);

   try {
      let res = await axios.post(`uploads/${id}`, formdata);
      return res.data.filepath;
   } catch (error) {
      console.log(error);
   }
};

function upload(file) {
   let formdata = new FormData();
   for (var i = 0; i < file.length; i++) {
      formdata.append("file[]", file[i]);
   }
   return formdata;
}

export const getfileExt = (filename) => {
   return filename.split(".").pop();
};

export const splitstring = (filestring) => {
   let arr1 = filestring.split(":");
   let filearray = [];
   for (let i = 0; i < arr1.length; i++) {
      let arr2 = arr1[i].split("?");
      filearray.push({
         name: arr2[0],
         link: this._ds.fileUrl + arr2[1],
         path: arr2[1],
      });
   }
   return filearray;
};

export const sampleExternal = (name) => {
   console.log("HELLO" + name);
};
