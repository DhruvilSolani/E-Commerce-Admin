import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [company, setCompany] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    const Navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !subcategory || !company || !image) {
            setError(true);
            return false;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('company', company);
        formData.append('image', image);

        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: formData,
        });

        result = await result.json();
        console.log(result);
        if(result){
            Navigate('/');
        }
    };

    return (
        <div className='addproduct'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span>* Enter valid name</span>}

            <input type='text' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span>* Enter valid price</span>}

            <input type='text' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span>* Enter valid category</span>}

            <input type='text' placeholder='Enter product subcategory' value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
            {error && !subcategory && <span>* Enter valid subcategory</span>}

            <input type='text' placeholder='Enter product company' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span>* Enter valid company</span>}

            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            {error && !image && <span>* Upload an image</span>}

            <br />
            <button onClick={addProduct} type='button'>Add Product</button>
        </div>
    );
};

export default AddProduct;
