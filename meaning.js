const cors=require('cors');
const {MongoClient}=require('mongodb');
const bodyparser=require('body-parser');
const express=require('express');
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get('/meaning',async function(req,res)
{
    let word=req.query.word;
    let url="mongodb://localhost:27017";
    let client=new MongoClient(url);
    let database="dictionary";
    let result=await client.connect();
    let db=result.db(database);
    let query={word:word};
    let collection=db.collection("words");
    let response=await collection.find(query).toArray();
    console.log(response);
    res.send("Meaning of the word "+word+" is "+response[0].meaning);
    
})
app.listen(9000);
console.log("success");