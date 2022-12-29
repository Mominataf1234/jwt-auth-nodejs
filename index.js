const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();

// now set up global port config access//
dotenv.config();
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

// the actual code for generating jwt
app.post("/user/generateToken", (req, res) => {
    // Here User Validation is done
    // Then the generation of  JWT Token is done

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        username: "admin",
        password: "admin"
    }

    let token = jwt.sign(data, jwtSecretKey);
    res.send(token);
    return app.get;
});

// the verification of jwt
app.get("/user/abc", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
    console.log("api is correct");
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    try {
        let token = req.header(tokenHeaderKey);
        token = req.headers.authorization;
        console.log(token);
        let verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log(error);
        // Access Denied
        return res.status(401).send(error);
    }
});


// if (token) {
//     token = token.split('bearer')[1];
//     console.log("middleware called if", token);
//     jwt.verify(token, jwtSecretKey, (error, valid) => {
//         if (error) {
//             return res.send("Successfully Verified");
//         } else {
//             next();

//         }

//     })
// } else {
//     console.log(error);
//     return res.status(401).send(error);
// }
// console.log("token verified", token);
//  req.headers.authorization.split('Bearer');
//      console.log(verify);

