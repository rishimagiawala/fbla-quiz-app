import React from "react";
import "./Loading.css";
import loading from "../images/loading.svg";

function Loading(props) {
  return (
    <div class="loading_maindiv">
      <div class="component_loading progressbar-mobile is-hidden-desktop container is-flex-direction-column">
        <figure class="animate__animated animate__pulse image">
          <img src={loading} />
        </figure>
        <h3 class="loading title is-3 has-text-white">{props.title}</h3>
      </div>
      <div class="component_loading progressbar-desktop is-hidden-mobile container is-flex-direction-column">
        <figure class="animate__animated animate__pulse image">
          <img src={loading} />
        </figure>
        <h2 class="loading title is-2 has-text-white">{props.title}</h2>
      </div>
    </div>
  );
}

export default Loading;
