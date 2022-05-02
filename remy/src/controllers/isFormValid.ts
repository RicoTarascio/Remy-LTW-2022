const isFormValid = (
  formRef: React.MutableRefObject<HTMLFormElement | null>
) => {
  let error = "";
  if (formRef.current) {
    for (let index = 0; index < formRef.current.length; index++) {
      const current = formRef.current[index];
      if (current instanceof HTMLInputElement) {
        if (!current.value) error = "Per favore riempi i campi richiesti";

        if (!current.validity.valid)
          error = "Per favore riempi i campi nel formato corretto";
      }
    }
  }
  return error;
};

export default isFormValid;
