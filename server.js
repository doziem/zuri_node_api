const {createServer} = require('http');

const PORT = 3000;

      const handleApiRequest =(req, res) => {

        if (req.url === "/" && req.method === "POST") {

          createJoke(req, res);

        }else if(req.url === "/" && req.method === "GET"){

          getAllJokes(req, res);

        }else if(req.url === "/joke/:id" && req.method === "PATCH"){

          updateJoke(req, res);

        }else if(req.url === "/joke/:id" && req.method === "DELETE"){

          deleteJoke(req, res);

        }else{

        }
      }

  const server = createServer(handleApiRequest);

  // Generate ID
  const generateId = () => {
    return +( Math.random()*100000000).toFixed(0);
  };

     
      // database
      let db = [
        {
          id: generateId(),
          title: "Why was the mushroom always invited to parties?",
          comedian: "Bovi",
          year: 2000,
        },
      ];

// Fetch All the Jokes
const getAllJokes=(req,res)=>{

  res.writeHead(200);

  res.end(JSON.stringify({data:db, message:"Jokes Fetched Successfully"}))
}

// Create Joke
  function createJoke (req, res){
    
   
    res.end(JSON.stringify(req.body));
  };

// Update Joke
  const updateJoke=(req,res)=>{

  }

// Delete Joke
  const deleteJoke=(req,res)=>{

  }
  
  server.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
  });