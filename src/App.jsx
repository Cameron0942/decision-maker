// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//? COMPONENTS
import Home from "./pages/home/Home";
import DecisionNew from "./pages/decision-new/DecisionNew";
import Decision from "./pages/decision/Decision";
import DecisionMade from "./pages/decisionMade/DecisionMade";
import NotFound from "./pages/not-found/NotFound";


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/decision' element={<DecisionNew />} exact />
        <Route path='/decision/:guid' element={<Decision />} exact />
        <Route path='/decision/:guid/choice' element={<DecisionMade />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
