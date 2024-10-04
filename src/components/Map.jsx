import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Ensure Leaflet is imported
import 'leaflet/dist/leaflet.css';
import locatio from '../assets/location.svg'; // Custom marker icon
import baha from "../assets/bahamas.jpeg"
import { Link } from 'react-router-dom';

// Custom Icon creation (memoized for performance)
const customIcon = new L.Icon({
  iconUrl: locatio,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const customIconw = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  // State for nearby hotels and user location
  const [nearbyHotels, setNearbyHotels] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
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

  // Fetch nearby hotels when latitude/longitude changes
  useEffect(() => {
    const fetchNearbyHotels = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetch(`http://localhost:1042/hotel-nearby?latitude=${latitude}&longitude=${longitude}`, {
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
  }, [latitude, longitude]);

  // Memoized markers to avoid unnecessary re-renders
  const restaurantMarkers = useMemo(() => {
    return nearbyHotels?.map((res) => (
      <Marker key={res._id} position={[res.hotel.latitude, res.hotel.longitude]} icon={customIcon}>
        
        <Popup>
        <Link to={`/newrestaurant/${res.hotel._id}`}>
          <div className="text-center">
            <img src={baha} alt={res.hotel.name} className="w-full h-auto" />
            <h3 className="font-bold">{res.hotel.name}</h3>
            <p>{res.hotel.full_address}</p>
          </div>
          </Link>
        </Popup>
        
      </Marker>
    ));
  }, [nearbyHotels]);

  return (
    <div className="w-full h-full">
      <MapContainer center={[23.8193062, 86.4353003]} zoom={14} className="w-full h-full">
        {/* Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current Location Marker */}
        <Marker position={[23.8193062, 86.4353003]} icon={customIconw} >
          <Popup>
            <div>
              <h2>You are here</h2>
            </div>
          </Popup>
        </Marker>

        {/* Render Restaurant Markers */}
        {restaurantMarkers}
      </MapContainer>
    </div>
  );
};

export default Map;
