import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { colorForEvent } from './utils';
import 'moment/locale/nb';

const styles = theme => ({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    padding: '5px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    height: '20%'
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
  text: {
    overflow: 'hidden',
    padding: '0.5px'
  },
  eventStatusOpen: {},
  title: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  statusType: {
    letterSpacing: '2px'
  },
  image: {
    width: '95%'
  },
  eventHour: {
    fontFamily: 'monospace',
    fontSize: '1.25rem'
  }
});

const translateStatusType = eventStatusType => {
  switch (eventStatusType) {
    case 'TBA':
      return 'Mer info kommer';
    case 'OPEN':
      return 'Åpent arrangement';
    case 'INFINITE':
      return 'Åpent med påmelding';
    case 'Normal':
      return 'Vanlig påmelding';
    default:
      return `Ukjent (${eventStatusType})`;
  }
};

const Event = ({
  classes,
  isOdd,
  id,
  title,
  description,
  cover,
  eventType,
  eventStatusType,
  location,
  startTime,
  endTime,
  thumbnail,
  totalCapacity,
  registrationCount
}) => (
  <Grid
    container
    className={classNames(
      classes.container,
      isOdd ? classes.odd : classes.even
    )}
    style={{
      borderLeft: `2px solid ${colorForEvent(eventType)}`
    }}
  >
    <Grid item xs={9}>
      <div title={title} className={classNames(classes.text, classes.title)}>
        {title}
      </div>
      <div className={classNames(classes.text, classes.statusType)}>
        {translateStatusType(eventStatusType)}
      </div>
      <div className={classNames(classes.text, classes.startTime)}>
        Starter {startTime.format('D. MMMM YYYY ~ ')}{' '}
        <span className={classes.eventHour}>{startTime.format('HH:mm')}</span>
      </div>
    </Grid>
    <Grid item xs={3} className={classes.rightAlign}>
      <img alt="Cover for the event" className={classes.image} src={cover} />
    </Grid>
  </Grid>
);

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  isOdd: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  eventStatusType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startTime: momentPropTypes.momentObj.isRequired,
  endTime: momentPropTypes.momentObj.isRequired,
  thumbnail: PropTypes.string.isRequired,
  totalCapacity: PropTypes.number.isRequired,
  registrationCount: PropTypes.number.isRequired
};

export default withStyles(styles)(Event);
