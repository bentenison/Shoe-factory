import React from "react";

export const Menu = () => {
  return (
    <div>
      <a id="menu" class="waves-effect waves-light btn btn-floating blue darken-2" style={{position:"fixed",bottom:"0",right:"0",overflow:"hidden"}}>
        <i class="material-icons">menu</i>
      </a>
      <div class="tap-target blue lighten-1" data-target="menu">
        <div class="tap-target-content ">
          <h5>Designed By Bentenison</h5>
          <h6>Copyright 2020</h6>
        </div>
      </div>
    </div>
  );
};
