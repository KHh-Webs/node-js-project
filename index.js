const expressLibrary = require("express")
const mongoose = require("mongoose")

const app = expressLibrary()

const Article  = require("./models/Articles.js")




// mongodb+srv://Node-js:<password>@cluster0.znybp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb+srv://Node-js:nodejs15@cluster0.znybp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected Successfully")
}).catch((error) => {
   console.log("Error with connecting to MongoDB", error)
})

app.use(expressLibrary.json())

app.get('/', (req, res) => {
    res.send("Node Js Project")
})

app.get('/hello', (req, res) => {
    res.send("Hello World")
})

app.get("/hi", (req, res) => {
    let number = ""
    for (let i = 0; i <= 100; i++) {
        number += i + "-"
    }
    // res.send(`${number}`)

    // res.send("<h1>Hello Guys!</h1>")

    // res.sendFile(__dirname + "/views/number.html")
    res.render("number.ejs", {
        name: "Kheira",
        number: number
    })
})

app.get("/findSummation/:num1/:num2", (req, res) => {
    const number1 = req.params.num1
    const number2 = req.params.num2

    const total = Number(number1) + Number(number2)
    
    res.send(`The Total is: ${total}`)

    res.send(`${total}`)
})

app.get("/sayHello", (req, res) => {
    // console.log(req.body)
    // console.log(req.query)
    
    // res.send(`Hello Your name is: ${req.body.name} and You are: ${req.query.age}`)

    res.json({
        name: req.body.name,
        age: req.query.age,
        country: "Algeria"
    })
})

app.get("/test", (req, res) => {
    res.send("Could I test your software?!")
})

app.post("/addComment", (req, res) => {
    res.send("Leave a comment")
})

app.delete("/deleteSth", (req, res) => {
    res.send("Delete your data")
})

// Article's EndPoints
app.post("/articles", async (req, res) => {
    const newArticle = new Article();

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody
    const artLikes = req.body.numberOfLikes

    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = artLikes;
    await newArticle.save()
    res.json(newArticle)
})

app.get("/articles", async (req, res) => {
    const articles = await Article.find()
    res.json(articles)
})

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId

    try {
        const articleById = await Article.findById(id)
        res.json(articleById);
        return;
    } catch (error) {
        console.log("error while reading article of such an id", id)
        return res.send('error')
    }
    
})

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId

    try {
        const articleById = await Article.findOneAndDelete(id)
        res.json(articleById);
        return;

    } catch (error) {
        console.log("error while reading article of such an id", id)
        return res.send('error')

    }
    
})

app.get("/showArticles", async (req, res) => {
    const articles = await Article.find()

    res.render("article.ejs" ,{
        allArticles: articles,
    })
})

app.listen(8000, () => {
    console.log("I'm listening in port 8000")
})