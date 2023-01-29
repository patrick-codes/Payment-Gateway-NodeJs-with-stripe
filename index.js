const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = 'pk_test_51MVZe6J9AZQu9LnIcS6KGCapzo6De950iyEwmoJTWvkcdILXc6Qshk0a3TemERgDHD1daXdvOXfHWa0h35vmfgoh00oaL5xPgE'
var Secret_Key = 'sk_test_51MVZe6J9AZQu9LnIan2hV093eAihBMSTGtC2BfzpLvtwmJqiofMOqNUMHSRd7aiCiqmX3a7VAgw4qiipnccoAYmJ00CFzcnhe5'

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('Home', {
	key: Publishable_Key
	})
})

app.post('/payment', function(req, res){

	// Moreover you can take more details from user
	// like Address, Name, etc from form
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		name: 'Boateng Patrick',
		address: {
			line1: 'Dansoman Accra',
			postal_code: '233',
			city: 'Accra',
			state: 'Greater Accra',
			country: 'Ghana',
		}
	})
	.then((customer) => {

		return stripe.charges.create({
			amount: 2500,	 // Charging Rs 25
			description: 'App Development Product',
			currency: 'INR',
			customer: customer.id
		});
	})
	.then((charge) => {
		res.send("Success") // If no error occurs
	})
	.catch((err) => {
		res.send(err)	 // If some error occurs
	});
})

app.listen(port, function(error){
	if(error) throw error
	console.log("Server created Successfully")
})
