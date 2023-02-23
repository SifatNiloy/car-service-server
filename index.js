const express= require('express')
const cors= require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app= express()
const port= process.env.PORT || 5000;
//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlpzidc.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const serviceCollection = client.db("carService").collection("services");
        
        // create a document to insert
        const doc = {
            
        }
        const result = await serviceCollection.insertOne(doc);
        
    } finally {
        // await client.close();
    }
}
run().catch(err=> console.log(err))

app.get('/', (req, res)=>{
    res.send('car service server is running')
})

app.listen(port, ()=>{
    console.log(`car service running on ${port} ` )
})