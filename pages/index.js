import React from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './themes';
import { WEBKOM_DASHBOARD_URL } from './conf';
import Events from '../components/Events/Events';
import BusDepartures from '../components/BusDepartures/BusDepartures';
import './index.css';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  frameContainer: {
    display: 'flex',
    height: '100vh',
    width: '50vw'
  },
  leftContainer: {
    marginRight: '2px'
  },
  rightContainer: {
    marginLeft: '2px'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  },
  innerFrameContainer: {
    display: 'flex',
    height: '50vh'
  },
  topContainer: {
    marginTop: '-4px',
    marginBottom: '4px'
  },
  bottomContainer: {
    // TODO: marginTop: '2px'
  }
});

const Index = ({ classes, router }) => {
  const hideMediaProgressBar =
    router.query.hideMediaProgressBar !== undefined &&
    router.query.hideMediaProgressBar !== false;
  let dashboardUrl = WEBKOM_DASHBOARD_URL;
  if (hideMediaProgressBar) {
    dashboardUrl += '/?hideMediaProgressBar';
  }

  return (
    <MuiThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <div
          className={classNames(classes.frameContainer, classes.leftContainer)}
        >
          <iframe
            id="webkom-dashboard_frame"
            name="webkom-dashboard_frame"
            title="Webkom Dashboard"
            src={dashboardUrl}
            scrolling="no"
            frameBorder="0"
          />
        </div>
        <div
          className={classNames(classes.frameContainer, classes.rightContainer)}
        >
          <div className={classes.innerContainer}>
            <div
              className={classNames(
                classes.innerFrameContainer,
                classes.topContainer
              )}
            >
              <Events />
            </div>
            <div
              className={classNames(
                classes.innerFrameContainer,
                classes.bottomContainer
              )}
            >
              <BusDepartures />
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(withRouter(Index));
