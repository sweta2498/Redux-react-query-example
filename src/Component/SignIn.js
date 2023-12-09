import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { addNewUser } from '../QueryUse/ApiCall';

const SignIn = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [contact, setcontact] = useState("")
  const [profile, setprofile] = useState("")
  const navigate=useNavigate()

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setprofile(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const { mutateAsync } = useMutation(["AddNewUser"], addNewUser,
  {
      onSuccess:()=>{
          // cache.invalidateQueries("posts");
          navigate('/allproduct')
      },
      onError: (error) => {
          alert(error)
      }
  })

  // const signinbtn = () => {
  //   console.log({ name, email, contact, password, profile });
  //   const signindata = { name, email, contact, password, profile };
  //   if (name === '' || email === '' || contact === '' || password === '') {
  //     alert("Enter All Value..!");
  //   }
  //   else {
      
  //     fetch("https://62e266083891dd9ba8e72d99.mockapi.io/user",
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify(signindata)

  //       }).then((result) => {
  //         alert("yesssss");
  //         navigate('/login')
     
  //       })
  //   }
  // }

  return (
    <div>
      <section className='loginsection' >
        <div className='logindiv'>
          <h2>SIGN IN</h2>
          <input type="text" placeholder='Enter NAme hear....'
            onChange={e => setname(e.target.value)} />
          <input type="text" placeholder='Enter Email hear...'
            onChange={e => setemail(e.target.value)} />
          <input type="text" placeholder='Enter Contact Number..'
            onChange={e => setcontact(e.target.value)} />
          <input type="text" placeholder='Enter Password.. '
            onChange={e => setpassword(e.target.value)} />
          <input type="file" placeholder='Choose Profile Image'
            onChange={(e) => {
              uploadImage(e);
            }} />
          <button onClick={async()=>{ await mutateAsync({ name,email,contact,password,profile })}}>Sign IN</button>
        </div>
      </section>
    </div>
  )
}

export default SignIn