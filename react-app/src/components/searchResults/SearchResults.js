import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../store/search";
import no_image from '../../images/no_image_found.png';


const SearchResults = () => {
    const dispatch = useDispatch();
    const cheatsheetsObj = useSelector(state => state?.searchReducer)
    const cheatsheets = cheatsheetsObj && Object.values(cheatsheetsObj)

    console.log('from search page:', cheatsheetsObj)

    useEffect(() => {
        dispatch(getSearchResults());
    }, [dispatch])

    return (
        <div>
            <div id="explore_container">
                <h2>search results</h2>
                <div className="cheatsheets_container">
                    {cheatsheets.map((cheatsheet) => {
                        return (
                            <a key={cheatsheet?.id} href={`/cheatsheets/${cheatsheet?.id}`} >
                                <div className={`cheatsheet_box`}>
                                    <div>
                                        <img className="cheatsheet-img" src={`${cheatsheet?.media_url}` ? `${cheatsheet?.media_url}` : no_image} alt='none' onError={(e) => e.target.style.display = 'none'}/>
                                        <div className="cheatsheet-title-author">
                                            <h3>{cheatsheet.title}</h3>
                                            <p>author: {cheatsheet?.owner}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>


    )
}

export default SearchResults
