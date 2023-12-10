import React from "react";

const PdfContent = React.forwardRef((props, ref) => {
  console.log({ userData: props.userData });
  const { userData } = props;

  return (
    <div ref={ref}>
      <div style={{ width: "100%", height: "100%" }}>
        <h1>Candidate Information</h1>
        <p>Name: {userData?.name}</p>
        <p>
          Phone:
          <a href={`tel:${userData.phone}`}>{userData.phone}</a>
        </p>
        <p>
          Github:
          <a href={userData?.github} target="_blank" rel="noopener noreferrer">
            {userData.github}
          </a>
        </p>
        <p>
          LinkedIn:
          <a
            href={userData?.LinkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.LinkedIn}
          </a>
        </p>
      </div>
    </div>
  );
});

export default PdfContent;
