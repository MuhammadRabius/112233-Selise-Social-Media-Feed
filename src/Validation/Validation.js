export const validateName = (rule, value, callback) => {
  if (!value || value.trim() === "") {
    callback("Please enter your name.");
  } else {
    callback();
  }
};
export const validatePhoneNumber = (rule, value, callback) => {
  const phoneRegex = /^\d{10}$/; 
  if (!phoneRegex.test(value)) {
    callback("Please enter a valid 10-digit phone number. Start with 88");
  }
};
