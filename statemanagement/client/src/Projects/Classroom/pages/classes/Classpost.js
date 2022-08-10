import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Filepath, getfileExt } from "./uploadserves";

import { currentuser } from "../../redux/auth";
import { classesdata } from "../classes/ClassSelectSlice";
import { fetchposts, postdata, addposts } from "../classes/classpostSlice";

import Postuser from "./Postuser";
import Members from "./members";
import Resources from "./resources";
import Chatbase from "./chatbase";
import Activity from "./activity";

import "../../css/classpost.css";

const Classpost = () => {
   const { classcode } = useParams();

   const dispatch = useDispatch();
   const classinfo = useSelector(classesdata);
   const users = useSelector(currentuser);

   const post = useSelector(postdata);

   const ImageRef = useRef();
   const fileRef = useRef();
   const VideoRef = useRef();

   const [selectmen, setselectmember] = useState(false);

   const [selectedFile, setSelectedFile] = useState([]);
   const [isFilePicked, setIsFilePicked] = useState(0);
   const [content, setcontent] = useState("");

   const contentonchanged = (e) => setcontent(e.target.value);

   const chatopen = () => {
      setselectmember(!selectmen);
      console.log(selectmen);
   };

   useEffect(() => {
      const controller = new AbortController();

      dispatch(fetchposts(classcode));

      return () => {
         controller.abort();
      };
   }, [classcode, dispatch]);

   const savepostdata = async () => {
      let filepath = "";
      if (isFilePicked !== 0) {
         filepath = await Filepath(selectedFile, users.id);
      }

      let load = {
         data: {
            classcode_fld: classinfo.classcode_fld,
            authorid_fld: users.id,
            content_fld: content,
            withfile_fld: isFilePicked,
            dir_fld: filepath,
         },
         notif: {
            id: 2019,
            recipient: 203039,
            message: "sdsdad",
            module: "classroom",
         },
      };

      try {
         dispatch(addposts(load)).unwrap();
      } catch (error) {
         console.log(error);
      }

      setcontent("");
      setSelectedFile([]);
   };

   const filehandler = (e) => {
      e.preventDefault();
      let filesupload = e.target.files;

      for (let i = 0; i < e.target.files.length; i++) {
         selectedFile.push(e.target.files[i]);
      }

      for (let i = 0; i < filesupload.length; i++) {
         let ext = getfileExt(filesupload[i].name);
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
            case "ppt":
            case "pptx":
               setIsFilePicked(5);
               break;
            case "m4v":
            case "avi":
            case "mpg":
            case "mp4":
               setIsFilePicked(2);
               break;
            case "jpg":
            case "gif":
            case "bmp":
            case "png":
            case "jpeg":
               setIsFilePicked(1);
               break;
         }
      }

      setSelectedFile([...selectedFile]);
   };

   const removeFilePreviews = (i) => {
      selectedFile.splice(i, 1);
      setSelectedFile([...selectedFile]);
   };

   const cansave = Boolean(content) && Boolean(selectedFile);

   return (
      <div className="container classpostwrap">
         <Chatbase open={selectmen} />
         <div className="classpost col-3">
            <div className="classpostmember">
               <div className="classpostinfo">
                  <div className="infoheader">
                     <div className="memberimg">
                        <img
                           src={
                              "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc"
                           }
                           alt=""
                        />
                     </div>
                     <div className="memberimg">
                        <img
                           src={
                              "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk"
                           }
                           alt=""
                        />
                     </div>
                  </div>
                  <h2 className="fw-bold fs-600">{classinfo.subjdesc_fld}</h2>
                  <p className="fs-400">
                     <span className="fw-semi-bold">Classcode: </span>
                     {classinfo.classcode_fld}
                  </p>
                  <button className="fw-semi-bold" onClick={chatopen}>
                     <i className="bx bx-video"></i>Video call
                  </button>
               </div>
               <Members
                  open={chatopen}
                  classcode={classinfo.classcode_fld}
                  ay_fld={classinfo.ay_fld}
                  sem_fld={classinfo.sem_fld}
               />
            </div>

            <div className="classposted">
               <div className="classpost-inputs">
                  <textarea
                     name=""
                     id=""
                     cols="30"
                     rows="5"
                     value={content}
                     onChange={contentonchanged}
                     placeholder="Write something here"
                  ></textarea>
                  <div className="classpost-actions flex-space">
                     <div className="icons-actions flex-align">
                        <input
                           ref={ImageRef}
                           onChange={filehandler}
                           multiple={true}
                           type="file"
                           accept="image/png, image/gif, image/jpeg"
                           hidden
                        />
                        <button
                           className="image"
                           onClick={() => ImageRef.current.click()}
                        >
                           <i className="bx bx-image-add"></i>
                           <span>Images</span>
                        </button>

                        <input
                           ref={fileRef}
                           onChange={filehandler}
                           multiple={true}
                           type="file"
                           accept=".pdf,.docx, .doc"
                           hidden
                        />
                        <button
                           className="files"
                           onClick={() => fileRef.current.click()}
                        >
                           <i className="bx bx-file"></i>
                           <span>Files</span>
                        </button>

                        <input
                           ref={VideoRef}
                           onChange={filehandler}
                           multiple={true}
                           type="file"
                           accept="video/mp4,video/x-m4v,video/*"
                           hidden
                        />
                        <button
                           className="vid"
                           onClick={() => VideoRef.current.click()}
                        >
                           <i className="bx bx-video-plus"></i>
                           <span>Videos</span>
                        </button>
                     </div>

                     <button
                        onClick={savepostdata}
                        className="send fw-semi-bold"
                        disabled={!cansave}
                     >
                        <i className="bx bx-pencil"></i>Send
                     </button>
                  </div>

                  <div className="filecontainer">
                     {selectedFile.map((file2, index) => {
                        return (
                           <div className="fileuploads flex-space" key={index}>
                              <div className="filedetails flex-align">
                                 <i className="bx bxs-file-pdf"></i>
                                 <div className="filename">
                                    <p className="fw-semi-bold">{file2.name}</p>
                                    <small>docs</small>
                                 </div>
                              </div>
                              <i
                                 onClick={() => {
                                    removeFilePreviews(index);
                                 }}
                                 className="bx bx-x-circle"
                              ></i>
                           </div>
                        );
                     })}
                  </div>
               </div>

               <Postuser classdata={post} />
            </div>

            <div className="classpost-media">
               <div className="classpost-activity">
                  <h2 className="fw-bold fs-600">Activity</h2>
                  <Activity code={classinfo.classcode_fld} />
               </div>

               <div className="classpost-resources">
                  <h2 className="fw-bold fs-600">Materials</h2>
                  <Resources code={classinfo.classcode_fld} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Classpost;
