import * as React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { keys } from '../../../config.js'
import Spinner from 'react-bootstrap/Spinner'

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

    const markers = () => {
        if (Array.isArray(listings) && listings.length >= 1) {
            console.log("array")
            return listings.map((listing) => 
            <Marker key={listing.name} position={{ lat: listing.latitude, lng: listing.longitude }} />
            )
        } else if ((Object.prototype.toString.call()) === "[object Object]") {
            console.log("object")
            return <Marker key={listings.name} position={{ lat: listings.latitude, lng: listings.longitude }} />
        } else {
            return ""
        }

    }

    if (!isLoaded) return <div>    
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
    
    return (
        <GoogleMap
        mapContainerStyle={{
            width: '500px',
            height: '500px',
            borderRadius: '10px',
        }}
        center={memoCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
            {markers()}

        </GoogleMap>
    )
}

export default React.memo(Map)