import  Validator from 'validator'
import isEmpty from './is-empty';

const validateExperienceInput = (data) => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "job titile field is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is  required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateExperienceInput;