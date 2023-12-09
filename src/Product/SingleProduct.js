import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../Component/Header'

const SingleProduct = () => {

  const { id } = useParams();
  let products = useSelector((state) => state?.Product);
  products = products.filter(pd => pd.id === id)
  console.log(products[0].name);

  return (
    <div>
      <Header />
      <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 5 }}  >
        <Card sx={{ width: "350px", my: 2, mx: 10 }} key={products[0].id}>
          <CardMedia component="img"
            height="300"
            image={products[0].image}
            alt='green iguana' />
          <CardContent>
            <Typography variant='h5' align='center'>{products[0].name}</Typography>
            <Typography variant='h6' align='center'>{products[0].price}</Typography>
            <Typography variant='subtitle1' color='gray' align='center'>{products[0].detail}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </div>
  )
}
export default SingleProduct