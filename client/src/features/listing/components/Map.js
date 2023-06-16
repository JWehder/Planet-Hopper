import * as React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { keys } from '../../../config.js'
import Spinner from 'react-bootstrap/Spinner'

const containerStyle = {
  width: '400px',
  height: '400px',
  borderRadius: '10px',

};

function Map({ center, listings, zoom }) {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: keys["GOOGLE_API_KEY"]
    })

    const memoCenter = React.useMemo(() => (center), [center]);
    
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
    
    return (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={memoCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
            {listings.length > 1 ?
                listings.map((listing) => 
                <Marker key={listing.name} position={{ lat: listing.latitude, lng: listing.longitude }} />
                )
                :
                ""
            }

            {listings.length < 1 ?  
                <Marker position={{ lat: listings.latitude, lng: listings.longitude }} />
            :
            ""
            }

        </GoogleMap>
    )
}

export default React.memo(Map)