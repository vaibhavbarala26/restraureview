import { SignOutButton, useClerk, UserButton } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/restraureview.png';

const Header = () => {
  const { user } = useClerk();
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchInput.trim()) {
        setData([]); // Clear data if search input is empty
        setShowDropdown(false); // Hide dropdown if input is empty
        return;
      }

      try {
        const res = await fetch(`https://restraureviewserver-3rdg.vercel.app/hotel?search=${searchInput}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await res.json();
        setData(result);
        setShowDropdown(true); // Show dropdown when data is fetched
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/search?q=${searchInput}`); // Navigate to the search results page with the search input
    }
  };

  const handleResultClick = (name) => {
    setSearchInput(name); // Update the search input with selected result
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <header className="md:h-[80px] flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between px-6 md:px-16 py-3 border-b-2">
      {/* Logo Section */}
      <div className="text-lg md:text-2xl font-bold">
        <Link to={"/"}><img src={logo} alt="RestraurReview Logo" className='h-28' /></Link>
      </div>

      {/* Search Form Section */}
      <div className="relative w-[90vw] md:w-[60vw] text-sm">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            className="w-[80%] md:w-[85%] outline-none px-3 h-[40px] bg-black text-white"
            placeholder="Type restaurant name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="w-[20%] md:w-[15%] h-[40px] text-[16px] md:text-[20px] border bg-white text-black"
          >
            Search
          </button>
        </form>

        {/* Dropdown Section */}
        {showDropdown && data.length > 0 && (
          <div className="absolute w-[80%] z-[10000] md:w-[85%] bg-white text-black max-h-60 overflow-y-auto shadow-lg">
            {data.map((item) => (
              <div
                key={item._id} // Assuming each restaurant has a unique _id
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleResultClick(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Restaurant Button */}
      

      {/* User Section */}
      <div className="flex flex-row items-center gap-3">
      <div>
        <Link to="/add">
          <div className="rounded-full border-2 py-2 px-3 text-1xl bg-black text-white">Add+</div>
        </Link>
      </div>
        <UserButton />
        <div className="bg-black text-white py-2 px-3 rounded-full">
          <SignOutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
