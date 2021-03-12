/* Copyright Vik Anand
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const express = require("express");
const app = express()

/* Setup serving the CSS and frontend JS files with express.static middleware fxn */
app.use(express.static("public"));

/* Setup json post data */
app.use(express.json());

/* Setup url  post data */
//app.use(express.urlencoded({extended:true}))

/* Setup EJS template engine */
app.set("view engine", "ejs");


/* start listening on main port */
app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});

/* Setup the root route */
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

/* Setup pretty abx route */
app.get("/prettyabx", (req, res)=>{    
    res.sendFile(__dirname + "/prettyabx.html");

});



/*------------PRETTY ABX--------------*/
/*------------------------------------*/
app.post("/prettyabx", (req,res)=>{
    
    const {spawn} = require("child_process")
    const pythonProc = spawn(__dirname+"/pyenv/Scripts/python",[__dirname+"./tabulate.py", req.body.wt])

    pythonProc.stdin.write(req.body.abx)    
    pythonProc.stdin.end()
     
    pythonProc.stdout.on('data', (data) => {
        //console.log(data.toString())
        app.get("/prettyabx_response", (req, res)=>{    
            res.render('prettyabx_response', {PRETTYTABLE: data.toString()})})        
    });
});


