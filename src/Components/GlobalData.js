import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        margin: '0 auto',
        padding: '20px',

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
    },
}));



const Global = () => {
    const classes = useStyles();
    let [Data, setDat] = useState({})

    useEffect(() => {

        async function getData() {
            const res = await fetch("https://api.thevirustracker.com/free-api?global=stats");
            let data = await res.json();
            delete data.results[0].source
            setDat(data.results[0])
        }
        getData()
    }, [])

    // console.log(Data)
    // if(!Data.length)
    // return <h3>Loading...</h3>

    const data = {
        labels: ['Total CASES', 'Total RECOVERED', 'Total UNRESOLVED', 'Total DEATHS','Total New Cases Today','Total New Deaths today',
        'Total Recovered','Total Serious Cases','Total un resolved'],
        datasets: [
            {
                label: 'Global Stats',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [Data.total_cases,Data.total_recovered,Data.total_unrecovered,Data.total_deaths,Data.total_new_cases_today,Data.total_new_deaths_today,
                    Data.total_recovered,Data.total_serious_cases,Data.total_unresolved]
            }
        ]
    };

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
            <div>
                <h2>Covid-19 Global Stats</h2>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>

        </div>
    )
}

export default Global