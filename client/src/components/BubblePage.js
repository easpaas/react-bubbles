import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
      
    axios.get('http://localhost:5000/api/colors', {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setColorList(response.data);
    })
    .catch(error => {
      console.log(error)
    })
  }, []);


  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
