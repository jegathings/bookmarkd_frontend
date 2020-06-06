import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';

const App = (props) => {
    const blank = {title:'', url:''};
    const [bookmarks, setBookmarks] = React.useState(null);
    const baseURL = 'https://general-bookmarks.herokuapp.com';

    const getInfo = async() =>{
        const response = await fetch(`${baseURL}/bookmarks/index`);
        const result = await response.json();
        setBookmarks(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    return (
        <>
            <h1>Bookmarkd</h1>
            <ul>
                {
                    bookmarks ? 
                    bookmarks.map((bookmark, index) => {
                        return(
                            <li>
                                <h1><a href={bookmark.url} target="_blank">{bookmark.title}</a></h1>
                            </li>
                        )
                    })
                    :
                    "...Loading"
                }
            </ul>
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
