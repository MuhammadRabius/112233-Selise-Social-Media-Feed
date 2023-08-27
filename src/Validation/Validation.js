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
  const phoneRegex = /^\d{10}$/; // Modify this regex as per your phone number format
  if (!phoneRegex.test(value)) {
    callback("Please enter a valid 10-digit phone number. Start with 88");
  }
};
