import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectdata } from "../../redux/newsSlice";
import axios from "../../api/axios";
import "../../css/newscontent.css";

function Newscontent() {
   const news = useSelector(selectdata);
   const [others, setothers] = useState([]);

   useEffect(() => {
      let ismouted = true;
      const controller = new AbortController();

      const getnews = async (code) => {
         let array = [];
         try {
            const res = await axios.get("getnews");
            if (res.data.success === true) {
               array = res.data.payload.filter(
                  (element, index) => element.announcecode_fld !== code
               );
               ismouted && setothers(array);
            }
         } catch (error) {
            console.log(error);
         }
      };

      getnews(news.announcecode_fld);

      return () => {
         ismouted = false;
         controller.abort();
      };
   }, [news]);

   return (
      <section className="newscontent">
         <div className="container">
            <div className="newcontentwrap">
               <div className="newimgcontainer">
                  <img
                     src={`https://images.unsplash.com/photo-1658660854207-8886b1d69bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTExMDgxOQ&ixlib=rb-1.2.1&q=80&w=1080`}
                     alt=""
                  />
               </div>
               <div className="textwrap">
                  <h1 className="fs-800 fw-bold">{news.title_fld}</h1>
                  <div className="flex-align2 fs-500">
                     <i className="bx bx-calendar"></i>
                     <span>{news.datetime_fld}</span>
                  </div>
                  <p>{news.content_fld}</p>
               </div>
            </div>

            <div className="newscontentothers">
               <h2 className="fw-bold fs-700">Check others</h2>
               <hr />
               <div className="newsothercontainer">
                  {others.map((data, index) => {
                     return (
                        <div className="newsothercard" key={index}>
                           <div className="newsotherimg">
                              <img
                                 src={
                                    "https://images.unsplash.com/photo-1658660854207-8886b1d69bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTExMDgxOQ&ixlib=rb-1.2.1&q=80&w=1080"
                                 }
                                 alt=""
                              />
                           </div>
                           <div className="newsothercard-content">
                              <span className="fs-400">
                                 {data.datetime_fld}
                              </span>
                              <h2 className="fs-500">{data.title_fld}</h2>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </section>
   );
}

export default Newscontent;
