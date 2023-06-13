import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "styled-components";

function SearchBarButtonGroup() {
    return (
        <>
            <SearchButton>
                <TextSection>Option 1</TextSection>
                <span className="vertical-line" />
                <TextSection>Option 2</TextSection>
                <span className="vertical-line" />
                <TextSection>Option 3</TextSection>
            </SearchButton>
        </>
    )
}

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
  background-color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .vertical-line {
    height: 100%;
    width: 1px;
    background-color: black;
    margin: 0 5px;
  }
`;

const TextSection = styled.span`
  flex: 1;
  text-align: center;
  font-size: 8px;
  position: relative;

  /* &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 90%;
    width: 1px;
    background-color: #ccc;
  } */
`;


export default SearchBarButtonGroup;