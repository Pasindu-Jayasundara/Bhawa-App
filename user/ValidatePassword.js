export const ValidatePassword = password => {

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (passwordRegex.test(password)) {
    // Password is valid
    return {isValid: true, message: 'Password is valid.'};
  } else {
    // Password is invalid
    return {
      isValid: false,
      message:
        `Password must contain: 
         - at least 6 characters  
         - one uppercase letter
         - one lowercase letter
         - one digit`,
    };
  }

};
