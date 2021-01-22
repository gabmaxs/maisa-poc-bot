const axios = require("axios")
const twit = require("twit")
const schedule = require('node-schedule')
require('dotenv').config()

const Twitter = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
const dynacURL = "https://maisa-poc.com"

const init = async () => {
    try {
        const response = await axios.get(`${dynacURL}/dynac/mappings`, {headers: {"Accept": "application/json"}})
        if(response.status == 200) {
            Twitter.post("statuses/update", {
                status: "Yes, Maisa-poc is up -> 200 Ok"
            })
            console.log("tweet postado")
        }
    }
    catch(e) {
        if(e.response.status == 500) {
            Twitter.post("statuses/update", {
                status: "No, Maisa-poc is down -> 500 Internal Error"
            })
            console.log("tweet postado")
        }
    }
}

schedule.scheduleJob("0 */1 * * *". init)