import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import AddCategoryForm from "./AddCategoryForm";
import {AxiosInstance} from "./AxiosClient";
import {Category} from "./models/Category";
import {Status} from "./models/Status";
import {Todo} from "./models/Todo";

export default  function TodoList(){
    const [open, setOpen] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedStatusId, setSelectedStatusId] = useState<string>("");
    const [todoTitle, setTodoTitle] = useState<string>("");

    const [statusUpdate, setStatusUpdate] = useState<string>("");
    const [categoryUpdate, setCategoryUpdate] = useState<string>("");

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [statusList, setStatusList] = useState<Status[]>([]);
    const [todoList, setTodoList] = useState<Todo[]>([]);


    function getStatusList() {
        AxiosInstance.get('/status',
            { params: { categoryId: selectedCategoryId } })
            .then(function (response) {
                setStatusList(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getCategoryList() {
        AxiosInstance.get('/category',
        )
            .then(function (response) {
                setCategoryList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function getTodoList() {
        AxiosInstance.get('/todo',
        )
            .then(function (response) {
                setTodoList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function addTodo() {
        AxiosInstance.post('/todo',
             {title: todoTitle, categoryId: selectedCategoryId, statusId: selectedStatusId}
        )
            .then(function () {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateTodo(todoId:any) {
        AxiosInstance.post(`/todo/${todoId}`,
            {title: todoTitle, categoryId: categoryUpdate, statusId: statusUpdate}
        )
            .then(function () {
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getCategoryList();
    }, [])


    useEffect(() => {
        getTodoList();
    }, [todoTitle])


    useEffect(() => {
        getStatusList();
    }, [selectedCategoryId])

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setSelectedCategoryId(event.target.value as string);
    };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setSelectedStatusId(event.target.value as string);
    };
    const handleAddTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value as string);
    };
    const handleUpdateStatus = (event: SelectChangeEvent) => {
        setStatusUpdate(event.target.value as string);
    };
    const handleUpdateCategory = (event: SelectChangeEvent) => {
        setCategoryUpdate(event.target.value as string);
    };

    return(
        <Stack direction="column">
            <div>Filter will come</div>
            <Stack direction="row" spacing={2}>
                <Input placeholder="Description" value={todoTitle} onChange={handleAddTodoTitle}/>

                <FormControl sx={{  minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategoryId}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    {categoryList.map((category)=> (
                        <MenuItem value={category.id}>{category.title}</MenuItem>)
                    )}

                </Select>
            </FormControl>
                <FormControl sx={{  minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStatusId}
                    label="Status"
                    onChange={handleChangeStatus}
                >
                    {statusList.map((status)=> (
                        <MenuItem value={status.id}>{status.title}</MenuItem>)
                    )}
                </Select>
                </FormControl>
                <Button variant="contained" onClick={()=> addTodo()}>
                    Ekle
                </Button>
            </Stack>
            {todoList.length>0 && todoList.map((todo)=> (
                <Stack direction="row" spacing={5}>
                    <Box>
                        {todo.title}
                    </Box>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={(todo.categoryId).toString()}
                        label="Status"
                        onChange={handleUpdateCategory}
                    >
                        {categoryList.map((category)=> (
                            <MenuItem value={category.id}>{category.title}</MenuItem>)
                        )}
                    </Select>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={(todo.statusId).toString()}
                        value={(todo.statusId).toString()}
                        label="Status"
                        onChange={handleUpdateStatus}
                    >
                        {statusList.map((status)=> (
                            <MenuItem value={status.id}>{status.title}</MenuItem>)
                        )}
                    </Select>
                    <Button variant="contained" sx={{minWidth:100}} onClick={()=>updateTodo(todo.id)} disabled={!categoryUpdate
                    }>Kaydet</Button>
                </Stack>
            ))}

            <Stack direction="row" display="flex" justifyContent="flex-start" mt={2}>
                <Button variant="contained" sx={{minWidth:100}} onClick={()=>setOpen(true)}>Kategorileri Düzenle</Button>
            </Stack>
            <CustomDrawer open={open} setOpen={setOpen}  children={<AddCategoryForm categoryList={categoryList}/>}/>
        </Stack>
    )
}