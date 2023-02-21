import React from "react";
import "../assets/scss/carousel.scss"
import { useState } from "react";
import { Button } from "@mui/material";

export const Carouselitem = ({children,width}) => {
    return(
        <div className="carousel-item" style={{width:width}}>
            {children}
        </div>
    )
}

const Carousel = ({children}) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [percentage, setPercentage] = useState(0)

    const updateIndex= (newIndex) =>{
        if(newIndex < 0){
            newIndex = 0;
        }else if(newIndex >= React.Children.count(children)){
            newIndex = React.Children.count(children) - 1;
        }
        setActiveIndex(newIndex);
        setPercentage(newIndex * 100)
        console.log(newIndex)
    }
    
    return(
        <div className="carousel">
            <div className="inner" style={{transform:'translateX(-'+ percentage +'%)'}}>
                {React.Children.map(children,(child,index)=>{
                    return React.cloneElement(child, {width:'100%'})
                })}
            </div>
            <div className="indicators">
                <Button onClick={()=>updateIndex(activeIndex-1)}>Prev</Button>

                <Button onClick={()=>updateIndex(activeIndex+1)}>Next</Button>  
            </div>
                
        </div>
    )
}

export default Carousel;