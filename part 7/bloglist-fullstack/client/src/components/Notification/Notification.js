import React from 'react'
import { useSelector } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Notification = () => {

    const { usage, message } = useSelector(state => state.notification)

    return (
        <Snackbar open={Boolean(message)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000}>
            <Alert severity={usage}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification