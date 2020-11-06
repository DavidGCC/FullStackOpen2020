import React from 'react';
import propTypes from 'prop-types';

const Logout = ( { user, handleLogout } ) => {
    return (
        <div>
            <h3>{user.name} is Logged In</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

Logout.propTypes = {
    user: propTypes.object,
    handleLogout: propTypes.func.isRequired
}

export default Logout;