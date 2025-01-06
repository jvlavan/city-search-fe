import "./App.css";
import { Button } from "flowbite-react";

import { useNavigate } from "react-router";
function App() {
  const navigate = useNavigate();
  return (
    <div className="block md:flex ">
      <Button className="m-8" onClick={()=>navigate("/advance-home")}>Advance City Search </Button>
      <Button className="m-8" onClick={()=>navigate("/basic-home")}>Basic City Search </Button>
    </div>
  );
}

export default App;
