const express = require("express");
const { getUsers, fetch } = require("./postgres.js");

const app = express();
app.use(express.json());
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/users", async (req, res) => {
    try{
        const {user_first_name, user_last_name} = req.body;
        const insertUser = await fetch  (`INSERT INTO users (user_first_name, user_last_name) VALUES ($1, $2) RETURNING *;`, true, user_first_name, user_last_name);
        console.log(insertUser)
        if(insertUser.user_id) return res.status(201).json({message: "User successfully created", statusCode: 201})
        else throw new Error("XATOLIK")
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
app.listen(4000, () => {
    console.log(`Server is running at http://localhost:4000`);
});
