import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value.toLowerCase();
        if (key) {
            let result = await fetch('http://localhost:5000/products');
            result = await result.json();
            if (result) {
                let filteredProducts = result.filter(product =>
                    product.name.toLowerCase().includes(key) ||
                    product.category.toLowerCase().includes(key) ||
                    product.subcategory.toLowerCase().includes(key) ||
                    product.company.toLowerCase().includes(key)
                );
                setProducts(filteredProducts);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className='productlist'>
            <h3>Product List</h3>
            <input type='text' placeholder='Search' onChange={searchHandle} />
            <ul className='headrow'>
                <li>Sr.no.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Sub-Category</li>
                <li>Company</li>
                {/* <li>Image</li> */}
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul className='datarow' key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.subcategory}</li>
                        <li>{item.company}</li>
                        {/* <li>
                            {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px' }} />}
                        </li> */}
                        <li>
                            <button className='prolistbtn' onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button className='prolistbtn'><Link to={"/update/" + item._id}>Update</Link></button>
                        </li>
                    </ul>
                )
                : <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList;
