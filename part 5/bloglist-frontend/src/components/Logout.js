import React from 'react';


const Logout = ( { user, handleLogout } ) => {
    return (
        <div>
            <h3>{user.name} is Logged In</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;