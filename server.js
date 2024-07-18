const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const sequelize=require('./Config/dbConnect');
const User = require('./Model/user');
const Category = require('./Model/Category');
const Product = require('./Model/Product');
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Test Route
// app.get('/', (req, res) => {
//     async function createUser() {
//         try {
//           const newUser = await User.create({
//             firstName: 'Joh11n',
//             lastName: 'Do11e',
//             email: 'jasoasa11hnas111.doe@example.com',
//           });
//           console.log('New user created:', newUser.toJSON());
//         } catch (error) {
//             res.send(error.message)
//           console.error('Error creating user:', error);
//         }
//       }
//       createUser();
// });

app.get('/find', async(req, res) => {
        try {
          const newUser = await User.findAll()
          res.send(newUser)
          console.log('New user created:', newUser.toJSON());
        } catch (error) {
            res.send(error.message)
          console.error('Error creating user:', error);
        }
});


app.post('/catgeory',async(req,res)=>{
   try {
          const catgeory = await Category.create(req.body)
          console.log('New user created:', catgeory.toJSON());
          if(!catgeory)
          {
           return  res.json({success:false,message:"Not Insert",statusCode:400})
          }
          res.json({success:true,message:"Insert",statusCode:200,data:catgeory.toJSON()})

        } catch (error) {
          res.json({success:false,message:error.message,statusCode:400})
        }
})

// app.delete('/delete', async(req, res) => {
//     try {
//       const newUser = await User.findAll()
//       res.send(newUser)
//       console.log('New user created:', newUser.toJSON());
//     } catch (error) {
//         res.send(error.message)
//       console.error('Error creating user:', error);
//     }
// });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
