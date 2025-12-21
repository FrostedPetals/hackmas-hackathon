import React from 'react'
import { useEffect,useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventForm from '../components/calendar/EventForm'
import ReactPopover from '../components/calendar/ReactPopover'
import Upcomingevent from '../components/calendar/Upcomingevent'
import { NavLink } from 'react-router'
function Calendar() {
  
  const [events, setEvents] = useState([]);
  useEffect(()=>{
    async function fetchEvent(){
      try{const res = await fetch("http://localhost:5000/api/calendar", {
        method: "GET",
        credentials: "include",
      });
      console.log("res",res)
      const info=await res.json();
      console.log("info",info)

              const formattedEvents = info.data.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.event_date,       // must be YYYY-MM-DD
          extendedProps: {
            description: e.description,
          },
        }));

        setEvents(formattedEvents);
    }catch(err){
      
        console.error(err);
    }
  }
  
  fetchEvent()
  },[])
  return (
    <>
    <div className='w-full flex items-center justify-center'>
  <NavLink to="/"><button className='button-53'>Home</button></NavLink>
</div>
 <div className="flex w-full flex-wrap lg:flex-nowrap flex-row gap-4  p-4 ">

  {/* Left Column: Calendar */}
  <div className="flex flex-col gap-4 md:basis-1/2 md:max-w-1/2">
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      height="auto"
      events={events}
        eventContent={(arg) => (
    <ReactPopover trigger="hover" content={arg.event.extendedProps.description}>
      <span className='bg-green-600 p-1 rounded-sm'>{arg.event.title}</span>
    </ReactPopover>
  )}/>
  </div>

  {/* Right Column */}
  <div className="flex flex-col flex-1 gap-4  border-4 border-black">
      <Upcomingevent/>

      <EventForm/>
        
  </div>

</div>


    </>
  )
}

export default Calendar