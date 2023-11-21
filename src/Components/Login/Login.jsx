import Axios from 'axios';
import React, { useState } from 'react'
// import logo from "../../Assets/protean.jpg"
import * as CryptoJS from "crypto-js";

const Login = ({setLogin}) => {
    const [log, setLog] = useState({
        username: "", password: ""
    });

    const handelInp = (e) => {
        const { name, value } = e.target;

        setLog((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    let secretkey="OSSG"; 
    const Decrypt = (data) =>{
        let bytes = CryptoJS.AES.decrypt(data,secretkey);
        var dec = bytes.toString(CryptoJS.enc.Utf8);
        return dec;         
      }

    const postData = async (e) =>{

        e.preventDefault();
        const userd = await Axios.get(`inventory/login/${log.username}`);
        if(userd.data!==''){

            if(Decrypt(userd.data.password) === log.password){
                localStorage.setItem("username", userd.data.username);
                localStorage.setItem("password", userd.data.password);
                setLogin(true);
            }else{
                setLogin(false);
                alert("Enter Correct Credentials");
            }
        }else{
            setLogin(false);
            alert("Enter correct credentials");
        }

        // alert(userd.data);




        // const us = localStorage.getItem("username");
        // const ps = localStorage.getItem("password");
        // if(us !== "ritesh" && ps !== "ritesh"){

        //     console.log(log);
            

        // }else{
            
        //     localStorage.setItem("username", log.username);
        //     localStorage.setItem("password", log.password);

        // }
    }

    return (
        <>
        <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center flex-column'>
            <h1><i>OSSG Inventory</i></h1>
            <div className="container m-auto mt-5 shadow p-3 mb-2 bg-body rounded" style={{width:"50%"}}>
                {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={logo} alt="logo" className='w-75 h-75' />
                </div> */}
                <div className="mt-4">
                    <h2>Login Form</h2>
                    <form>

                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" name="username" value={log.username} onChange={handelInp} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" value={log.password} onChange={handelInp} id="exampleInputPassword1" />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={postData}>Login</button>
                    </form>
                </div>

            </div>
            </div>
        </>
    )
}

export default Login