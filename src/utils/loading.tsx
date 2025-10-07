import { Grid } from '@mui/material'
import './list.css'

export function Loading() {
    return (
        <>
            <Grid container spacing={2} style={{ minHeight: '200px' }}>
                <div className='loading-container' style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>

                    <img src={'https://cdn.pixabay.com/animation/2023/06/08/15/03/15-03-45-927_512.gif'} alt="Loading..." className="zoom-logo" />

                </div>
            </Grid>
        </>
    )
}