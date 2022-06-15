const express = require("express");
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

// user: dbuser1
// password: XOU3qtUlwNnL4htR

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://dbuser1:XOU3qtUlwNnL4htR@cluster0.fe8tu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//  ....
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");

    //  ..
    app.post("/user", (req, res) => {
     const newUser = (req.body);
    //  console.log('create user ', newUser);
      res.send({result: 'success'})
    });
    //  ..
  } finally {
    // await client.connect()
  }
}
run().catch(console.dir);
//  ....

app.get("/", (req, res) => {
  res.send("my crud is running ");
});

app.listen(port, () => {
  console.log("crud is running on port", port);
});
