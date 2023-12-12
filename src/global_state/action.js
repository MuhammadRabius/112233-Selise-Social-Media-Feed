import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

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

export const phonePrefix = (prefix) => {
  switch (prefix.charAt(0)) {
    case "8":
      return prefix.replace(/^880/g, "");

    case "0":
      return prefix.replace(/^0/g, "");

    default:
      return prefix;
  }
};

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

export const ErrorExcelFileDownload = (base64) => {
  var mediaType =
    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

  var a = document.createElement("a");
  a.href = mediaType + base64;
  a.id = "abc";
  // var date = new Date().toJSON().slice(0, 10);
  a.download = `Error_Excel_Report_${dayjs().format(
    "YYYY-MM-DD hh:mm:ss A"
  )}.xlsx`;
  a.textContent = "Download file!";
  document.body.appendChild(a);
  document.getElementById("abc")?.click();
  document.body.removeChild(a);
};

export const ReportExcelDownload = (file) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `Lead_Report_${dayjs().format("YYYY-MM-DD hh:mm:ss A")}.xlsx`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const StringManaged = (data, pString) => {
  const stringMapping = {};
  data.forEach((d) => {
    stringMapping[d.name] = d.id;
  });
  const selectedStringId = stringMapping[pString];
  return selectedStringId;
};

export const sampleLeadExcel = (base64File) => {
  var mediaType =
    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

  var a = document.createElement("a");
  a.href = mediaType + base64File;
  a.id = "abc";
  // var date = new Date().toJSON().slice(0, 10);
  a.download = `Lead_Bulk_Upload_Sample${dayjs().format(
    "YYYY-MM-DD hh:mm A"
  )}.xlsx`;
  a.textContent = "Download file!";
  document.body.appendChild(a);
  document.getElementById("abc")?.click();
  document.body.removeChild(a);
};

export const ErrorColorCode = (leads) => {
  switch (leads) {
    case "Validation Failed":
      return "error";

    case "Processing To Assign Campaign":
      return "processing";

    case "Failed To Assign Campaign":
      return "warning";

    case "Ready To Send":
      return "processing";

    case "Failed To Send":
      return "error";

    default:
      return "success";
  } 
};

export const leadStatusColorIcon = (leads) => {
  switch (leads) {
    case "Validation Failed":
      return <CloseCircleOutlined />;

    case "Processing To Assign Campaign":
      return <SyncOutlined spin />;

    case "Failed To Assign Campaign":
      return <ExclamationCircleOutlined />;

    case "Ready To Send":
      return <ClockCircleOutlined />;

    case "Failed To Send":
      return <MinusCircleOutlined />;

    default:
      return <CheckCircleOutlined />;
  }
};

export const RoleUIDashboard = (role) => {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin";
    case "ROLE_BUSINESS_ADMIN":
      return "Business Admin";
    case "ROLE_CALL_CENTER":
      return "Call Center";

    default:
      return role;
  }
};

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const test = emailRegex.test(email);
  const validateHelp = test === true ? null : "Please input valid email";

  return validateHelp;
};
export const validateEmailMessage = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const test = emailRegex.test(email);
  const validateValidation = test === true ? "success" : "error";

  return validateValidation;
};

export const nameRegex = /^[A-Za-z.\s]{3,350}$/;

export const validateNameMessage = (name) => {
  const test = nameRegex.test(name);
  const validateValidation = test === true ? "success" : "error";

  return validateValidation;
};

export const validateNameHelp = (name) => {
  const test = nameRegex.test(name);
  const validateValidation =
    test === true
      ? ""
      : "Invalid Naming formation. Please name must be 3 to 350 characters long";

  return validateValidation;
};

export const clearCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};
