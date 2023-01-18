import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CalendarContext } from "../Context/CalendarContext";

const Calendar = (props) => {
const [Daily, setDaily] = useState()
const [Array, setArray] = useState()
const [once, setOnce] = useState(true)

const {createTime, createAllDayEvent, createEvents} = useContext(CalendarContext)


useEffect(()=>{      
        setDaily(props.allDayEvents)
        setArray(props.events)
        
        if(Daily && Array && once){
        //Generate timetable
        createTime()   
        //Create Daily events
        createAllDayEvent(Daily);
        //Creating timely events
        createEvents(Array);

        setOnce(false)
}},[Daily, Array])
    
    return (      
        <div className="main">
            <div id="date">
                <p id="dt">{props.date}</p>
            </div>
            <div id="daily">
    
            </div>
            <div id="time">
                <div id="AM">
                    <span id="red">AM</span>
                    <div id="amclck" className="clck">
                    </div>
                </div>
                <div id="PM">
                    <span id="blue">PM</span>
                    <div id="pmclck" className="clck">
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Calendar;