import { motion } from "framer-motion"
import PropTypes from 'prop-types'; 
import React from "react"

//function for the pop up cards in the home section(v important,go through it)
export default function Hero() {
    return (
        
        <div className="container">
            {Info.map(([emoji, hueA, hueB], i) => (
                <InfoCard i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
            ))}
        </div>
    )
}

function InfoCard({ emoji, hueA, hueB, i }) {
    const background = `linear-gradient(306deg, ${hueA}, ${hueB})`

    const cardTransformOrigin = { transformOrigin: "10% 60%" }

    return (
        <motion.div
            className={`card-container card-container-${i}`} 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            
            <div className="splash" style={{ ...cardSplash, background,boxShadow: "0 0 12px rgb(255, 255, 255)"
 }} />
            
            <motion.div 
                className="card" 
                variants={cardVariants}
                style={cardTransformOrigin} 
            >
                
  <p className="card-text text-[1rem] md:text-[1.5rem]">{emoji}</p>
            </motion.div>
        </motion.div>
    )
}



InfoCard.propTypes = {
    emoji: PropTypes.string.isRequired,
    hueA: PropTypes.number.isRequired,
    hueB: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
};

const cardVariants = {
    offscreen: { y: 300 },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

// Kept the clipPath for splash inline since it's complex and hard to manage in a separate CSS file without a helper.
const cardSplash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const Info = [
  [
    "Welcome to Chime! A students-first winter-themed platform to help you in your academic journey.",
    "#e31b1b",
    "#f73e3e",
  ],
  [
    "Upload scrawly notes on 'Notes' and watch them transform into a legible summary—perfect for last-minute exam prep.",
    '#18451a',
    '#2e7330',
  ],
  [
    "Set notifications for important academic deadlines and dates using the 'Calendar' feature.",
    
    '#AE8625',
    '#F7EF8A',
  ],
  [
    "If time permits, enjoy decorating a virtual Christmas tree and share it with friends and family.",
    '#fbf5df',
    '#fffada',
  ],
];
