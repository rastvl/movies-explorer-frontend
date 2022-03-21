import { useState, useCallback } from "react";
import { validationMessages } from "../utils/constants";

const useFormWithValidation = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const inputName = input.name;
    const inputValue = input.value;

    // I'm sorry, I'll erase that later :D
    inputName === 'name' && !input.setCustomValidity('') && !input.validity.valid && input.setCustomValidity(validationMessages.name);
    inputName === 'email' && !input.setCustomValidity('') && !input.validity.valid && input.setCustomValidity(validationMessages.email);
    // if (inputName === 'name') {
    //   input.setCustomValidity('');
    //   !input.validity.valid && input.setCustomValidity(validationMessages.name);
    // }

    setValues({...values, [inputName]: inputValue});
    setErrors({...errors, [inputName]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};


export default useFormWithValidation;