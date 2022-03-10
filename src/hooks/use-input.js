import { useState } from "react";

const useInput = (validateInput) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInput(value);
  const inputIsInvalid = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurChangeHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    valueIsValid,
    inputIsInvalid,
    valueChangeHandler,
    blurChangeHandler,
    resetInput,
  };
};

export default useInput;
