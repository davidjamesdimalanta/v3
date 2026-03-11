import React from "react";

export function renderDescription(desc, color) {
  if (Array.isArray(desc)) {
    return desc.map((paragraph, index) => {
      if (
        typeof paragraph === "object" &&
        paragraph?.props?.className?.includes("flex")
      ) {
        return React.cloneElement(paragraph, { key: index });
      }
      return (
        <p key={index} className={`text-p text-400 ${color}`}>
          {paragraph}
        </p>
      );
    });
  }
  return <p className={`text-p text-400 ${color}`}>{desc}</p>;
}
