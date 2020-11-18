import React from 'react'

const Notification = ({ notification }) => (
    notification && <h4>{notification}</h4>
)

export default Notification