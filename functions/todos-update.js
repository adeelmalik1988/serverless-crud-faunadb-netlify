const faunadb = require("faunadb")
const getId = require("./utlis/getId")

const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    //const id = getId(event.path)
    data.flag =

        console.log(`Functions 'todos-update' invoked. Update id: ${data.id}`)
    return client.query(q.Update(q.Ref(q.Collection('todos'),data.id),{
        data: {
            flag: true
        }
    }
    ))
        .then(
            (response) => {
                console.log("success", response)
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response)
                })

            }

        ).catch(
            (error) => {
                console.log("error", error)
                return callback(null, {
                    statusCode: 400,
                    body: JSON.stringify(error)
                })

            }
        )
}