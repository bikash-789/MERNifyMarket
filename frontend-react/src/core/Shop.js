import React, { useEffect, useState } from "react";
import PCard from "./PCard";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { Button } from "@nextui-org/react";

function Shop() {
  // A state to manage filters - filters based on categories and price range
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  // A state to manage categories
  const [categories, setCategories] = useState([]);
  // A state to manage error
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);
  // Function to populate data from backend - all categories
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // Loads the categories and filtered results when the page loads
  useEffect(() => {
    init();
    loadFilterResults(skip, limit, myFilters.filters);
  }, []);

  // Handle change in price
  const handlePrice = (value) => {
    // Goes to prices object where range is mapped with name
    const priceObjectArray = prices;
    /*
    Object defined like this : 

    [{
      _id: 0,
      name: "Any",
      array: [],
    }]

    */
    let priceRange = [];
    // Iterating over Object arrays [Price objects]
    for (let key in priceObjectArray) {
      // checking for object id with value
      if (priceObjectArray[key]._id === parseInt(value)) {
        priceRange = priceObjectArray[key].priceRange;
      }
    }
    // priceRange will contain the array representing price range in form [min, max]
    return priceRange;
  };

  // Load filtered results into a state
  const loadFilterResults = (filters) => {
    // API
    getFilteredProducts(skip, limit, filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  // Handles the change in filters
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    // If the change is not 'price', handle as it is categories
    newFilters.filters[filterBy] = filters;
    // Else, for price we need to handle it differently
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    // Pass the new filters to fetch data from backend
    loadFilterResults(myFilters.filters);
    // Update filters state
    setMyFilters(newFilters);
  };

  // Load more function
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  // shows Load More button based on size of data(array)
  const loadMoreBtn = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button
          color="success"
          variant="ghost"
          onClick={loadMore}
          className="mt-4"
        >
          Load more
        </Button>
      )
    );
  };

  return (
    <div className="h-[100vh] flex">
      {/* Sidebar */}
      <aside
        className="w-full lg:w-2/12 lg:h-[100%] border-2 border-slate-100 px-3 top-0 z-20"
        style={{ position: "-webkit-sticky", position: "sticky" }}
      >
        <div>
          <h1 className="text-bold">Select Categories</h1>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
        </div>
        <br />
        <div>
          <h1 className="text-bold">Filter by Price range</h1>
          <ul>
            {/* Radio box to select price range of product*/}
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
      </aside>
      {/* main */}
      <div className="w-full lg:w-10/12 h-[100%] flex flex-col items-start justify-start px-3 overflow-scroll pb-20">
        <div className="flex flex-row justify-start items-center gap-5 flex-wrap">
          {filteredResults &&
            filteredResults.map((p, i) => <PCard key={i} product={p} />)}
        </div>
        {loadMoreBtn()}
      </div>
    </div>
  );
}

export default Shop;
