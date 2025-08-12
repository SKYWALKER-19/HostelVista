import joi from 'joi';

export const signupValidation = (req,res,next) =>{
   const schema = joi.object({
    name : joi.string().min(4).max(100).required(),
    email: joi.string()
  .required()
  .messages({
    'string.pattern.base': 'Email must follow format like 02x1xyz215@niet.co.in with a valid branch code'
  }),

    password: joi.string().min(3).max(100).required(),
    contact: joi.number().min(10).required(),
    RoomNo:joi.number().min(3).required(),
    FatherName:joi.string().min(3).max(100).required()

   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }

   next();
}





export const loginupValidation = (req,res,next) =>{
   const schema = joi.object({
    email: joi.string()
  .required()
  .messages({
    'string.pattern.base': 'Email must follow format like 02x1xyz215@niet.co.in with a valid branch code'
  }),

    password: joi.string().min(3).max(100).required(),
   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }

   next();
}


// Worker loginValidation


export const AdminloginupValidation = (req,res,next) =>{
   const schema = joi.object({
   email: joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required(),
    password: joi.string().min(4).max(15).required(),
   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }
   next();
}




