import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubCategoryProducts = () => {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsBySubCategory();
    }, [category, subcategory]);

    const getProductsBySubCategory = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        const filteredProducts = result.filter(product => product.category === category && product.subcategory === subcategory);
        setProducts(filteredProducts);
    };

    return (
        <div>
            <h3 className='categorylink'><Link to="/categorylist">Categories</Link> > {category} > {subcategory}</h3>
            {
                products.length > 0 ? products.map((item) =>
                    <div className='horizontal'>
                        <div className='subcategoryproduct' key={item._id}>
                            <div>
                                {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />}
                            </div>
                            <div>{item.name}</div>
                            <div>${item.price}</div>
                        </div>
                    </div>
                )
                : <h1>No products found in this subcategory!</h1>
            }
        </div>
    );
}

export default SubCategoryProducts;
