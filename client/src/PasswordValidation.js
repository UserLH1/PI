function validation(values) {
    let errors = {};
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
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