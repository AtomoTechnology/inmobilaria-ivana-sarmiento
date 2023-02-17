const jwt = require('jsonwebtoken');

const isPassValid = (req, res, next) =>{
    try {
        let {password} = req.body;  
        var mayus = /[A-Z]/;
        var minis = /[a-z]/;    
        var num = /[0-9]/;

        if(password.length < 6){
            return res.json({
                status: 500,
                success: false,                  
                message:"La clave debe tener al menos 6 caracteres"
            });              
        }
        else if(password.length > 50){
            return res.json({
                status: 500,
                success: false,                           
                message:"La clave no puede tener más de 50 caracteres"
            }); 
        }
        else if(!mayus.test(password)){
            return res.json({
                status: 500,
                success: false,                       
                message:"La clave debe tener al menos una letra mayúscula"
            }); 
        }
        else if(!minis.test(password)){
            return res.json({
                status: 500,
                success: false,                          
                message:"La clave debe tener al menos una letra minúscula"
            }); 
        }
        else if(!num.test(password)){
            return res.json({
                status: 500,
                success: false,                         
                message:"La clave debe tener al menos un caracter numérico"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: 500,
            success: false,                        
            message:'Contactactez al administrador'
        });
    }
    
}

const IsmailValid = (req, res, next) => {
    try {
        let {email} = req.body;
        const isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!isEmail.test(email)){
            return res.json({
                status: 500,
                success: false,                  
                message:"Esta dirección de correo: " + email + " no es valida"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: 500,
            success: false, 
            message:'Contactactez al administrador 1'
        }); 
    }
    
}

const IsValidDataLogin = (req, res, next) => {
    try {
        let {email, password} = req.body;
        console.log("password",password)
        if(email === "" || email === undefined){
            return res.json({
                status: 500,
                success: false,                  
                message:"Debe ingresar el nombre de usuario"
            }); 
        }
        else if(password === "" || password === undefined){
            return res.json({
                status: 500,
                success: false,                  
                message:"Debe ingresar la contraseña del usuario"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: 500,
            success: false, 
            message:'Contactactez al administrador 1'
        }); 
    }
    
}
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({
                error: "token",
                message: "Token requiere"
            });
        }
        next();
    } catch (e) {
        return res.status(403).json({
            error: "token",
            message: "No autorizado"
        });
    }
};
module.exports = {isPassValid,IsmailValid,IsValidDataLogin,verifyToken}