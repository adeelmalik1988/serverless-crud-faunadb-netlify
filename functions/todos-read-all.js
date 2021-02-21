const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    console.log(`Function 'todos-read-all' invoked and updated`)

    return client.query(
        q.Map(
        q.Paginate(q.Match(q.Index("all_todos"))),
    q.Lambda((x)=>(q.Get(x)))
    )).then(
        (response) => {
            //const todoRefs = response.data
            const todoRefs = response.data.map(
                res => {
                    return{
                        id: res.ref.id,
                        text: res.data.text,
                        flag: res.data.flag
                    }
                }
            )
            console.log("Todo list", todoRefs)
            

            console.log(`${todoRefs.length} todos found`)

            // const getAllTodoDataQuery = todoRefs.map((ref) => {
            //     return q.Get(ref)
            // })
            // return client.query(getAllTodoDataQuery).then((ret) => {
            
            
                    return callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(todoRefs)
                    })
                }) 
            
            // return response.data.map(res=>{
            //     console.log("res id",res)
            //     console.log("res id",res.ref.id)
            //     console.log("res text",res.data.text)
            //     console.log("res flag",res.data.flag)
            //     return callback(null, {
            //         statusCode: 200,
            //         body: JSON.stringify({
            //             id: res.ref.id,
            //             text: res.data.text,
            //             flag: res.data.flag
            //         })
            //     })
            // })    
        // return callback(null, {
        //     statusCode: 200,
        //     body: JSON.stringify(response.data)
        // })    
        
        .catch(
        (error) => {
            console.log("error", error)
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify(error)
            })
        }
    )
}