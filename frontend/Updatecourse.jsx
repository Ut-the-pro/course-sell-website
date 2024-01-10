import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, Typography, TextField, Grid} from '@mui/material'
import axios from 'axios';
import Appbar from "./Appbar";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

function Updatecourse(){
    let {courseId} = useParams();
    const [course, setCourse] = useRecoilState(courseState);

    useEffect(()=>{
        async function getcourse(){
            const response = await axios.get("http://localhost:3000/admin/courses/" + courseId, {
                headers: {"Authorization": "Bearer " +localStorage.getItem("token")}
            }).catch((err)=>{alert(err.response.data.message)})
            setCourse((existing)=>{ return response.data.course});
        }
        getcourse();
    }, [])


    return(
        <div style={{width:"100vw",height: "100vh",backgroundColor:"#eeeeee", zIndex: -2}}>
            <Appbar />
            <div style={{height : 250, backgroundColor: "#212121", width: "100vw",zIndex:-1, display: "flex", justifyContent: "center", alignItems: "center", marginBottom:-100}}>
                <Typography variant="h3" style={{color: "white", fontWeight: 600}}>{course.title}</Typography>
            </div>
            
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <Updatedcard />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <Currentcard /> 
                </Grid>
            </Grid>
        </div>
    )
function Currentcard(){
    const crs = useRecoilValue(courseState);
    return (
        <Card variant={"outlined"} style={{width: 230, minHeight : 150, padding:"0px 0px", marginRight:"20px", marginTop: "50px",borderRadius: "5px 5px 25px 25px", border: "2px solid #53195D"}}>
            <img src={crs.imageLink} width="250" height="130"/>
            <div style={{textAlign: "center"}}>Id: {crs._id} </div>
            <Typography variant="h5" align="center" >{crs.title}</Typography>
            <Typography variant="h6" align="center" style={{marginTop:-8}}>₹{crs.price}</Typography>
        </Card>
        )
}
function Updatedcard(){
    const[course, setCourse]=useRecoilState(courseState)

    const [title, setTitle]=useState(course.title)
    const [description, setDescription]=useState(course.description)
    const [price, setPrice]=useState(course.price)
    const [image, setImage]=useState(course.imageLink)
    const [published, setPublished]=useState(course.published)

    return (
        <div>
            <Card variant={"outlined"} style={{width: 350, height : 340, padding:"25px 25px", border: "1px solid orange", marginLeft: 150}}>
                <Typography variant="h6" style={{marginTop: -25}}>Edit Course Details</Typography><br />
                <TextField size="small" fullWidth={true} variant="outlined"
                    label="Title"
                    defaultValue={course.title}
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}
                />
                <br /><br />
                <TextField size="small" fullWidth={true} variant="outlined"
                    label="Description"
                    defaultValue={course.description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                />
                <br /> <br />
                <TextField size="small" fullWidth={true} variant="outlined"
                    label="Price"
                    defaultValue={course.price}
                    onChange={(e)=>{
                        setPrice(Number(e.target.value));
                    }}
                />
                <br /><br />
                <TextField size="small" fullWidth={true} variant="outlined"
                    label="Image Link"
                    defaultValue={course.imageLink}
                    onChange={(e)=>{
                        setImage(e.target.value);
                    }}
                />
                <br /><br />
                <TextField size="small" fullWidth={true} variant="outlined"
                    label="Published"
                    defaultValue={course.published}
                    onChange={(e)=>{
                        setPublished(Boolean(e.target.value));
                    }}
                />
                <br /><br />
                <div style={{display: "flex", justifyContent:"center"}}>
                    <div><Button variant='contained'
                                onClick={async ()=>{
                                    const response = await axios.put('http://localhost:3000/admin/courses/'+course._id,
                                    {title, description, price: price, imageLink: image, published},
                                        {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}}
                                    ).catch((err)=>{alert(err.response.data.message)});
                                    setCourse((prevCourse) => ({
                                        ...prevCourse,
                                        title,
                                        description,
                                        price,
                                        imageLink: image,
                                        published
                                    }));
                                }}
                    
                    >UPDATE COURSE</Button></div>
                </div>
            </Card>
        </div>
    )
    }
}

const courseState = atom({
    key: 'courseState',
    default: {}
})

export default Updatecourse