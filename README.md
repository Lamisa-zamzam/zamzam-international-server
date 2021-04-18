# My Mongodb Server

Welcome to my server!!! Here you can request a number of data which is basically the data for a Visa Agency Website from this server. By calling [The Root API](https://morning-shelf-52119.herokuapp.com/), you can get a simple "Hello World" which is not necessarily useful, but root URL is always important. So, I wanted to make you know that.

## [Visit My Root API](https://morning-shelf-52119.herokuapp.com/)

Secondly, if you call [The Services API](https://morning-shelf-52119.herokuapp.com/services), you will get the data of several visa to be ordered by the customers in an array. The array contains an object for each visa and each object contains some properties, namely: \_id, id, serviceName(title of the service, e.g. visa), price, detail and image(URL to the picture of the visa). Though they are not real ones, however, that could work great as placeholders.

You can get all the reviews that people gave to the visa agency form [The Reviews API](https://morning-shelf-52119.herokuapp.com/reviews). Every review object has properties like \_id, name(name of the user), profession, feedback, imgURL(image of the user).

If you want to get the information of a specific service, you're gonna do that with [https://morning-shelf-52119.herokuapp.com/service/:serviceName](https://morning-shelf-52119.herokuapp.com/service/:serviceName). But wait!!! You have to replace :serviceName with the name of the visa you want to get and also this API is private, so you are not going to get the info until you are logged in in My Website [Zamzam International](https://complete-website-3.web.app/). Actually, this server was made only for this website, so this website has a power over this server. You can [add service to this server](https://morning-shelf-52119.herokuapp.com/addService), [add an order for your chosen visa](https://morning-shelf-52119.herokuapp.com/placeOrder), [give a review about our service](https://morning-shelf-52119.herokuapp.com/giveReview), [make an admin of the site](https://morning-shelf-52119.herokuapp.com/makeAdmin) and even [delete](https://morning-shelf-52119.herokuapp.com/deleteService/:_id) or [Update](https://morning-shelf-52119.herokuapp.com/updateOrder/:id) a service form here using that website. But again, you have to be logged in in that website and have the id and name of the specific service in the cases you need it.

You are able to check if a person is admin in the website with [This get API](https://morning-shelf-52119.herokuapp.com/checkIfAdmin). Note that you have to provide the email of the person as a query in the URL. This API [https://morning-shelf-52119.herokuapp.com/bookings/:email](https://morning-shelf-52119.herokuapp.com/bookings/:email) gives all the bookings that have been made form a specific email. And to get a single service info by its id, use [https://morning-shelf-52119.herokuapp.com/service/:id](https://morning-shelf-52119.herokuapp.com/service/:id).

My project includes:

1.  [Node.js](https://nodejs.org/en/),
2.  [Mongodb](https://www.mongodb.com/),
3.  [Express.js](https://expressjs.com/),
4.  [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ,
5.  [Environment Variables](https://www.npmjs.com/package/dotenv) and
6.  [Heroku Deployment](https://devcenter.heroku.com/categories/reference).
