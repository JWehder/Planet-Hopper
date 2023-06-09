import * as React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { keys } from '../../../config.js'
import Spinner from 'react-bootstrap/Spinner'

const containerStyle = {
  width: '400px',
  height: '400px',
  borderRadius: '10px',

};

function Map({ center, listings }) {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: keys["GOOGLE_API_KEY"]
      })
    
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

    if (!isLoaded) return <div>    
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
  </div>

    const markers = () => {
        if (listings.length > 1) {
            return listings.map((listing) => 
            <Marker position={{ lat: listing.latitude, lng: listing.longitude }} />
            )
        } else {
            return <Marker position={{ lat: listings.latitude, lng: listings.longitude }} />
        }
    }
    
    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
        
        <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)