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

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const componentRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setNameError(value.trim() === "");
    } else if (name === "phone") {
      setPhoneError(value.trim() === "" || value.length !== 10);
    }

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePdfGenerate = useReactToPrint({
    content: () => componentRef?.current,
  });

  const handleGeneratePdfClick = () => {
    const requiredFields = ["name", "phone"];
    const hasEmptyFields = requiredFields.some(
      (field) => userData[field].trim() === ""
    );

    if (hasEmptyFields) {
      setGeneralError(true);
    } else {
      setGeneralError(false);
      handlePdfGenerate();
    }
  };

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
          />
        </label>
        {nameError && <p className="error">Please enter a valid name</p>}
        <label>
          Phone:
          <input
            type="number"
            name="phone"
            minLength={10}
            maxLength={10}
            value={userData?.phone}
            onChange={handleInputChange}
          />
        </label>
        {phoneError && (
          <p className="error">Please enter a valid 10-digit phone number</p>
        )}
        <label>
          Github:
          <input
            type="text"
            name="github"
            value={userData?.github}
            onChange={handleInputChange}
          />
        </label>
        <label>
          LinkedIn:
          <input
            type="text"
            name="LinkedIn"
            value={userData?.LinkedIn}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {generalError && (
        <p className="error">Please fill in all required fields</p>
      )}
      <button onClick={handleGeneratePdfClick}>Generate Pdf</button>
      <div>
        {userData?.name && userData.phone ? (
          <PdfContent ref={componentRef} userData={userData} />
        ) : null}
      </div>
    </div>
  );
}

export default PdfGenerator;
