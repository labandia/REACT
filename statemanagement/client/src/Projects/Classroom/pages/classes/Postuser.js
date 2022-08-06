import { includefiles } from "./postservice";

const Postuser = ({ classdata }) => {
   const newpostdata = includefiles(classdata);

   const post = newpostdata.map((data, index) => {
      return (
         <div className="classpost-content" key={index}>
            <div className="classpost-headername flex-align">
               <div className="memberimg">
                  <img
                     src={
                        "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc"
                     }
                     alt=""
                  />
               </div>
               <div className="fullname">
                  <p className="fw-bold">{data.fullname_fld}</p>
                  <span className="fw-semi-bold fs-400">
                     {data.datetime_fld}
                  </span>
               </div>

               <button>
                  <i className="bx bx-dots-vertical-rounded"></i>
               </button>
            </div>
            <div className="content">
               <p>{data.content_fld}</p>
            </div>

            {/* <img
               loading="lazy"
               className="postimage"
               src={
                  "http://localhost:5000/images/1627347505.png"
                  // data.path
               }
               alt=""
            /> */}

            {/* FOR IMAGE VIDEOS */}
            {/* {data.images_fld.map((data, index)=>{
               return (
                  <div key={index}>
                     <img src={data.path} alt="" />;
                  </div>
               );
            })} */}

            {/* FOR YOUTUBE VIDEOS */}
            {/* {data.embedvideo_fld.length != 0 && (
               <iframe
                  className="responsive-iframe"
                  loading="lazy"
                  src={data.embedvideo_fld}
               />
            )} */}

            <div className="statuscontent fw-bold fs-500">
               <span>{data.commentcount} comments</span>
            </div>
         </div>
      );
   });

   return (
      <>
         {classdata.length === 0 ? (
            <div>
               <span>No post data</span>
            </div>
         ) : (
            <div>{post}</div>
         )}
      </>
   );
};

export default Postuser;
