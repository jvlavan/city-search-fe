import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
function BacktoHome() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <Button className="mt-4" onClick={() => navigate("/")}>
        {" "}
        Home{" "}
      </Button>
    </div>
  );
}

export default BacktoHome;
