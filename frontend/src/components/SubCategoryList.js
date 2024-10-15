import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SubCategoryList = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsByCategory();
    }, [category]);

    const getProductsByCategory = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        const filteredProducts = result.filter(product => product.category === category);
        setProducts(filteredProducts);
    };

    const uniqueSubcategories = [...new Set(products.map(product => product.subcategory))];

    return (
        <div>
            <h3 className='categorylink'><Link to="/categorylist">Categories</Link> > {category} > </h3>
            {
                uniqueSubcategories.length > 0 ? uniqueSubcategories.map((subcategory, index) =>
                    <ul className='datarow' key={index}>
                        <div className='subcategorylist'>
                            <Link to={`/products/${category}/${subcategory}`}>
                                {subcategory}
                            </Link>
                        </div>
                    </ul>
                )
                : <h1>Nothing found in this!</h1>
            }
        </div>
    );
}

export default SubCategoryList;
