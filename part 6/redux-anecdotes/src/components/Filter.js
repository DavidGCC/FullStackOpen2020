import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const filterValue = props.filter
    const handleChange = (event) => {
        props.setFilter(event.target.value)
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

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
}
const mapDispatchToProps = {
    setFilter
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)