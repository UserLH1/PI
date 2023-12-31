function validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!values.username.trim()) {
        errors.username = ["Username should not be empty"];
      } 
    
    
    if (!values.email.trim()) {
      errors.email = ["Email should not be empty"];
    } else if (!emailPattern.test(values.email)) {
      errors.email = ["Email is not valid"];
    }
  
    if (!values.password.trim()) {
      errors.password = ["Password should not be empty"];
    } else if (!passwordPattern.test(values.password)) {
      errors.password = [];
  
      if (!/(?=.*\d)/.test(values.password)) {
        errors.password.push("*Missing a number\n");
      }
      if (!/(?=.*[A-Z])/.test(values.password)) {
        errors.password.push("*Missing an uppercase letter\n");
      }
      if (values.password.length < 8) {
        errors.password.push("*Password should be at least 8 characters long\n");
      }
    }
  
    return errors;
  }
  
  export default validation;
  