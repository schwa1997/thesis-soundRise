import { GitHub, Instagram } from "@mui/icons-material";
import React from "react";
import ItemsContainer from "./itemContainter";

function Footer() {
  return (
    <footer className="dark:bg-themedDark2 bg-slate-600 text-white">
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2024 Appy. All rights reserved. </span>
        <span>Terms · Privacy Policy</span>
        <div className="flex gap-2">
          <GitHub />
          <Instagram />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
