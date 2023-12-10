import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PdfContent from "./PdfContent";
import "./index.css";

function PdfGenerator() {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    github: "",
    LinkedIn: "",
  });

  const componentRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePdfGenerate = useReactToPrint({
    content: () => componentRef?.current,
  });

  return (
    <div>
      <h1>PdfGenerator</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleInputChange}
          />{" "}
        </label>
        <label>
          Phone:
          <input
            type="number"
            name="phone"
            minLength={10}
            maxLength={10}
            value={userData?.phone}
            onChange={handleInputChange}
          />{" "}
        </label>
        <label>
          Github:
          <input
            type="text"
            name="github"
            value={userData?.github}
            onChange={handleInputChange}
          />{" "}
        </label>
        <label>
          LinkedIn:
          <input
            type="text"
            name="LinkedIn"
            value={userData?.LinkedIn}
            onChange={handleInputChange}
          />{" "}
        </label>
      </div>
      <button onClick={() => handlePdfGenerate()}>Generate Pdf</button>
      <div>
        {userData?.name && userData.phone ? (
          <PdfContent ref={componentRef} userData={userData} />
        ) : null}
      </div>
    </div>
  );
}

export default PdfGenerator;
