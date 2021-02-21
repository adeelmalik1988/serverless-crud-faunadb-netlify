import React, { useEffect, useRef, useState } from "react"
import { Flex, Input, Button, Checkbox } from "theme-ui"
import api from "../utils/api"



function Todo() {
    const inputRef = useRef()
    const [todosList, setTodosList] = useState([])
    let [todoListUpdate, setTodoListUpdate] = useState(0)


    // const [todo, setTodo] = useState("")
    // const [todoFlag, setTodoFlag] = useState(false)
    useEffect(() => {
        const readAllTodos = async () => {
            setTodosList(await api.readAll())
            //    .then(response => {
            //         console.log(response)
            //         result = response
            //         //setTodosList(...result)
            //         // result.map(
            //         //     res => (
            //         //         setTodosList(...res)
            //         //         //console.log("todo data", res.data)
            //         //     )
            //         // )
            //         //console.log(todosList)
            //     }).catch(err => {
            //         console.log(err)
            //     }))

            console.log("todoList state", todosList)
        }

        readAllTodos()

    }, [todoListUpdate])





    return (
        <Flex sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            marginLeft: "20px",
            flexDirection: "column"
            //justifyContent: "space-between"
        }} >

            <Flex as="form"
                onSubmit={
                    async (e) => {
                        e.preventDefault()
                        console.log("current todo value :", inputRef.current.value)
                        // await setTodo(inputRef.current.value)
                        // await setTodoFlag(false)
                        // console.log("todo Value :",todo)
                        // console.log("todo status :", todoFlag)

                        await api.create({ data: inputRef.current.value }).then(response => {
                            console.log(response)
                        }).catch(err => {
                            console.log(err)
                        })

                        inputRef.current.value = ""
                        setTodoListUpdate(++todoListUpdate)
                        console.log("todoListUpdate Counter", todoListUpdate)
                    }
                }

            >


                <Input placeholder="Add Todo" ref={inputRef} />
                <Button >Submit </Button>
            

            </Flex>
            <Flex sx={{
                display: "flex",

            }} >
                {todosList && (
                    <ul sx={{
                        listStyleType: 'none'
                    }} >{

                            todosList.map((todo,ind) => {
                                // console.log("hello", todo)
                                // console.log("id",todo.id)
                                // const todoRef = todo.ref
                                // console.log("idRef",todoRef.ref)
                                return (
                                    <div key={ind} >
                                    <Flex sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }} >
                                        <Flex as="li" key={todo.id}
                                            onClick={
                                                async () => {
                                                    await api.update(todo)
                                                    setTodoListUpdate(++todoListUpdate)


                                                }
                                            }

                                        >
                                            <Checkbox checked={todo.flag}
                                                readOnly />
                                            <span>
                                                {`${todo.text}`}
                                            </span>
                                        </Flex>
                                        <Flex
                                        
                                        >
                                            <Button onClick={async () => {
                                                console.log("delete button called")
                                                await api.delete(todo.id)
                                                setTodoListUpdate(++todoListUpdate)


                                            }
                                            
                                            }
                                             >X</Button>

                                        </Flex>
                                    </Flex>
                                        <hr/>
                                        </div>
                                )
                            })
                        }
                    </ul>
                )

                }

                {/* <h3>{todosList}</h3> */}

            </Flex>



        </Flex>
    );
}

export default Todo;
