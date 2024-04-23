import React, { useState } from "react";
import { Header, Exploremenu,Fooddisplay } from "../components/index";
const Home = () => {
  const [category, setcategory] = useState('All')
  return (
    <div>
      <Header />
      <Exploremenu category={category} setcategory={setcategory} />
      <Fooddisplay category={category} />

    </div>
  );
};

export default Home;
