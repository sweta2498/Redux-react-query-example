import { Button, Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Header from '../Component/Header'
import { fetchproductdata } from '../QueryUse/ApiCall'
import { setGetProduct } from '../Redux/ActionCreator'

const ShowAllProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let products = useSelector((state) => state?.Product);

  const onSuccess = (data) => {
    // console.log(data);
    dispatch(setGetProduct(data?.data));
    localStorage.setItem('product',  JSON.stringify(data?.data));
  }
  const { isLoading } = useQuery(["AllProduct"], fetchproductdata, {
    staleTime:50000,
    cacheTime:20000,
    refetchOnWindowFocus:false,
    // refetchInterval: 50000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    onSuccess: onSuccess,
  })

  if (isLoading)
    return <CircularProgress />

  function viewbtn(id) {
    navigate(`/singleproduct/${id}`)
  }

  return (
    <div>
      <Header />
      <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 5 }}  >
        {
          products?.map((item, i) => {
            return (
              <Button key={item.id} onClick={() => viewbtn(item.id)} >
                <Card sx={{ width: "250px", my: 2, mx: 2 }}  >
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
              </Button>
            )
          })
        }
      </Stack>
    </div>
  )
}
export default ShowAllProduct