import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { fetchuserdata } from '../QueryUse/ApiCall';
import { setLogin } from '../Redux/ActionCreator';
import { runLogoutTimer, saveTokenInLocalStorage } from '../Service/Service';

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let login = localStorage.getItem('token');
    if (login) {
      navigate('/allproduct');
    }
  });

  const { data} = useQuery(["User"], fetchuserdata);
  // console.log(data);

  const loginbtn = () => {
    let loginuserdata = data.find(user => user.email === email && user.password === password);
    if (loginuserdata) {
      loginuserdata = {
        ...loginuserdata,
        expiresIn: Date.now() + (60 * 60 * 1000)
      }
      saveTokenInLocalStorage(loginuserdata);
      runLogoutTimer(
      60 * 60 * 1000
      );
      dispatch(setLogin(loginuserdata));
      navigate('/allproduct')
    }
    else {
      alert("LOgin Failed..!!!")
    }
  }

  return (
    <div>
      <section className='loginsection' >
        <div className='logindiv'>
          <h2>Log IN</h2>
          <input type="text" placeholder='Enter Email hear...'
            onChange={e => setemail(e.target.value)} />
          <input type="text" placeholder='Enter Password.. '
            onChange={e => setpassword(e.target.value)} />
          <button onClick={loginbtn}>Login</button>
        </div>
      </section>
    </div>
  )
}

export default Login;