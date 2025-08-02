// components/ui/Card.js

import React from "react";
import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl overflow-hidden border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={clsx("p-4", className)}>
      {children}
    </div>
  );
};

export default Card;
