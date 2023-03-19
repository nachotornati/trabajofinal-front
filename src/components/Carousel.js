import React from "react";
import "../assets/scss/carousel.scss"
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export const Carouselitem = ({ legend, tipo, children, width }) => {

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);

    };


    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);


    const handleCheck = (e) => {
        if (isChecked === false && isChecked2 === false) {
            setIsChecked(!isChecked);
            e.target.checked = true;
        }
        else if (isChecked === false && isChecked2 === true) {
            //setIsChecked(!isChecked);
            e.target.checked = false;
        }
        else if (isChecked === true && isChecked2 === false) {
            setIsChecked(!isChecked);
            e.target.checked = false;
        }
        else if (isChecked === true && isChecked2 === true) {
            setIsChecked(!isChecked);
            e.target.checked = false;
        }
    }

    const handleCheck2 = (e) => {
        if (isChecked === false && isChecked2 === false) {
            setIsChecked2(!isChecked2);
            e.target.checked = true;
        }
        else if (isChecked === false && isChecked2 === true) {
            setIsChecked2(!isChecked2);
            e.target.checked = false;
        }
        else if (isChecked === true && isChecked2 === false) {
            //setIsChecked2(!isChecked2);
            e.target.checked = false;
        }
        else if (isChecked === true && isChecked2 === true) {
            setIsChecked2(!isChecked2);
            e.target.checked = false;
        }
    }

    const renderContent = (tipo) => {
        switch (tipo) {
            case "comment":
                return (<Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField style={{ width: '50%' }}></TextField>
                </Grid>)
            case "multiselect":
                return (
                    <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl style={{ width: '50%' }}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                {/*options.map((option) => (
                                            <MenuItem value={option.value}>{option.label}</MenuItem>
                                        ))*/}
                            </Select>
                        </FormControl>
                    </Grid>

                )
            case "numerical":
                return (
                    <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField type="number"style={{ width: '50%' }}></TextField>
                    </Grid>)

            case "select_comment":
                return (
                    <>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox />}
                                label="SI"
                                labelPlacement="bottom"
                                checked={isChecked}
                                onChange={handleCheck}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox />}
                                label="NO"
                                labelPlacement="bottom"
                                checked={isChecked2}
                                onChange={handleCheck2}
                            />
                        </Grid>

                        {isChecked ? (
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '24px' }} >
                                <TextField style={{ width: '50%' }}></TextField></Grid>) : (null)

                        }
                    </>
                )

        }
    }







    return (
        <div className="carousel-item" style={{ width: width }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', wordBreak: 'normal', whiteSpace: 'pre-wrap' }} >
                        {legend}
                    </Typography>
                </Grid>

                {renderContent(tipo)}
            </Grid>






        </div>
    )
}

const Carousel = ({ children }) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [percentagez, setPercentagez] = useState(0)

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = React.Children.count(children) - 1;
        }
        setActiveIndex(newIndex);
        setPercentage(newIndex * 100)
        setPercentagez(newIndex)
        console.log(newIndex)
    }

    return (
        <Grid container spacing={2} className='carousel'>
            <Grid item xs={12} md={12} lg={12}>
                <div className="inner" style={{ transform: 'translateX(-' + percentage + '%)' }}>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: '100%' })
                    })}
                </div>
            </Grid>


            <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => updateIndex(activeIndex - 1)}>Atras</Button>
            </Grid>
            <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => updateIndex(activeIndex + 1)}>Siguiente</Button>
            </Grid>

        </Grid>




    )
}

export default Carousel;