import express from "express";

const app=express()
let PORT=process.env.PORT||5000
let HOST=process.env.HOST||"localhost"
let BACKEND_URL=`http://${HOST}:${PORT}`|| process.env.BACKEND_URL

// to enable requests with json and urlencoded payloads
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
  console.log(`[${new Date().toISOString}]: ${req.method}
  ${req.url} ${JSON.stringify(req.body)}`)
})
app.listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}: ${BACKEND_URL}`)
})