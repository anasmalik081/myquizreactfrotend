import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Carousel.css'
import Pic from '../Images/Pic.jpg'
import Pic2 from '../Images/Pic2.jpg'
import Pic3 from '../Images/Pic3.jpg'
import Pic4 from '../Images/Pic4.jpg'

const Carousel = () => {

    const images = [
        {
            title: 'Librarry image to grab attention towards studies',
            imagePath: Pic
        },
        {
            title: 'Everything can be Possible if you gain knowledge from books',
            imagePath: Pic2
        },
        {
            title: 'Books are our Best Friends Forever',
            imagePath: Pic3
        },
        {
            title: 'Knowledge is the powerful weapon',
            imagePath: Pic4
        },
    ]

    const [current, setCurrent] = useState(0);
    const length = images.length;

    const handleBack = () => {
        setCurrent(current === 0 ? length - 1 : current -1)
    }

    const handleNext = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    useEffect(() => {
        let interval = setInterval(() => {
            handleNext();
        }, 3000)
        return () => clearInterval(interval)
    }, [current])

  return (
    <>
        <div className='carousel'>
            <div className="carouselInner" style={{ backgroundImage: `url(${images[current].imagePath})` }}>
                <div className="left" onClick={handleBack}><ArrowBackIosIcon style={{ fontSize: 30 }} /></div>
                <div className="center">
                    <p></p>
                    <h3>{images[current].title}</h3>
                </div>
                <div className="right" onClick={handleNext}><ArrowForwardIosIcon style={{ fontSize: 30 }} /></div>
            </div>
        </div>
    </>
  )
}

export default Carousel