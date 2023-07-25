import React from 'react'

import styled from "styled-components"
import CategoryItem from './CategoriesItem'
import { categories } from "../data.js"
import { mobile } from "../reponsive";


const Container = styled.div`
    display: flex;
    padding: 20px;    
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })};
`;

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    )
};

export default Categories