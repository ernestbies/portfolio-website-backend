import express from 'express';
import contactController from '../controllers/contactController';
const router = express.Router();

router.post('/contact', contactController.validateRecaptcha);

export default router;
