import { message } from "antd";

// date generate

export const getDate = (d) => {
  const date = new Date(d);
  return `${date.getDate()}, ${[date.getMonth()]}, ${date.getFullYear()}`;
};

export const getGrapFillColor = (typeName) => {
  switch (typeName) {
    case "Organic":
      return "#0090DA";

    case "Paid":
      return "#5F259F";

    case "Agent Led":
      return "#A4CE4E";

    default:
      return "#A4CE4E";
  }
};

export const mobileValidation = (phoneNumber) => {
  console.log("phoneNumber", phoneNumber);

 if (phoneNumber?.length <= 9) {
    return message.error("Please enter 10 digit Phone Number");
  } else if (phoneNumber?.charAt(0) === "0") {
    return message.warning("Please start without 880");
  }
};

// Update Modal Mobile Number CharAt Validation

export const phonePrefix =(prefix)=>{
  console.log("prefix",prefix)
}


// File Download for Error Excel File
export const saveAsXlsxFile= (base64) => {

  var mediaType =

    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

  var a = document.createElement("a");

  a.href = mediaType + base64;

  a.id = "abc";

  //a.href = mediaType+userInp;

  var date = new Date().toJSON().slice(0, 10);

  // var date = new Date();

  a.download = `${date}.xlsx`;

  a.textContent = "Download file!";

  // console.log(a);




  document.body.appendChild(a);

  document.getElementById("abc")?.click();

}

