import {useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <button className="home-page-button" onClick={() => navigate("/jsondiff")}>
        Open JSON Diff Tool
      </button>
    </div>
  );
}

export default HomePage