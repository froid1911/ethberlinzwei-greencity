import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import GreenCityLogo from '../../assets/GreenCity.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#54A657'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="#54A657">
        <Toolbar>
        <img src={GreenCityLogo} style={{height: '50px', margin: '8px', width: 'auto'}} />
          <Typography variant="h6" className={classes.title}>
            GreenCity
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}