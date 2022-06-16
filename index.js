const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

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
const ObjectId = require("mongodb").ObjectId;

//  ....
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");

    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // update user id
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // post create user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      const result = await userCollection.insertOne(newUser);
      console.log(result);
      res.send(result);
    });

    //  update user put
    // app.put("/user/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updateUser = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };

    //   const updateDoc = {
    //     $set: {
    //       name: updateUser.name,
    //       email: updateUser.email,
    //     },
    //   };
    //   const result = await userCollection.updateOne(filter, updateDoc, options);
    //   res.send(result);
    // });

   app.put('/user/:id', async (req, res) => {
      const id = req.params.id
    const updateUser = req.body;
    const filter = {_id:ObjectId(id)}
    const options = { upsert: true };
    const updateDoc = {
      $set: {
       name: updateUser.name,
       email: updateUser.email
      },
    };
    const result= await userCollection.updateOne(updateUser, updateDoc, options)
     res.send(result)
    })

    // delete user
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log("id", id);
      console.log("query", query);
      const result = await userCollection.deleteOne(query);
      console.log("result ", result);
      res.send(result);
    });
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
