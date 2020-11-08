import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterREducer'

const Filter = () => {

    const filterValue = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input value={filterValue} onChange={handleChange} />
        </div>
    )
}

export default Filter