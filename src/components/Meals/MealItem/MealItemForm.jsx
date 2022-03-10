import React, {useRef, useState} from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {

  const cartAmountRef = useRef()
  const [isAmountValid, setIsAmountValid] = useState(true)

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = +cartAmountRef.current.value

    if(enteredAmount.length === 0 || enteredAmount < 1 || enteredAmount > 5){
      setIsAmountValid(false)
      return
    }

    setIsAmountValid(true)
    props.onAddToCart(enteredAmount)
  }
  
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={cartAmountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;
