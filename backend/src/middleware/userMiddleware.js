// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const redisClient = require("../config/redis")

// const userMiddleware = async (req,res,next)=>{

//     try{
        
//         const {token} = req.cookies;
//         if(!token)
//             throw new Error("Token is not present");

//         const payload = jwt.verify(token,process.env.JWT_KEY);

//         const {_id} = payload;

//         if(!_id){
//             throw new Error("Invalid token");
//         }

//         const result = await User.findById(_id);

//         if(!result){
//             throw new Error("User Doesn't Exist");
//         }

//         // Redis ke blockList mein persent toh nahi hai

//         const IsBlocked = await redisClient.exists(`token:${token}`);

//         if(IsBlocked)
//             throw new Error("Invalid Token");

//         req.result = result;


//         next();
//     }
//     catch(err){
//         res.status(401).send("Error: "+ err.message)
//     }

// }


// module.exports = userMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Token not present"
      });
    }

    // ❌ Invalid / expired token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token"
      });
    }

    const { _id } = payload;

    // ❌ Check Redis blacklist
    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({
        message: "Token is blacklisted"
      });
    }

    // ❌ User not found
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.result = user;

    next();

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
};

module.exports = userMiddleware;
