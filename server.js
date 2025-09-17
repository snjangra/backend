import express  from "express"
import cors from 'cors'

import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import Router from "./routes/Route.js"
import uploadRouter from "./routes/uploadRoute.js"



import foodRouter from "./routes/foodRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express();
app.use(cors());
app.use(express.json());

//const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/content", Router)
app.use("/api/upload",uploadRouter)



app.use("/images",express.static('uploads'))




app.use("/api/food", foodRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

/*
app.post("/api/user/login", (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.send("API Working...")
});
*/

app.listen(port, () => console.log(`Server started on http://192.168.1.2:${port}`))