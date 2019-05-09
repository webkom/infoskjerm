import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  GLOSHAUGEN_TO_CENTRUM_API_URL,
  GLOSHAUGEN_FROM_CENTRUM_API_URL,
  PROFBROCHS_TO_CENTRUM_API_URL,
  PROFBROCHS_FROM_CENTRUM_API_URL
} from './conf';
import BusDepartureList from './BusDepartureList';

const styles = theme => ({
  container: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    justifyContent: 'flex-end'
  },
  topContainer: {
    display: 'flex',
    width: '50vw',
    height: '25vh',
    marginBottom: '2px'
  },
  bottomContainer: {
    display: 'flex',
    width: '50vw',
    height: '25vh',
    marginTop: '2px'
  }
});

const BusDepatures = ({ classes }) => (
  <Grid container direction={'row'} className={classes.container}>
    <Grid item className={classes.topContainer}>
      <BusDepartureList
        apiUrl={GLOSHAUGEN_FROM_CENTRUM_API_URL}
        stopName={'Gløshaugen'}
        walkTime={'5 min'}
        isGoingTowardsCentrum={false}
      />
      <BusDepartureList
        apiUrl={GLOSHAUGEN_TO_CENTRUM_API_URL}
        stopName={'Gløshaugen'}
        walkTime={'5 min'}
        isGoingTowardsCentrum={true}
      />
    </Grid>
    <Grid item className={classes.bottomContainer}>
      <BusDepartureList
        apiUrl={PROFBROCHS_FROM_CENTRUM_API_URL}
        stopName={'Prof. Brochs gate'}
        walkTime={'6 min'}
        isGoingTowardsCentrum={false}
      />
      <BusDepartureList
        apiUrl={PROFBROCHS_TO_CENTRUM_API_URL}
        stopName={'Prof. Brochs gate'}
        walkTime={'6 min'}
        isGoingTowardsCentrum={true}
      />
    </Grid>
  </Grid>
);

BusDepatures.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusDepatures);
