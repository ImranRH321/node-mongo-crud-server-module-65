const express = require('express');
const app = express()
const port = process.env.PORT || 5000

// user: dbuser1
// password: XOU3qtUlwNnL4htR


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser1:XOU3qtUlwNnL4htR@cluster0.fe8tu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// ...
async function run () {
  try{
     await client.connect()
     const userCollection  = client.db('foodExpress').collection('users')
    const user = {name: 'parboti banu', email: 'parboti@gmail.com'}
    const result = await userCollection.insertOne(user)
    
    console.log(`document insert the id ${result.insertedId}`);
  } 
  finally{
    // await client.close(); 
  }
}
run().catch(console.dir)
// ...

app.get('/', (req, res) => {
    res.send('my crud is running ');
})

app.listen(port, () => {
    console.log('crud is running on port', port);
})