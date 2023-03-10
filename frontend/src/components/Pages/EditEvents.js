import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditEvents = () => {
  var Arr =[]
  var unique = []
  const { id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState();
  const [item, setItem] = useState("");
  const [location, setLoc] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState("");
  const [once, setOnce] = useState(true);
  const [error, setError] = useState();
  var isValid = false;
  var strt = "";
  var ed = "";

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

  const setPrevious = (event) => {
    setEvent(event);
    setItem((i) => event.item);
    setStart((s) => event.start);
    setEnd((en) => event.end);
    setLoc((l) => event.location);
  };

  useEffect(() => {
    if (once) {
      fetch("/events/edit/" + id, {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => {
          if (data.event) {
            setPrevious(data.event[0]);
          } else {
            setError(data.error);
          }
        });
      });
      setOnce(false);
    }
    createOptions()

  },[Arr]);

  const checkErrors = () => {
    const start1 = start.split(":");
    const end1 = end.split(":");

    if (parseInt(start1[0]) < 9) {
      start1[0] = +start1[0] + +"12";
    }
    if (parseInt(end1[0]) < 9) {
      end1[0] = +end1[0] + +"12";
    }
    if (start1[1] === "00") {
      strt = start1[0];
    } else {
      strt = +start1[0] + +".5";
    }
    if (end1[1] === "00") {
      ed = end1[0];
    } else {
      ed = +end1[0] + +".5";
    }
    if (start === end || parseInt(strt) > parseInt(ed)) {
      isValid = true;
      setError((e) => "Invalid start or end time");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isValid = false;

    checkErrors();

    if (!isValid) {
      fetch("/events/edit/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end, item, location, strt }),
      })
        .then(() => {
          history.push("/calendar");
        })
        .catch((err) => {
          setError((e) => err);
        });
    }
  };
  const handleChange = (e) => {
    var id = "";
    document.querySelectorAll(".start").forEach((opt) => {
      if (opt.value === e.target.value) {
        id = opt.id;
      }
    });
    document.querySelectorAll(".end").forEach((opt) => {
      if (parseFloat(opt.id) <= parseFloat(id)) {
        opt.disabled = true;
      }
    });
    document.querySelector('.end-time').disabled = false
  };

  return (
    <div className="create">
      <h1>Edit Event:</h1>
      {event && (
        <form onSubmit={handleSubmit}>
          <div className="em">
            <label className="lbl" htmlFor="name">Name:</label>

            <input
              className="inp"
              type="text"
              id="name"
              name="name"
              required
              placeholder="please enter an name for event"
              value={item}
              onChange={(e) => {
                setItem((i) => e.target.value);
              }}
            />
            <Autocomplete
            disablePortal
            value={location}
            options={unique}
            sx={{ width: "100%", padding: "0" }}
            renderInput={(params) => <TextField {...params} label="Location" />}
            onChange={(e)=>{
              setLoc(e.target.textContent);
            }}
          />
          </div>
          <div className="pass">

            <label className="lbl" htmlFor="start_time">Start Time:</label>

            <select
            className="slct"
              required
              value={start}
              onChange={(e) => {
                setError((e) => (undefined))
                setStart(e.target.value)
                handleChange(e)
              }}
            >
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
              className="end-time slct"
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
          <button className="create-btn">Edit Event</button>
        </form>
      )}
    </div>
  );
};

export default EditEvents;
