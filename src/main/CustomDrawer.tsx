import React, {ReactNode} from "react";
import {Drawer} from "@mui/material";

interface Props {
    setOpen:(val:boolean) => void;
    open:boolean;
    children:ReactNode;
}
export default function CustomDrawer({open,setOpen, children}: Props){

    function toggleDrawer(){
        setOpen(false);
    }

    return(
        <Drawer
            sx={{ minWidth:150}}
            anchor="right"
            open={open}
            onClose={toggleDrawer}
        >
            {children}
        </Drawer>
    )
}