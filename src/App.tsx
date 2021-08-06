import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";

import { handleWindowResize } from "./app/store/dimensions/dimensions.actions";

const App: React.FC = ({ children }) => {
  console.log("render me.");

  const dispatch = useDispatch();

  const handleResize = (event: Event) => {
    const windowObject = event.currentTarget as Window;

    dispatch(
      handleWindowResize(windowObject.innerHeight, windowObject.innerWidth)
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return <Layout>{children}</Layout>;
};

export default App;
