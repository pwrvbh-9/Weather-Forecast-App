import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options } from "../../api";
import { url } from "../../api";

function Search({ onSearchChange }) {
  const [search, setSeacrh] = useState(null);

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(
        `${url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        options
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error(error);
      return { options: [] }; // Return empty options array in case of error
    }
  }

  function handleChange(searchData) {
    setSeacrh(searchData);
    onSearchChange(searchData);
  }

  return (
    <AsyncPaginate
      placeholder="Search for the City"
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
