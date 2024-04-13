import UserModel from '../Models/UserModel.js';
import Joi from 'joi';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRegister = async(data,socket)=>{
    try{
        const schema = Joi.object({
            username: Joi.string().alphanum().min(6).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{3,30}$')).required(),
            mobile: Joi.string().required()
          })
          const validationRes = schema.validate(data);
          if(validationRes.error){
            socket.emit('validationError', { error: validationRes.error.message });
          }
          const {username,password,email,mobile} = data;
          const salt = await bcrypt.genSalt(10);
          const hashPass = await bcrypt.hash(password,salt)
          await new UserModel({
            username:username,
            email:email,
            password:hashPass,
            mobile:mobile
          }).save()
          return { error: false, message:"user created Successfully" };

    }catch(err){
        console.log("RegiserError: ",err)
        return { error: true, message:'An unexpected error occurred during registration' };
    }
}
const userLogin = async(data,socket)=>{
    try{
       
        const {email,password} = data;
          const user = await UserModel.findOne({
            email: email
          });
          const validate = await bcrypt.compare(password, user.password);
          if(validate === false){
            socket.emit('Validationlogin', { error: true,message:"user Validation error",time: new Date() });
            return { error: true, message:"password or userEmail is not valid" };
          }
          else if(validate === true){
              const token = JWT.sign(
                { token_type: "haloTok", userId: user._id, username: user.username},
                process.env.TOKEN_SCR, 
                { algorithm: 'HS256', expiresIn: "12h" } 
            );
              return { error: false, message:"user Loged in Successfully",Authorized:token };
          }

    }catch(err){
        console.log("LoginError: ",err)
        return { error: true, message:'User Email or Password is Not Valid'};
    }
}


export default{
    userRegister,
    userLogin
}