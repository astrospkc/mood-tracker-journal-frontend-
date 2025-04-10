import React, { useContext, useEffect, useState } from 'react'
import Button from '../UIComponent/Button'
import axios from 'axios'
import { journalContext } from '../context/JournalContext'

const WeekAnalysisCard = ({ journalId, journal }) => {
    const [clickedTitle, setClickedTitle] = useState(false)
    const [summary, setSummary] = useState(null)
    const { selectedJournalId, setSelectedJournalId } = useContext(journalContext);


    const summarize = async (journalId) => {
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/weekJournals/summarizeJournal/${journalId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const data = res.data;
            setSummary(data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleSummarize = (id) => {
        setSelectedJournalId(id);
        summarize(id)
    }
    useEffect(() => {
        setSelectedJournalId
    }, [selectedJournalId])

    const handleClicked = () => {
        setClickedTitle(!clickedTitle)
    }

    const handleOpenJournal = () => {
        console.log("handling journal")
    }


    console.log("journal: ", journal)

    return (
        <>
            <div onClick={handleClicked} className='bg-black rounded-3xl p-2 hover:cursor-pointer hover:text-white text-yellow-400'>
                <h1 className=''>{journal.title}</h1>
            </div>
            {
                clickedTitle && <div>
                    <Button onclick={() => handleSummarize(journal._id)}>Summarize</Button>
                    <Button onclick={handleOpenJournal}>Open the journal</Button>
                </div>
            }
            <div>

            </div>

        </>

    )
}

export default WeekAnalysisCard
