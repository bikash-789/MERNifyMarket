import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

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
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find products of your choice!"
    >
      <div className="row container-fluid">
        <div className="col-4 left-side">
          <h4>Filter by Category</h4>
          <ul>
            {/* Check box to select categories of product */}
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <hr />
          <h4>Filter by Price range</h4>
          <ul>
            {/* Radio box to select price range of product*/}
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>

        <div className="col-8 ">
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-start">
            {filteredResults &&
              filteredResults.map((p, i) => <Card key={i} product={p} />)}
          </div>
          <hr />
          {loadMoreBtn()}
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
