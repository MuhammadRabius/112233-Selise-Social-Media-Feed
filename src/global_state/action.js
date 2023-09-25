import dayjs from "dayjs";
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

// Update Modal Mobile Number CharAt Validation

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

// Report "Lead Data Count Status"

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

//  Error Excel File base64
export const ErrorExcelFileDownload = (base64) => {
  var mediaType =
    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";

  var a = document.createElement("a");
  a.href = mediaType + base64;
  a.id = "abc";
  var date = new Date().toJSON().slice(0, 10);
  a.download = `ErrorLeads ${date}.xlsx`;
  a.textContent = "Download file!";
  document.body.appendChild(a);
  document.getElementById("abc")?.click();
};

// Report Excel Download

export const ReportExcelDownload = (file) => {
  // const url = window.URL.createObjectURL(new Blob([res?.data]));
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `LeadCount-Report ${dayjs().format("YYYY-MM-DD")}.xlsx`
  );
  document.body.appendChild(link);
  link.click();
};

export const roleManage = (role) => {
  switch (role) {
    case "Admin":
      return 1;

    default:
      return role;
  }
};
export const depManage = (department) => {
  switch (department) {
    case "Marketing":
      return 1;
    case "Management":
      return 2;
    case "Call Center":
      return 3;
    case "Hr":
      return 4;

    default:
      return department;
  }
};
export const LocManage = (Location) => {
  switch (Location) {
    case "Head Office":
      return 1;

    default:
      return Location;
  }
};
