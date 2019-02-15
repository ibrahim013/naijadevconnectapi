### Naija Dev Connect API

### Description
Naija dev connect is an application that let developers connect and sheare information with each other.

### Feature
* Create an account
* Create a Profile
* View Public profile
* Post information
* Like and unlike post
* Comment on post 
* Delete user account

### API ENDPOINT
| Endpoint | HTTP Method |	Description |
|----------|-------------|--------------|
|/api/users/register| POST |  Create a new account |
|/api/users/login| POST |  Login into account |
|/api/profile/| POST | Create a profile |
|/api/profile/:handle | GET | Get user profile by handle name|
|/api/post | POST | Post an information |
|api/profile/handle/:user_id | GET |Get profile by user id |
|api/profile/experience/:exp_id | DEL | Delete profile experience |


### API Documentation
[API Documentation](https://documenter.getpostman.com/view/4905727/RztoMoMJ) *NOTE* this is still work in progress


### Technologies
The src directory houses the implementation using
* Node
* Express
* MongoDb

### Get Started
* Clone this repository from a terminal git clone https://github.com/ibrahim013/naijadevconnectapi.git

* cd into the project directory

* install project dependencies yarn

* Create .env file and set up the environment variables in .env-sample

* and run yarn start to run the application

Go to http://localhost:8000/
