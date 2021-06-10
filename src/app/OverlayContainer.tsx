import React from "react";
import AddItemsToCurrentPlan from "../components/AddItemsToCurrentPlan";
import PlanSelectionOverlay from "../components/selectPlan/PlanSelectionOverlay";
import PlanInformationOverlay from "../components/planInformation/PlanInformationOverlay";
import QuizOverlay from "../oldPages/quiz/QuizOverlay";

const OverlayContainer = () => (
  <>
    <AddItemsToCurrentPlan />
    <PlanSelectionOverlay />
    <PlanInformationOverlay />
    <QuizOverlay />
  </>
);

export default OverlayContainer;
