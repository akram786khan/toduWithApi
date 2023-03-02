import SimpleToast from 'react-native-simple-toast';
export const VALIDATE = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ALPHABET_ONLY: /^[a-zA-Z \s]*$/,
  NUMBER: /[0-9]$/,
  MOBILE: /^[0-9]{1,20}$/,
  STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[];':"<>,.\s]*$/,
  PASSWORD: /[d\-_\s]+$/,
  upperRegex: /(?=.*?[A-Z]).*/,
  lowerRegex: /(?=.*?[a-z]).*/,
  numberRegex: /(?=.*?[0-9]).*/,
};

export const validators = {
  checkAlphabet: (name, min, max, value) => {
    var min = min || 2;
    var max = max || 30;
    if (value) {
      if (!VALIDATE.ALPHABET_ONLY.test(value)) {
        return `${name} is Invalid.`;
      } else if (value.length < min || value.length > max) {
        return `${name} must be between ${min} to ${max} Characters.`;
      }
      return null;
    } else {
      return `${name} is required.`;
    }
  },

  checkEmail: (name, value) => {
    if (value) {
      if (!VALIDATE.EMAIL.test(value)) {
        return `${name} is invalid.`;
      } else {
        return null;
      }
    } else {
      return `${name} is required.`;
    }
  },

  checkNumber: (name, value) => {
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        return `${name} is invalid.`;
      }
      return null;
    } else {
      return `${name} is required.`;
    }
  },

  checkPhoneNumberWithFixLength: (name, max, value) => {
    var max = max || 10;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        SimpleToast(`${name} is invalid.`);
        return false;
      } else if (value.length != max) {
        SimpleToast(`${name} should be ${max} digits.`);
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required.`);
      return false;
    }
  },

  checkOptionalPhoneNumberWithFixLength: (name, max, value) => {
    var max = max || 10;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        SimpleToast.show(`${name} is invalid.`, SimpleToast.SHORT);
        return false;
      } else if (value.length != max) {
        SimpleToast.show(`${name} should be ${max} digits.`, SimpleToast.SHORT);
        return false;
      }
      return null;
    } else {
      SimpleToast.show(`${name} is required.`)
      return false;
    }
  },

  checkPhoneNumber: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (!VALIDATE.MOBILE.test(value)) {
        return `${name} is invalid.`;
      }
      // else if (value.length < min || value.length > max) {
      //   // SimpleToast(`${name} should be greater than ${min - 1} digits.`);
      //   return `${name} should be greater than ${min - 1} digits.`;
      // }
      return null;
    } else {
      return `${name} is required.`;
    }
  },

  checkNotNull: (name, min, max, value) => {
    var min = min || 5;
    var max = max || 40;
    if (value) {
      if (value.length < min || value.length > max) {
        SimpleToast(`${name} must be between ${min} to ${max} Characters.`);
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required.`);
      return false;
    }
  },

  checkRequire: (name, value = '') => {
    if (value.trim()) {
      return null;
    } else {
      return ` ${name} is required.  `;
    }
  },
  checkMultiple: (name, value) => {
    if (value?.length > 0) {
      return null;
    } else {
      return `${name} is required.`;
    }
    // if (value) {
    //     return null;
    // } else {
    //     return `Please enter ${name}`;
    // }
  },

  checkPassword: (name, value, min = 6, max = 24, msg) => {
    if (value) {
      if (VALIDATE.PASSWORD.test(value)) {
        return `${name} is required.`;
      }
      else if (value.length < min || value.length > max) {
        return `${name} length should be minimum  ${min} Characters.`;
      }
      return '';
    } else {
      if (msg) {
        return msg
      } else {

        return `${name} is required.`;
      }
    }
  },

  checkMatch: (name, value, name2, value2) => {
    var min = min || 5;
    var max = max || 40;
    if (value == value2) {
      return '';
    } else {
      return `${name} and ${name2} should be same.`;
    }
  },

  checkStreet: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (VALIDATE.STREET.test(value)) {
        SimpleToast(`${name} is invalid.`);
        return false;
      } else if (value.length < min || value.length > max) {
        SimpleToast(
          `${name} entered must be between ${min} to ${max} Characters.`,
        );
        return false;
      }
      return true;
    } else {
      SimpleToast(`${name} is required.`);
      return false;
    }
  },
};
