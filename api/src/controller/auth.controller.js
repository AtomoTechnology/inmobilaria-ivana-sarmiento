
const jwt = require('jsonwebtoken');
const encripto = require('../../helpers/Cryptographies');
const {auth} = require('../../models');

const SignIn = (req, res) =>{ 
    const { email, password} = req.body;  
    auth.findOne({
        where: {
            email: email
        }
    })
    .then(account =>{
        console.log("Account",account)
        if (!account)
        {   
            return res.json({
                status: 500,
                success: false,
                error:"No encontrado",                    
                message:"Usuario incorrecto"
            });
        }
        else{
            encripto.compare(password,account.dataValues.password).then((response)=>
            {
                if(!response){
                    return res.json({
                        status: 500,
                        success: false,
                        error:"No encontrado",                   
                        message:"contraseña incorrecta"
                    });
                }
                else
                { 
                    console.log("account",account)
                    const token = jwt.sign(
                        {
                            id:account.dataValues.id, 
                            uid:account.dataValues.uuid, 
                            role:account.dataValues.email
                        },
                        "6a698217-a233-40da-a643-72367ff09e89",{
                            expiresIn:86400 // vence en un dia
                        }
                    );
                    return res.json({
                        status: 200,
                        success: true,
                        token: token
                    });
                }  
            })
        }
    });      
}

const GetAll = (req, res) => {
    auth.findAll({
        attributes: ['id', 'uuid', 'email'],
        order: [
            ['id', 'DESC'],
        ]
    }).then(result => {
        res.json({            
            code:200,
            success: true,
            message:'',
            data:result
        });
    })
}

const GetById = (req, res) =>{   
    auth.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({            
            code:200,
            success: true,
            message:'',
            data:result
        });
    });  
}

const Post = (req, res) =>{
    const {email,password} = req.body;
    encripto.encryptPassword(password).then(pass => {       
            auth.create({
                email: email,password: pass
            }).
            then(response => {
                res.json({
                    status: 200,
                    success: true,
                    message: 'El usuario fue creado con exito',
                    data:response
                });
            })
            .catch((err) =>{
                return res.json({
                    status: 500,
                    success: false,
                    message: err.errors[0].message == "email must be unique" ? 'Ya existe un usuario con ese email':" no se pude crear el usuario",
                    error:err
                });
            });
    });
}
module.exports = {GetAll, GetById, Post,SignIn}