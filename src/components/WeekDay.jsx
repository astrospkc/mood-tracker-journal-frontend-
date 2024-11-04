import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { journalContext } from "../context/JournalContext";
import { useParams } from "react-router-dom";
// import debounce from "lodash.debounce";
import debounce from "../miscellaneous/debounce";

const WeekDay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainJournal, setMainJournal] = useState();
  const { dayJournal, setDayJournal, weekJournal_Arr, setWeekJournal_Arr } =
    useContext(journalContext);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [TextBodyValue, setTextBodyValue] = useState("");

  const [dayJournalRef, setDayJournalRef] = useState({
    main_title: "",
    title: "",
    body: "",
  });
  const inputRef = useRef(null);
  const textRef = useRef(null);

  // let journalRef = useRef("");

  const location = useLocation();
  let { weekdayJournal } = location.state || {};
  const { isAnotherDay } = location.state || {};
  console.log("isAnotherDay ", isAnotherDay);
  if (isAnotherDay) {
    weekdayJournal = {
      title: "",
      body: "",
    };
  }

  console.log("day journal: ", weekdayJournal);

  // Fetch main journal
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

    journal_with_id();
  }, [id]);

  console.log("main journal: ", mainJournal);

  // Handle back navigation
  const handleBack = () => {
    navigate(`/journals/week/${id}`);
  };

  // Set day journal based on fetched data
  useEffect(() => {
    if (weekdayJournal && mainJournal) {
      setDayJournal({
        main_title: mainJournal._id,
        title: weekdayJournal.title,
        body: weekdayJournal.body,
      });
    } else if (mainJournal) {
      setDayJournal({
        main_title: id,
        title: "",
        body: "",
      });
    }
  }, []);
  // /weekJournals/deleteDayJournal/67278251f639f01e037d89ad

  // Function to add a new journal entry

  const debounceTitleHandleChange = useCallback(
    debounce((title) => {
      setInputTitleValue(title);
    }, 800),
    [] // Empty dependency array since we want this to be stable
  );

  const debounceBodyHandleChange = useCallback(
    debounce((body) => {
      setTextBodyValue(body);
    }, 800)
  );

  // Handle input changes
  const handleTitleChange = (e) => {
    debounceTitleHandleChange(e.target.value);
  };
  const handleBodyChange = (e) => {
    debounceBodyHandleChange(e.target.value);
  };

  useEffect(() => {
    setDayJournalRef({
      main_title: id,
      title: inputTitleValue,
      body: TextBodyValue,
    });
  }, [inputTitleValue, TextBodyValue]);

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

      if (!res.ok) {
        throw new Error(`Error adding journal entry: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("New journal added:", data);

      // Update state with the new entry
      setWeekJournal_Arr((prev) => [data, ...prev]);

      // Clear input fields after adding
      setDayJournal({ main_title: id, title: "", body: "" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDayJournal(dayJournalRef);
  }, [dayJournalRef]);

  // debouncing

  // Handle add button click
  const handleAdd = () => {
    weekJournalDay(dayJournal);
    console.log("Adding new journal...");

    // Navigate after a slight delay to allow for state update
    setTimeout(() => {
      navigate(`/journals/week/${id}`);
    }, 3000);
  };

  // Handle update functionality (if needed)
  const handleUpdate = async () => {
    console.log("id: ", id);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/weekJournals/updateDayJournal/${
          weekdayJournal._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dayJournal),
        }
      );

      if (!res.ok) {
        throw new Error(`Error updating journal entry: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Updated data:", data);

      setWeekJournal_Arr((prev) =>
        prev.map((w) =>
          w._id === weekdayJournal._id
            ? { ...w, title: data.title, body: data.body }
            : w
        )
      );

      setTimeout(() => {
        navigate(`/journals/week/${id}`);
      }, 300);
    } catch (error) {
      console.error(error);
    }

    console.log("Handling update");
  };

  console.log("week journal arr:", weekJournal_Arr);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex flex-row-reverse justify-around items-center">
        <div className="flex flex-row items-center gap-4">
          <BsArrowLeftCircleFill
            onClick={handleBack}
            className="text-xl md:text-3xl hover:text-yellow-50 hover:cursor-pointer"
          />
          <h1 className="chonburi-short">Journaling Day</h1>
        </div>

        <Link to="/">
          <h1 className="bg-white p-2 mx-10 rounded-xl">Home</h1>
        </Link>
      </div>

      <input
        type="text"
        name="title"
        ref={inputRef}
        defaultValue={weekdayJournal.title}
        placeholder="What's your day about?"
        onChange={handleTitleChange}
        className="m-4 p-4 yusei-magic-regular rounded-xl bg-stone-300 w-2/3"
      />

      <textarea
        name="body"
        rows={40}
        ref={textRef}
        defaultValue={weekdayJournal.body}
        placeholder="Express your feelings and thoughts."
        onChange={handleBodyChange}
        className="bg-stone-400 rounded-3xl yusei-magic-regular shadow-lg textarea-placeholder text-black shadow-stone-800 w-2/3 p-4"
      ></textarea>

      <div className="flex flex-row items-end gap-4">
        {!isAnotherDay &&
        weekJournal_Arr.length > 0 &&
        weekdayJournal.title.length > 0 ? (
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

        <button
          onClick={handleBack} // Implementing cancel functionality
          className="bg-stone-200 rounded-3xl my-4 p-4 hover:bg-yellow-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WeekDay;
