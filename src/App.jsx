//? REACT
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//? SASS
import './styles/main.scss';

//? COMPONENTS
import Home from "./pages/home/Home";
import HowItWorks from "./pages/how-it-works/HowItWorks";
import DecisionNew from "./pages/decision-new/DecisionNew";
import Decision from "./pages/decision/Decision";
import DecisionMade from "./pages/decisionMade/DecisionMade";
import NotFound from "./pages/not-found/NotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/decision" element={<DecisionNew />} />
        <Route path="/decision/:guid/" element={<DecisionRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function DecisionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Decision />} />
      <Route path="/choice" element={<DecisionMade />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
