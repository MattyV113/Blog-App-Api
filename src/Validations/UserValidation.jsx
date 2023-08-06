import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Please Enter Your Username'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .required('Please Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

export const signupSchema = yup.object().shape({
  username: yup.string().required('Please Enter A Username'),
  email: yup.string().email().required('Please Enter A Email'),
  password: yup
    .string()
    .required('Please Enter A Password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .required('Please Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});
