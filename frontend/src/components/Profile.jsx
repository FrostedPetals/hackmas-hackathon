import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
function Profile() {

  const [userinfo, setUser] = useState(null);
  const [events,setEvents]=useState([]);
      useEffect(() => {
          async function fetchEvent() {
              try {
                  const res = await fetch("http://localhost:5000/api/calendar?day=1", {
                      method: "GET",
                      credentials: "include",
                  });
                  const info = await res.json();
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


useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  fetchMe();
}, []);

  
if (userinfo === undefined) return <p>Loading...</p>;
if (!userinfo) return <p>Session expired. Please log in.</p>;
  
  return (
    <>
      <div className="flex flex-row bg-[#03360e] p-4">
        <aside>
          <div className="w-16 h-16 bg-white rounded-full ">
            <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(
  userinfo.data.user.name
)}`} alt="avatar"/>
          </div>
        </aside>

        <main className="ml-4">
          <ul>
            <li><b>User:</b> {userinfo.data.user.name}</li>
            <li><b>Email:</b> {userinfo.data.user.email}</li>
          </ul>
        </main>

      </div>
      <div className="block flex justify-center m-3">
<div className="mt-6 w-full max-w-xl rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur">
  <p className="mb-4 text-lg font-semibold text-gray-800">
    You have{" "}
    <span className="text-green-700">{events.length}</span>{" "}
    events today and tomorrow
  </p>

  {events.length === 0 ? (
    <p className="text-sm text-gray-500">
      No upcoming events 🎉
    </p>
  ) : (
    <ul className="space-y-3">
      {events.map((e) => (
        <li
          key={e.id}
          className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:shadow-md"
        >
          <h3 className="text-base font-medium text-gray-900">
            {e.title}
          </h3>
          {e.description && (
            <p className="mt-1 text-sm text-gray-600">
              {e.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  )}
</div>
</div>

      <div className='w-full flex items-center justify-center'>
        <NavLink to="/"><button className='button-53'>Home</button></NavLink>
      </div>
    </>
  );
}

export default Profile;
