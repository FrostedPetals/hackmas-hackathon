import React from 'react'
import { useState, useEffect } from 'react';
import DeleteModal from './DeleteModal';

function Upcomingevent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const openModal = (id) => {
        setSelectedEventId(id);
        setIsModalOpen(true);
    };
    const [events, setEvents] = useState([]);

    function toLocal(dateStr) {
        // Parse the full UTC timestamp
        const utcDate = new Date(dateStr);

        // Get the local calendar date 
        const day = utcDate.getDate();
        const month = utcDate.getMonth();
        const year = utcDate.getFullYear();
        return `${day}-${month + 1}-${year}`;

    }

    async function handleDelete() {
        try {
            if (selectedEventId) {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL
                    }/api/calendar/${selectedEventId}`, {
                    method: "DELETE",
                    credentials: "include"
                })
                if (!res.ok) throw new Error("Delete failed");

                setEvents(prev => prev.filter(e => e.id != selectedEventId))
                setIsModalOpen(false); // Close modal
                setSelectedEventId(null);
                console.log("Deleted event successfully")
            }
        } catch (err) {
            console.log("Could not delete event", err)
        }
    }

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL
                    }/api/calendar?day=14`, {
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
        <><DeleteModal
            isOpen={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
        />
            <h3 className='text-2xl italic '>Upcoming events</h3>
            <div className='border-1 max-h-[200px] rounded-sm p-1 flex-1 overflow-y-auto'>

                <ul className='list-disc text-xl'>
                    {events.map((e, index) => {
                        const daysAway = Math.ceil(
                            (new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24)

                        );
                        return (
                            <li key={index}>
                                <span className={`${daysAway < 3 ? "text-red-600 animate-ping" : ""} ${daysAway >= 3 && daysAway < 7 ? "text-yellow-500 animate-pulse" : ""}`}>
                                    🎁 <b>{e.title}</b> {"on "}{toLocal(e.date)}
                                    {' ['} {e.description}{']'}
                                </span>
                                {/*<button onClick={() => handleDelete(e.id)} className='hover:opacity-40 transition:opacity duration:400' title='Delete'>🗑️</button>*/}
                                <button onClick={() => openModal(e.id)} className='hover:opacity-40 transition:opacity duration:400' title='Delete'>🗑️</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

export default Upcomingevent