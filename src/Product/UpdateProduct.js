import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Header from '../Component/Header';
import { updateproduct } from '../QueryUse/ApiCall';
import { setGetProduct, setLogout, UpdateProductReducer } from '../Redux/ActionCreator';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [detail, setdetail] = useState("")
    const [image, setimage] = useState("");
    const userid = useSelector((state) => state.Login?.id)
    const dispatch = useDispatch();
    let products = useSelector((state) => state?.Product);
    products = products.filter(pd => pd.id === id)

    useEffect(() => {
        let time1 = localStorage.getItem('product');
        const time = JSON.parse(time1);
        if (time === null) {
            dispatch(setLogout());
        }
        else {
            dispatch(setGetProduct(time));
        }
         // eslint-disble-next-line
    }, [])

    useEffect(() => {
        getdata()
       
    }, [userid])

    function getdata() {
        setname(products[0]?.name)
        setprice(products[0]?.price)
        setdetail(products[0]?.detail)
        setimage(products[0]?.image)
    }

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

    const { isLoading, mutateAsync } = useMutation(["updatePoduct"], updateproduct,
        {
            onSuccess: (data) => {
                dispatch(UpdateProductReducer(data))
                navigate('/allproduct')
                alert("Update..!!")
            },
            onError: (error) => {
                alert(error)
            }
        })

    if (isLoading)
        return <CircularProgress />

    const updateproductbtn = async () => {
        await mutateAsync({ id, userid, name, price, detail, image })
        // dispatch(UpdateProduct(newdata))
    }

    return (
        <div className='newpostpage'>
            <Header />
            <section id='home' className='newpostpage'>
                <div className='newpostdiv'>
                    <input type="text" placeholder='Enter Product Name' value={name}
                        onChange={e => setname(e.target.value)} />
                    <input type="text" placeholder='Enter Product Price' value={price}
                        onChange={e => setprice(e.target.value)} />
                    <input type="text" placeholder='Enter Product Detail' value={detail}
                        onChange={e => setdetail(e.target.value)} />
                    <input type="file" placeholder='Choose Profile Image'
                        onChange={(e) => {
                            uploadImage(e);
                        }} />
                    <button onClick={updateproductbtn}>Update Product</button>
                </div>
            </section>
        </div>
    )
}

export default UpdateProduct