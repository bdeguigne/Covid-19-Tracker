import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles'
import dateformat from "dateformat";
import { CircularProgress } from '@material-ui/core';

const Update = ({ date }) => {
    const classes = useStyles();
    const [updateDate, setUpdateDate] = useState(-1);

    useEffect(() => {
        if (date !== 0) {
            const formattedDate = dateformat(date, "m/d/yyyy hh:MM:ss TT");
            console.log("DATE FORMAT ", formattedDate);
            setUpdateDate(formattedDate);
        }
    }, [date]);

    return (
        <div>
            <p className={classes.title}>Last Updated at (M/D/YYYY)</p>
            {updateDate === -1 && (
                <div>
                    <CircularProgress className={classes.loading} />
                </div>
            )}
            {updateDate !== -1 && (
                <p className={classes.number}>{updateDate}</p>
            )}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    title: {
        margin: 0,
        marginTop: 10,
        fontSize: "1vw",
    },
    number: {
        margin: 0,
        fontSize: "1.5vw",
        fontWeight: "bold",
        color: "white",
    },
    loading: {
        marginTop: 10
    }
}))

export default Update