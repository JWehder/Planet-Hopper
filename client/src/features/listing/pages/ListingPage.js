import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function ListingPage() {

    const listing = useSelector((state) => state.listings.entities[0])

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
                <h1>Title of Listing</h1>
                <p><Link>city</Link></p>
            </div>
            <div>
                <ImageList
                    sx={{ width: 1050, height: 320 }}
                    variant="quilted"
                    cols={8}
                    rows={4}
                    rowHeight={75}
                    style={{ borderRadius: "5%" }}
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
            <div>
                
            </div>

        </div>
    )
}

export default ListingPage;