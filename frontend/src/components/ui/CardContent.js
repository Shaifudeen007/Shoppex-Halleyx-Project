// components/ui/CardContent.js
import React from "react";
import clsx from "clsx";

const CardContent = ({ children, className }) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

export default CardContent;
