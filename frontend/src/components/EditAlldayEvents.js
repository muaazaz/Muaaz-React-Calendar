import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const EditAllday = () => {
    const history = useHistory()
    const [item, setItem] = useState('')
    const [location, setLoc] = useState('')
    const [error, setError] = useState('')
    const [once, setOnce] = useState(true)
    const {id} = useParams()

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
    })
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
                <label>Time: </label>
                <input type="text" 
                    value={'ALL DAY-'}    
                    required
                    readOnly
                />
                <label >Name: </label>
                <input type="text" 
                    value={item}
                    placeholder="please enter an name for event"
                    required
                    onChange={(e) => {
                        setItem((n)=>(e.target.value))
                        setError((e) => (''))
                    }}
                />
                <label >Location: </label>
                <input type="text"
                    value={location}
                    placeholder="please enter an location for event"
                    required
                    onChange={(e) => {
                        setError((e) => (''))
                        setLoc((l)=>(e.target.value))
                    }}
                />

                {error && <h5 className="error">{error}</h5>}

                <button>Edit Event</button>
            </form>
        </div>
    );
}

export default EditAllday;