const path = require("path");
const express = require("express");
const hbs=require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Saurabh'
  });
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Saurabh'
  });
})
app.get('/help',(req,res)=>{

  res.render('help',{
    helpText:"This is Help Text",
    title:'Help',
    name:'Saurabh'
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:"You must provide address."
    })
  }
  const address=req.query.address;
  geocode(address,(error,data)=>{
    if(error){
      return res.send({error});
    }
    const{latitude,longitude,location}=data;
    forecast(latitude,longitude,(error,Forecastdata)=>{
      if(error){
        return res.send({error});
      }
      res.send({forecast:Forecastdata,
      location,
    address:address});
    })
  })
});

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404 ',
    name:'Saurabh',
    errorMessage:'Help article not found'
  })
})
app.get('/products',(req,res)=>{
  res.send({
    produt:[]
  })
})
app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Saurabh',
    errorMessage:'Page not Found'
  })
})

app.listen(3000, () => {
  console.log("Successfully Start Server!.");
});
