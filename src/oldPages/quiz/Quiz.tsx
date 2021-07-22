import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleOverlay } from "../../app/store/overlay/overlay.actions";
import { Overlays } from "../../app/store/overlay/overlay.types";

const Quiz = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleOverlay(Overlays.QuizOverlay, true));
    return () => {
      dispatch(toggleOverlay(Overlays.QuizOverlay, false));
    };
  }, [dispatch]);
  return null;
};

export default Quiz;
