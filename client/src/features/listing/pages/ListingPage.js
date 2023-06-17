import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Map from "../components/Map";

function ListingPage() {

    const listing = useSelector((state) => state.listings.currentListing)

    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <div>
            <div style={{ textAlign: "left" }}>
                <h2>{listing.name}</h2>
                <p><Link>{listing.city}, {listing.state_province === "" ? "" : listing.state_province}, {listing.country}</Link></p>
            </div>
            <div>
                <ImageList
                    sx={{ width: 1050, height: 320 }}
                    variant="quilted"
                    cols={8}
                    rows={4}
                    rowHeight={75}
                    style={{ borderRadius: "20px" }}
                    >
                    {listing.photos.map((photo) => {
                        if (listing.photos.indexOf(photo) === 0) {
                            return <ImageListItem key={listing.name} cols= {4} rows={4}>
                            <img
                                {...srcset(photo, 121, 4, 4)}
                                alt={listing.name}
                                loading="lazy"
                            />
                            </ImageListItem>
                        }
                         return <ImageListItem key={listing.name} cols={2} rows={2}>
                        <img
                            {...srcset(photo, 100, 2, 2)}
                            alt={listing.title}
                            loading="lazy"
                        />
                        </ImageListItem>
                    })}
                </ImageList>
            </div>
            <div style=
            {{width: "1050px",
            backgroundColor: "#E5E4E4",
            display: "flex"
            }}
            >
                <div style={{flex: 1}}>
                    <p>${listing.unit_price}</p>
                    <p>{listing.bedrooms}</p>
                    <p>{listing.bathrooms}</p>
                </div>
                <div style={{flex: 1}}>
                    <h4>Where you are staying</h4>
                    <Map zoom={10.5} center={{ lat: listing.latitude, lng: listing.longitude }} listings={listing} />
                </div>
            </div>

        </div>
    )
}

export default ListingPage;