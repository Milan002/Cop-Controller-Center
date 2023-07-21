import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import GreenMarker from '/Green_Marker.png';
import BlueMarker from '/Blue_Marker.png';
import RedMarker from '/Red_Marker.png';
import PurpleMarker from '/Purple_Marker.png';
import YellowMarker from '/Yellow_Marker.png';

const containerStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative' // Ensure relative positioning for the parent container
};

const panelStyle = {
  width: '300px',
  height: '100%',
  backgroundColor: '#2c3e50', // Dark blue background color
  color: 'white', // White font color
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  boxSizing: 'border-box',
  overflowY: 'auto',
  position: 'absolute',
  right: 0,
  top: 0
};

  const buttonStyle = {
    width: '100%', // Set button width to 100%
    backgroundColor: '#34495e', // Button background color
    color: 'white', // Button font color
    padding: '5px', // Button padding
    border: 'none', // Remove button border
    borderRadius: '5px', // Button border radius
    cursor: 'pointer', // Button cursor
    marginBottom: '0px', // Bottom margin
    marginRight: '15px',
    marginLeft: '15px'
  };

const headingStyle = {
  margin: '0', // Remove margin for the heading
  marginBottom: '20px', // Add margin bottom for spacing
  textAlign: 'center' // Center align the heading
};

const selectedButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#2980b9', // Different background color for selected button
};

const assignButtonPanelStyle = {
  width: '300px',
  height: '70px',
  backgroundColor: 'white', // Black background color for the assign buttons panel
  color: 'white', // White font color
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between', // Space between the two buttons
  alignItems: 'center' // Center align items vertically
};

const defaultCenter = {
  lat: 25.4294,
  lng: 81.7702
};

const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/allLocation');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const parsedMarkers = data.map(location => ({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.long),
      name: location.userId.toString(),
      color: location.color.toString()
    }));
    return parsedMarkers;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "Your_API_Key" // Replace with your Google Maps API key
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [lastSelectedMarker, setLastSelectedMarker] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [assignMode, setAssignMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [lastClickedLocation, setLastClickedLocation] = useState(null);
  const [yellowButtonColor, setYellowButtonColor] = useState('#34495e');
  const [purpleButtonColor, setPurpleButtonColor] = useState('#34495e');

  useEffect(() => {
    const fetchData = async () => {
      const parsedMarkers = await fetchDataFromAPI();
      setMarkers(parsedMarkers);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getMarkerIcon = (color) => {
    switch (color) {
      case 'blue':
        return BlueMarker;
      case 'green':
        return GreenMarker;
      case 'red':
        return RedMarker;
      case 'purple':
        return PurpleMarker;
      case 'yellow':
        return YellowMarker;
      default:
        return RedMarker; // Default to red marker if color is not recognized
    }
  };

  const handleMarkerSelect = marker => {
    setSelectedMarker(marker);
    setLastSelectedMarker(marker);
    setCenter({ lat: marker.lat, lng: marker.lng });
  };

  const handleAssignButtonClick = (color) => {
    if ((lastSelectedMarker && lastSelectedMarker.color === 'purple') || (lastSelectedMarker && lastSelectedMarker.color === 'yellow')) {
      alert('Cannot reassign marker.');
      return;
    }
  
    setAssignMode(true);
    setSelectedColor(color);
    if (color === 'yellow') {
      setYellowButtonColor('#ff6f6f'); // Set the color of the yellow button
      setPurpleButtonColor('#34495e'); // Reset the color of the purple button
    } else if (color === 'purple') {
      setYellowButtonColor('#34495e'); // Reset the color of the yellow button
      setPurpleButtonColor('#6eff6f'); // Set the color of the purple button
    }
  };
  

  const handleMapClick = event => {
    if (assignMode && selectedColor) {
      setLastClickedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  
      // Update the marker's location and color immediately
      const updatedMarkers = markers.map(marker => {
        if (marker === lastSelectedMarker) {
          return {
            ...marker,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            color: selectedColor
          };
        }
        return marker;
      });
      setMarkers(updatedMarkers);
      setAssignMode(false); // Reset assign mode
      setSelectedColor(null); // Reset selected color
      setYellowButtonColor('#34495e'); // Reset the color of the yellow button
      setPurpleButtonColor('#34495e'); // Reset the color of the purple button
  
      // Send the POST request
      if (lastSelectedMarker) {
        fetch('http://localhost:3000/updateLocation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: lastSelectedMarker.name,
            lat: event.latLng.lat().toString(),
            long: event.latLng.lng().toString(),
            color: selectedColor
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to assign.');
            } else {
              console.log("Location assigned successfully.");
            }
          })
          .catch(error => {
            console.error('Error assigning:', error);
            // Revert the marker's location and color if the request fails
            setMarkers(markers.map(marker => {
              if (marker === lastSelectedMarker) {
                return {
                  ...marker,
                  lat: lastSelectedMarker.lat,
                  lng: lastSelectedMarker.lng,
                  color: lastSelectedMarker.color
                };
              }
              return marker;
            }));
          });
      } else {
        console.log('No marker selected.');
      }
    }
  };
  

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.name}
              icon={{
                url: getMarkerIcon(marker.color),
                scaledSize: new window.google.maps.Size(30, 45)
              }}
              onClick={() => handleMarkerSelect(marker)}
            />
          ))}
        </GoogleMap>
      )}

      <div style={panelStyle}>
        <h2 style={headingStyle}>User ID</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map(marker => (
            <li key={marker.name} style={{ marginBottom: '10px' }}>
              <button style={selectedMarker === marker ? selectedButtonStyle : buttonStyle} onClick={() => handleMarkerSelect(marker)}>{marker.name}</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={assignButtonPanelStyle}>
        <button style={{ ...buttonStyle, backgroundColor: yellowButtonColor }} onClick={() => handleAssignButtonClick('yellow')}>Red Allot</button>
        <button style={{ ...buttonStyle, backgroundColor: purpleButtonColor }} onClick={() => handleAssignButtonClick('purple')}>Green Allot</button>
      </div>
    </div>
  );
}

export default App;
