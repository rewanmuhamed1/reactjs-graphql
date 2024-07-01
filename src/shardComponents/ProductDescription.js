import React, { useState, useEffect } from 'react';

const ProductDescription = ({ htmlString }) => {
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    const text = parseHTMLString(htmlString);
    setTextContent(text);
  }, [htmlString]);

  return (
    <div className="p-4 ">
      <p className="">{textContent}</p>
    </div>
  );
};

function parseHTMLString(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  }

export default ProductDescription;