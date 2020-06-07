import React from 'react';
import ReactDOM from 'react-dom';


export default (props) => {
const [formData, setFormData] = React.useState(props.initial);
const [resetForm, resetFormData] = React.useState(props.blank);

React.useEffect(() =>{
    setFormData(props.initial);
}, [props.initial]);
const handleChange = (event) =>{
    setFormData({ ...formData, [event.target.name]: event.target.value})
}


    return (
        <>
        <div className="form">
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Website Name"
            /><br/>
            <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Website URL"
            /><br/>
            <button
                onClick={() =>{
                    props.handleSubmit(formData);
                    // setFormData(props.initial);
                    resetFormData(resetForm);
                }}
                >&#10004;</button>
        </div>
        </>
    );
};