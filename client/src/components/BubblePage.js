import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  
  const getColorList = () => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(response => {
      setColorList(response.data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
      getColorList();
  }, [colorList]);

  return (
    <>
      <ColorList colors={colorList} setColorList={setColorList} getColorList={getColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
