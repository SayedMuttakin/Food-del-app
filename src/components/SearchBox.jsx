import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent 
                   sm:w-[250px] 
                   xs:w-[180px] 
                   w-[150px] px-4 py-3 text-sm"
      />
    </form>
  );
};

export default SearchBox;
