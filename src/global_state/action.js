import dayjs from "dayjs";

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
  var date = new Date().toJSON().slice(0, 10);
  a.download = `ErrorLeads ${date}.xlsx`;
  a.textContent = "Download file!";
  document.body.appendChild(a);
  document.getElementById("abc")?.click();
};

export const ReportExcelDownload = (file) => {
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

export const StringManaged = (data, pString) => {
  const stringMapping = {};
  data.forEach((d) => {
    stringMapping[d.name] = d.id;
  });
  const selectedStringId = stringMapping[pString];
  return selectedStringId;
};

export const ErrorColorCode = (leads) => {
  switch (leads) {
    case "Not Verified":
      return "#D42123";

    case "Verified":
      return "#FFBF00";

    default:
      return "#A4CE4E";
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
      return null;
  }
};
