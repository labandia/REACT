import { useState, useRef } from "react";
import axios from "../Classroom/api/axios";

const Uploadsite = () => {
   const fileRef = useRef();
   const [selectedFile, setSelectedFile] = useState();
   const [isFilePicked, setIsFilePicked] = useState(false);
   const [file, setfile] = useState([]);
   let withfile = 0;

   const filehandler = (e) => {
      let fileval = e.target.files;
      for (let i = 0; i < fileval.length; i++) {
         file.push(e.target.files[i]);
         let ext = file[i].name.split(".").pop();
         console.log(ext);
         switch (ext) {
            case "txt":
            case "doc":
            case "docx":
            case "html":
            case "htm":
            case "odt":
            case "pdf":
            case "xls":
            case "xlsx":
            case "ods":
            case "pdf":
            case "ppt":
            case "pptx":
               withfile = 5;
               break;
            case "m4v":
            case "avi":
            case "mpg":
            case "mp4":
               withfile = 2;
               break;
            case "jpg":
            case "gif":
            case "bmp":
            case "png":
            case "jpeg":
               withfile = 1;
               break;
         }
      }
      // console.log(fileval.length);
      // console.log(file);
      // console.log(withfile);
   };

   const submitfile = async () => {
      let content = {
         data: {
            classcode_fld: 1234,
            authorid_fld: 1234,
            content_fld: "sdsds",
            withfile_fld: 4,
            dir_fld: "sdsd",
         },
         notif: {
            id: 2019,
            recipient: 203039,
            message: "sdsdad",
            module: "classroom",
         },
      };

      // const formData = new FormData();
      // for (var i = 0; i < file.length; i++) {
      //    formData.append("file[]", file[i]);
      // }

      try {
         let res = await axios.post("newpost", content);
      } catch (error) {}
   };

   // let fileupload = (upload) => {
   //    const formData = new FormData();
   //    for (var i = 0; i < file.length; i++) {
   //       formData.append("file[]", file[i]);
   //    }
   //    formData.append("payload", JSON.stringify(upload));
   // };

   return (
      <div>
         <input
            ref={fileRef}
            onChange={filehandler}
            multiple={true}
            type="file"
            hidden
         />
         <button onClick={() => fileRef.current.click()}>
            BUTTON CLICK HERE
            <i className="bx bx-image-add"></i>
         </button>

         <button onClick={submitfile}>SUBMIT</button>
      </div>
   );
};

export default Uploadsite;
