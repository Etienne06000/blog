import { useState } from 'react';

const useForm = (callback, initialValues) => {
  const init = initialValues || {};
  const [values, setValues] = useState(init);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    //console.log(event);
    //console.log(values);
    callback();
  };

  const handleChange = event => {
    // Récupérer le texte et pas la value
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleChangeNested = (event, nestedKey) => {
    event.persist();
    setValues(values => ({
      ...values,
      [nestedKey]: {
        ...values[nestedKey],
        ...{ [event.target.name]: event.target.value }
      }
    }));
  };

  const handleCheck = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.checked
    }));
  };

  return {
    handleChangeNested,
    handleChange,
    handleSubmit,
    handleCheck,
    values,
    setValues
  };
};

export default useForm;
