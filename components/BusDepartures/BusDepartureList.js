import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import moment from 'moment';
import BusDeparture from './BusDeparture';

const styles = theme => ({
  container: {
    //marginBottom: '4px',
    //padding: '5px'
    width: '25vw',
    height: '25vh'
  },
  leftContainer: {
    marginRight: '2px'
  },
  rightContainer: {
    marginLeft: '2px'
  },
  innerRightContainer: {
    paddingRight: '4px'
  },
  header: {
    overflow: 'hidden',
    height: '25%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    backgroundColor: theme.palette.primary.main,
    letterSpacing: '3px',
    textTransform: 'uppercase'
  },
  departures: {
    height: '75%',
    backgroundColor: theme.palette.primary.light
  },
  directionText: {
    fontWeight: 'bold'
  },
    walkTime: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'right'
    }
});

const formatDeparture = departure => ({
  ...departure,
  ...{
    line: parseInt(departure.line),
    registeredDepartureTime: moment(departure.registeredDepartureTime),
    scheduledDepartureTime: moment(departure.registeredDepartureTime)
  }
});

class BusDepartureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departures: []
    };
  }

  fetchData = () => {
    const { apiUrl } = this.props;
    let isOdd = false;
    fetch(apiUrl)
      .then(res => res.json())
      .then(res =>
        this.setState({
          departures: res.departures.splice(0, 4).map(departure => {
            let returnItem = formatDeparture(departure);
            returnItem.isOdd = isOdd;
            isOdd = !isOdd;
            return returnItem;
          })
        })
      )
      .catch();
  };

  componentDidMount() {
    this.fetchData();
    this.fetcher = setInterval(this.fetchData, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.fetcher);
  }

  render() {
    const { classes, stopName, walkTime, isGoingTowardsCentrum } = this.props;
    const { departures } = this.state;
    return (
      <div
        className={
          isGoingTowardsCentrum ? classes.rightContainer : classes.leftContainer
        }
      >
        <Grid
          container
          className={classNames(
            classes.container,
            isGoingTowardsCentrum && classes.innerRightContainer
          )}
        >
          <Grid item container className={classes.header}>
            <Grid item xs={10}>
              {stopName} ·{' '}
              <span className={classes.directionText}>
                {isGoingTowardsCentrum ? 'Til' : 'Fra'}
              </span>{' '}
              Sentrum
            </Grid>
            <Grid item xs={2} className={classes.walkTime}>
                <DirectionsWalk />
                {walkTime}
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify={'space-between'}
            className={classes.departures}
          >
            {departures.map(departure => (
              <BusDeparture
                key={`${isGoingTowardsCentrum}-${departure.line}-${
                  departure.destination
                }-${departure.scheduledDepartureTime}`}
                {...departure}
              />
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

BusDepartureList.propTypes = {
  classes: PropTypes.object.isRequired,
  stopName: PropTypes.string.isRequired,
  walkTime: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  isGoingTowardsCentrum: PropTypes.bool.isRequired
};

export default withStyles(styles)(BusDepartureList);
