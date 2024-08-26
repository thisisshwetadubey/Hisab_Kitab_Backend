import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from 'morgan'
import sequelize from './config/db'


const app = express()
dotenv.config()
sequelize.sync({force: false})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger('dev'))

const corsOptions = {
  origin: "*",
  //   process.env.USE_PROD_SERVER === "true"
  //     ? process.env.PROD_CLIENT_URL
  //     : process.env.LOCAL_CLIENT_URL, // Change this to your specific frontend origin in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};



app.use(cors(corsOptions))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.use('/api/users', require('./routes/users'))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

})

module.exports = app
