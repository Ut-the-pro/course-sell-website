import {Button, Card, Typography, TextField} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar'

export function Admincourses(){
  const navigate = useNavigate();
  const [courses, setCourses]=useState([])
  
  useEffect(()=>{
    async function getcourses(){
      const response = await axios.get('http://localhost:3000/admin/courses', {
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
      }).catch((err)=>{alert(err.response.data.message)})
      setCourses(response.data.courses);
    }
    getcourses()},[])
  
  return(
    <div style={{height: "100vh", backgroundColor:"#FFD19A"}}>
      <Appbar></Appbar>
      <div style={{display: "flex", flexWrap:"wrap", justifyContent:"center" }}>
        {courses.map(course => {return <Course course={course}/>})}
      </div>
      <br /><br />
      <div style={{textAlign: "center"}}>
        <Button variant="contained" onClick={()=>{
          navigate('/admin/addcourse')
        }}>ADD COURSE</Button>
      </div>
      <br />
    </div>
  )
}

export function Course(props){
  const navigate = useNavigate();
  return (
    <Card variant={"outlined"} style={{width: 250, minHeight : 250, padding:"0px 0px", marginRight:"20px", marginTop: "50px",borderRadius: "5px 5px 25px 25px", border: "2px solid #53195D"}}>
      <img src={props.course.imageLink} width="250" height="130"/>
      <div style={{textAlign: "center"}}>Id: {props.course._id} </div>
      <Typography variant="h5" align="center" >{props.course.title}</Typography>
      <Typography variant="h6" align="center" style={{marginTop:-8}}>{props.course.description}</Typography>
      <div style={{display: "flex", justifyContent:"center"}}>
          <Button variant={'contained'} size="small" style={{marginTop: 1}}
                        onClick={async ()=>{
                          navigate("/admin/update/"+props.course._id)
                        }}
          >EDIT</Button>
      </div>
    </Card>
  )
}