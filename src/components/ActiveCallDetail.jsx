const ActiveCallDetail = ({ callMessages }) => {
  const restart = () => {
    window.location.reload();
  }

  return (
    <div style={{
      width: '90%'
    }}>
      {callMessages.map((item, index) => (
        <div key={index}>
          <strong>
            {item.role}:
          </strong>
          <span>
            {item.text}
          </span>
        </div>
      ))}

      <button
        onClick={restart}
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
        }}
      >
        Restart the page
      </button>
    </div>
  );
};

export default ActiveCallDetail;
