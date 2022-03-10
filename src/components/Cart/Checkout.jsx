import React from "react";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    inputIsInvalid: nameInputNotValid,
    valueChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    resetInput: nameResetInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: street,
    valueIsValid: streetIsValid,
    inputIsInvalid: streetInputNotValid,
    valueChangeHandler: streetChangeHandler,
    blurChangeHandler: streetBlurHandler,
    resetInput: streetResetInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: city,
    valueIsValid: cityIsValid,
    inputIsInvalid: cityInputNotValid,
    valueChangeHandler: cityChangeHandler,
    blurChangeHandler: cityBlurHandler,
    resetInput: cityResetInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: zipCode,
    valueIsValid: zipCodeIsValid,
    inputIsInvalid: zipCodeInputNotValid,
    valueChangeHandler: zipCodeChangeHandler,
    blurChangeHandler: zipCodeBlurHandler,
    resetInput: zipCodeResetInput,
  } = useInput((value) => value.trim().length === 5);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && cityIsValid && zipCodeIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if(!formIsValid){
       return
    }

    props.onConfirm({name, street, zipCode, city})

    nameResetInput()
    streetResetInput()
    zipCodeResetInput()
    cityResetInput()
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.control} ${nameInputNotValid && styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
        {nameInputNotValid && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${styles.control} ${streetInputNotValid && styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={street} onChange={streetChangeHandler} onBlur={streetBlurHandler}/>
        {streetInputNotValid && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${styles.control} ${zipCodeInputNotValid && styles.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" value={zipCode} onChange={zipCodeChangeHandler} onBlur={zipCodeBlurHandler}/>
        {zipCodeInputNotValid && <p>Please enter a valid zip code (5 chars)</p>}
      </div>
      <div className={`${styles.control} ${cityInputNotValid && styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={city} onChange={cityChangeHandler} onBlur={cityBlurHandler}/>
        {cityInputNotValid && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
