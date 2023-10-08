import React from "react";

const SnakeBody = ({ segments }) => {
  return (
    <div>
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: segment[0] * 10, // Adjust the size of each segment
            top: segment[1] * 10,  // Adjust the size of each segment
            width: "10px",        // Adjust the size of each segment
            height: "10px",       // Adjust the size of each segment
            backgroundColor: "green", // Color of the snake
            borderRadius: "50%", // Makes it a circle, adjust as needed
          }}
        ></div>
      ))}
    </div>
  );
};

export default SnakeBody;
