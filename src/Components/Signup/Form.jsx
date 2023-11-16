import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

    const postData = async (e) =>{
        e.preventDefault();
        // alert(log);
        // console.log(log);

        const useradd = await axios.post('/inventory/signup',log);
        console.log(useradd.data);
        // window.location.reload(true) 
        navigate("/")

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