import React from "react";
import { useSelector } from "react-redux";
import no_image from '../../images/no_image_found.png';
import { useHistory } from "react-router-dom";


const SearchResults = () => {
    const history = useHistory();
    const cheatsheetsObj = useSelector(state => state?.searchReducer)
    const cheatsheets = cheatsheetsObj && Object.values(cheatsheetsObj)

    if (cheatsheets.length < 1) {
        history.push('/notFound')
    }


    return (
        <div>
            <div style={{height: '150px'}}></div>
            <div id="explore_container">
                <h2 style={{top:'150px'}}>Search results</h2>
                <div className="cheatsheets_container">
                    {cheatsheets.map((cheatsheet) => {
                        return (
                            <a key={cheatsheet?.id} href={`/cheatsheets/${cheatsheet?.id}`} >
                                <div className={`cheatsheet_box`}>
                                    <div>
                                        <img className="cheatsheet-img"
                                            src={cheatsheet?.media_url !== 'no data provided' ? cheatsheet?.media_url : no_image}
                                            alt='none'
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                        <div className="cheatsheet-title-author">
                                            <h3>{cheatsheet.title}</h3>
                                            <p>Author: {cheatsheet?.owner}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
            <div style={{height: '150px'}}></div>
        </div>


    )
}

export default SearchResults
