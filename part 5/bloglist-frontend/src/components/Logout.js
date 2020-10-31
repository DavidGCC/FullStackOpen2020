import React from 'react';


const Logout = ( { name, handleLogout } ) => {
    return (
        <div>
            <h3>{name} is Logged In</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;