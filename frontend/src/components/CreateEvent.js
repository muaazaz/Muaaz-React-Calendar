import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const CreateEvent = () => {

    const history = useHistory()
    const [item, setItem] = useState('')
    const [location, setLoc] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [owner, setOwner] = useState('')
    const [error, setError] = useState()
    const [strt, setStrt] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        setOwner(decodedToken.id)
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

            fetch('/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ start, end, item, location, owner, strt })
            }).then((res) => {
                res.json()
                    .then((data) => {
                        if (data.event) {
                            history.push('/calendar')
                        } else {
                            setError((e) => (data.error))
                        }

                    })

            }).catch((err) => {
                setError((e) => (err))
            })
}
    const handleChange = (e) => {
        var id  = '';
        document.querySelectorAll(".start").forEach(opt=>{
            if(opt.value === e.target.value){
                id = opt.id
                setStrt(id)
            }
        })
        document.querySelectorAll(".end").forEach(opt => {
            if (parseFloat(opt.id) <= parseFloat(id)) {
                opt.disabled = true;
            }
        });
        document.querySelector('.end-time').disabled = false
    }
    return (

        <div className="create">
            <h1>Create An Event:</h1>
            <form onSubmit={handleSubmit}>
                <div className="em">

                    <label htmlFor="name">Name:</label>

                    <input type="text" id="name" name="name"
                        required
                        maxLength={30}
                        placeholder="please enter an name for event"
                        value={item}
                        onChange={(e) => {
                            setItem(e.target.value)
                        }}
                    />
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location"
                        required
                        maxLength={255}
                        placeholder="please enter an location for event"
                        value={location}
                        onChange={(e) => {
                            setLoc(e.target.value)
                        }}
                    />
                </div>
                <div className="pass">

                    <label htmlFor="start_time">Start Time:</label>

                    <select
                        required
                        value={start}
                        onChange={(e) => {
                            setError((e) => (undefined))
                            setStart(e.target.value)
                            handleChange(e)
                        }}
                    >
                        <option disabled hidden value="" defaultChecked>Select A Starting Time For Event</option>
                        <option className="start" id="9" value="9:00">9:00 </option>
                        <option className="start" id="9.5" value="9:30"> 9:30 </option>
                        <option className="start" id="10" value="10:00"> 10:00 </option>
                        <option className="start" id="10.5" value="10:30"> 10:30 </option>
                        <option className="start" id="11" value="11:00"> 11:00 </option>
                        <option className="start" id="11.5" value="11:30"> 11:30 </option>
                        <option className="start" id="12" value="12:00">12:00 </option>
                        <option className="start" id="12.5" value="12:30"> 12:30 </option>
                        <option className="start" id="13" value="1:00"> 1:00 </option>
                        <option className="start" id="13.5" value="1:30"> 1:30 </option>
                        <option className="start" id="14" value="2:00"> 2:00 </option>
                        <option className="start" id="14.5" value="2:30"> 2:30 </option>
                        <option className="start" id="15" value="3:00"> 3:00 </option>
                        <option className="start" id="15.5" value="3:30"> 3:30 </option>
                        <option className="start" id="16" value="4:00"> 4:00 </option>
                        <option className="start" id="16.5" value="4:30"> 4:30 </option>
                        <option className="start" id="17" value="5:00"> 5:00 </option>
                        <option className="start" id="17.5" value="5:30"> 5:30 </option>
                        <option className="start" id="18" value="6:00"> 6:00 </option>
                        <option className="start" id="18.5" value="6:30"> 6:30 </option>
                        <option className="start" id="19" value="7:00"> 7:00 </option>
                        <option className="start" id="19.5" value="7:30"> 7:30 </option>
                        <option className="start" id="20" value="8:00"> 8:00 </option>
                    </select>

                    <label htmlFor="end_time">End Time:</label>

                    <select
                        required
                        className="end-time"
                        value={end}
                        disabled
                        onChange={(e) => {
                            setError((e) => (undefined))
                            setEnd(e.target.value)
                        }}
                    >
                        <option disabled hidden value="" defaultChecked>Select A Ending Time For Event</option>
                        <option className="end" id="9" value="9:00">9:00 </option>
                        <option className="end" id="9.5" value="9:30"> 9:30 </option>
                        <option className="end" id="10" value="10:00"> 10:00 </option>
                        <option className="end" id="10.5" value="10:30"> 10:30 </option>
                        <option className="end" id="11" value="11:00"> 11:00 </option>
                        <option className="end" id="11.5" value="11:30"> 11:30 </option>
                        <option className="end" id="12" value="12:00">12:00 </option>
                        <option className="end" id="12.5" value="12:30"> 12:30 </option>
                        <option className="end" id="13" value="1:00"> 1:00 </option>
                        <option className="end" id="13.5" value="1:30"> 1:30 </option>
                        <option className="end" id="14" value="2:00"> 2:00 </option>
                        <option className="end" id="14.5" value="2:30"> 2:30 </option>
                        <option className="end" id="15" value="3:00"> 3:00 </option>
                        <option className="end" id="15.5" value="3:30"> 3:30 </option>
                        <option className="end" id="16" value="4:00"> 4:00 </option>
                        <option className="end" id="16.5" value="4:30"> 4:30 </option>
                        <option className="end" id="17" value="5:00"> 5:00 </option>
                        <option className="end" id="17.5" value="5:30"> 5:30 </option>
                        <option className="end" id="18" value="6:00"> 6:00 </option>
                        <option className="end" id="18.5" value="6:30"> 6:30 </option>
                        <option className="end" id="19" value="7:00"> 7:00 </option>
                        <option className="end" id="19.5" value="7:30"> 7:30 </option>
                        <option className="end" id="20" value="8:00"> 8:00 </option>
                    </select>

                </div>
                {error && <h5 className="error">{error}</h5>}
                <button>Create Event</button>

            </form>
        </div>
    );
}

export default CreateEvent;