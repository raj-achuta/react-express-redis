const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
const port = 3000;
const client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

let userCounter = 1;

let layoutsCounter = 0;


app.get("/layout", async (req, res) => {
  try {
    // console.log(req);
    const cookies = req.cookies;
    console.log('cookies', cookies);
    let userId = cookies?.user || null;
    let layoutType;

    if (!userId) {
      userId = userCounter++;
      layoutType = (++layoutsCounter)%3;
      // save user and layout

      await client.hSet(`user:${userId}`, "layout", layoutType);
      res.cookie("user", userId);
      return res.status(200).send({ layoutType });
    }

    const redis_res = await client.hGet(`user:${userId}`, "layout");

    return res.status(200).send({ layoutType: redis_res });

    // check user is an guest user or not.
    // guest user -> set and unique identifier and set the layout form.
    // 
  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

app.post("/user" , async (req, res) => {
  try {
    const body = req.body;
    // set users list and their pref;
  } catch (err) {
    res.statusCode(500).send("Unable to register the user");
  }
})

app.listen(port, async () => {
  await client.connect();
  console.log(`Server running on port ${port}`);
});
