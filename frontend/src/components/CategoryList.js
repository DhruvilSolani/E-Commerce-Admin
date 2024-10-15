import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [products, setProducts] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
        extractUniqueCategories(result);
    };

    const extractUniqueCategories = (products) => {
        const categories = new Set();
        products.forEach(product => {
            if (product.category) {
                categories.add(product.category);
            }
        });
        setUniqueCategories([...categories]);
    };

    return (
        <div>
            <h3>Categories</h3>
            {
                uniqueCategories.length > 0 ? uniqueCategories.map((category, index) =>
                    <ul className='datarow' key={index}>
                        <div className='categorylist'>
                            <Link to={`/products/${category}`}>{category}</Link>
                        </div>
                    </ul>
                )
                : <h1>No result found</h1>
            }
        </div>
    )
}

export default CategoryList;
