import React from "react";

function Newscontent() {
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
                  <h1 className="fs-800 fw-bold">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                     Mollitia, expedita.
                  </h1>
                  <div className="flex-align2 fs-500">
                     <i className="bx bx-calendar"></i>
                     <small>MMM dd, yyyy h:mm a</small>
                  </div>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Error mollitia alias cupiditate ipsam magnam dolorum
                     sapiente dolorem esse quam commodi aperiam, blanditiis
                     dolor voluptas ea impedit id laboriosam sequi repellat.
                     Commodi quasi quos aspernatur quidem similique saepe
                     dignissimos distinctio sapiente, eligendi, illo excepturi
                     tenetur alias molestiae. Expedita error illo optio aut
                     nihil accusantium, ullam eius. Necessitatibus adipisci
                     officiis laudantium iure natus reiciendis neque, dolorum
                     maiores sint, temporibus aliquam aliquid quo reprehenderit,
                     consequuntur iste eos. Quaerat corporis rerum corrupti
                     deserunt reprehenderit officia, reiciendis doloribus quis
                     dolor non aut, inventore nisi esse nam laboriosam
                     consequatur repudiandae mollitia iure ipsa dicta quam! Qui
                     quae nostrum ea. Reprehenderit maiores est corrupti optio
                     suscipit laborum laboriosam cupiditate consequatur ex
                     repellat saepe rem necessitatibus ratione perspiciatis,
                     quos facilis magnam consequuntur quia nemo accusamus in
                     animi quidem debitis magni. Laboriosam, magni fugit omnis
                     eaque cupiditate dolore, nobis aliquid, porro expedita
                     reiciendis nemo! Culpa, sint minus exercitationem amet
                     officiis quam omnis nam excepturi molestiae expedita natus
                     praesentium quae debitis! Ullam ipsum, optio porro
                     doloribus aperiam sit magni. Deleniti quod sapiente
                     reiciendis dolores qui quae iste consequatur nesciunt.
                     Cupiditate provident nobis hic alias ad sunt ut
                     repellendus. Illum laborum quia ullam, fuga facilis
                     nesciunt incidunt. Ipsam illo ipsa eligendi?
                  </p>
               </div>
            </div>

            <div className="newsothers">
               <h1 className="fw-bold fs-700">Check others</h1>
               <hr />
            </div>
         </div>
      </section>
   );
}

export default Newscontent;
