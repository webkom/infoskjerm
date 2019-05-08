import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { LEGO_API_URL } from './conf';
import EventList from './EventList';

const styles = theme => ({
  container: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  leftContainer: {
    marginRight: '2px'
  },
  rightContainer: {
    marginLeft: '2px',
    paddingRight: '4px'
  }
});

const formatEvent = event => ({
  ...event,
  ...{
    startTime: moment(event.startTime),
    endTime: moment(event.endTime)
  }
});

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      presentations: [],
      other: []
    };
  }

  fetchData = () => {
    const apiUrl = `${LEGO_API_URL}/events/?date_after=${moment().format(
      'YYYY-MM-DD'
    )}`;
    this.setState({
      isLoading: true
    });
    fetch(apiUrl)
      .then(async res => await res.json())
      .then(res => {
        let isOdd = false;
        const presentations = res.results
          .filter(event =>
            ['company_presentation', 'lunch_presentation', 'course'].includes(
              event.eventType
            )
          )
          .slice(0, 5)
          .map(event => {
            let returnItem = formatEvent(event);
            returnItem.isOdd = isOdd;
            isOdd = !isOdd;
            return returnItem;
          });
        isOdd = false;
        const other = res.results
          .filter(event =>
            ['other', 'event', 'social', 'party'].includes(event.eventType)
          )
          .slice(0, 5)
          .map(event => {
            let returnItem = formatEvent(event);
            returnItem.isOdd = isOdd;
            isOdd = !isOdd;
            return returnItem;
          });
        this.setState({
          presentations,
          other,
          isLoading: false
        });
      })
      .catch();
  };

  componentDidMount() {
    this.fetchData();
    this.fetcher = setInterval(this.fetchData, 60 * 60 * 1000); // Every hour
  }

  componentWillUnmount() {
    clearInterval(this.fetcher);
  }

  render() {
    const { classes } = this.props;
    const { presentations, other } = this.state;
    return (
      <Grid container direction={'column'} className={classes.container}>
        <Grid item className={classes.leftContainer}>
          <EventList title={'Bedpres og Kurs'} events={presentations} />
        </Grid>
        <Grid item className={classes.rightContainer}>
          <EventList title={'Arrangementer'} events={other} isRightContainer />
        </Grid>
      </Grid>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);
