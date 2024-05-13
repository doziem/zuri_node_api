
const { createServer } = require("http");
const url = require('url');

const PORT = 3000;

let parsedUrl;
const handleApiRequest = (req, res) => {
   parsedUrl = url.parse(req.url, true);

  switch (req.method) {
    case "PATCH":
      if (parsedUrl.pathname.startsWith("/joke/")) updateJoke(req,res) 
      break;
    case "GET":
      if (req.url === "/") getAllJokes(req, res);
      break;
    case "POST":
      if (req.url === "/") createJoke(req, res);
      break;

    case "DELETE":
      if (parsedUrl.pathname.startsWith("/joke/")) deleteJoke(req,res);
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: true, message: "Joke not Found" }));
  }
};

const server = createServer(handleApiRequest);

// Generate ID
const generateId = () => {
  return +(Math.random() * 100000000).toFixed(0);
};

// database
let db = [
  {
    id: 41266273,
    title: "Why was the mushroom always invited to parties?",
    comedian: "Bovi",
    year: 2000,
  },
];

// Fetch All the Jokes
const getAllJokes = (_, res) => {
  res.writeHead(200);

  res.end(JSON.stringify({ data: db, message: "Jokes Fetched Successfully" }));
};

// Create Joke
const createJoke = (req, res) => {

  res.writeHead(201);

  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });


  req.on("end", () => {
    const bodyBuffer = Buffer.concat(body).toString();

    const jsonBody = JSON.parse(bodyBuffer);
    const newnJoke = { ...jsonBody, id: generateId() };
    db.push(newnJoke);

    res.end(JSON.stringify({data:newnJoke,message:"Joke Successfully Created"}))
    console.log(db);
  });
};

// Update Joke
const updateJoke = (req, res) => {
  res.writeHead(200);
  const jokeId = +parsedUrl.pathname.split("/")[2];

  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

    req.on("end", () => {

      const bodyBuffer = Buffer.concat(body).toString();

    const jsonBody = JSON.parse(bodyBuffer);

    const index = db.findIndex(joke => +joke.id === jokeId);

    if (index !== -1) {

      db[index] = { ...db[index], ...jsonBody };
      res.end(
        JSON.stringify({ data: db[index], message: "Jokes Updated Successfully" })
      );
    } 

    });
  

};

// Delete Joke
const deleteJoke = (req, res) => {
  res.writeHead(200);

  const jokeId = +parsedUrl.pathname.split("/")[2];

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const newJokes = db.find((item) => +item.id === jokeId);

    const removeJoked = db.splice(newJokes, 1)[0];

    console.log(db);
    res.end(
      JSON.stringify({
        data: removeJoked,
        message: "Jokes Deleted Successfully",
      })
    );
  });
};

server.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
