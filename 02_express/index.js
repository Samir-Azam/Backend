import express from 'express'

const app = express()
const port = 3000
const teaData = []
let teaId = 1

app.use(express.json());

// Adding new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body;
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
    res.status(201).send(teaData);
})

// Find tea with specific id

app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id));
    if (!tea){
        return res.status(404).send("Tea not found.");
    }
    res.status(201).send(tea);
})


// Update tea data

app.put('/teas/:id',(req,res)=>{
    const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));

    if (teaIndex==-1){
        return res.status(404).send("Tea Not Found.")
    }
    const {name, price} = req.body
    teaData[teaIndex].name = name;
    teaData[teaIndex].price = price;
    res.status(201).send(teaData);
})

// Delete tea with specific id 

app.delete('/teas/:id',(req,res)=>{
    const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
    if (teaIndex === -1){
        return res.status(404).send("Tea Not Found");
    }
    teaData.splice(teaIndex,1);
    res.status(202).send(teaData);
})


app.listen(port,()=>{
    console.log(`server is listnening at port ${port}`)
})