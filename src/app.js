import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import Form from './components/NewForm';
import EditForm from './components/EditForm';



const App = (props) => {
    // const addBookmarkPlaceholder = 'Add Bookmark';
    // const EditBookmarkPlaceholder = 'Edit';
    const [bookmarks, setBookmarks] = React.useState(null);
    const [showEdit, setShowText] = React.useState(false);
    //This is test code, I used to figure out how react works
    const [state,setState] = React.useState({hello:'hello world', cheese:'gouda'});
    //This is test code, I used to figure out how react works
    const [stat1,setStat1] = React.useState({id:'999999999',title:"blood orange", url:"url"});
    /////// sets state for editing
    const [editBookmark, setEditBookmark] = React.useState({
        id:'',
        title: '',
        url: '',
    });
    const baseURL = 'https://assembled-bookmarks.herokuapp.com';    
    const blank = {title:'', url:''};
    
    const getInfo = async() =>{
        const response = await fetch(`${baseURL}/bookmarks/index`);
        const result = await response.json();
        setBookmarks(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    const handleCreate = async (data) => {
        const response = await fetch(`${baseURL}/bookmarks/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        getInfo();
    }

    const handleSelect = async (bookmark) =>{
        setEditBookmark({...editBookmark, id: bookmark._id, title:bookmark.title, url:bookmark.url});
        // console.log("Edit bookmark", editBookmark);
        // console.log("Bookmark", bookmark);
    };

    const handleEdit = async (data) => {
        const response = await fetch(
            `${baseURL}/bookmarks/update/${data.id}`,
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
        setShowText(!showEdit);
    };

    const handleDelete = async (data) =>{
        const respone = await fetch(
            `${baseURL}/bookmarks/delete/${data._id}`,
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
            {!showEdit && <div>
                <h3>Add A Bookmark</h3>
                <Form initial={blank} handleSubmit = {handleCreate}/>
            </div>}
            {showEdit && <EditForm initial={editBookmark} handleSubmit={handleEdit} resetForm={blank}/>}
            {/* <h1>{state.cheese}</h1>
            {showText && <h1>{stat1.id} - {stat1.title} - {stat1.url}</h1>} */}
            <ul>
                {
                    bookmarks ? 
                    bookmarks.map((bookmark, index) => {
                        return(
                            <li key={bookmark._id}>
                                <div className="main-list-item">
                                <div className="main-list-item-div main-list-item-div-one">
                                <h1><a href={bookmark.url} target="_blank">{bookmark.title}</a></h1>
                                </div>
                                <div className="main-list-item-div main-list-item-div-two">
                                <button
                                    className="main-list-btn"
                                    onClick={() =>{
                                        handleSelect(bookmark);
                                        setShowText(!showEdit);
                                        // setStat1({...stat1,id:bookmark._id,title:bookmark.title,url:bookmark.url});
                                        // setState({...state,cheese:"American"})
                                        // console.log("EditBookmark", editBookmark);
                                        // console.log("----------");
                                    }}
                                >&#9998;</button>
                                <button
                                    className="main-list-btn"
                                    onClick={() =>{
                                        handleDelete(bookmark);
                                        
                                    }}
                                >&#10007;</button>
                                </div>
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
