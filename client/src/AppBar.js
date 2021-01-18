import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        BLAPimmo
                    </Typography>
                        <div className={classes.toolbar}>
                            <Button color="inherit">
                                <Link to={"/"}>Home</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to={"/achat"}>Achat</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to={"/vente"}>Vente</Link>
                            </Button>
                        </div>
                </Toolbar>
            </AppBar>
    )
}
