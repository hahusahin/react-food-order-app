import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  const searchChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const clearSearchHandler = () => {
   setKeyword("");
  }

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_MEALS_URL);

        if (!response.ok) {
          throw new Error("Something unexpected occured!");
        }

        const data = await response.json();
        const transformedData = [];
        for (const key in data) {
          transformedData.push({ id: key, ...data[key] });
        }
        setError(null);
        setIsLoading(false);
        setMeals(transformedData);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    fetchMeals();
  }, []);


  let results = [...meals];
  if (keyword !== "") {
    results = meals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(keyword.toLowerCase()) ||
        meal.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search for a food..."
            onChange={searchChangeHandler}
            value={keyword}
          />
          <button type="button" onClick={clearSearchHandler}>
            Clear
          </button>
        </div>
      </Card>
      <Card>
        {!isLoading && !error && results.length > 0 && (
          <ul>
            {results.map((meal) => (
              <MealItem key={meal.id} id={meal.id} meal={meal} />
            ))}
          </ul>
        )}
        {!isLoading && !error && results.length === 0 && <p>Found No Meals!</p>}
        {isLoading && !error && (
          <p>Loading...</p>
        )}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
}

export default AvailableMeals;
