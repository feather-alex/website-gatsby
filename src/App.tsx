import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { handleWindowResize } from "./app/store/dimensions/dimensions.actions";

type Props = {
  children: JSX.Element;
};

const App = ({ children }: Props) => {
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

  console.log("app is rendering...");

  return children;
};

export default App;
