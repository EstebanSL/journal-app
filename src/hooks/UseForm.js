import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFormValid = useMemo(() =>  {
  for (const formValue of Object.keys(formValidation)) {
    if (formValidation[formValue] !== null) return false
  }
    return true
  }, [formValidation])


  /**
   * [onInputChange]
   * @description Function that updates the form value when input changes
   * @param {*} target
   */
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  /**
   * [onResetForm]
   * @description Function that reset the form to the initial state
   */
  const onResetForm = () => {
    setFormState(initialForm);
  }

  /**
   * [createValidators]
   * @description Function that creates the validators for each form element
   */
  const createValidators = () => {
    const formCheckedValues = {}
    for (const formField of Object.keys(formValidations)) {

      const [fn, errorMessage] = formValidations[formField]

      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }
    setFormValidation(formCheckedValues)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}