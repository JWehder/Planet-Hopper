import React from "react";
import { Link } from "react-router-dom";

function ListingPage() {

    console.log("listings page!")

    return (
        <div style={{ textAlign: "left" }}>
            <h1>Title of Listing</h1>
            <p><Link>city</Link></p>
        </div>
    )
}

export default ListingPage;