import { getElapsedTime, getFileExtension } from "./postservice";

const Postuser = ({ classdata }) => {
   const post = classdata.map((data, index) => {
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
                     {getElapsedTime(data.datetime_fld)}
                  </span>
               </div>

               <button>
                  <i className="bx bx-dots-vertical-rounded"></i>
               </button>
            </div>
            <div className="content">
               <p>{data.content_fld}</p>
            </div>

            {/* FOR DOCS AND PPT FILES */}
            <div className="filewrapper">
               {data.attachment_fld.map((file2, index) => {
                  return (
                     <div
                        className="filedisplaycontainer flex-space"
                        key={index}
                     >
                        <div className="filedetails flex-align">
                           <i
                              className={`bx ${getFileExtension(file2.name)}`}
                           ></i>
                           <div className="filename">
                              <p className="fw-semi-bold fs-500">
                                 {file2.name}
                              </p>
                              <small></small>
                           </div>
                        </div>
                        <i className="bx bxs-download"></i>
                     </div>
                  );
               })}
            </div>

            {/* FOR IMAGE FILES */}

            {data.images_fld.map((data2, index) => {
               return (
                  <div className="imgwrapper" key={index}>
                     <img
                        src={`http://localhost:5000/images${data2.path}`}
                        alt={data2.name}
                        width="100%"
                     />
                  </div>
               );
            })}

            {/* FOR YOUTUBE VIDEOS */}
            {data.embedvideo_fld.length != 0 && (
               <iframe
                  className="responsive-iframe"
                  loading="lazy"
                  src={data.embedvideo_fld}
               />
            )}

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
