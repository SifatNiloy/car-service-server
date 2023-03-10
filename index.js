const express = require('express')
const cors = require('cors')

require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlpzidc.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db("carService").collection("services");
        const orderCollection = client.db("carService").collection("orders");

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service);

        })
        //orders api
        app.post('/orders', async(req, res)=>{
            const order= req.body;
            const result= await orderCollection.insertOne(order);
            res.send(result);
        })

    } finally {

    }
}
run().catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('car service server is running')
})

app.listen(port, () => {
    console.log(`car service running on ${port} `)
})