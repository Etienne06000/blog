import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Navigation from '../components/navigation.js';
import TopDashboard from '../components/TopDashboard.js';

// Configuration du style
const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
    width: 40,
    height: 40,
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingBottom: "60px",
    background: theme.palette.primary.background,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "100%",
  },
}));

function DashboardPageTemplate(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          {/*<TopDashboard />*/}
          <div>
            <header className={classes.header}>
              <Typography variant="h3" component="h2" className={classes.title}>
                {React.cloneElement(props.icon, {
                  className: classes.icon,
                })}
                {props.name}
              </Typography>
            </header>
            <props.Component {...props.routeRenderingProps} />
          </div>
          <Navigation />
        </Container>
      </main>
    </div>
  );
}

export default withRouter(DashboardPageTemplate);
