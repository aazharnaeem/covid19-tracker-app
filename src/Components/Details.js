import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar } from 'react-chartjs-2';



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



const Details =()=>{
    const classes = useStyles();

    let [country, Setcountry] = useState({})
    let {ourid} = useParams()
    // console.log(ourid)

    useEffect(() => {
        
        async function getData() {
            let res = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
            let data = await res.json();
            Setcountry(data.countryitems[0][ourid])
        }
        getData()

    }, [ourid])
    // console.log(country)
    delete country.source
    delete country.ourid
    // console.log(country.total_cases)


    const data = {
        labels: ['Total CASES', 'Total RECOVERED', 'Total UNRESOLVED', 'Total DEATHS','Total New Cases Today','Total New Deaths today',
        'Total Recovered','Total Serious Cases','Total un resolved'],
        datasets: [
            {
                label: `Covid-19 ${country.title} Stats`,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [country.total_cases,country.total_recovered,country.total_unrecovered,country.total_deaths,country.total_new_cases_today,country.total_new_deaths_today,
                    country.total_recovered,country.total_serious_cases,country.total_unresolved]
            }
        ]
    };
    return(
        <div>
            <div className={classes.root}>
                <h1 >{country.title}</h1>
                <Grid container spacing={3}>
                    {Object.keys(country).map((value, ind) => {
                        return (
                            <Grid item xs={12} sm={3} key={ind}>
                                <Paper elevation={10} className={classes.paper}><strong>{value.replace(/_/g, ' ').toUpperCase()}</strong><br /><br />{country[value]}</Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <div>
                <h2>Covid-19 {country.title} Stats</h2>
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
export default Details