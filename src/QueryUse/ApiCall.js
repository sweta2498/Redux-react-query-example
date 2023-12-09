import axios from "axios";


export const fetchuserdata = async () => {
    try {
        const { data } = await axios.get(`https://62e266083891dd9ba8e72d99.mockapi.io/user`);
        console.log(data);
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch User!!')
    }
}

export const addNewUser = async ({ name,email,contact,password,profile}) => {
    const newdata={ name,email,contact,password,profile}
    try {
        const { data } = await axios.post(`https://62e266083891dd9ba8e72d99.mockapi.io/user`,
            (newdata),
            {
                headers: { "Content-Type": "application/json" }
            })
        alert("New Post added..!!")
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch User!!')
    }
}

export const addnewproduct = async ({ userid,name,price,detail,image}) => {
    const newdata={userid,name,price,detail,image}
    try {
        const { data } = await axios.post(`https://62e266083891dd9ba8e72d99.mockapi.io/product`,
            (newdata),
            {
                headers: { "Content-Type": "application/json" }
            })
          
        return data;

    }
    catch (error) {
        throw Error('Unable to fetch Products!!')
    }
}


export const fetchproductdata = async () => {
    try {
        const data = await axios.get(`https://62e266083891dd9ba8e72d99.mockapi.io/product`);
        // console.log(data);
        // dispatch(setGetProduct(data)); 
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch products!!')
    }
}

export const updateproduct = async ({ id,userid,name,price,detail,image}) => {
    // console.log("id===",id);
    try {
        const { data } = await axios.put(`https://62e266083891dd9ba8e72d99.mockapi.io/product/${id}`,
            {id,userid,name,price,detail,image},
            {
                headers: { "Content-Type": "application/json" }
            })
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch product!!')
    }
}
export const deleteproduct = async ({ id }) => {
    
    try {
        const { data } = await axios.delete(`https://62e266083891dd9ba8e72d99.mockapi.io/product/${id}`,
            {
                headers: { "Content-Type": "application/json" }
            })
        // console.log("Data", data)
        
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch product!!')
    }
}
