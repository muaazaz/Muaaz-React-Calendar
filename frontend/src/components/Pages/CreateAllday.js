import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Autocomplete, TextField } from "@mui/material";

const CreateAllday = () => {
    var Arr = [];
    var unique = [];
    const history = useHistory()
    const [name, setName] = useState('')
    const [location, setLoc] = useState('')
    const [owner, setOwner] = useState('')
    const [error, setError] = useState('')

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

                Arr.forEach(element => {
                    if (!unique.includes(element)) {
                        unique.push(element);
                    }
                });

            });
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setOwner(decodedToken.id);
        createOptions()
    }, [Arr]);

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
                <label className="lbl">Time: </label>
                <input className="inp" type="text"
                    value={'ALL DAY-'}
                    required
                    readOnly
                />
                <label className="lbl" >Name: </label>
                <input className="inp" type="text"
                    value={name}
                    placeholder="please enter an name for event"
                    required
                    maxLength={30}
                    onChange={(e) => {
                        setName(e.target.value)
                        setError((e) => (''))
                    }}
                />
                <Autocomplete
                    disablePortal
                    options={unique}
                    sx={{ width: "100%", padding: "0" }}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                    onChange={(e) => {
                        setLoc(e.target.textContent);
                    }}
                />

                {error && <h5 className="error">{error}</h5>}

                <button className="create-btn">Create Event</button>
            </form>
        </div>
    );
}

export default CreateAllday;