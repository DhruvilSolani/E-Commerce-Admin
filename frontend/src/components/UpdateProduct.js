import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [company, setCompany] = useState('');
    const [image, setImage] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setSubcategory(result.subcategory);
        setCompany(result.company);
        setImage(result.image);
    }

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('company', company);
        
        if (image) {
            formData.append('image', image);
        }

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: formData,
            headers: {}
        });
        
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className='addproduct'>
            <h1>Update Product</h1>
            <input type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type='text' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type='text' placeholder='Enter product sub-category' value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
            <input type='text' placeholder='Enter product company' value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={updateProduct} type='button'>Update Product</button>
        </div>
    );
}

export default UpdateProduct;
