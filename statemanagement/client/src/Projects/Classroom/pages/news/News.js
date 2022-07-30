import React from "react";

function News() {
   return (
      <div className="newswrap">
         <div className="container">
            <div className="flex-align2">
               <i className="bx bx-news headericon"></i>
               <h1 className="fw-semi-bold fs-800">News</h1>
            </div>

            <section className="newscontainer">
               <div className="newsmain">
                  <img
                     src={`https://images.unsplash.com/photo-1658158509859-34f343915bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTEwNjQzMQ&ixlib=rb-1.2.1&q=80&w=1080`}
                     alt=""
                  />
                  <div className="backgroundoverlay">
                     <div className="newsmain-content">
                        <h1 className="fw-bold fs-700">
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Fuga, assumenda.
                        </h1>
                        <div className="flex-align2 fs-400">
                           <i className="bx bx-calendar"></i>
                           <small>MMM dd, yyyy h:mm a</small>
                        </div>
                        <p className="fs-500">
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit. Hic dolorem sequi culpa aliquam. Repellendus,
                           aliquam deleniti culpa incidunt qui ullam.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="newsothers">
                  <div className="others__card">
                     <img
                        src={`https://images.unsplash.com/photo-1657446733019-1d88b949a8e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTA5ODUzMA&ixlib=rb-1.2.1&q=80&w=1080`}
                        alt=""
                     />
                     <div className="otherscontent">
                        <h1 className="fw-bold fs-600">
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Fuga, assumenda.
                        </h1>
                        <div className="flex-align2 fs-400">
                           <i className="bx bx-calendar"></i>
                           <small>MMM dd, yyyy h:mm a</small>
                        </div>
                     </div>
                  </div>

                  <div className="others__card">
                     <img
                        src={`https://images.unsplash.com/photo-1657446733019-1d88b949a8e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTA5ODUzMA&ixlib=rb-1.2.1&q=80&w=1080`}
                        alt=""
                     />
                     <div className="otherscontent">
                        <h1 className="fw-bold fs-600">
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Fuga, assumenda.
                        </h1>
                        <div className="flex-align2 fs-400">
                           <i className="bx bx-calendar"></i>
                           <small>MMM dd, yyyy h:mm a</small>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}

export default News;
