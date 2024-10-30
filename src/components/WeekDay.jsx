import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { journalContext } from "../context/JournalContext";
import { useParams } from "react-router-dom";

const WeekDay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainJournal, setMainJournal] = useState();
  const { dayJournal, setDayJournal, weekJournal_Arr, setWeekJournal_Arr } =
    useContext(journalContext);

  const location = useLocation();
  const { weekdayJournal } = location.state || {};
  const weekday_id = weekdayJournal._id;

  console.log("day journal: ", weekdayJournal);
  useEffect(() => {
    const journal_with_id = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/journals/fetchData/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setMainJournal(data);
      } catch (error) {
        console.error(error);
      }
    };

    // console.log("Calling journal_with_id");
    journal_with_id();
  }, [id]);
  console.log("main journal: ", mainJournal);

  const handleBack = () => {
    navigate(`/journals/week/${id}`);
  };
  useEffect(() => {
    if (weekdayJournal && mainJournal) {
      setDayJournal({
        main_title: mainJournal._id,
        title: weekdayJournal.title,
        body: weekdayJournal.body,
      });
    } else if (mainJournal) {
      setDayJournal({
        main_title: mainJournal._id,
        title: "",
        body: "",
      });
    }
  }, [weekdayJournal, mainJournal]);

  const weekJournalDay = async (dayJournal) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/weekJournals/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dayJournal),
        }
      );

      const data = await res.json();
      setWeekJournal_Arr([data, ...weekJournal_Arr]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDayJournal({ ...dayJournal, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    weekJournalDay(dayJournal);
    console.log("add");
    setTimeout(() => {
      navigate(`/journals/week/${id}`);
    }, 3000);
  };

  const handleUpdate = async () => {
    console.log("id: ", id);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_URL
        }/weekJournals/updateDayJournal/${weekday_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dayJournal),
        }
      );
      const data = await res.json();
      console.log("updated data: ", data);
      const newUpdatedJournal = setWeekJournal_Arr(
        weekJournal_Arr.map((w) => {
          if (w._id === weekday_id) {
            (w.title = data.title), (w.body = data.body);
          }
          return w;
        })
      );

      setWeekJournal_Arr(newUpdatedJournal);

      setTimeout(() => {
        navigate(`/journals/week/${id}`);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
    console.log("handling update");
  };

  console.log("journals: ", weekJournal_Arr);
  console.log("day journal id: ", weekdayJournal._id);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex  flex-row-reverse justify-around items-center">
        <div className="flex flex-row items-center gap-4">
          <BsArrowLeftCircleFill
            onClick={handleBack}
            className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
          />
          <h1 className="chonburi-short ">Journaling Day</h1>
        </div>

        <Link to="/">
          <h1 className="bg-white p-2 mx-10  rounded-xl">Home</h1>
        </Link>
      </div>

      <input
        type="text"
        name="title"
        value={dayJournal.title}
        placeholder="What's your day about?"
        onChange={handleChange}
        className="m-4 p-4  yusei-magic-regular rounded-xl bg-stone-300 w-2/3"
      />
      <textarea
        name="body"
        id=""
        rows={40}
        cols={80}
        value={dayJournal.body}
        placeholder="Express your feelings and thoughts. Let's add some new chapters to our life"
        onChange={handleChange}
        className="bg-stone-400 rounded-3xl yusei-magic-regular shadow-lg textarea-placeholder text-black shadow-stone-800 w-2/3 p-4"
      ></textarea>
      <div className="flex flex-row items-end gap-4">
        {dayJournal.title.length > 0 ? (
          <button
            onClick={handleUpdate}
            className="bg-stone-200 rounded-3xl my-4 p-4 hover:bg-yellow-500"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-stone-200 rounded-3xl my-4 p-4 hover:bg-yellow-500"
          >
            Add
          </button>
        )}

        <button className="bg-stone-200 rounded-3xl my-4 p-4 hover:bg-yellow-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WeekDay;
