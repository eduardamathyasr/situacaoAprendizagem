import express from "express"
import projetoRouter from './routes/projetoRoutes.js'
import sequelize from './database.js'


const app = express()

// // Rodar quando precisar sincronizar o banco
// try {
//     await sequelize.sync({alter:true});
// } catch (err) {
//     console.log(err)
// }

// //force


app.use(express.json())
app.use(projetoRouter)


app.listen(3000, () => console.log('servidor rodando'))