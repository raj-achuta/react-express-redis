import React, { useEffect, useState } from "react";
import Layout1 from "./components/layout1";
import Layout2 from "./components/layout2";
import Layout3 from "./components/layout3";
import axios from "axios";

const App = () => {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    // const data fetch("http://localhost:3000/layout")
    console.log("layout", layout);
    axios
      .get(`http://localhost:3000/layout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLayout(res.data.layoutType);
        console.log("layout", layout);
      })
      .catch((err) => {
        console.error("Uanble to get the layout");
      });
  }, [layout]); 

  return (
    // <TaskProvider>
    //   <div>
    //     <AddTask />
    //     <TaskList />
    //   </div>
    // </TaskProvider>
    <>
      <div>Layout Test</div>
      {layout == 0 && <Layout1 />}
      {layout == 1 && <Layout2 />}
      {layout == 2 && <Layout3 />}
    </>
  );
};

export default App;
