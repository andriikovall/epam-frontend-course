# Cinema website

## [Live demo here](https://epam-cinema.herokuapp.com/home)

## Technologies used 
- Angular 8
- [`json-server`](https://www.npmjs.com/package/json-server) package to mock backend
- Hosted on Heroku

## Running
- Frontend `npm run start:client`
- Server `npm start`

## More
- Server mocks possible delay so that it unswers after 400 milliseconds 
to allow application to show loaders and react on poossible network error
- Google auth enabled
- Server is only used to serve the data. In the `server/utils` directory there are some small scripts stored  
which I used to generate the data
- __You may not be able to buy tickets, there can be no available sessions due to rare `db.json` updating__

Any changes to mocked database (adding comments, buying tickets and registration) be reverted by hosting every day
