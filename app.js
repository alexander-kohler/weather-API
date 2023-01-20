const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

const apiKey = process.env.API_KEY



app.get('/', (req, res) =>{

    res.sendFile(__dirname + '/index.html')

})


app.post('/index.html', (req, res) =>{
    
    
    const city = req.body.cityName
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    https.get(weatherUrl, (response) =>{
        console.log(response.statusCode);
    
        response.on('data', (data)=>{

            
            const weatherData = JSON.parse(data)
    
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            
            res.write(`<h1>The temparature in ${city} is ${temp}</h1>`)
            res.write(`The weather is currently ${desc}`)
            res.write(`<img src="${imgURL}">`)
            res.send()
        })
    })
})





app.listen(3000, function(){
    console.log('Server is running on port 3000');
})