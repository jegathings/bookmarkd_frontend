import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import Form from './components/NewForm'



const App = (props) => {
    // const addBookmarkPlaceholder = 'Add Bookmark';
    // const EditBookmarkPlaceholder = 'Edit';
    const [bookmarks, setBookmarks] = React.useState(null);
    /////// sets state for editing
    const [editBookmark, setEditBookmark] = React.useState({
        title: '',
        url: '',
    });

    
    const blank = {title:'', url:''};
    

    const getInfo = async() =>{
        const response = await fetch(`http://localhost:3000/bookmarks/index`);
        const result = await response.json();
        setBookmarks(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    const handleCreate = async (data) => {
        const response = await fetch('http://localhost:3000/bookmarks/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        getInfo();
    }

    const handleSelect = async (bookmark) =>{
        setEditBookmark(bookmark);
    };

    const handleEdit = async (data) => {
        //updates the selected holiday
        const response = await fetch(
            `http://localhost:3000/bookmarks/update/${data._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        //grab the updated list of holidays
        getInfo();

    };

    const handleDelete = async (data) =>{
        const respone = await fetch(
            `http://localhost:3000/bookmarks/delete/${data._id}`,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            }
        )
        getInfo();
    }

    return (
        <>
        <div className="main">
            <h1>Bookmarkd</h1>
            <div>
                <h3>Add A Bookmark</h3>
                <Form initial={blank} handleSubmit = {handleCreate}/>
            </div>
            <div>
            <h3>Edit A Bookmark</h3>
            <Form initial={editBookmark} handleSubmit={handleEdit} resetForm={blank}/>
            </div>
            <ul>
                {
                    bookmarks ? 
                    bookmarks.map((bookmark, index) => {
                        return(
                            <li key={bookmark._id} className="main-list-item">
                                <div className="main-list-item-div main-list-item-div-one">
                                <h1><a href={bookmark.url} target="_blank">{bookmark.title}</a></h1>
                                </div>
                                <div className="main-list-item-div main-list-item-div-two">
                                <button
                                    className="main-list-btn"
                                    onClick={() =>{
                                        handleSelect(bookmark);
                                    }}
                                >&#9998;</button>
                                <button
                                    className="main-list-btn"
                                    onClick={() =>{
                                        handleDelete(bookmark);
                                    }}
                                >&#10007;</button>
                                </div>
                            </li>
                        )
                    })
                    :
                    "...Loading"
                }
            </ul>
            </div>
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
