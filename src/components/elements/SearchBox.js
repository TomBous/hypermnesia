import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { SimpleInput, SearchInput } from './inputs'
import { Link } from "react-router-dom";
import { filterKnowledges } from '../../actions/dashboardActions';


const SearchBox = props => {
    const perspective = useSelector(state => state.dashboard.perspective);
    const knowledgeList = useSelector(state => state.dashboard.knowledges);
    const [query, setQuery] = useState('');
    const queryRef = useRef(query);
    const searchInput = useRef(null); // Pour le focus au click de l'icone clear
    const [status, setStatus] = useState('idle');
    const dispatch = useDispatch();
    
    const resetFilter = useCallback( // C'est recommandé d'utiliser une fonction memoized dans un useEffect
        () => {
            setQuery("") // On reset la query à un changement de catégorie ou perpective
            dispatch(filterKnowledges("")) // reset la liste filtrée dans le store
        },
        [dispatch],
    )
    useEffect(() => {
        resetFilter()
    }, [knowledgeList,resetFilter])


    const handleInputChange = (e) => {
        setQuery(e.target.value) // Set state est async
        queryRef.current = e.target.value // On crée une version mutable du sate(query) pour y faire référence dans le setTimeOut
        handleDelayFilter()
    }

    function compareMatches(a, b) {
        if (a.matches > b.matches) return -1;
        if (b.matches > a.matches) return 1;
      
        return 0;
    }

    function normalizeAndLowerString(string) {
        return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    const getFilteredList = (queryString, listArray) => {
        if (Array.isArray(listArray)) {
            const queryWords = queryString.trim().split(" ") // on trim avant split pour éviter une valeur vide dans l'array
            let filteredList = listArray.filter((knowledge) => {
                let nbMatch = 0
                queryWords.forEach((word) => {
                    if (normalizeAndLowerString(knowledge.problematic).indexOf(normalizeAndLowerString(word)) > -1) { // On recherche le word dans la problematic
                        nbMatch++
                    }
                })
                knowledge.matches = nbMatch
                if (nbMatch > 0) {
                    return true
                } else {
                    return false
                }
            })
            filteredList.sort(compareMatches);
            return filteredList;
        }
    }

    const handleDelayFilter = () => {
        if (status === "idle") {
            setTimeout(() => {
                setStatus("idle")
                const filteredList = getFilteredList(queryRef.current,knowledgeList)
                dispatch(filterKnowledges(filteredList));
            }, 500)
        }
        setStatus("filtering")
    }
    return (
        <div className="flex frow fcenter fmiddle mgtb-30">
            <form>
                <SearchInput name="filter" placeholder="Filtrer les savoirs" value={query} onchange={handleInputChange} ref={searchInput} onClick={() => {resetFilter();searchInput.current.focus();}}/>
            </form>
            <Link to={`perspective/${perspective}/add-knowledge`}><i className="btn-round-plus fas fa-2x fa-plus-circle"></i></Link>
        </div>
    )
}

export default SearchBox
