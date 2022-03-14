import React from 'react'
import styles from "./SearchInput.module.css";
import Card from "../UI/Card";

const SearchInput = (props) => {
  return (
   <Card>
   <div className={styles.search}>
     <input
       type="text"
       placeholder="Search for a food..."
       onChange={props.onChange}
       value={props.keyword}
     />
     <button type="button" onClick={props.onClear}>
       Clear
     </button>
   </div>
 </Card>
  )
}

export default SearchInput