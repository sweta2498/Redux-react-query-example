import { Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Component/Header';
import { deleteproduct } from '../QueryUse/ApiCall';
import { DeleteProduct, setLogout } from '../Redux/ActionCreator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { ActionType } from '../Redux/ActionType';

const MyProduct = () => {

    const dispatch = useDispatch()
    const cache = useQueryClient()
    const navigate=useNavigate()
    const userid = useSelector((state) => state.Login?.id)
    let products = useSelector((state) => state?.Product);
    products = products.filter(pd => pd.userid === userid)

    useEffect(() => {
        let time1 = localStorage.getItem('product');
        const time = JSON.parse(time1);
    
        if (time === null) {
          // console.log("null");
          dispatch(setLogout());
        }
        else if (time.expiresIn < Date.now()) {
          localStorage.removeItem('product')
          // dispatch(setLogout());
        }
        else {
          dispatch({
            type: ActionType.SET_PRODUCT,
            payload: time
          })
        }
    
      }, [])
    

    const deletebtn = async (id) => {
        await mutateAsync({ id })
        dispatch(DeleteProduct(id))
    }

    const editbtn = (id) => {
        navigate(`/updateproduct/${id}`)
    }

    const { isLoading,mutateAsync } = useMutation(["deleteproduct"], deleteproduct,
        {
            onError: (error) => {
                // toast({status:"error",title:error.message})
                alert("Delete Faild..!!1")
            },
            onSuccess: () => {
                cache.invalidateQueries("AllProduct")
                alert("Delete Success..!!1")
            }
        })

        if (isLoading)
        return <CircularProgress />

    return (
        <div>
            <Header />
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 5 }}  >
                {
                    products?.map((item, i) => {
                        return (
                            <Card sx={{ width: "250px", my: 2, mx: 2 }} key={item.id + i} >
                                <CardContent >
                                    <EditIcon sx={{ marginRight: 15 }} onClick={() => editbtn(item.id)} />
                                    <DeleteIcon onClick={() => deletebtn(item.id)} />
                                </CardContent>
                                <CardMedia component="img"
                                    height="250"
                                    image={item.image}
                                    alt='green iguana' />
                                <CardContent>
                                    <Typography variant='h5' align='center'>{item.name}</Typography>
                                    <Typography variant='h6' align='center'>{item.price}</Typography>
                                    <Typography variant='subtitle1' color='gray' align='center'>{item.detail}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Stack>

        </div>
    )
}

export default MyProduct