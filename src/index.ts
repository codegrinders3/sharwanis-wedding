import { Bot, InputFile } from "grammy";
import * as cron from 'node-cron'

const bot = new Bot("5008000832:AAH7UE3ldalYCiJFJQjnyW8EZ3uVDt5giKo"); 

var newDate: number;
var user_id: number;
bot.command("start", (ctx) => {
    console.log(ctx.chat.id)
    bot.api.sendMessage(ctx.chat.id, 'Please enter your wedding date :)');
    user_id = ctx.chat.id;
});

bot.on("message", (ctx) => {
    ctx.reply("Wait for a while 😇\nWe are setting your wedding time ❤️ ")
    var myDate = ctx.message.text;
    var myDatestr = myDate.split("-");
    console.log('date = ' + myDatestr[2] + '-' + myDatestr[1] + '-' + myDatestr[0] )
    var newDateD = new Date( +myDatestr[2], +myDatestr[1] - 1, +myDatestr[0]);
    newDate = newDateD.getTime()
    console.log('wedding date = ', newDateD.getTime());
    let totalDays = (Math.floor((newDate - Date.now()) / (24 * 60 * 60 * 1000))) + 1
    console.log("days left = " + totalDays + ' now = ' + Date.now())
    if(totalDays > 0) {
        try {
            console.log("sending first message") 
            let filePath = `./images/${totalDays}.jpeg`
            bot.api.sendPhoto(user_id, new InputFile(filePath), { caption: `${totalDays} days to go ❤️`})
            totalDays = totalDays - 1
        } catch(err) {
            console.log("something went wrong")
        }
    }
    cron.schedule("0 0 */1 * * *", () => {
        try {
            console.log("sending message") 
            let filePath = `./images/${totalDays}.jpeg`
            bot.api.sendPhoto(user_id, new InputFile(filePath), { caption: `${totalDays} days to go ❤️`})
            totalDays = totalDays - 1
        } catch(err) {
            console.log("something went wrong")
        }
    }) 
});

bot.start();



// a=243
// for i in *.jpeg; do
//   new=$(printf "%d.jpeg" "$a") #04 pad to length of 4
//   mv -i -- "$i" "$new"
//   let a=a+1
// done