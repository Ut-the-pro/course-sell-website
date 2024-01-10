import {useState} from "react";
import {Button, Card, Typography, TextField} from '@mui/material'
import axios from 'axios';
import Appbar from "./Appbar";

function Addcourse(){
    const [title, setTitle]=useState("")
    const [description, setDescription]=useState("")
    const [price, setPrice]=useState(0)
    const [image, setImage]=useState("")
    const [published, setPublished]=useState(false)


    return(
        <div style={{height: "100vh",backgroundColor:"#B8BAF8"}}>
            <Appbar />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Card variant={"outlined"} style={{width: 300, height : 335, padding:"50px 50px", borderRadius: "25px", marginTop: 80}}>
                    <TextField size="small" fullWidth={true} variant="outlined"
                        label="Title"
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                    />
                    <br /><br />
                    <TextField size="small" fullWidth={true} variant="outlined"
                        label="Description"
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}
                    />
                    <br /> <br />
                    <TextField size="small" fullWidth={true} variant="outlined"
                        label="Price"
                        onChange={(e)=>{
                            setPrice(Number(e.target.value));
                        }}
                    />
                    <br /><br />
                    <TextField size="small" fullWidth={true} variant="outlined"
                        label="Image Link"
                        onChange={(e)=>{
                            setImage(e.target.value);
                        }}
                    />
                    <br /><br />
                    <TextField size="small" fullWidth={true} variant="outlined"
                        label="Published"
                        onChange={(e)=>{
                            setPublished(Boolean(e.target.value));
                        }}
                    />
                    <br /><br /><br/>
                    <div style={{display: "flex", justifyContent:"center"}}>
                        <div><Button variant='contained'
                                    onClick={async ()=>{
                                        const response = await axios.post('http://localhost:3000/admin/addcourse',
                                            {title, description, price: price, imageLink: image, published},
                                            {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}}
                                        );
                                        alert(response.data.message);
                                    }}
                        
                        >ADD COURSE</Button></div>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default Addcourse