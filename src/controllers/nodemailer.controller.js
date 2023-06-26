import { Router } from "express";
import { transporter } from "../messages/nodemailer.js";
import config from "../config.js";
import {__dirname} from '../utils.js'
import jwt from "jsonwebtoken"
import logger from '../utils/winston/winston.js';

export async function nodemailerPassword(req,res){
   
    const {email} = req.body
    logger.info(`Generando token para ${email}...`);
    const token = jwt.sign({ email }, config.token_nodemailer, { expiresIn: '1h' });
    logger.info(`Token generado: ${token}`);

    const isLocalhost = config.node_env === 'development' || !config.node_env
    const baseUrl = isLocalhost ? 'http://localhost:8080' : 'https://backendentregafinal-production-fa79.up.railway.app';
    const resetPasswordUrl = `${baseUrl}/views/changePassword?token=${token}`;

{/* <p><a href="http://localhost:8080/views/changePassword?token=${token}">Restablecer contraseña</a></p>  */}
    const messageOptions = {
        from:'Universal Market',
        to:email,
        subject:`Reestablecer contraseña`,
        html:`
            <p>Hola ${email},</p>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Por favor, haz clic en el siguiente enlace para cambiar tu contraseña:</p>
            <p><a href="${resetPasswordUrl}">Restablecer contraseña</a></p>
            <p>Gracias,recuerde que cuenta con 1 hora luego de haber generado este mensaje para utilizar el enlace,luego de ese tiempo debera generar un enlace nuevo</p>
            <p>El equipo de Universal Market</p>
            `
    }
    try{
        await transporter.sendMail(messageOptions)
        res.redirect('/views/nodemailerPassword?token=' + token);
    }catch(error){
        logger.error("error");
    }
}
