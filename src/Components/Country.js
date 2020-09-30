import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
        padding:'20px'
    },
    paper: {
        color: 'black',
        bordercolor: 'green',
        padding:'10px',
    },
    container:{
     }
}));



const Country = () => {
    const classes = useStyles();
    let [country, Setcountry] = useState({})

    useEffect(() => {

        async function getData() {
            let res = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
            let data = await res.json();
            // console.log(data.countryitems[0])
            delete data.countryitems[0].stat
            Setcountry(data.countryitems[0])
            // console.log(data.countryitems[0])
        }
        getData()

    }, [])
    // console.log(country)

    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {Object.keys(country).map((val) => {
                        // console.log(country[val])
                        let con = country[val]
                        delete con.source
                        delete con.ourid
                        delete con.code
                        // con.replace(/title/g,`${}`)
                        return (
                            <>
                            <Grid item xs={12} sm={6} key={con.ourid}>
                                <h1><u>{con.title.toUpperCase()}</u></h1>
                                <Paper className={classes.paper} elevation={16} key={con.ourid}>

                                {Object.keys(con).map((value) => {
                                    // console.log(value)
                                   return (
                                        <>
                                        <Grid container className={classes.container} key={con.ourid}>
                                            <Grid item xs={6} >
                                            <strong style={{color:'blue'}}>{value.replace(/_/g, ' ').toUpperCase() + ':'}</strong>
                                            </Grid>
                                            <Grid item xs={6} >
                                            <strong>{con[value]}</strong>
                                                </Grid>
                                        </Grid>
                                        </>
                                    )
                                })}
                                </Paper>
                            </Grid>
                                </>
                        )
                    })}
                </Grid>

            </div>
        </div>
    )
}

export default Country