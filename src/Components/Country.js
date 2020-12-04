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
    }
}));



const Country = () => {
    const classes = useStyles();
    let [country, Setcountry] = useState([])
    // let [dat , setdat] = useState([])

    useEffect(() => {

        async function getData() {
            let res = await fetch('https://api.covid19api.com/summary');
            let data = await res.json();
            // data.Countries.delete(Premium)
            Setcountry(data.Countries)

        }
        getData()

    }, [])
    // console.log(country)
    return (
        <div>
            {
                country.map((value, ind) => {
                    delete value.Premium
                    // console.log(value.Slug)
                    return (
                        <div key={ind}>
                            <div className={classes.root}>
                                <Grid container spacing={3}>
                                    {
                                        Object.keys(value).map((val, ind) => {
                                            var con = value[val]
                                            // console.dir(value.Slug)
                                            return (
                                                <div key={ind}>
                                                    <Link to={`details${value.Slug}`} className={classes.lnk}>
                                                        <Paper className={classes.paper} elevation={16} key={con.ourid}>

                                                            <Grid container className={classes.container} >
                                                                <Paper item xs={6} >
                                                                    <strong style={{ color: 'blue' }}>{val.replace(/_/g, ' ').toUpperCase() + ':'}</strong>
                                                                </Paper>
                                                                <Paper item xs={6} >
                                                                    <strong>{con}</strong>
                                                                </Paper>
                                                            </Grid>
                                                        </Paper>
                                                    </Link>
                                                </div>

                                            )
                                        })
                                    }

                                </Grid>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Country