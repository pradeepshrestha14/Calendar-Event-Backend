### Setup the nodejs app in development mode:
- 
- clone this repo
- go to this project root path and run => npm install
- create .env file that is clone of esisting .env.backup file
- update the contents as per guided in .env.backup file
       - for this you have to have mongodb url
       - user and pass key of gmail for nodemailer to be able to send email notifications
- finally, run npm start
- and you can start using postman or any tools to hit apis in development mode
- production hosted at https://calendar-event-backend.onrender.com/