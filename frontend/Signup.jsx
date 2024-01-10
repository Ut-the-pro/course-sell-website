import {Button, Card, Typography, TextField} from '@mui/material'
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
    const [adminmail, setAdminmail] = useState("");
    const [adminpassword, setAdminpassword] = useState("");
    const [usermail, setUsermail] = useState("");
    const [userpassword, setUserpassword] = useState("");

    return (
        <div style={{backgroundImage: 'url("background1.png")'}}>
            <br />
            <div style={{height: 250,backgroundColor: "#feda60", display: "flex", flexWrap: "wrap", justifyContent: "left", borderRadius: "5px 50px", margin: "8px 300px 8px 20px"}}>
                <div style={{marginTop: 0 ,marginLeft: 50}}>
                    <Card variant={"outlined"} style={{width: 170, height : 238, padding:"5px 50px", borderRadius: "25px 25px 1px 1px"}}>
                        <Typography variant="h6" align="center" >SignUp/Login as a</Typography>
                        <Typography variant="h5" align="center" >USER</Typography>
                        <TextField 
                            size="small"
                            fullWidth={true}
                            label="Email"
                            variant="outlined"
                            onChange={(e)=>{
                                setUsermail(e.target.value);
                            }}
                            
                        />
                        <br /><br />
                        <TextField 
                            size="small"
                            fullWidth={true}
                            label="Password"
                            variant="outlined"
                            type={"password"}
                            onChange={(e)=>{
                                setUserpassword(e.target.value);
                            }}
                        />
                        <br /><br />
                        <div>New?</div>
                        <div style={{display: "flex", justifyContent:"center"}}>
                            <div><Button variant={'contained'} style={{marginTop: 1, marginRight: 20, marginLeft: -5}}
                                         onClick={async ()=>{
                                            const response = await axios.post('http://localhost:3000/users/signup', {
                                                username: usermail,
                                                password: userpassword
                                            });
                                            alert(response.data.message);
                                         }}
                            
                            >SignUP</Button></div>
                            <div><Button variant={'contained'} style={{marginTop: 1, marginLeft: 20}}
                                         onClick={async ()=>{
                                            const response = (await axios.post('http://localhost:3000/users/login', {
                                                username: usermail,
                                                password: userpassword
                                            }).catch((error)=>{alert(error.response.data.message)}))
                                            localStorage.setItem('token', response.data.token);
                                            localStorage.setItem('username', usermail);
                                            navigate('/users/courses')
                                         }}
                            >Login</Button></div>
                        </div>
                    </Card>
                </div>
                <div style={{marginTop: -14, marginLeft: 40, marginBottom: 15, boxShadow: "10px 10px 10px"}}>
                    <img src="https://cdn.dribbble.com/userupload/3885546/file/original-9bcc9d1e535200dbf136ae367b0417bc.png?resize=1024x768" width="400" height="280" border="1px solid black" />
                </div>  
            </div>
            <br /><br />
            <div style={{height: 250,backgroundColor: "#feda60", display: "flex", flexWrap: "wrap", justifyContent: "right", borderRadius: "5px 50px", margin: "8px 20px 8px 300px"}}> 
                <div style={{marginTop: 0 ,marginRight: 50}}>
                    <Card variant={"outlined"} style={{width: 170, height : 238, padding:"5px 50px", borderRadius: "25px 25px 1px 1px"}}>
                        <Typography variant="h6" align="center" >SignUp/Login as a</Typography>
                        <Typography variant="h5" align="center" >ADMIN</Typography>
                        <TextField 
                            size="small"
                            fullWidth={true}
                            label="Email"
                            variant="outlined"
                            onChange={(e)=>{
                                setAdminmail(e.target.value);
                            }}
                        />
                        <br /><br />
                        <TextField 
                            size="small"
                            fullWidth={true}
                            label="Password"
                            variant="outlined"
                            type={"password"}
                            onChange={(e)=>{
                                setAdminpassword(e.target.value);
                            }}
                        />
                        <br /><br />
                        <div>New?</div>
                        <div style={{display: "flex", justifyContent:"center"}}>
                            <div><Button variant={'contained'} style={{marginTop: 1, marginRight: 20, marginLeft: -5}}
                                         onClick={async ()=>{
                                            const response = await axios.post('http://localhost:3000/admin/signup', {
                                                username: adminmail,
                                                password: adminpassword
                                            });
                                            alert(response.data.message);
                                         }}
                            
                            >SignUP</Button></div>
                            <div><Button variant={'contained'} style={{marginTop: 1, marginLeft: 20}}
                                         onClick={async ()=>{
                                            const response = await axios.post('http://localhost:3000/admin/login', {
                                                username: adminmail,
                                                password: adminpassword
                                            }).catch((error)=>{alert(error.response.data.message)});
                                            localStorage.setItem('token', response.data.token)
                                            localStorage.setItem('username', adminmail)
                                            navigate('/admin/courses')
                                         }}
                                 >Login</Button></div>
                        </div>
                    </Card>
                </div> 
                <div style={{marginTop: -14, marginRight: 40, marginBottom: 15, boxShadow: "10px 10px 10px"}}>
                    <img src="https://cdn.dribbble.com/userupload/8492553/file/original-c05ff2d8186a5d9ffc6c7b2cc817bbce.jpg?resize=1024x768" width="400" height="280" border="1px solid black" />
                </div>
            </div>
            <br /><br />
        </div>
        
    )
}
export default Signup