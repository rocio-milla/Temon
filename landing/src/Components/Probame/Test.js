import { Grid } from '@material-ui/core'
import React from 'react'

function Test() {
    return (
        <Grid container style={{ backgroundColor: "#4F831F", height: "100vh" }}  justify="center" alignItems="center" id="probalo">
            <Grid item sm={12} md={6}>
                <h1 style={{ color: "white", fontWeight: 700, fontSize: "11vh"}}>PROBAME</h1>
            </Grid>
            <Grid item sm={12} md={6}>
                <img src={"/img/qr.png"} style={{ height: "60vh" }} />
            </Grid>
        </Grid>
    )
}

export default Test
