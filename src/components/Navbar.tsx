import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    white: {
      color: 'white'
    }
  }),
);

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.white} to="/">
              MYTONA-TEST
            </Link>
          </Typography>
          <Link className={classes.white} to="/signup">
            <Button color="inherit">SignUp</Button>
          </Link>
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
