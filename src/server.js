import express from 'express';
import cors from 'cors';
const port = 8081;


const app = express();

app.use(express.json());
app.use(cors())

app.use('/',(req,res)=>{
    res.send('oimundo')
});

app.listen(port,()=>{
    console.log(`Rodando na porta ${port}`)
});