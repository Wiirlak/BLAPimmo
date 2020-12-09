import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
    },
});

export default function AppHeader() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Router>
                        <div className={classes.toolbar}>
                            <Button color="inherit">
                                <Link to="/">Home</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/achat">Achat</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/vente">Vente</Link>
                            </Button>
                        </div>
                    </Router>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
