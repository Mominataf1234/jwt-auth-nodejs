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

    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
});

// the verification of jwt
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);

        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});