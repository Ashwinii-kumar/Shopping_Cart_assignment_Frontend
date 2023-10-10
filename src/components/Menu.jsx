import React, { useState } from "react";
import StarRating from "../assets/StarRating";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { clearFilters, setCategory, setPriceRange, sortAsc, sortDesc } from "../redux/reducers/slices/ProductStateSlice";

const Menu = () => {
  const productStates = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [selectedP, setSelectedP] = useState(null);

  const onChangeHandler = (e) => {
    if (e.target.value === "ascending") {
      if (productStates.descending === true) {
        dispatch(sortDesc());
      }
      dispatch(sortAsc());
    }
    if (e.target.value === "descending") {
      if (productStates.ascending === true) {
        dispatch(sortAsc());
      }
      dispatch(sortDesc());
    }
    if (e.target.name === "stock") {
      dispatch(stockOnly());
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSelected(null);
    dispatch(clearFilters());
    setSelectedP(null);
  };

  const options = [
    { value: "smartphones", label: "Smartphones" },
    { value: "laptops", label: "Laptops" },
    { value: "fragrances", label: "Fragrances" },
    { value: "groceries", label: "Groceries" },
    { value: "skincare", label: "Skin Care" },
    { value: "home-decoration", label: "Home Decoration" },
    { value: "all", label: "All" },
  ];

  const options1 = [
    { value: 500, label: "0-500" },
    { value: 1000, label: "500-1000" },
    { value: 1500, label: "1000-1500" },
    { value: 2000, label: "1500-2000" },
    { value: 2500, label: "All" },
  ];

  const onSelectHandler = (item) => {
    if (item.value === "all") {
      dispatch(setCategory(item.value));
      setSelected((prev) => item);
    } else {
      setSelected((prev) => item);
      dispatch(setCategory(item.value));
    }
  };

  const onSelectPriceHandler = (item) => {
    dispatch(setPriceRange(item.value));
    setSelectedP((prev) => item);
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6  rounded-lg  text-left md:mt-4 md:mr-7 md:ml-5">
      <div className="mb-4 space-y-1">
        <p className="text-black font-bolder text-sm">Filter By Price Range</p>
        <Select
          value={selected}
          onChange={(item) => onSelectHandler(item)}
          options={options}
          placeholder="Choose Category"
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "slategray",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
              fontSize: ".7rem",
              height: "1.5rem", // Adjust height as needed
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "gray" : "white",
              color: "black",
              
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "white",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              paddingTop: "0rem",
              paddingBottom: "0rem",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
          }}
        />
      </div>

      <div className="mb-4 space-y-1">
        <p className="text-black font-bolder text-sm ">Filter By Category</p>
        <Select
          value={selectedP}
          onChange={(item) => onSelectPriceHandler(item)}
          options={options1}
          placeholder="Choose Category"
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "slategray",
              color: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
              fontSize: ".7rem",
              minHeight: "2.5rem", // Adjust height as needed
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "lightgray" : "white",
              color: "black",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "white",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
          }}
        />
      </div>

      <form className="text-black md:mt-6" onSubmit={onSubmitHandler}>
        <fieldset className="mb-4 space-y-1">
          <legend className="text-gray-800 font-bolder text-sm">Sort By Prices</legend>
          <label className="flex items-center space-x-2 text-xs mb-2">
            <input
              type="radio"
              name="sort"
              value="ascending"
              id="ascending"
              onChange={onChangeHandler}
              checked={productStates.ascending}
            />
            <span htmlFor="ascending">Ascending</span>
          </label>
          <label className="flex items-center space-x-2 text-xs">
            <input
              type="radio"
              id="descending"
              name="sort"
              value="descending"
              onChange={onChangeHandler}
              checked={productStates.descending}
            />
            <span htmlFor="descending"> Descending</span>
          </label>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-gray-800 font-bolder text-sm">Sort By Rating & Up:</legend>
          <StarRating />
        </fieldset>

        <button className="bg-lime-700 px-2 py-2 text-[1.2vw] font-extrabold rounded-lg hover:text-lime-700 hover:bg-white w-full border-2 border-lime-600">
          Reset Fields
        </button>
      </form>
    </div>
  );
};

export default Menu;
