import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditAllday = () => {
    var Arr = [];
    const history = useHistory()
    const [item, setItem] = useState('')
    const [location, setLoc] = useState('')
    const [error, setError] = useState('')
    const [once, setOnce] = useState(true)
    const {id} = useParams()

    const createOptions = () => {
        const where = encodeURIComponent(
            JSON.stringify({
                name: {
                    $exists: true,
                },
            })
        );
        fetch(
            `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`,
            {
                headers: {
                    "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J", // This is the fake app's application id
                    "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS", // This is the fake app's readonly master key
                },
            }
        ).then((res) => {
            res.json().then((data) => {
                data.results.forEach((element) => {
                    Arr.push(element.name);
                });
            });
        });
    };


    const setPrevious = (event)=>{
        setLoc((l)=>(event.location))
        setItem((n)=>(event.item))
    }

    useEffect(() => {
        if(once){
            fetch('/alldayevents/edit/' + id,{
                method:'GET'
            }).then((res)=>{
                res.json()
                .then((data)=>{
                    if(data.event){
                        setPrevious(data.event[0])
                    }else{
                        setError(data.error)
                    }
                })
            })
            setOnce(false)
        }
        createOptions()
    },[Arr])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/alldayevents/edit/'+id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({item, location })
        }).then(()=>{
            history.push('/calendar')
        }).catch((e)=>{
            setError(e.message)
        })
        
    }

    return (
        <div className="create">
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <label className="lbl">Time: </label>
                <input className="inp" type="text" 
                    value={'ALL DAY-'}    
                    required
                    readOnly
                />
                <label className="lbl">Name: </label>
                <input className="inp" type="text" 
                    value={item}
                    placeholder="please enter an name for event"
                    required
                    onChange={(e) => {
                        setItem((n)=>(e.target.value))
                        setError((e) => (''))
                    }}
                />
                 <Autocomplete
                    disablePortal
                    options={Arr && Arr}
                    value={location}
                    sx={{ width: "100%", padding: "0" }}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                    onChange={(e) => {
                        setLoc(e.target.textContent);
                    }}
                />

                {error && <h5 className="error">{error}</h5>}

                <button className="create-btn">Edit Event</button>
            </form>
        </div>
    );
}

export default EditAllday;