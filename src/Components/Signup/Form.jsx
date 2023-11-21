import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as CryptoJS from "crypto-js";

const Form = () => {

    const navigate = useNavigate();
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
    let encrPass="";
    let secretkey="OSSG"; 

    const Encrypt = (data) =>{
        encrPass = CryptoJS.AES.encrypt(data,secretkey).toString();
        return encrPass;        
       }
     
      

    //    Encrypt("Ritesh");
    //    Decrypt("U2FsdGVkX1+vDS+HfoOjxPo6eq3g2R8opv9XDPOvXEQ=")


    const postData = async (e) =>{
        e.preventDefault();
        // alert(log);
        // console.log(log);

        if(log.username !=="" && log.password !==""){

            const ispresent = await axios.get(`/inventory/login/${log.username}`);
            console.log(ispresent.data);
            console.log(ispresent.data.username);

            if(ispresent.data.username === undefined){
                log.password = Encrypt(log.password);
                const useradd = await axios.post('/inventory/signup',log);
                console.log(useradd.data);
                alert("User created Successfully");
                // window.location.reload(true) 
                navigate("/")
            }else{
                alert("User Already Present");
                setLog({
                    username: "", password: ""
                });
            }
            
        }else{
            alert("Enter both the feilds");
        }

        

    }

  return (
    <>
    <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center flex-column'>
        {/* <h1><i>OSSG Inventory</i></h1> */}
        <div className="container m-auto mt-5 shadow p-3 mb-2 bg-body rounded" style={{width:"50%"}}>
            {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src={logo} alt="logo" className='w-75 h-75' />
            </div> */}
            <div className="mt-4">
                <h2 className='mb-3'>Create New User</h2>
                <form>

                    <div class="mb-3" style={{textAlign:"left"}}>
                        <label class="form-label">Username</label>
                        <input type="text" class="form-control" name="username" value={log.username} onChange={handelInp} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3" style={{textAlign:"left"}}>
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" name="password" value={log.password} onChange={handelInp} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={postData}>Create</button>
                </form>
            </div>

        </div>
        </div>
    </>
  )
}

export default Form