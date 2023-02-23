import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

export const NavigatorItem = (props) => {

    return (
        <>
                
                <ListItem  style={{width:"100%", padding:0, display:'flex',justifyContent:'center'}} key={props.name} onClick={props.action} disablePadding>
                    <Link style={{color:"#8d75c6",textDecoration:"none",width:'100%' }} href={props.path}>
                    <ListItemButton>
                        <ListItemIcon>
                            {props.icon}
                        </ListItemIcon>
                        <ListItemText primary={props.name} />
                    </ListItemButton>
                    </Link>
                </ListItem>
        </>


    );

}