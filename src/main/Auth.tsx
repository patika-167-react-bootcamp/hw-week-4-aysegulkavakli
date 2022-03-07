import React, {useState} from "react";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import TodoList from "./TodoList";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function Auth(){
    const [isLoggedIn, setLoggedIn] = useState(false);
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return(
        <div>
            {isLoggedIn ? (
                <TodoList />
            ): (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic-tab">
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                    <TabPanel value={value} index={0}>
                        <Login setLoggedIn={setLoggedIn}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Register />

                    </TabPanel>
                </>

            )}

        </div>
    )
}