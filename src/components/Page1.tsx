import React from 'react'
import illustrator from "../images/illustrator.jpg"
import writeJournal from "../images/writeJournal.jpg"
import readJournal from "../images/readJournal.jpg"
import graph from "../images/graphAnalysis.jpg"

import "./styles.css"
import { Link } from 'react-router-dom'

const Page1 = () => {
    return (


        <div className='flex h-full w-full p-4 justify-center items-start mt-20 mx-auto overflow-y-auto'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col md:flex-row items-center w-full m-4 md:m-auto md:w-2/3 text-center shadow-lg shadow-black p-4'>
                    <h1 className='text-white text-5xl border-b-2 md:border-b-0 md:border-r-2 border-yellow-400 p-3 bebas-neue-regular'>
                        Welcome to our <span className='text-yellow-400'>LightMind</span> Journaling site.
                    </h1>
                    <p className='text-stone-500 p-3 text-lg'>
                        <span className='text-yellow-400 yusei-magic-regular'>LightMind</span> is an intelligent journal app designed to track your emotions, provide insightful mood graphs, and offer personalized tips for self-improvement. Powered by advanced <span className='text-yellow-400'>AI</span>, LightMind helps you understand your emotional patterns and take meaningful steps toward a happier, healthier you.
                    </p>
                </div>

                <div className='flex md:mt-10 flex-col  w-full justify-center items-center m-auto'>
                    <div className='flex flex-col md:flex-row justify-center items-center  w-full'>
                        <div className='relative  w-full'>
                            <img src={illustrator} alt="" height={400} width={400} className='rounded-full mb-10 opacity-15' />
                            <div className='absolute top-[10%]'>
                                <div className='flex flex-col md:flex-row justify-center items-center'>
                                    <h1 className='text-yellow-100 text-center bebas-neue-regular text-5xl'>
                                        Let's start
                                    </h1>
                                    <div className='w-full flex flex-col md:flex-row items-center text-2xl'>
                                        <Link to="/journals">
                                            <div className='flex flex-col items-center gap-2 my-3 p-3 rounded-3xl hover:cursor-pointer hover:border-2'>
                                                <img src={writeJournal} alt="" className='h-[30%] w-[50%] md:w-[100%] rounded-3xl' />
                                                <h1 className='text-yellow-400'>Write Journal</h1>
                                            </div>
                                        </Link>
                                        <Link to="/journals">
                                            <div className='flex flex-col items-center gap-2 my-3 p-3 rounded-3xl hover:cursor-pointer hover:border-2'>
                                                <img src={readJournal} alt="" className='h-[30%] w-[50%] md:w-[100%] rounded-3xl' />
                                                <h1 className='text-yellow-400'>Read Journal</h1>
                                            </div>
                                        </Link>
                                        <Link to="/weeklyAnalysis">
                                            <div className='flex flex-col items-center gap-2 my-3 p-3 rounded-3xl hover:cursor-pointer hover:border-2'>
                                                <img src={graph} alt="" className='h-[30%] w-[50%] md:w-[100%] rounded-3xl' />
                                                <h1 className='text-yellow-400'>Graph Analysis</h1>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>


    )


}

export default Page1




