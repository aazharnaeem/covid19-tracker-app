import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        margin: '0 auto',
        padding:'20px',

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
    },
}));

const Global = () => {
    const classes = useStyles();
    let [Data, setData] = useState({})

    useEffect(() => {

        async function getData() {
            const res = await fetch("https://api.covid19api.com/summary");
            let data = await res.json();
            setData(data.Global)
        }
        getData()
    }, [])
    // console.log(Data)

    
    return (
        <div>

            <div className={classes.root}>
                <h1 >Global Data</h1>
                <Grid container spacing={3}>
                    {Object.keys(Data).map((value, ind) => {
                        return (
                            <Grid item xs={12} sm={3} key={ind}>
                                <Paper elevation={10} className={classes.paper}><strong>{value.replace(/_/g, ' ').toUpperCase()}</strong><br /><br />{Data[value]}</Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>

        </div>
    )
}

export default Global