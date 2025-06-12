import express from 'express'
import "dotenv/config";
import logger from "./logger.js";
import morgan from "morgan";

const app = express()
const port =  process.env.PORT || 8000
const teaData = []
let teaId = 1
app.use(express.json());
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Adding new tea
app.post('/teas',(req,res)=>{
    logger.info("This is an info message");
    const {name,price} = req.body;
    if (!name || !price){
        return res.status(400).send(`Name and Price is required.`);
    }
    let teaDetails  = {
        id:teaId++,
        name,
        price,
    }
    teaData.push(teaDetails);
    res.status(200).send(teaDetails);
})

// Get All teas
app.get('/teas',(req,res)=>{
    res.status(200).json(teaData);
})

// Find tea with specific id

app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id));
    if (!tea){
        return res.status(404).send("Tea not found.");
    }
    res.status(200).json(tea);
})


// Update tea data

app.put('/teas/:id',(req,res)=>{
    const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));

    if (teaIndex==-1){
        return res.status(404).send("Tea Not Found.")
    }
    const {name, price} = req.body
    if (!name || !price) {
      return res.status(400).send(`Name and Price is required.`);
    }
    teaData[teaIndex].name = name;
    teaData[teaIndex].price = price;
    res.status(200).json({
        "message":"Tea updates successfully.",
        tea:teaData[teaIndex]
    });
})

// Delete tea with specific id 

app.delete('/teas/:id',(req,res)=>{
    const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
    if (teaIndex === -1){
        return res.status(404).send("Tea Not Found");
    }
    const deletedTea = teaData.splice(teaIndex,1);
    res.status(200).send({
        message:"Tea is deleted successfully.",
        tea:deletedTea
    });
})


app.listen(port,()=>{
    console.log(`server is listnening at port ${port}`)
})