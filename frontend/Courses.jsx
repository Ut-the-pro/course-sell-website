import {Button, Card, Typography, TextField} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar'

export function Courses(){
  const navigate = useNavigate();
  const [allcourses, setAllcourses]=useState([])
  
  useEffect(()=>{
    async function getcourses(){
      const response = await axios.get('http://localhost:3000/users/courses', {
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
      })
      setAllcourses(response.data.courses);
    }
    getcourses()},[])
  
  return(
    <div style={{height: "100vh", backgroundColor:"#53195D"}}>
      <Appbar></Appbar>
      <div style={{display: "flex", flexWrap:"wrap", justifyContent:"center" }}>
        {allcourses.map(course => {return <Course course={course}/>})}
      </div>
      <br /><br />
      <div style={{textAlign: "center"}}>
        <Button variant="contained" onClick={()=>{
          navigate('/users/purchasedCourse')
        }}>MY COURSES</Button>
      </div>
    </div>
  )
}

function Course(props){
    return (
      <Card variant={"outlined"} style={{width: 250, minHeight : 250, padding:"0px 0px", marginRight:"20px", marginTop: "50px",borderRadius: "5px 5px 25px 25px", border:"2px solid #ACD8FC"}}>
        <img src={props.course.imageLink} width="250" height="130"/>
        <Typography variant="h5" align="center" >{props.course.title}</Typography>
        <Typography variant="h6" align="center" style={{marginTop:-8}}>{props.course.description}</Typography><br />
        <div style={{display: "flex", justifyContent:"center"}}>
            <Button variant={'contained'} size="small" style={{marginTop: 1}}
                          onClick={async ()=>{
                            
                          }}
            >PURCHASE</Button>
        </div>
      </Card>
    )
  }

export default Courses;