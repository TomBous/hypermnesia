import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import PropTypes from 'prop-types'
import { SimpleInput } from './inputs'
import { Link } from "react-router-dom";


const SearchBox = props => {
    const idKnowledge = useSelector(state => state.dashboard.perspective);
    const [query, setQuery] = useState('');
    const handleInputChange = (e) => {
        console.log("query : ", e)
        setQuery(e.target.value)
    }
    const handleQuery = () => {
        
    }
    return (
        <div className="flex frow fcenter fmiddle mgtb-30">
            <form onSubmit={() => handleQuery}>
                <SimpleInput type="text" name="search" placeholder="Rechercher un savoir" value={query} onchange={handleInputChange} required="required"/>
            </form>
            <Link to={`perspective/${idKnowledge}/add-knowledge`}><i className="btn-round-plus fas fa-2x fa-plus-circle"></i></Link>
        </div>
    )
}

SearchBox.propTypes = {

}

export default SearchBox
