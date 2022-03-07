import React, {useEffect, useState} from "react";
import {AxiosInstance} from "./AxiosClient";
import {Box, Button, Input, Stack} from "@mui/material";

interface Status {
    title: string;
    categoryId: string;
    color: string;
}

interface Props {
    category?: any;
}

export default function AddStatusForm({category}: Props) {
    const [status, setStatus] = useState<Status>({title: "", categoryId: "", color: ""});
    const [statusData, setStatusData] = useState<any>();

    const categoryId=category?.id;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...status}
        newData[e.currentTarget.name as keyof Status] = e.currentTarget.value
        setStatus(newData)
    }

    function addStatus() {
        AxiosInstance.post(`/status`,
            {title:status.title, color:status.color, categoryId:categoryId},
        )
            .then(function () {
                getStatusList();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getStatusList() {
        AxiosInstance.get('/status',
            { params: { categoryId: category.id } })
            .then(function (response) {
                setStatusData(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function deleteStatus(id:string) {
        AxiosInstance.delete(`status/${id}`,
        )
            .then(function () {
                getStatusList();

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateStatus(id:string) {
        AxiosInstance.put(`status/${id}`,
        )
            .then(function () {
                getStatusList();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getStatusList();
    }, [])

    return (
        <Stack direction="column" p={3} spacing={2}>
            <Input placeholder="Status name" name="title" value={status.title} onChange={handleChange}/>
            <Input placeholder="Status color" name="color" value={status.color} onChange={handleChange}/>
            <Button variant="contained" onClick={() => addStatus()}>Add Status</Button>
            {statusData && statusData.map((s: any) => (
                <Stack direction="row" display="flex" alignItems="center" spacing={3}>
                    <Box bgcolor={s.color} p={1} borderRadius={3}>
                        {s.title}
                    </Box>
                    <Button onClick={()=>deleteStatus(s.id)}>Sil</Button>
                    <Button onClick={()=>updateStatus(s.id)}>Düzenle</Button>
                </Stack>
            ))
            }
        </Stack>
    )
}