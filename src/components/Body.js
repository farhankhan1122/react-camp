import React from "react";
import RestaurantCard from "./RestaurantCard";
// import cardsList from "../utils.js/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { resMockData } from "../utils.js/restaurantsConstant";
import Shimmer from "./shimmer";
import useBody from "../utils.js/customHooks/useBody";
import useOnlineStatus from "../utils.js/customHooks/useOnlineStatus";

const Body = () => {
  // local state variable - super powerful variable  scope is local
  const [listOfRestaurants, setListOfReastauants] = useState([]);
  const [filteredRestaurants, setFilteredReastauants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // custom hooks
  const restaurantsListData = useBody();
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    setListOfReastauants(restaurantsListData);
    setFilteredReastauants(restaurantsListData);
  }, [restaurantsListData]);

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection.{" "}
      </h1>
    );

  // normal js variable
  // scope is local
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter" style={{ display: "flex" }}>
        <div className="search">
          <input
            className="search_input"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {/* filter the restraunt cards and update the ui */}
          {/* need search text */}
          {/* inputfield is restricting value to be typed because value searchText is tighted the value as empty  */}
          {/* whenever local variable changes react re render the component but only the changed value getting render with virtual dom(finding difference b/w older virtual dom and newer virtual dom)*/}
          {/* whenever state variables update , react triggers a reconciliation cycle(re-render the conponent) */}
          <button
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredReastauants(filteredRestaurants);
            }}
            className="submit_search"
            type="button"
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.rating.rating_text > 4
            );
            setListOfReastauants(filteredList);
            console.log(listOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {/* <RestaurantCard name="Meghana Foods" cuisine="Biryani, Paratha, Chinese" rating="4.3" />
                <RestaurantCard name="KFC" cuisine="Burger, Fast Foods, Biryani, Hot Wings" rating="4.0" />
                <RestaurantCard name="Dominos" cuisine="Pizza, Burger" rating="3.9" />
                <RestaurantCard name="PizzaHut" cuisine="Pizza" rating="4.4" />
                <RestaurantCard name="Haldiram" cuisine="Chole Bhature, Sweets" rating="5.0" />
                <RestaurantCard name="Hira Sweets" cuisine="Sweets" rating="3.5" />
                <RestaurantCard name="Meghana Foods" cuisine="Biryani, Paratha, Chinese" rating="4.3" />
                <RestaurantCard name="KFC" cuisine="Burger, Fast Foods, Biryani, Hot Wings" rating="4.0" />
                <RestaurantCard name="Dominos" cuisine="Pizza, Burger" rating="3.9" />
                <RestaurantCard name="PizzaHut" cuisine="Pizza" rating="4.4" />
                <RestaurantCard name="Haldiram" cuisine="Chole Bhature, Sweets" rating="5.0" />
                <RestaurantCard name="Hira Sweets" cuisine="Sweets" rating="3.5" />
                <RestaurantCard name="Meghana Foods" cuisine="Biryani, Paratha, Chinese" rating="4.3" />
                <RestaurantCard name="KFC" cuisine="Burger, Fast Foods, Biryani, Hot Wings" rating="4.0" />
                <RestaurantCard name="Dominos" cuisine="Pizza, Burger" rating="3.9" />
                <RestaurantCard name="PizzaHut" cuisine="Pizza" rating="4.4" />
                <RestaurantCard name="Haldiram" cuisine="Chole Bhature, Sweets" rating="5.0" />
                <RestaurantCard name="Hira Sweets" cuisine="Sweets" rating="3.5" /> */}

        {/* using zomato api */}

        {/* <RestaurantCard cardsData = {cardsList[0]} />
                <RestaurantCard cardsData = {cardsList[1]} />
                <RestaurantCard cardsData = {cardsList[2]} />
                <RestaurantCard cardsData = {cardsList[3]} />
                <RestaurantCard cardsData = {cardsList[4]} />
                <RestaurantCard cardsData = {cardsList[5]} />
                <RestaurantCard cardsData = {cardsList[6]} />
                <RestaurantCard cardsData = {cardsList[7]} />
                <RestaurantCard cardsData = {cardsList[8]} />
                <RestaurantCard cardsData = {cardsList[9]} />
                <RestaurantCard cardsData = {cardsList[10]} /> */}

        {/* optimize code using map filter reduce */}

        {filteredRestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard cardsData={restaurant} />
          </Link>
        ))}
        {/* map for each restaurant returning a piece of jsx */}
      </div>
    </div>
  );
};

export default Body;
