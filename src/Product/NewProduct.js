import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Header from '../Component/Header'
import { addnewproduct } from '../QueryUse/ApiCall';
import { NewProductReducer } from '../Redux/ActionCreator';

const NewProduct = () => {

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [detail, setdetail] = useState("")
  const [image, setimage] = useState("");
  const navigate = useNavigate();
  const userid = useSelector((state) => state.Login?.id)
  const dispatch = useDispatch();

  const onsuccess = () => {
    alert("New Product Add..!!")
    navigate('/allproduct')
  }

  const { isLoading, mutateAsync } = useMutation(["AddNewProduct"], addnewproduct,
    {
      onSuccess: onsuccess,
      onError: (error) => {
        alert(error)
      }
    })
    
  if (isLoading)
    return <CircularProgress />

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setimage(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const addproductbtn = async () => {
    const newdata = { name, price, detail, image };
    await mutateAsync({ userid, name, price, detail, image })
    dispatch(NewProductReducer(newdata))
  }

  return (
    <div className='newpostpage'>
      <Header />
      <section id='home' className='newpostpage'>
        <div className='newpostdiv'>
          <input type="text" placeholder='Enter Product Name'
            onChange={e => setname(e.target.value)} />
          <input type="number" placeholder='Enter Product Price'
            onChange={e => setprice(e.target.value)} />
          <input type="text" placeholder='Enter Product Detail'
            onChange={e => setdetail(e.target.value)} />
          <input type="file" placeholder='Choose Profile Image'
            onChange={(e) => {
              uploadImage(e);
            }} />
          <button onClick={addproductbtn}>Add Product</button>
        </div>
      </section>
    </div>
    

  )
}
export default NewProduct