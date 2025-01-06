import Home from "./Components/Home";
import GenerateFacts from "./Components/GenerateFacts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FactsPanel from "./Components/FactsPanel";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/generate-facts" element={<GenerateFacts />} />
        <Route path="/facts-panel" element={<FactsPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
