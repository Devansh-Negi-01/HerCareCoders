import React from "react";

const Card = ({ title, description, children }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      {description && <p className="text-gray-600">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
