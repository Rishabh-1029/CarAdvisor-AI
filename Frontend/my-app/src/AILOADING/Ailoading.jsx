import { MdAutoAwesome } from "react-icons/md";
import "./Ailoading.css";

function Ailoading() {
  return (
    <>
      <div className="ai-loading-wrap">
        <div className="ai-loading-card">
          <MdAutoAwesome className="ai-logo" size={40} />
          <h2>Car Advisior AI</h2>
          <p>Analysing your preferences...</p>
          <div className="ai-loader-bar">
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ailoading;
