import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantCard from '../components/RestaurantCard';
const SearchResults = () => {
    const [data , setData] = useState([])
    const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Create URLSearchParams object
  const query = queryParams.get('q');
  useEffect(()=>{
    const fetchData = async () => {
        if (!query.trim()) {
          setData([]); // Clear data if search input is empty
          return;
        }

        try {
          const res = await fetch(`https://restraureviewserver-3rdg.vercel.app/hotel?search=${query}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          });
          const result = await res.json();
          console.log(result);
          
          setData(result);
         
        } catch (err) {
          console.log("Error fetching data:", err);
        }
      };
  
      fetchData();
  },[query])
  return (
    <div className='p-16 flex flex-col gap-2'>
      {data.map((dat)=>(
        <>
        <RestaurantCard restaurant={dat}></RestaurantCard>
        </>
      ))}
    </div>
  )
}

export default SearchResults
