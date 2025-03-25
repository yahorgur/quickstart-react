import ScaleLoader from "react-spinners/ScaleLoader";

import { useState } from "react";

const Button = ({ onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  const Contents = isLoading ? (
    <ScaleLoader
      color="#000"
      height={10}
      width={2.5}
      margin={0.5}
      loading={true}
      size={50}
      css={{ display: "block", margin: "0 auto" }}
    />
  ) : (
    <p style={{ margin: 0, padding: 0 }}>Make a Call</p>
  );

  const [bloodPressure, setBloodPressure] = useState(false);
  const [tabletsTaken, setTabletsTaken] = useState(false);

  const runCall = () => {
    onClick(bloodPressure, tabletsTaken);
  }

  return (
    <div style={{
      width: '50%',
    }}>
      <div>
        <label>
          <input type="checkbox" value={bloodPressure} onChange={e => setBloodPressure(e.target.checked)} />
          Blood Pressure
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" value={tabletsTaken} onChange={e => setTabletsTaken(e.target.checked)} />
          Tablets taken
        </label>
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '10px'
      }}>
        <button
          onClick={runCall}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "2px solid #ddd",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "16px",
            outline: "none",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            opacity,
            cursor,
          }}
        >
          {Contents}
        </button>      
      </div>
    </div>
  );
};

export default Button;
