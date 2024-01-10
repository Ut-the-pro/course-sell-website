import {Button, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'


function Appbar(){
    const navigate = useNavigate();
    const mail = localStorage.getItem("username");
    return(
        <div style={{display: "flex", justifyContent: 'space-between', marginTop: -5, backgroundColor:"#FCFCFC", zIndex: 1}}>
            <div style={{height:"100%"}}>
                <img width= "110" height="45" src="../logo.png" />
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', alignItems:"center", marginTop: -15}}>
                <div><Typography variant="h7" align="center" style={{paddingRight:"15px"}} >Home</Typography></div>
                <div><Typography variant="h7" align="center" style={{paddingRight:"15px"}} >About Us</Typography></div>
                <div><Typography variant="h7" align="center" style={{paddingRight:"15px"}} >Pricing</Typography></div>
                <div><Typography variant="h7" align="center" style={{paddingRight:"15px"}} >Our Courses</Typography></div>
                <Button variant ="text" style={{paddingTop: "8px"}}>{mail}</Button>
                <Button size ="small" variant ="contained" onClick={()=>{
                    localStorage.setItem('token', null)
                    navigate("/signup")}}>Logout</Button>
            </div>

        </div>
    )
}
export default Appbar