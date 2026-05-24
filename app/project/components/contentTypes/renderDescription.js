import React from "react";

export function renderDescription(desc, color) {
  if (React.isValidElement(desc)) {
    return desc;
  }

  if (Array.isArray(desc)) {
    return desc.map((paragraph, index) => {
      if (React.isValidElement(paragraph)) {
        return React.cloneElement(paragraph, { key: paragraph.key ?? index });
      }
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
