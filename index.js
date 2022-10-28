const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

//give data to the server
const customers = [
    {
        "id": 1,
        "name": "Gayan",
    },
    {
        "id": 2,
        "name": "Sunil",
    },
    {
        "id": 3,
        "name": "Nishadi",
    },
    {
        "id": 4,
        "name": "Tharindu",
    }
];

//Read Request Handlers
//Display the Message when the URL consits of '/'
app.get("/", (req,res) => {
    res.send("Welcome to our REST API!");
});

//Display the List of Customers when URL consists of api customers
app.get("/api/customers", (req,res) => {
    res.send(customers);
});

app.get("/api/customers/:id", (req,res) => {
    const customer = customers.find((c) => c.id ===parseInt(req.params.id));
    
    if(!customer) {
        res.status(404).send('<h2>Oppz customer is not found for id'+req.params.id+'</h2>');
    }else{
        res.send(customer);
    }
});

app.post("/api/customers", (req, res) => {
    const {error} = validateCustomer(req.body);
    
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name
    }

    customers.push(newCustomer);
    res.send(newCustomer);
});

app.put("/api/customers/:id", (req,res) => {
    const customer = customers.find((c) => c.id ===parseInt(req.params.id));

    if(!customer) {
        res.status(404).send('<h2>Oppz customer is not found for id'+req.params.id+'</h2>');
    }

    const {error} = validateCustomer(req.body);
    
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    customer.name = req.body.name;

    res.send(customer);
});  

function validateCustomer(customer) {
    const schema = {
        title: Joi.string().min(10).required()
    }
    return Joi.validate(customer, schema);
}

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening to port ${port}..`));

//Display the information of Specific customers ehrn you mention the id
// app.get("/api/customers/:id",(req,res) => {
//     const customer = customers.find((c) => c.id === parselnt(rep.params.id));

// })