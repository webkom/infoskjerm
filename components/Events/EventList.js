import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Event from './Event';

const styles = theme => ({
  container: {
    width: '25vw',
    height: '50vh'
  },
  rightContainer: {
    paddingRight: '4px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '12.5%',
    padding: '10px',
    backgroundColor: theme.palette.primary.main,
    letterSpacing: '3px',
    textTransform: 'uppercase'
  },
  events: {
    display: 'flow-root',
    height: '87.5%',
    backgroundColor: theme.palette.primary.light
  },
  noEventsContainer: {
    height: '95%'
  },
  visibilityIcon: {
    fontWidth: '10em',
    opacity: 0.6
  }
});

const EventList = ({ classes, title, events, isRightContainer }) => (
  <Grid item className={classes.container}>
    <Grid
      item
      className={classNames(
        classes.header,
        isRightContainer && classes.rightContainer
      )}
    >
      <div>{title}</div>
    </Grid>
    {events.length === 0 ? (
      <Grid
        item
        container
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
        className={classes.noEventsContainer}
      >
        <Grid item>Ingen å vise</Grid>
        <Grid item>
          <VisibilityOff className={classes.visibilityIcon} />
        </Grid>
      </Grid>
    ) : (
      <Grid
        item
        container
        justify={'space-between'}
        className={classNames(
          classes.events,
          isRightContainer && classes.rightContainer
        )}
      >
        {events.map(event => (
          <Event key={event.id} {...event} />
        ))}
      </Grid>
    )}
  </Grid>
);

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  isRightContainer: PropTypes.bool
};

export default withStyles(styles)(EventList);
