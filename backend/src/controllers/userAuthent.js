const redisClient = require("../config/redis");
const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Submission = require("../models/submission")


// const register = async (req,res)=>{
    
//     try{
//         // validate the data;

//       validate(req.body); 
//       const {firstName, emailId, password}  = req.body;

//       req.body.password = await bcrypt.hash(password, 10);
//       req.body.role = 'user'
//     //
    
//      const user =  await User.create(req.body);
//      const token =  jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_KEY,{expiresIn: 60*60});
//      const reply = {
//         firstName: user.firstName,
//         emailId: user.emailId,
//         _id: user._id,
//         role:user.role,
//     }
    
//      // res.cookie('token',token,{maxAge: 60*60*1000});
//         res.cookie('token', token, {
//   httpOnly: true,
//   secure: true,        // REQUIRED for HTTPS (Render)
//   sameSite: "None",    // REQUIRED for cross-origin
//   maxAge: 60 * 60 * 1000
// });
//      res.status(201).json({
//         user:reply,
//         message:"Register Successfully"
//     })
//     }
//     catch(err){
//         // res.status(400).send("Error: "+err);
//          res.status(400).json({
//         message: err.message || "Registration failed"
//     });
//     }
// }
const register = async (req, res) => {
    try {
        // 1. Validate the data
        // validate(req.body); 
        const { firstName, emailId, password } = req.body;

        // 2. CHECK IF USER ALREADY EXISTS
        // We do this BEFORE hashing to save server resources
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            // Throwing an error here will catch it in the catch block below
            throw new Error("This email is already registered. Please login instead.");
        }

        // 3. Hash password and set defaults
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Use a clean object for creation to avoid unwanted fields from req.body
        const userData = {
            firstName,
            emailId,
            password: hashedPassword,
            role: 'user'
        };

        // 4. Create the user
        const user = await User.create(userData);

        // 5. Generate Token
        const token = jwt.sign(
            { _id: user._id, emailId: emailId, role: 'user' },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
        };

        // 6. Set Cookie and Send Response
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // REQUIRED for HTTPS (Render/Vercel)
            sameSite: "None",    // REQUIRED for cross-origin
            maxAge: 60 * 60 * 1000
        });

        res.status(201).json({
            user: reply,
            message: "Registered Successfully"
        });

    } catch (err) {
        // This will now catch the "Email already registered" error 
        // and send it to your frontend's AlertCircle box
        res.status(400).json({
            message: err.message || "Registration failed"
        });
    }
}



const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
        };

        const token = jwt.sign(
            { _id: user._id, emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            user: reply,
            message: "Login successful"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Login failed"
        });
    }
};



const logout = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({
                message: "No token found"
            });
        }

        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, "Blocked");
        await redisClient.expireAt(`token:${token}`, payload.exp);

        res.cookie("token", null, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0)
        });

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Logout failed"
        });
    }
};

const adminRegister = async(req,res)=>{
    try{
        // validate the data;
    //   if(req.result.role!='admin')
    //     throw new Error("Invalid Credentials");  
      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
    //
    
     const user =  await User.create(req.body);
     const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
     // res.cookie('token',token,{maxAge: 60*60*1000});
        res.cookie('token', token, {
  httpOnly: true,
  secure: true,        // REQUIRED for HTTPS (Render)
  sameSite: "None",    // REQUIRED for cross-origin
  maxAge: 60 * 60 * 1000
});
    //  res.status(201).send("User Registered Successfully");
      res.status(201).json({
      message: "Admin registered successfully"
    });
    }

    catch(err){
        // res.status(400).send("Error: "+err);
        res.status(400).json({
      message: err.message || "Admin registration failed"
    });
    }
}

const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);

    // Submission se bhi delete karo...
    
    // await Submission.deleteMany({userId});
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
      
        // res.status(500).send("Internal Server Error");
         res.status(500).json({
        message: err.message || "Internal Server Error"
    });
    }
}


module.exports = {register, login,logout,adminRegister,deleteProfile};
