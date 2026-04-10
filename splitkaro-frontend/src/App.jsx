import "./App.css";
import ChangeGroup from "./components/ChangeGroup";
import Navbar from "./components/Navbar";
import AppRoutes from "./router/AppRoutes";
import { useState } from "react";

function App() {
  const [groupIds, setGroupIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Navbar />
      
      <AppRoutes />;
    </>
  );
}

export default App;
