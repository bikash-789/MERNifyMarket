import React, { useEffect, useState } from "react";
import { getCategories, list } from "./apiCore";
import Card from './Card';
function Searchbar() {

  // State 
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  // Object destructuring
  const { categories, category, search, results, searched } = data;
  
  useEffect(() => {
    console.log(results);
  }, [results]);

  // Method to load all categories
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  // When the page loads, populate all the categories
  useEffect(() => {
    loadCategories();
  }, []);

 // Method to search for products
const searchData = () => {
  if (search) {
      list({ search: search || undefined, category: category })
          .then((response) => {
              if (response && response.error) {
                  console.log(response.error);
              } else {
                  setData({ ...data, results: response, searched: true });
                  console.log(results);
              }
          })
          .catch(error => {
              console.log("An error occurred:", error);
          });
  }
};


  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  // function to handle change
  const handleChange = name => event => {
    // console.log(event.target.value);
    setData({ ...data, [name]: event.target.value, searched: false });
  };

// function to show search message
const searchMessage = (searched, results)=>{
  if(searched && results.length > 0)
  {
    return `Found ${results.length} products.`
  }
  else if(searched && results.length < 1)
  {
    return `No products found`
  }

}

// function to display searched products
const searchedProducts = (products = []) => {
  return (
    <div>
      <h2 className="mt-4 mb-4">
        {searchMessage(searched, results)}
      </h2>
    <div className="row">
      {products && products.map((product, i) => (
        <Card key={i} product={product} />
      ))}
    </div>
    </div>
  );
};

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit} className="my-3">
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select
                className="btn me-2 mt-2"
                onChange={handleChange("category")}
              >
                <option value="All">Select Category</option>
                {categories && categories.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
              value={search}
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text btn-secondary">Search</button>
          </div>
        </span>
      </form>
    );
  };
  return (
    <div>
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mb-3">
        {searchedProducts(results)}
      </div>
    </div>
  );
}

export default Searchbar;
