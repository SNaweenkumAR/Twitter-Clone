import express from 'express'
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs'


export const signup = async (req,res) =>{
     try {
        const { username, fullname, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
               return res.status(400).json({ error : "Invalid error format"})
        }

        const existingEmail = await  User.findOne({email})
       const existingUsername = await User.findOne({username})

       if( existingEmail || existingUsername ) {
        return res.status(400).json({error : "Already Existing User name or email"})
       } 
       
     if(password.length < 6){
        return res.status(400).json({error : "Password must have 6 char Length"})
     }

     //hashing the password
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password,salt)

     const newUser = new User ({
        username,
        fullname,
        email,
        password:hashedpassword
     })

     if(newUser){
        await newUser.save();
        return res.status(200).json({
            _id:newUser._id,
            username:newUser.username,
            fullname:newUser.fullname,
            email:newUser.email,
            follower:newUser.follower,
            following:newUser.following,
            profileImg:newUser.profileImg,
            coverImg:newUser.coverImg,
            bio:newUser.bio,
            link:newUser.link
        })
     }
     else{
        res.status(400).json({error:"Invalid User data"})
     }


     } catch (error) {
        console.log(`Error in signup Controller : ${error}`)
        res.status(500).json({error : "Internal server error"})
     }
}


export const login = (req,res) =>{
    res.send("login cont")
}

export const logout = (req,res) =>{
    res.send("logout cont")
}
