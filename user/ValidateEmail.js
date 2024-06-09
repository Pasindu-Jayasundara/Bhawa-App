export const ValidateEmail = email => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
    if (emailRegex.test(email)) {
      // Password is valid
      return {isValid: true, message: 'Email is valid.'};
    } else {
      // Password is invalid
      return {
        isValid: false,
        message:
          `Incorrect Email Format`,
      };
    }
  
  };