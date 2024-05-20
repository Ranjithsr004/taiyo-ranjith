import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Maps = () => {
  // state for countries data
  const [countriesData, setCountriesData] = useState([]);

  // fetching countries data from API
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        // fetching countries data
        const { data } =
         await axios.get('https://disease.sh/v3/covid-19/countries');
        setCountriesData(data || []);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchCountriesData();
  }, []);

  // rendering the map
  return (
    <div className="relative max-w-4xl mx-auto mt-8 mb-16 z-0">
      <h2 className="text-2xl font-bold mb-4">COVID-19 Map</h2>
      <MapContainer center={[20, 0]} zoom={2} className="h-96 z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat || 0, country.countryInfo.long || 0]}
            icon={L.icon({ iconUrl: './location.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })}
          >
            {/* popup for displaying the country information */}
            <Popup>
              <div className="text-center">
                <h2 className="font-bold text-lg mb-2">{country.country}</h2>
                <p className="text-sm text-yellow-600">Active cases: {country.active.toLocaleString()}</p>
                <p className="text-sm text-green-600">Recovered: {country.recovered.toLocaleString()}</p>
                <p className="text-sm text-red-600">Deaths: {country.deaths.toLocaleString()}</p>
                <img src={country.countryInfo.flag} alt={`${country.country} flag`} className="h-10 mt-2 mx-auto" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
