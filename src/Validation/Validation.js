export const validateName = (rule, value, callback) => {
  if (!value || value.trim() === "") {
    callback("Please enter your name.");
  } else {
    // Add additional checks if necessary
    callback();
  }
};
// Custom validation for phone number field
export const validatePhoneNumber = (rule, value, callback) => {
  const phoneRegex = /^\d{13}$/; // Modify this regex as per your phone number format
  if (!value || value.trim() === "") {
    callback("Please enter your phone number.");
  } else if (!phoneRegex.test(value)) {
    callback("Please enter a valid 13-digit phone number. Start with 88");
  } else {
    // Add additional checks if necessary
    callback();
  }
};
