import PreloadCSS from './Preload.module.css';

import React from 'react';
import {CircularProgress} from "@mui/material";

function Preload(props) {
  return (
    <div>
      <CircularProgress {...props} className={PreloadCSS.my_preloader} />
    </div>
  );
}

export default Preload;
