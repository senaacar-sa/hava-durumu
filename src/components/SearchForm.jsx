import { useState } from "react";
function SearchForm({loading,onSearch}) {

const [query, setQuery] = useState("");

function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
}
return(
<form className="search-form" onSubmit={handleSubmit}>

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Şehir adı yaz..."
      />
    <button disabled={loading}>ARA</button>
    </form>
);
}
 export default SearchForm;