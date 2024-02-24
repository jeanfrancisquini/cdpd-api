const database = require('./src/database/connection');
const express = require('express');
const cors = require('cors');
const cron = require("node-cron");

const router = require('./src/routes/routes');

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(router);

cron.schedule("* * * * *", () => {
    // VERIFICAR SE O SITE ESTÁ ONLINE
    // CASO NÃO ESTEJA, PODEMOS ENVIAR UM E-MAIL INFORMANDO
    database.raw('exec stp_job_checkout_automatico_depois_90',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_checkout_automatico_depois_90")
});

cron.schedule("* * * * *", () => {
    // VERIFICAR SE O SITE ESTÁ ONLINE
    // CASO NÃO ESTEJA, PODEMOS ENVIAR UM E-MAIL INFORMANDO
    database.raw('exec stp_job_controle_diario_nao_preenchido',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_controle_diario_nao_preenchido")
});

cron.schedule("* * * * *", () => {
    // VERIFICAR SE O SITE ESTÁ ONLINE
    // CASO NÃO ESTEJA, PODEMOS ENVIAR UM E-MAIL INFORMANDO
    database.raw('exec stp_job_gera_automatico_agendamento',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_gera_automatico_agendamento")
});

app.listen(4000, () => {
    console.log("Aplicação rodando na porta 4000");
});

app.get('/',(request,response)=>{
    response.send("Aplicação rodando na porta 4000")
 })


 app.get('/api/stp_job_checkout_automatico_depois_90',(request,response)=>{
    database.raw('exec stp_job_checkout_automatico_depois_90',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_checkout_automatico_depois_90")
 })

 app.get('/api/stp_job_controle_diario_nao_preenchido',(request,response)=>{
    database.raw('exec stp_job_controle_diario_nao_preenchido',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_controle_diario_nao_preenchido")
 })

 app.get('/api/stp_job_gera_automatico_agendamento',(request,response)=>{
    database.raw('exec stp_job_gera_automatico_agendamento',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_gera_automatico_agendamento")
 })