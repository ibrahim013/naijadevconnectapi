import  Validator from 'validator'
import isEmpty from './is-empty';

const validateProfileInput = (data) => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
  data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  data.instagram = !isEmpty(data.instagram) ? data.instagram : '';
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';
  data.facebook = !isEmpty(data.facebook) ? data.facebook : '';

  if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = "This handle is too short"
  }
  if(Validator.isEmpty(data.handle)){
    errors.handle = "handle field is required"
  }

  if(Validator.isEmpty(data.status)){
    errors.status = "status field is required"
  }
  if(Validator.isEmpty(data.skills)){
    errors.skills = "skills are required"
  }

  if(!Validator.isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = "enter a vaild URL"
    }
  }

  if(!Validator.isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
      errors.youtube = "enter a vaild youtube url"
    }
  }

  if(!Validator.isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
      errors.twitter = "enter a vaild twitter url"
    }
  }

  if(!Validator.isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)){
      errors.linkedin = "enter a vaild linkedin url"
    }
  }

  if(!Validator.isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)){
      errors.instagram = "enter a vaild instagram url"
    }
  }
  
  if((!Validator.isEmpty(data.facebook))){
    if(!Validator.isURL(data.facebook)){
      errors.facebook = "enter a vaild facebook url"
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateProfileInput;