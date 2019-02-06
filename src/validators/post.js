import  Validator from 'validator'
import isEmpty from './is-empty';

const validatePostInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 5, max: 800 })) {
    errors.text = "minimum of 5 maximum of 800 ";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "why do you wanna send an empty post";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validatePostInput;