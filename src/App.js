import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import NewProduct from './Product/NewProduct';
import ShowAllProduct from './Product/ShowAllProduct';
import SingleProduct from './Product/SingleProduct';
import SignIn from './Component/SignIn';
import Login from './Component/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ActionType } from './Redux/ActionType';
import Home from './Component/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MyProduct from './Product/MyProduct';
import Protected from './Service/Protected';
import UpdateProduct from './Product/UpdateProduct';

function App() {

  const queryClient = new QueryClient({
      defaultOptions:{
        queries:{
          refetchOnWindowFocus:false,
          // refetchInterval:5000
        }
      }
    }
  );

  const dispatch = useDispatch()
  const logindata = useSelector((state) => state?.Login[0]?.email);
  const [aayth,setAuth] = useState(Boolean(logindata))

  useEffect(() => {
    let time1 = localStorage.getItem('token');
    const time = JSON.parse(time1);

    if (time === null) {
      // console.log("null");
      // dispatch(setLogout());
    }
    else if (time.expiresIn < Date.now()) {
      localStorage.removeItem('token')
      // dispatch(setLogout());
    }
    else {
      setAuth(true)
      dispatch({
        type: ActionType.SET_LOGIN,
        payload: time
      })
    }

  }, [])

  function RequireAuth({ children }) {
    return Boolean(logindata) ? children : <Login />;
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/header' element={<Header />} />
            <Route path='/footer' element={<Footer />} />
            <Route path='/newproduct' element={<NewProduct />} />
            <Route path='/myproduct' element={<MyProduct />} />
            <Route path='/updateproduct/:id' element={<UpdateProduct />} />
            <Route path='/allproduct' element={<Protected Component={ShowAllProduct} />} />
            <Route path='/singleproduct' element={<SingleProduct />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<SignIn />} />        
            <Route path='/singleproduct/:id' element={<SingleProduct />} />    


            {/* <Route path="/allproduct" element={
            <RequireAuth>
              <ShowAllProduct />
            </RequireAuth>
          } />  */}
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}

export default App;
