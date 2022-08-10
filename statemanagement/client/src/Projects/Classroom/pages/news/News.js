import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "../../css/news.css";

function News() {
   const [newsdata, setnewsdata] = useState([]);

   useEffect(() => {
      let ismouted = true;
      const controller = new AbortController();

      const getnews = async () => {
         try {
            const res = await axios.get("getnews");

            if (res.data.success === true) {
               ismouted && setnewsdata(res.data.payload);
            }
         } catch (error) {
            console.log(error);
         }
      };

      getnews();

      return () => {
         ismouted = false;
         controller.abort();
      };
   }, []);

   const mainnew = newsdata
      .filter((element, index) => index === 0)
      .map((data, index) => {
         return (
            <div className="newsmain" key={index}>
               <div className="newsimgcontainer">
                  <img
                     src={`https://images.unsplash.com/photo-1658158509859-34f343915bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTEwNjQzMQ&ixlib=rb-1.2.1&q=80&w=1080`}
                     alt=""
                  />
               </div>
               <div className="newsmain-content flex-space">
                  <div className="newstitle">
                     <div className="flex-align2 fs-400">
                        <i className="bx bx-calendar"></i>
                        <span className="fs-300">{data.datetime_fld}</span>
                     </div>
                     <h1 className="fw-bold fs-700">{data.title_fld}</h1>
                  </div>
                  <button>Check to see the full details</button>
               </div>
            </div>
         );
      });

   const others = newsdata
      .filter((element, index) => index !== 0)
      .map((data, index) => {
         return (
            <div className="others__card" key={index}>
               <img
                  src={`https://images.unsplash.com/photo-1657446733019-1d88b949a8e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTA5ODUzMA&ixlib=rb-1.2.1&q=80&w=1080`}
                  alt=""
               />
               <div className="otherscontent">
                  <h1 className="fw-bold fs-600">{data.title_fld}</h1>
                  <div className="flex-align2 fs-400">
                     <i className="bx bx-calendar"></i>
                     <span className="fs-300"> {data.datetime_fld}</span>
                  </div>
               </div>
            </div>
         );
      });

   return (
      <div className="newswrap">
         <div className="container">
            <div className="flex-align2">
               <i className="bx bx-news headericon"></i>
               <h1 className="fw-semi-bold fs-800">News</h1>
            </div>

            <section className="newscontainer">
               {mainnew}
               <div className="newsothers">{others}</div>
            </section>
         </div>
      </div>
   );
}

export default News;
