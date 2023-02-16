require('dotenv').config();
const {PaymentType} = require('../../models');

const GetAll = (req, res) =>{   
    PaymentType.findAll().then(result => {
        res.json({            
            code:200,
            success: true,
            message:'',
            data:result
        }
        );
    });    
}

const GetById = (req, res) =>{  
    const { id } = req.params;
    PaymentType.findOne({
        where: {
            id: id
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
    const { name} = req.body;
    PaymentType.create({
        name : name,
        state:1
    }).then(response => {       
        return res.json({
            status: 200,
            success: true,
            message:'El tipo de forma de pago fue guardado con exito',
            data:response
        });
    }).catch(function (err) {
        return res.json({
            status: 500,
            success: false,
            message:'El tipo de forma de pago no fue guardado',
            error:err
        });
    });   
}

const Put = (req, res) =>{
    const { name } = req.body;
    PaymentType.update({
        name: name
    }, {
        where: {
            id:  req.params.id,
        }
    }).then((response) =>{ 
        if(response === 1){ 
            return res.json({
                status: 200,
                success: true,
                message:'El tipo de forma de pago fue actualizado con exito',
                data:response
            }); 
        }
        else
        {
            return res.json({
                status: 500,
                success: false,
                message:'El tipo de forma de pago no fue actualizado'
            });
        }
    })
    .catch((err) =>{
        return res.json({
            status: 500,
            success: false,
            message:'El tipo de forma de pago no fue actualizado',
            error:err
        });
    });
}

const Delete = (req, res) =>{  
    PaymentType.destroy(
        {where: {id:  req.params.id}
    }).then((response) =>{ 
        if(response === 1){
            return res.json({
                status: 200,
                success: true,
                message:'El tipo de forma de pago fue eliminado con exito'
            });     
        }
        else
        {
            return res.json({
                status: 500,
                success: false,
                message:'El tipo de forma de pago no fue eliminado'
            });
        }
       
    })
    .catch((err) =>{
        return res.json({
            status: 500,
            success: false,
            message:'El tipo de forma de pago no fue eliminado',
            error:err
        });
    });
}

module.exports = {GetAll, GetById, Post, Put, Delete}