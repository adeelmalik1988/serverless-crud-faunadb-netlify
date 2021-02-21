/* Frontend code from src/utils/api.js */
/* Api methods to call /functions */

/*
function createTodo(data){
    return fetch('/.netlify/functions/todos-create', {
        body: JSON.stringify(data),
        method: "POST",
}).then(response => {
    return response.json()
})
}

const myTodo = {
    title: "My todo Title",
    completed: false,
}

createTodo(myTodo).then(
    response => {
        console.log("API Response", response)
    }
).catch(
    (error) => {
        console.log("API Server", error)
    }
)
*/

const create = ({data}) => {
    return fetch('/.netlify/functions/todos-create', {
        body: JSON.stringify(data),
        method: 'POST'

    }).then(response => {
        return response.json()
    })
}

const readAll = () => {
    return fetch('/.netlify/functions/todos-read-all')
        .then(response => { return response.json() })
}

const update = (data) => {
    return fetch(`/.netlify/functions/todos-update`,{
        body: JSON.stringify(data),
        method: "POST"
    }).then(response=>{
        return response.json()
    })
}

const deleteTodo = (todoId) => {
    return fetch(`/.netlify/functions/todos-delete/${todoId}`,{
        method: "POST"
    }).then(
        response => {
            return response.json()
        }
    )

}

const batchDeleteTodo = (todoIds) => {
    return fetch(`/.netlify/functions/todos-delete-batch`,{
        body: JSON.stringify({
            ids: todoIds
        }),
        method: "POST"
    }).then(
        response => {
            return response.json()
        }
    )

} 

export default {
    create: create,
    readAll: readAll,
    update: update,
    delete: deleteTodo,
    batchDelete: batchDeleteTodo
}