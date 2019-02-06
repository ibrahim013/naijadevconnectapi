import  Validator from 'validator'
import isEmpty from './is-empty';

const validateEducationInput = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateEducationInput;