import React from "react";
import "../style/Button.scss"

const Button = ({ content, icon, ClassName, width, height,borderColor,onclick}) => {
  return (
    <button
    onClick={onclick}
      className={ClassName}
      style={{ width: `${width}px`, 
               height: `${height}px`,
               border:`1px solid ${borderColor}`
            }}
    >
      {icon}
      {content}
    </button>
  );
};

export default Button;
