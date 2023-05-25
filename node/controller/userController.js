const UserService = require('../services/userServices')

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body //gets email and pass from front end

        const result = await UserService.regUser(email, password)

        //you can add any number of key:value in response
        res.json({ status: true,success:result, messag: 'User created successfully' })
    } catch (err) {
        
        console.error(err)
        res.status(500).json({ status: false, message: 'Error creating user' })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //wait for checkuser to return user model
        const user = await UserService.checkUser(email);//this returns a user model
        console.log(user)
        if(!user){
            throw new Error("user not found")
        }

        const ismatch = await user.comparePass(password)//
        if(ismatch == false){
            throw new Error("password invalid")
        }
        // to stotr user data in token (only the mentioned data will bestored)
        let tokenData = {userId:user._id, email:user.email, password: user.password}

        const token = await UserService.genToken(tokenData, "123", '1h')// create a token to be passed with responce so that it can accesed later
        res.status(200).json({status:true,test:"holy moly it works", token:token/*passes the token with responce with all the require data */})

    } catch (err) {
        console.error(err)
        res.status(500).json({ status: false, message: 'Error creating user' })
    }
}
