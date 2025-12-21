import React from 'react'
import { useState, useEffect } from 'react';
function Upcomingevent() {
    const [events, setEvents] = useState([]);
    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/calendar/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            if (!res.ok) throw new Error("Delete failed");

            setEvents(prev => prev.filter(e => e.id != id))
            console.log("Deleted event successfully")
        } catch (err) {
            console.log("Could not delete event", err)
        }
    }

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await fetch("http://localhost:5000/api/calendar?day=14", {
                    method: "GET",
                    credentials: "include",
                });
                console.log("res", res)
                const info = await res.json();
                console.log("info", info)
                if (info.status !== "success") {
                    setEvents([]);
                    return;
                }

                const formattedEvents = info.data.map((e) => ({
                    id: e.id,
                    title: e.title,
                    date: e.event_date,
                    description: e.description,

                }));

                setEvents(formattedEvents);
            } catch (err) {

                console.error(err);
            }
        }

        fetchEvent()
    }, [])
    return (
        <><h3 className='text-2xl italic '>Upcoming events</h3>
            <div className='bg-pink-200 flex-1 overflow-y-scroll'>

                <ul className='list-disc text-xl'>
                    {events.map((e, index) => {
                        const daysAway = Math.ceil(
                            (new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24)
                        );
                        return (
                            <li key={index}>
                                <span className={`${daysAway < 3 ? "text-red-600 animate-ping" : ""} ${daysAway >= 3 && daysAway < 7 ? "text-yellow-500 animate-pulse" : ""}`}>
                                    🎁 <b>{e.title}</b> {"on "}{e.date.slice(0, 10)}{' ['} {e.description}{']'}
                                </span>
                                <button onClick={() => handleDelete(e.id)} className='hover:opacity-40 transition:opacity duration:400' title='Delete'>🗑️</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

export default Upcomingevent