import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MovieContainer from "../styles/MovieContainer"
import { Button } from "react-bootstrap"

function CategoryContainer({ children, category, setShow }) {

    const handleReviewsClick = () => setShow(true)

    return (
        <>
        <CategoryTitleDiv style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ borderRight: '3px solid black', height: '30px',marginLeft: '18px', marginRight: '10px' }}></div>

        <h3 style={{ width: 'auto', marginRight: '20px'}}>{category}</h3>

        <span style={{ display: 'flex', textAlign: 'right', marginRight: '10px' }}>
            { category === "movies you have reviewed" ?
            <Button variant="link" onClick={handleReviewsClick} style=
            {{ position: 'absolute', 
            top: '0', 
            right: '0', 
            textDecoration:'none', 
            fontSize: "15px"}}
            >
                view reviews
            </Button>

            :
            <Link to= "/movies" style=
            {{ position: 'absolute', 
            top: '0', 
            right: '0', 
            textDecoration:'none', 
            fontSize: "15px"}}
            >
                view all movies
            </Link>
            }
        </span>
        </CategoryTitleDiv>

        <MovieContainer>
            {children}
        </MovieContainer>
        </>
    )
}

const CategoryTitleDiv = styled.div`
    text-align: left;
    position: relative;
    width: auto;
    margin: 10px;
`

export default CategoryContainer;