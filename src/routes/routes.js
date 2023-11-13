const connection = require('../database/connection');
const express = require('express');
const router = express.Router();
const DefUserTypeController = require('../controllers/Def/DefUserTypeController');
const DefTypePaymentController = require('../controllers/Def/DefTypePaymentController');
const DefActivityController = require('../controllers/Def/DefActivityController');
const DefPeriodController = require('../controllers/Def/DefPeriodController');
const DefStatusPlanController = require('../controllers/Def/DefStatusPlanController');
const DefPlanController = require('../controllers/Def/DefPlanController');
const UserPlanController = require('../controllers/User/UserPlanController');
const UserFamilyHistoryController = require('../controllers/User/UserFamilyHistoryController');
const PlanningAnamnesisController = require('../controllers/Planning/PlanningAnamnesisController');
const PlanningFuncionalEvaluationController = require('../controllers/Planning/PlanningFuncionalEvaluationController');
const PlanningMacrocycleController = require('../controllers/Planning/PlanningMacrocycleController');
const PlanningMacrocycleMonthController = require('../controllers/Planning/PlanningMacrocycleMonthController');
const PlanningMacrocycleMonthDatasCharacteristicsController = require('../controllers/Planning/PlanningMacrocycleMonthDatasCharacteristicsController');
const PlanningMacrocycleMonthDatasController = require('../controllers/Planning/PlanningMacrocycleMonthDatasController');
const PlanningPathologicalHistoryController = require('../controllers/Planning/PlanningPathologicalHistoryController');
const PlanningPosturalEvaluationController = require('../controllers/Planning/PlanningPosturalEvaluationController');
const PlanningTimelineController = require('../controllers/Planning/PlanningTimelineController');
const ReportController = require('../controllers/ReportController');
const NotificationController = require('../controllers/NotificationController');
const PlanningDailyControlController = require('../controllers/Planning/PlanningDailyControlController');
const ScheduleController = require('../controllers/ScheduleController');
const ProfileController = require('../controllers/ProfileController');
const UserController = require('../controllers/User/UserController');
const PlanningController = require('../controllers/Planning/PlanningController');

//#region def_tipo_usuario
router.get('/api/DefUserType',DefUserTypeController.get);
router.post('/api/DefUserType',DefUserTypeController.post);
router.put('/api/DefUserType',DefUserTypeController.put);
router.delete('/api/DefUserType',DefUserTypeController.delete);
router.get('/api/DefUserTypeSTP',DefUserTypeController.spTeste);
//#endregion

//#region def_tipo_pagamento
router.get('/api/DefTypePayment',DefTypePaymentController.get);
router.post('/api/DefTypePayment',DefTypePaymentController.post);
router.put('/api/DefTypePayment',DefTypePaymentController.put);
router.delete('/api/DefTypePayment',DefTypePaymentController.delete);
//#endregion

//#region def_atividade
router.get('/api/DefActivity',DefActivityController.get);
router.post('/api/DefActivity',DefActivityController.post);
router.put('/api/DefActivity',DefActivityController.put);
router.delete('/api/DefActivity',DefActivityController.delete);
//#endregion

//#region def_periodo
router.get('/api/DefPeriod',DefPeriodController.get);
router.post('/api/DefPeriod',DefPeriodController.post);
router.put('/api/DefPeriod',DefPeriodController.put);
router.delete('/api/DefPeriod',DefPeriodController.delete);
//#endregion

//#region def_periodo
router.get('/api/DefStatusPlan',DefStatusPlanController.get);
router.post('/api/DefStatusPlan',DefStatusPlanController.post);
router.put('/api/DefStatusPlan',DefStatusPlanController.put);
router.delete('/api/DefStatusPlan',DefStatusPlanController.delete);
//#endregion

//#region def_plano
router.get('/api/DefPlan',DefPlanController.get);
router.post('/api/DefPlan',DefPlanController.post);
router.put('/api/DefPlan',DefPlanController.put);
router.delete('/api/DefPlan',DefPlanController.delete);
//#endregion

//#region usuario_plano
router.get('/api/UserPlan',UserPlanController.get);
router.post('/api/UserPlan',UserPlanController.post);
router.put('/api/UserPlan',UserPlanController.put);
router.delete('/api/UserPlan',UserPlanController.delete);
//#endregion

//#region usuario_historico_familiar
router.get('/api/UserFamilyHistory',UserFamilyHistoryController.get);
router.post('/api/UserFamilyHistory',UserFamilyHistoryController.post);
router.put('/api/UserFamilyHistory',UserFamilyHistoryController.put);
router.delete('/api/UserFamilyHistory',UserFamilyHistoryController.delete);
//#endregion

//#region planejamento_anamnese
router.get('/api/PlanningAnamnesis',PlanningAnamnesisController.get);
router.post('/api/PlanningAnamnesis',PlanningAnamnesisController.post);
router.put('/api/PlanningAnamnesis',PlanningAnamnesisController.put);
router.delete('/api/PlanningAnamnesis',PlanningAnamnesisController.delete);
//#endregion

//#region planejamento_avaliacao_funcional
router.get('/api/PlanningFuncionalEvaluation',PlanningFuncionalEvaluationController.get);
router.post('/api/PlanningFuncionalEvaluation',PlanningFuncionalEvaluationController.post);
router.put('/api/PlanningFuncionalEvaluation',PlanningFuncionalEvaluationController.put);
router.delete('/api/PlanningFuncionalEvaluation',PlanningFuncionalEvaluationController.delete);
//#endregion

//#region planejamento_macrociclo
router.get('/api/PlanningMacrocycle',PlanningMacrocycleController.get);
router.post('/api/PlanningMacrocycle',PlanningMacrocycleController.post);
router.put('/api/PlanningMacrocycle',PlanningMacrocycleController.put);
router.delete('/api/PlanningMacrocycle',PlanningMacrocycleController.delete);
//#endregion

//#region planejamento_macrociclo_mes
router.get('/api/PlanningMacrocycleMonth',PlanningMacrocycleMonthController.get);
router.post('/api/PlanningMacrocycleMonth',PlanningMacrocycleMonthController.post);
router.put('/api/PlanningMacrocycleMonth',PlanningMacrocycleMonthController.put);
router.delete('/api/PlanningMacrocycleMonth',PlanningMacrocycleMonthController.delete);
//#endregion

//#region planejamento_macrociclo_mes_dados
router.get('/api/PlanningMacrocycleMonthDatas',PlanningMacrocycleMonthDatasController.get);
router.post('/api/PlanningMacrocycleMonthDatas',PlanningMacrocycleMonthDatasController.post);
router.put('/api/PlanningMacrocycleMonthDatas',PlanningMacrocycleMonthDatasController.put);
router.delete('/api/PlanningMacrocycleMonthDatas',PlanningMacrocycleMonthDatasController.delete);
//#endregion

//#region planejamento_macrociclo_mes_dados_caracateristicas
router.get('/api/PlanningMacrocycleMonthDatasCharacteristics',PlanningMacrocycleMonthDatasCharacteristicsController.get);
router.post('/api/PlanningMacrocycleMonthDatasCharacteristics',PlanningMacrocycleMonthDatasCharacteristicsController.post);
router.put('/api/PlanningMacrocycleMonthDatasCharacteristics',PlanningMacrocycleMonthDatasCharacteristicsController.put);
router.delete('/api/PlanningMacrocycleMonthDatasCharacteristics',PlanningMacrocycleMonthDatasCharacteristicsController.delete);
//#endregion

//#region planejamento_historico_patologico
router.get('/api/PlanningPathologicalHistory',PlanningPathologicalHistoryController.get);
router.post('/api/PlanningPathologicalHistory',PlanningPathologicalHistoryController.post);
router.put('/api/PlanningPathologicalHistory',PlanningPathologicalHistoryController.put);
router.delete('/api/PlanningPathologicalHistory',PlanningPathologicalHistoryController.delete);
//#endregion

//#region planejamento_macrociclo_mes_dados_caracateristicas
router.get('/api/PlanningPosturalEvaluation',PlanningPosturalEvaluationController.get);
router.post('/api/PlanningPosturalEvaluation',PlanningPosturalEvaluationController.post);
router.put('/api/PlanningPosturalEvaluation',PlanningPosturalEvaluationController.put);
router.delete('/api/PlanningPosturalEvaluation',PlanningPosturalEvaluationController.delete);
//#endregion

//#region planejamento_macrociclo_mes_dados_caracateristicas
router.get('/api/PlanningTimeline',PlanningTimelineController.get);
router.post('/api/PlanningTimeline',PlanningTimelineController.post);
router.put('/api/PlanningTimeline',PlanningTimelineController.put);
router.delete('/api/PlanningTimeline',PlanningTimelineController.delete);
//#endregion

//#region planejamento_controle_diario
router.get('/api/PlanningDailyControl',PlanningDailyControlController.get);
router.post('/api/PlanningDailyControl',PlanningDailyControlController.post);
router.put('/api/PlanningDailyControl',PlanningDailyControlController.put);
router.delete('/api/PlanningDailyControl',PlanningDailyControlController.delete);
router.get('/api/PlanningDailyControl/GetById',PlanningDailyControlController.get);
//#endregion

//#region planejamento
router.delete('/api/Planning/DeletePlanning',PlanningController.deletePlanning);
router.delete('/api/Planning',PlanningController.delete);
router.post('/api/Planning/AlterProfile',PlanningController.AlterProfile);
router.post('/api/Planning',PlanningController.post);
router.post('/api/Planning/MacrocicloNew',PlanningController.MacrocicloNew);
router.get('/api/Planning',PlanningController.get);
router.get('/api/Planning/GetByUserId',PlanningController.getByUserId);
router.post('/api/Planning/New',PlanningController.New);
router.put('/api/Planning',PlanningController.put);
//#endregion

//#region relatorio
router.post('/api/Report/GetReportCharacteristics',ReportController.get);
//#endregion

//#region notificacao
router.get('/api/Notification',NotificationController.get);
router.get('/api/Notification/Read',NotificationController.read);
router.get('/api/Notification/Deleted',NotificationController.deleted);
//#endregion

//#region agendamento
router.get('/api/Schedule',ScheduleController.get);
router.post('/api/Schedule',ScheduleController.post);
router.put('/api/Schedule',ScheduleController.put);
router.delete('/api/Schedule',ScheduleController.delete);
router.post('/api/Schedule/GetSchedule',ScheduleController.getSchedule);
router.post('/api/Schedule/ScheduleBulkAdd',ScheduleController.scheduleBulkAdd);
//#endregion

//#region perfil
router.get('/api/Profile',ProfileController.get);
router.post('/api/Profile',ProfileController.post);
router.delete('/api/Profile',ProfileController.delete);
router.put('/api/Profile',ProfileController.put);
//#endregion

//#region usuario
router.get('/api/User',UserController.get);
router.post('/api/User',UserController.post);
router.delete('/api/User',UserController.delete);
router.put('/api/User',UserController.put);
router.post('/api/User/Login',UserController.getLogin);
router.get('/api/User/GetUser',UserController.getUser);
router.delete('/api/User/UserDelete',UserController.UserDelete);
router.get('/api/User/GetDashboard',UserController.GetDashboard);
router.post('/api/User/ResetPassword',UserController.ResetPassword);
//#endregion

module.exports = router;