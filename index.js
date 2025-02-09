import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;
var name="";
var  userIsAuthorised = false;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

function nameGenerator(req, res, next) {
  console.log(req.body);
  name = req.body["firstName"] + req.body["lastName"];
  next();
}
function passwordCheck (req,res,next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}

app.use(passwordCheck)
app.use(nameGenerator);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {

    res.send(`<h1>Your name is:</h1><h2>${name}✌️</h2>`);
});

app.post("/check",(req,res)=>{
  userIsAuthorised ?res.sendFile(__dirname+"/public/secrets.html"):  res.sendFile(__dirname + "/public/index.html");
});


// start server
app.listen(port, () => {
  console.log(`server running on port ${port}.`);
});
