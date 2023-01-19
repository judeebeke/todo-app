import React, { useState } from "react";
import Todo from './components/todo/Todo';
// import AddColor from './components/color_selector/AddColor'
import StarRating from "./components/UI/StarRating";
import Star from "./assets/Star";

const App = () => {
  const [rateStar, setRateStar] = useState(Star);

  const setStarRatingHandler = (id) => {
    setRateStar(
      Star.map((item) => {
        return item.id <= id ? { ...item, rate: true } : item;
      })
    );
  };

  
  return (
    <section className="container">
      {/* <AddColor /> */}
      <Todo />
      {/* {rateStar.map((item) => (
        <StarRating
          key={item.id}
          rate={item.rate}
          onStarChange={() => {
            setStarRatingHandler(item.id);
          }}
        />
      ))} */}
    </section>
  );
};

export default App;
