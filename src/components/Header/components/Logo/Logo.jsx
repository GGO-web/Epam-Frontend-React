import React from "react";

import "./Logo.css";

export const Logo = () => {
   return (
      <a className="logo" data-testid="logo" href="#!">
         <img
            className="logo__img"
            src="/logo.svg"
            alt="Logo of the React components site"
         />
         <span className="logo__text">Courses</span>
      </a>
   );
};

export default Logo;
