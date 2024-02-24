const database = require('../database/connection')

export default function handler(req, res) {

    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).end('Unauthorized');
      }
      
    database.raw('exec stp_job_checkout_automatico_depois_90',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_checkout_automatico_depois_90")
    
    database.raw('exec stp_job_controle_diario_nao_preenchido',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_controle_diario_nao_preenchido")
    
    database.raw('exec stp_job_gera_automatico_agendamento',[])
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    console.log("Executando stp_job_gera_automatico_agendamento")
    
    res.status(200).end('Hello Cron!');
}