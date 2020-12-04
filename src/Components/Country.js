import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
        padding: '20px'
    },
    paper: {
        color: 'black',
        bordercolor: 'green',
        padding: '10px',
    },
    lnk: {
        textDecoration: 'none',
    },
    // container: {
    //     display:'flex',
    //     flexflow: 'wrap'
    // }
}));



const Country = () => {
    const classes = useStyles();
    let [country, Setcountry] = useState([])

    useEffect(() => {

        async function getData() {
            let res = await fetch('https://api.covid19api.com/summary');
            let data = await res.json();
            Setcountry(data.Countries)

        }
        getData()

    }, [])
    // console.log(country)

    if (!country) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            {
                country.map((value, index) => {
                    delete value.Premium
                    // console.log(value.Slug)
                    return (
                        <div key={index}>
                            <div className={classes.root}>
                                {/* <Grid container spacing={5} classname={classes.container}>
                                    <Grid xs={5} sm={5}> */}

                                        <h1 style={{ textAlign: 'center' }}><u>{value.Country.toUpperCase()}</u></h1>
                                        {
                                            Object.keys(value).map((val, ind) => {
                                                var con = value[val]
                                                // console.dir(value.Slug)
                                                return (
                                                        <div key={ind}>
                                                            <Link to={`details${index}`} className={classes.lnk}>
                                                                <Paper className={classes.paper} elevation={16} key={con.ourid}>
                                                                    <Grid container className={classes.container} >
                                                                        <Grid xs={5} sm={5}>
                                                                            <strong style={{ color: 'blue' }}>{val.replace(/_/g, ' ').toUpperCase() + ':'}</strong>
                                                                        </Grid>
                                                                        <Grid xs={5} sm={5}>
                                                                            <strong>{con}</strong>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            </Link>
                                                        </div>
                                                )
                                            })
                                        }
                                    {/* </Grid>
                                </Grid> */}
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Country