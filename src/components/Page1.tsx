import React from 'react'
import illustrator from "../images/illustrator.jpg"
import writeJournal from "../images/writeJournal.jpg"
import readJournal from "../images/readJournal.jpg"
import graph from "../images/graphAnalysis.jpg"

import "./styles.css"
import { Link } from 'react-router-dom'

const Page1 = () => {
    return (
        <div className=" bg-black w-full flex flex-col md:flex-row text-2xl h-full">
            <div className='flex-1  bg-yellow-400 h-full w-full justify-center items-center m-auto'>

                <div className='relative h-full md:bg-white bg-yellow-500'>
                    <div style={{
                        backgroundImage: `url(${illustrator})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: "0.4"
                    }} className='h-full w-full relative '></div>
                    <div className='absolute top-[0%] md:top-[30%] left-[5%] md:left-[0%] items-center flex flex-col'>
                        <div className='text-slate-900 chonburi-regular flex flex-col justify-center items-center gap-20 rounded-xl w-full h-full p-10 '>
                            <h1 className=''>Mood</h1>
                            <h1>Tracker</h1>
                            <h1>Journal</h1>
                        </div>
                        <div className='m-4 text-sm w-[50%] rounded-full p-6 shadow-lg shadow-black bg-stone-700 text-white items-center flex justify-center text-center mr-3 ' >
                            Not Just a Journal -- Your Ultimate Emotional Companion for Managing, Controlling, and Visualizing Your Feelings Through Insightful Graphs
                        </div>
                    </div>
                </div>



            </div>
            <div className='flex-1  bg-slate-950 h-full w-full justify-center items-center m-auto'>
                <div className='flex flex-col justify-center items-center h-full w-full'>
                    <div className='relative h-full '>
                        <img src={illustrator} alt="" height={400} width={400} className='rounded-full mb-10 opacity-15' />
                        <div className='absolute top-[10%]'>
                            <div className='flex flex-row md:flex-col justify-center items-center'>
                                <h1 className='text-yellow-100 text-3xl '>
                                    So, what you wanna have first.
                                </h1>
                                <div className='w-full flex-row md:flex-col'>
                                    <Link to="/journals">
                                        <div className='flex flex-col  items-center gap-2 my-3 p-3  rounded-3xl hover:cursor-pointer hover:border-2'>
                                            <img src={writeJournal} alt="" className='h-[30%] w-[30%] rounded-3xl' />
                                            <h1 className='text-yellow-400' >Write Journal</h1>
                                        </div>
                                    </Link>
                                    <Link to="/journals">
                                        <div className='flex flex-col  items-center gap-2 my-3 p-3  rounded-3xl hover:cursor-pointer hover:border-2'>
                                            <img src={readJournal} alt="" className='h-[30%] w-[30%] rounded-3xl' />
                                            <h1 className='text-yellow-400' >Read Journal</h1>
                                        </div>
                                    </Link>
                                    <Link to="/weeklyAnalysis">
                                        <div className='flex flex-col  items-center gap-2 my-3 p-3  rounded-3xl hover:cursor-pointer hover:border-2'>
                                            <img src={graph} alt="" className='h-[30%] w-[30%] rounded-3xl' />
                                            <h1 className='text-yellow-400' >Graph Analysis</h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        </div >
    )
}

export default Page1

{/* <div className='relative h-full'>
                        <img src={illustrator} alt="" className='rounded-full mb-10 opacity-40 shadow-lg shadow-slate-900' />
                        <div className='absolute top-[0%]  h-full w-full'>
                            <div className='flex flex-col justify-center items-center h-full'>

                                <div className='text-slate-900 chonburi-regular flex flex-col justify-center items-center gap-20 border-b-4 border-white rounded-xl w-fit h-fit p-10'>
                                    <h1 className=''>Mood</h1>
                                    <h1>Tracker</h1>
                                    <h1>Journal</h1>
                                </div>
                            </div>

                        </div>
                    </div> */}


