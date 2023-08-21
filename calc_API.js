/**Script dictating our Express Calculator Api routes */ 

// importing express
const express = require('express');

// init our express app
const app = express();

// Tell Express to parse all requests for json
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({
        status:"Live"
    });
})

// The three base GET requests routes: 
// /mean
// /median
//  /mode.


app.listen(3000, () => {
    console.log("Server running on port 3000")
});
  
  
  