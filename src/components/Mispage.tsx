import React from 'react'
import illustrator from "../images/illustrator.jpg"
import writeJournal from "../images/writeJournal.jpg"
import readJournal from "../images/readJournal.jpg"
import graph from "../images/graphAnalysis.jpg"
import anonymous from "../images/crushedpaper5.jpg"
import reply from "../images/crushedpaper4.jpg"
import community from "../images/crushedpaper3.jpg"

import "./styles.css"
import { Link } from 'react-router-dom'

const Mispage = () => {
    return (
        <>
            <div className='flex flex-col '>
                <div className='h-screen flex flex-col justify-center items-center font-serif text-yellow-100 w-full'>
                    <div className=' flex flex-col w-full  text-center '>

                        <div >
                            <ul className='text-white text-xl md:text-3xl gap-4 font-serif  '>
                                <li>Capture Feelings.</li>
                                <li>Discover Patterns.</li>
                                <li>Share Support.</li>
                            </ul>
                        </div>
                        <h1 className='text-2xl text-yellow-100 tangerine-regular my-10'>
                            Journaling that leads to insight, not isolation.
                        </h1>


                        <span className='text-yellow-400 text-4xl md:text-7xl font-serif border-b '>Vritt </span>
                        <span className='text-white'>is here for you.</span>

                        <p className=' text-xl mt-4 px-4 md:px-20'>
                            A personal, anonymous journaling app that lets you reflect, grow, and connect. Let AI help you understand yourself better — and let community support you ethically.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col min-h-screen w-full p-4 justify-center items-center mt-10  '>

                    {/* Hero Section */}
                    <h1 className='items-start font-serif text-7xl mb-10 p-2 flex '>Features</h1>

                    {/* Feature Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-4/5'>
                        <FeatureCard
                            image={writeJournal}
                            title="Daily Journaling"
                            to="/journals"
                            desc="Capture your thoughts and moods every day in a safe, private space."
                        />
                        <FeatureCard
                            image={readJournal}
                            title="AI-Powered Summaries"
                            to="/journals"
                            desc="Generate meaningful summaries and highlights from your journal entries."
                        />
                        <FeatureCard
                            image={graph}
                            title="Mood Analytics"
                            to="/weeklyAnalysis"
                            desc="Track your emotions and growth visually over time with charts."
                        />
                        <FeatureCard
                            image={anonymous}
                            title="Anonymous Sharing"
                            to="/share"
                            desc="Share your insights anonymously and discover others' journeys."
                        />
                        <FeatureCard
                            image={reply}
                            title="Community Feedback"
                            to="/replies"
                            desc="Receive kind, constructive advice and support from like-minded individuals."
                        />
                        <FeatureCard
                            image={community}
                            title="Uplifting Stories"
                            to="/community"
                            desc="Get inspired by trending experiences and emotional breakthroughs."
                        />
                    </div>

                    {/* CTA Section */}
                    <div className='mt-20 text-center max-w-3xl'>
                        <h2 className='text-white text-4xl mb-4'>Start Your  Journey Today</h2>
                        <p className='text-stone-300 mb-6 px-6'>
                            Whether you’re seeking clarity, growth, or connection — LightMind provides powerful tools to guide your mental and emotional wellness. Unlock voice journaling, personalized analytics, and AI-guided prompts with our premium plan.
                        </p>
                        <Link to="/journals">
                            <button className='bg-yellow-400 px-8 py-3 rounded-xl text-black font-bold hover:bg-yellow-500 transition-all'>
                                ✨ Begin Now
                            </button>
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className='mt-20 text-stone-900 text-sm text-center'>
                        © 2025 Vritt · Empowering Growth Through Reflection
                    </div>
                </div>


            </div>




        </>

    )
}

const FeatureCard = ({ image, title, to, desc }) => (
    <Link to={to} className='hover:scale-105 transition-all'>
        <div className='bg-zinc-900 p-5 rounded-2xl shadow-md hover:shadow-yellow-400 text-center'>
            <img src={image} alt={title} className='w-full h-48 object-cover rounded-xl mb-4' />
            <h3 className='text-yellow-300 text-2xl font-semibold'>{title}</h3>
            <p className='text-stone-400 mt-2'>{desc}</p>
        </div>
    </Link>
)

export default Mispage