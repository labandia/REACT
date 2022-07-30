import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPhotos } from "../Globalredux/galleryReducer";
import "../index.css";
import React from "react";

export function Gallery() {
   const dispatch = useDispatch();
   const photoslist = useSelector((state) => state.gallery.photos);
   const isload = useSelector((state) => state.gallery.isloading);

   useEffect(() => {
      dispatch(getPhotos());
   }, [dispatch]);

   return (
      <div>
         <h1
            style={{
               color: "hsl(216, 84%, 53%)",
            }}
         >
            Photo Gallery
         </h1>
         <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
         </p>
         {isload ? (
            <div>Loading ...</div>
         ) : (
            <div className="gallery">
               {photoslist.map((data) => {
                  return (
                     <img
                        key={data.id}
                        alt={data.author}
                        src={data.download_url}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
}

export default Gallery;
