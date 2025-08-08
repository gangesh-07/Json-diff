import {useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="center-wrap">
      <button className="center-button" onClick={() => navigate("/new")}>
        Show New Component
      </button>
    </div>
  );
}

export default HomePage