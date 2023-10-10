import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { sortByRatings } from '../redux/reducers/slices/ProductSlice';
import { sortByRating } from "../redux/reducers/slices/ProductStateSlice";
// import { sortByRatings } from '../redux/reducers/slices/ProductSlice';
const StarRating = () => {
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();
  const rating = useSelector((state) => state.productState);
  const [star, setStar] = useState(0);

  // useEffect(()=>{
  //     dispatch(sortByRating(formData.rating));

  // },[rating])
  // console.log(rating);
  return (
    <div className="star-rating space-x-3">
      {(rating === null || rating === undefined) && (
        <p className="text-[1.2vw]">Ratings:</p>
      )}
      <div className="stars">
        {[...Array(5)].map((starr, index) => {
          index += 1;

          return (
            <button
              type="button"
              key={index}
              className={index <= hover ? "on" : "off"}
              onClick={() => {
                dispatch(sortByRating(index));
                setStar(index);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(star)}
              onDoubleClick={() => {
                dispatch(sortByRating(0));
                setStar(0);
                setHover(0);
              }}
            >
              <span className="star ">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
