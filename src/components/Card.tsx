import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

const Card = ({ className, heading, desc }) => {

    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.1 }}
            className={`rounded-3xl p-4 bg-white  justify-center items-start flex flex-col hover:bg-white hover:cursor-pointer  ${className}`}>
            <div className='text-sm '>{heading}</div>
            <p className='text-xs'><q>{desc} </q></p>
            <button className='text-sm bg-white my-3 rounded-xl hover:bg-yellow-400 p-3'>Summarize</button>

        </motion.div>
    )
}

export default Card

// heading 
// the para in quoted
// summarize button
