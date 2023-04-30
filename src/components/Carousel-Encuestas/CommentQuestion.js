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
import { useParams } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import { ComedorContext } from "../Context/ComedorContext";
import { useEffect } from 'react';



const CommentQuestion = () => {

    return (
        <><Grid item xs={12} md={12} lg={12}>
<Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center',color:'#8d75c6' }} zeroMinWidth>
    {currentQuestionData.question.legend}
</Typography>
</Grid>
<Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
<FormControlLabel
    value="bottom"
    control={<Checkbox style={{color:'#8d75c6' }}/>}
    label="SI"
    labelPlacement="bottom"
    checked={isChecked}
    
    onChange={handleCheck}
/>
</Grid>
        </>
    )
}

export default CommentQuestion;