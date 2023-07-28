import React, { useMemo, useState, useCallback } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';

function Map({ center, listings, zoom }) {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY

    const memoCenter = useMemo(() => (center), [center]);
    
    const [map, setMap] = useState(null)
    
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
    setMap(null)
    }, [])

    if (!googleMapsApiKey) {
        return <div>Sorry, the map is currently unavailable</div>
    }

    const markers = () => {
        if (Array.isArray(listings) && listings.length > 1) {
            return listings.map((listing) => 
            <Marker key={listing.name} position={{ lat: listing.latitude, lng: listing.longitude }} />
            )
        } else {
            return <Marker key={listings.name} position={{ lat: listings.latitude, lng: listings.longitude }} />
        }

    }
    
    return (
        <div>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
                <GoogleMap
                mapContainerStyle={{
                    width: '500px',
                    height: '450px',
                    borderRadius: '10px',
                }}
                center={memoCenter}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                >
                    {markers()}
                </GoogleMap>
                </LoadScript>
        </div>
    )
}

export default React.memo(Map)