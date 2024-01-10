import {Button, Grid, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'


function Landing(){
    const navigate = useNavigate();
    return(
        <div style={{display: "flex"}}>
            <Grid container >
                <Grid item lg={8} md ={12} sm={12} >
                    <div style={{width: "100%", height: "100%", border:"4px solid blue"}}>
                        <img
                            src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=740&t=st=1704824558~exp=1704825158~hmac=1c56f46b930e779b6e182b3a44e443e13eaf1b1e4e63fd936bffea8f979d68b0"
                            style={{ width: "100%", height: "100%", objectFit: "cover"}}
                        />
                        {/* <div style={{zIndex:"1"}}><img width= "170" src="https://img.freepik.com/free-vector/hand-drawn-high-school-logo-design_23-2149667303.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704326400&semt=ais" /></div> */}
                    </div>
                </Grid>
                <Grid item lg={4} md ={12} sm={12}>
                    <div style={{height: "100%",backgroundColor: "#ffffdb", display: "flex", justifyContent: "center", alignItems: "center",  border:"4px solid orange", borderLeft: "2px solid gray"}}>
                        <Typography variant ="h3" align="center" color="#fe7600" > Get started<br />
                        <Button style={{borderRadius: "20px"}} variant={'contained'} onClick={()=>{navigate('/signup')}}>Try Now</ Button>
                        </Typography>
                    </ div>
                </Grid>
            </Grid>

        </div>
    )
}
export default Landing