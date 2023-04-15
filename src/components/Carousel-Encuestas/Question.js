
import React, { useContext, useState } from 'react';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
const Question = ({question,handleNext,handlePrevious}) => {
    console.log(question)
    {
        switch (question.type) {
            case "comment":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={answers[currentQuestionData._id.value]}></TextField> */}

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                            { <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>


                        </Grid>
                    </>
                )
            case "multiselect":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} >
                                {question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControl style={{ width: '75%' }}>
                                <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    //value={value}
                                    label="Option"
                                    // onChange={(e) => {
                                    //     handleAnswerMultiselect(currentQuestionData._id, e.target.value);
                                    // }}

                                >
                                    {question.options.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            { <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>
                        </Grid>



                    </>

                )
            case "numerical":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* <TextField variant="outlined" type="number" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={answers[currentQuestionData._id.value]}> </TextField> */}
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            { <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>

                        </Grid>

                    </>
                )
            case "select_comment":
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {question.legend}
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
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
                        </Grid> */}

                        {/* {isChecked ? (
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '24px' }}>
                                <TextField variant="outlined" style={{ width: '50%' }} value={answers[currentQuestionData._id]?.value} onChange={(e) => handleAnswerSelectComment(currentQuestionData._id, isChecked, e.target.value)} />
                            </Grid>
                        ) : null
                        }
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>
                        </Grid> */}
                    </>
                )


        }
    }


}
export default Question;