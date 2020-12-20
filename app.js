const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members:
        [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/b106f0ccd7"

    const options ={
        method:"POST",
        auth:"eserrano24:be80027deee66a19a5ff669831ebaeb3-us7"

        //list ID"

    }

    const request = https.request(url, options, function(response){
   
    if(response.statusCode === 200){
        res.sendFile(`${__dirname}/success.html`);

    }else{
        res.sendFile(`${__dirname}/failure.html`);
    }
        response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    });

    //request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res){
res.redirect("/");
});

//gets main html page
app.get("/", function(req, res){
    res.sendFile(`${__dirname}/signup.html`);
})

//check that app is running on port 3000
app.listen(3000, function(){
    console.log("App running on port 3000");
    });
    
// be80027deee66a19a5ff669831ebaeb3-us7

//list ID
//b106f0ccd7