import { useClerk } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import "../App.css"; // Ensure Tailwind is imported
import LocationGranted from '../components/locationgranted';
import LocationDenied from '../components/locationDenied';
import LocationPrompted from '../components/locationprompted';
import Map from '../components/Map';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useClerk();
  const navigate = useNavigate();
  const [userPermission, setUserPermission] = useState('prompt');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [nearbyHotels, setNearbyHotels] = useState([]);

  // Log user details
  console.log(user.fullName, user.primaryEmailAddress.emailAddress);

  // Auth Check
  useEffect(() => {
    const auth = async () => {
      const response = await fetch("https://restraureviewserver-3rdg.vercel.app/auth", {
        method: "POST",
        body: JSON.stringify({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        navigate("/register");
      }
    };
    auth();
  }, []); // Add dependencies to prevent infinite re-renders

  // Check Geolocation Permissions
  useEffect(() => {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
          console.log('Geolocation permission state is:', permissionStatus.state);
          setUserPermission(permissionStatus.state);
          permissionStatus.onchange = function () {
            setUserPermission(this.state);
          };
        }).catch((err) => console.log('Error querying geolocation permissions:', err));
      } else {
        navigator.geolocation.getCurrentPosition(
          () => setUserPermission('granted'),
          () => setUserPermission('denied')
        );
      }
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  }, []);

  // Watch for user location
  useEffect(() => {
    let geoWatchId;
    if (navigator.geolocation) {
      geoWatchId = navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          console.log("Location received:", latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to access location. Please check your browser's location settings.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    return () => {
      // Clean up the watcher when the component unmounts
      if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId);
    };
  }, []);

  // Fetch nearby hotels based on user's current location
  useEffect(() => {
    const fetchNearbyHotels = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetch(`https://restraureviewserver-3rdg.vercel.app/top-nearby?latitude=${latitude}&longitude=${longitude}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const res = await response.json();
          console.log(res);  // Check the response in the console
          setNearbyHotels(res);  // Save the nearby hotels in state
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
      else{
        try {
          const response = await fetch(`https://restraureviewserver-3rdg.vercel.app/top-nearby?latitude=${23.816156}&longitude=${86.441976}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const res = await response.json();
          console.log(res);  // Check the response in the console
          setNearbyHotels(res);  // Save the nearby hotels in state
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchNearbyHotels();
  }, [latitude, longitude]); // Fetch only when lat/long changes

  return (
    <div className="flex flex-col h-screen  ">
      <Header />
      <div className="flex flex-grow">
        <div className="px-10 md:px-16 h-full md:w-1/3 border-r-2  ">
          {userPermission === 'granted' && <LocationGranted nearbyHotels={nearbyHotels} />}
          {userPermission === 'denied' && <LocationDenied nearbyHotels={nearbyHotels} />}
          {userPermission === 'prompt' && <LocationPrompted />}
        </div>
        <div className="w-2/3 h-full relative ">
          <Map nearbyHotels={nearbyHotels} />
        </div>
      </div>
    </div>
  );
};

export default Home;
