import React, { Component } from "react";
import Loader from 'react-loader-spinner'
 export default class LoaderCustom extends React.Component {
  //other logic
    render() {
	 return(
        <div class="row align-items-center justify-content-center">
	  <Loader 
	     type="CradleLoader"
	     color="#00BFFF"
	     height="100"	
	     width="100"
	  />   
      </div>
	 );
    }
 }