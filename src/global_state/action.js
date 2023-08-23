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

// export const mobileValidation = (phoneNumber) => {
//   console.log("phoneNumber", phoneNumber);

//  if (phoneNumber?.length <= 9) {
//     return message.error("Please enter 10 digit Phone Number");
//   } else if (phoneNumber?.charAt(0) === "0") {
//     return message.warning("Please start without 880");
//   }
// };

// Update Modal Mobile Number CharAt Validation

export const phonePrefix =(prefix)=>{
  
  switch (prefix.charAt(0)) {
    
    case "8":
      return prefix.replace(/^880/g, "");
      
    case "0":
      return prefix.replace(/^0/g, "");
     

    default:
      return prefix;
  }
}
// Report Mobile Validation

// export const phoneStatus = (phoneNumber) => {
//   console.log("type", phoneNumber?.length);
//   switch (phoneNumber?.length) {
//     case undefined:
//       return "";

//     case 0:
//       return "";

//     case 10:
//       return `880${phoneNumber}`;

//     default:
//       return "Please input valid mobile number. Must be 10 digit exclude 880";
//   }
// };
// Report Mobile Validation

export const LeadCountStatus = (type) => {
  switch (type) {
    case null:
      return 0;

    case 0:
      return "No Data Found";

    default:
      return 0;
  }
};


// File Download for Error Excel File
export const ErrorExcelFileDownload= (base64) => {

  var mediaType =

    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

  var a = document.createElement("a");

  a.href = mediaType + base64;

  a.id = "abc";

  //a.href = mediaType+userInp;

  var date = new Date().toJSON().slice(0, 10);

  // var date = new Date();

  a.download = `ErrorLeads ${date}.xlsx`;

  a.textContent = "Download file!";

  // console.log(a);

  document.body.appendChild(a);

  document.getElementById("abc")?.click();

}

