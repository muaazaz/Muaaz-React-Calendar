import { useEffect, useState } from "react";
import Calendar from "./Calendar";

const Events = () => {
    const [events, setEvents] = useState()
    const [allDayEvents, setAllDayEvents] = useState()
    const [once, setOnce] = useState(true)
    const [error, setError] = useState()
    const [date, setDate] = useState()

    useEffect(() => {
        //Getting current date
        const d = new Date();
        let notime = d.toString();
        let day = notime.split(" ");
        setDate( day[0] + ", " + day[1] + " " + day[2]);

        if (once) {
            fetch('/events/', {
                method: 'GET'
            }).then((res) => {
                res.json()
                    .then((data) => {
                        if (data.events) {
                            setEvents(data.events)
                        } else {
                            setError(data.error)
                        }
                })
            })
            fetch('/alldayevents/',{
                method:'GET'
            }).then((res)=>{
                res.json()
                .then((data)=>{
                    if(data.events){
                        setAllDayEvents(data.events)
                    }else{
                        setError(data.error)
                    }
                })
            })
            setOnce(false)
        }
    })

    return (
        <div>
            {events && allDayEvents && <Calendar events={events} err={error} date={date} allDayEvents={allDayEvents} />}
        </div>


    );
}

export default Events;