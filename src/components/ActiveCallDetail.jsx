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

      <button onClick={restart}>

      </button>
    </div>
  );
};

export default ActiveCallDetail;
