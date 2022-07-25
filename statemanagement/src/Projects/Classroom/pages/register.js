import { React, useState, useEffect } from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

function Register({ page }) {
   return (
      <div className="login">
         <h1>Forgot password</h1>
         <form className="form">
            <div className="formgroup">
               <label for="">Student ID:</label>
               <input type="text" class="formscontrol" />
               {/* <div class="invalid-feedback">
                     <small></small>
                  </div> */}
            </div>

            <div class="formgroup">
               <label for="">Email Address:</label>
               <input type="password" class="formscontrol" />
               {/* <div class="invalid-feedback">
                     <small></small>
                  </div> */}
            </div>

            <div className="formgroup">
               <label for="">Birthdate:</label>
               <input type="text" class="formscontrol" />
               {/* <div class="invalid-feedback">
                     <small></small>
                  </div> */}
            </div>

            <div className="formgroup">
               <label for="">Last Name:</label>
               <input type="text" class="formscontrol" />
               {/* <div class="invalid-feedback">
                     <small></small>
                  </div> */}
            </div>

            <div class="formsaction">
               <button>Sign in</button>
               <button>Back</button>
            </div>
         </form>
      </div>
   );
}

export default Register;
