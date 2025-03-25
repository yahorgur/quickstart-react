const ActiveCallDetail = ({ callMessages }) => {
  const restart = () => {
    window.location.href = window.location.href;
  }

  const uniqueCallMessages = (messages) => {
    return messages.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.role === value.role && t.text === value.text
      )));
  };

  console.log(uniqueCallMessages(callMessages))

  return (
    <div style={{
      width: '90%'
    }}>
      {uniqueCallMessages(callMessages).map((item, index) => (
        <div key={index}>
          <strong style={{
            marginRight: '6px'
          }}>
            {item.role}:
          </strong>
          <span>
            {item.text}
          </span>
        </div>
      ))}

      <div style={{
        textAlign: 'center',
        marginTop: '10px'
      }}>
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
    </div>
  );
};

export default ActiveCallDetail;
