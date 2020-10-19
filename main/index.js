import react, { useState, useEffect } from 'react';
import styles from '../styles/main.css'
import axios from 'axios';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
const launchState = ["True", "False"];
const landingState = ["True", "False"];


export default function HomePage({ launches }) {
  const [launchArray, setLaunchArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year_state, setyear_state] = useState(null);
  const [launch_state, setlaunch_state] = useState(null);
  const [landing_state, setlanding_state] = useState(null);

  useEffect(() => {
    setLaunchesArray(launches);
  }, [launches]);

  const getData = async (years, launchState, landingState) => {
    setLoading(true);
    let url = `https://api.spacexdata.com/v3/launches?limit=100`;
    if (year) {
      url = url.concat(`&launch_year=${year}`);
    }if (landingState) {
      landingState == "True" ? url = url.concat(`&land_success=${true}`) : url = url.concat(`&land_success=${false}`);
    }if (launchState) {
      launchState == "True" ? url = url.concat(`&launch_success=${true}`) : url = url.concat(`&launch_success=${false}`);
    }
    try {
      const { data } = await axios.get(url);
      setLoading(false);
      return data;
    }
    catch (e) {
      setLoading(false);
      console.log("error getting data");
      console.log(e);
    }
  }

  const yearFilter = async (year) => {
    if (year == year_state) {
      setyear_state(null);
      year = null;
    }
    else {
      setyear_state(year);
    }
    let launches = await getData(year, launch_state, landing_state);
    setLaunchesArray(launches);
  }

  const launchFilter = async (launch) => {
    if (launch == launch_state) {
      setlaunch_state(null);
      launch = null;
    }
    else {
      setlaunch_state(launch);
    }
    let launches = await getData(year_state, launch, landing_state);
    setLaunchesArray(launches);
  }

  const landingFilter = async (landing) => {
    if (landing == landing_state) {
      setlanding_state(null);
      landing = null;
    }
    else {
      setlanding_state(landing);
    }
    let launches = await getData(year_state, launch_state, landing);
    setLaunchesArray(launches);
  }

  return (
    <div>
      <Head>
        <title>SpacexX Launch Program</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid style={{ backgroundColor: "#dedede" }}>
        <Row>
          <h2 style={{ margin: 0 }}>SpaceX Launch Program</h2>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={4} lg={2} style={{ backgroundColor: 'white', padding: 10, marginTop: 10, height: '100%' }}>
            <h3>
              <b>Filters</b>
            </h3>
            <h4 className={styles.subheading}>Launch Year</h4>
            <Row>
              {years.map((year, index) => {
                return (
                  <Col xs={6} sm={6} md={6} lg={6} key={index} style={{ padding: "5px 10px" }}>
                    <button className={styles.button}
                      style={year == year_state ? { backgroundColor: '#37ca57' } : {}}
                      onClick={() => { yearFilter(year) }}>{year}</button>
                  </Col>
                )
              })}
            </Row>
            <h4 className={styles.subheading}>Successful Launch</h4>
            <Row>
              {launchState.map((launch, index) => {
                return (
                  <Col xs={6} sm={6} md={6} lg={6} key={index} style={{ padding: "5px 10px" }}>
                    <button className={styles.button}
                      style={launch == launch_state ? { backgroundColor: '#37ca57' } : {}}
                      onClick={() => { launchFilter(launch) }}>{launch}</button>
                  </Col>
                )
              })}
            </Row>
            <h4 className={styles.subheading}>Landing</h4>
            <Row>
              {landingState.map((landing, index) => {
                return (
                  <Col xs={6} sm={6} md={6} lg={6} key={index} style={{ padding: "5px 10px" }}>
                    <button className={styles.button}
                      style={landing == landing_state ? { backgroundColor: '#37ca57' } : {}}
                      onClick={() => { landingFilter(landing) }}>{landing}</button>
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col xs={12} sm={8} md={8} lg={10}>
            {loading && <p>loading...</p>}
            {!loading && <Row>
              {launchesArray.length == 0 && <h3 style={{marginLeft:10}}>No Result Found</h3>}
              {launchesArray.length != 0 &&launchesArray.map((item, index) => {
                return (
                  <Col key={index} xs={12} sm={6} md={6} lg={3} style={{ padding: 10 }}>
                    <div className="card" style={{ padding: 10, backgroundColor: 'white', height: '100%' }}>
                      <div className="imageContainer" style={{ width: '100%', backgroundColor: 'whitesmoke', padding: 5 }}>
                        <img style={{ width: '100%' }} src={item.links.mission_patch_small}></img>
                      </div>
                      <p className={styles.mission_name}>{item.mission_name}{' '}#{item.flight_number}</p>
                      <p><b>Mission Ids:</b></p>
                      <ul>
                        {item.mission_id.map((id, index) => {
                          return (
                            <li key={index}><span className={styles.blue}>{id}</span></li>
                          )
                        })}
                      </ul>
                      <p>
                        <b>Launch Year:</b>
                        <span className={styles.blue}>{item.launch_year}</span>
                      </p>
                      <p>
                        <b>Successful Launch:</b>
                        <span className={styles.blue}>{JSON.stringify(item.launch_success)}</span>
                      </p>
                      <p>
                        <b>Successful Landing:</b>
                        <span className={styles.blue}>{JSON.stringify(item.rocket.first_stage.cores[0].land_success)}</span>
                      </p>
                    </div>
                  </Col>
                )
              })}
            </Row>}
          </Col>
        </Row>
        <Row>
          <h2 style={{ marginTop: 20 }}>Developed by: Nupur Agarwal</h2>
        </Row>
      </Grid>
    </div>
  )
}

HomePage.getInitialProps = async (res) => {
  try {
    const { data } = await axios.get("https://api.spacexdata.com/v3/launches?limit=100");
    return {
      launches: data
    }
  }
  catch (e) {
    console.log("error occuring to fetch data");
    console.log(e);
  }
}
