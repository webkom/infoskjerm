import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import { withStyles } from '@material-ui/core/styles';
import AirportShuttle from '@material-ui/icons/AirportShuttle';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    alignItems: 'center',
    height: '25%',
    padding: '0px 5px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
  },
  even: {
    backgroundColor: theme.palette.primary.light
  },
  odd: {
    backgroundColor: theme.palette.primary.main
  },
  leftAlign: {
    textAlign: 'left'
  },
  rightAlign: {
    textAlign: 'right'
  },
  centerAlign: {
    textAlign: 'center'
  },
  dataContainer: {},
  busIcon: {
    color: theme.palette.secondary.dark
  },
  realtimeIcon: {
    color: theme.palette.secondary.dark
  },
  busIconContainer: {
    display: 'flex'
  },
  lineNumber: {
    fontWeight: 500,
    fontSize: '1.5rem',
    textAlign: 'right',
    marginBottom: '7px'
  },
  destination: {
    overflow: 'hidden',
    paddingLeft: '15px',
    marginBottom: '7px'
  },
  departureTime: {
    fontFamily: 'monospace',
    fontSize: '2rem'
  },
  realtimeData: {}
});

const BusDepature = ({
  classes,
  isOdd,
  line,
  destination,
  registeredDepartureTime,
  scheduledDepartureTime,
  isRealtimeData
}) => (
  <Grid
    container
    className={classNames(
      classes.container,
      isOdd ? classes.odd : classes.even
    )}
  >
    <Grid
      item
      xs={1}
      className={classNames(classes.dataContainer, classes.busIconContainer)}
    >
      <AirportShuttle className={classes.busIcon} />
    </Grid>
    <Grid
      item
      xs={1}
      className={classNames(classes.dataContainer, classes.lineNumber)}
    >
      {line}
    </Grid>
    <Grid
      item
      xs={5}
      className={classNames(classes.dataContainer, classes.destination)}
    >
      {destination}
    </Grid>
    <Grid
      item
      xs={5}
      className={classNames(
        classes.dataContainer,
        classes.departureTime,
        classes.rightAlign
      )}
    >
      {scheduledDepartureTime.format('HH:mm')}
    </Grid>
  </Grid>
);

BusDepature.propTypes = {
  classes: PropTypes.object.isRequired,
  isOdd: PropTypes.bool.isRequired,
  line: PropTypes.number.isRequired,
  registeredDepartureTime: momentPropTypes.momentObj.isRequired,
  scheduledDepartureTime: momentPropTypes.momentObj.isRequired,
  destination: PropTypes.string.isRequired,
  isRealtimeData: PropTypes.bool.isRequired
};

export default withStyles(styles)(BusDepature);
