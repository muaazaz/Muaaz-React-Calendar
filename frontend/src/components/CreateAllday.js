import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const CreateAllday = () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [location, setLoc] = useState('')
    const [owner, setOwner] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        setOwner(decodedToken.id)
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/alldayevents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: name, location, owner })
        }).then((res) => {
            res.json()
                .then((data) => {
                    if (data.event) {
                        history.push('/calendar')
                    } else {
                        setError((e) => (data.error))
                    }
                })
        })
    }

    return (
        <div className="create">
            <h1>Create An All Day Event:</h1>
            <form onSubmit={handleSubmit}>
                <label>Time: </label>
                <input type="text" 
                    value={'ALL DAY-'}    
                    required
                    readOnly
                />
                <label >Name: </label>
                <input type="text" 
                    value={name}
                    placeholder="please enter an name for event"
                    required
                    maxLength={30}
                    onChange={(e) => {
                        setName(e.target.value)
                        setError((e) => (''))
                    }}
                />
                <label >Location: </label>
                <input type="text"
                    value={location}
                    placeholder="please enter an location for event"
                    required
                    maxLength={255}
                    onChange={(e) => {
                        setError((e) => (''))
                        setLoc(e.target.value)
                    }}
                />

                {error && <h5 className="error">{error}</h5>}

                <button>Create Event</button>
            </form>
        </div>
    );
}

export default CreateAllday;