[![Build Status](https://travis-ci.org/IBM/innovate-digital-bank.svg?branch=master)]("")

# Building A Local Business Recommendation Platform with Loopback.io, MongoDB & Angular v8

[BIZspot]("") is a web application that serves as a network of prospect users and business owners in order to ease their business access to the community.

## Learning objectives

When we've completed this Code Pattern, you will understand how to:

* Objective 1: Add or claim your business on the platform (*Premium).
* Objective 2: Help people find great local businesses like dentists or vets
* Objective 3: keep your page up to date.
* Objective 4: Review your favorite businesses and share your experiences with the community.

## Flow

When thinking of business capabilities, our elegant application you will need the following set of features:

1- **Authentication**
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Login 
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Registration
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Role Based Access management 
    <br>
2- **Searching** 
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Business Selection (multi criteria search)
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Maps (google maps)
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Reviews
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv. Subscriptions
    <br>
3- **Account**
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Settings
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Personal Reviews
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Subscriptions
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv. Payments Integration (Stripe) 
    <br>
4- **Highlights**
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Top Business
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. Top Reviews
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Top Reviewers
	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv. Top Stories

![Demo architecture](https://i.ibb.co/fqwgVtX/BIZspot-usecase.jpg)

## Included components

* [Component 1](https://loopback.io/doc/en/lb3/): Web API powered by Loopback.io that runs our backend server.
* [Component 2](https://angular.io/): Packaged front-end application built using Angular v8. 
* [Component 3](https://cloud.mongodb.com/): MongoDB NoSQL database hosted on Mongo Atlas - created with 3 replicats (Primary - Secondary - Default)

## Featured technologies

* [Stripe Integration](https://stripe.com/docs/api): Integrate online payments using the Stripe APIs and client-side libraries..
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial): The Maps JavaScript API lets you customize maps with your own content and imagery for display on web pages and mobile devices. The Maps JavaScript API features four basic map types (roadmap, satellite, hybrid, and terrain) which you can modify using layers and styles, controls and events, and various services and libraries.
* [Heroku](https://dashboard.heroku.com/apps): Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

## Watch the Video

[![](https://i.vimeocdn.com/video/825713314.webp?mw=1400&mh=787)](https://vimeo.com/368913922)

## Setup

You have multiple options to setup your own instance:

* [Run it locally](#run-locally)

## Run Locally [UPDATED]

### 1. Clone the repo

Clone the `BIZspot App` repository locally. In a terminal, run:

```bash
$ git clone https://github.com/khalilmejri/bizspot.git
```

### 2. Create an Instance of MongoDB

This code pattern depends on MongoDB as a session and data store. From the [MongoDB Cloud catalog](https://cloud.ibm.com/catalog), find **Compose for MongoDB** and click create. Give it a name, choose a region, pick the standard pricing plan and click create.

**Get your mongo connection string. Almost all your microservices need it; keep it safe!**

### 3. Project Structure
Our application would have the following folder structure:
```bash
 BIZspot/
   └── code/
     ├── BIZspot-backend/
     ├── BIZspot-frontend/
     ├── LICENCE.TXT
     ├── README.md
     └── dbs_mongo
```

### 3. Project Structure [UPDATED]
Our application would have the following folder structure:
```bash
 BIZspot/
   └── code/
     └── source
        ├── client
        ├── server
	├── package.json
        ├── main.js
        ├── env
        └── ..
     ├── LICENCE.TXT
     ├── README.md
     └── dbs_mongo
```


**Installation**

```bash
# install node modules for the API
$ cd source
$ npm install

# install node modules for angular app
$ cd source/client
$ npm install
```
### 4. Run

Finally, navigate to each microservice folder, and start it. Make sure you run the 2 microservice in 2 separate terminals.

```bash
# start API server
$ cd source
$ npm start

# start angular app
$ cd source/client
$ ng serve -o
```

You can now visit `localhost:4200` to access the portal

### 4. Deploy

The application now is `live` on Heroku you can check it out using the link below: <br/>
[Link](https://github.com/khalilMejri/BIZspot/issues)
**Note** We already use automatic deployement with Heroku CI connected to [this](https://github.com/khalilmejri/bizspot.git) github repo. 

## Contact information
For personal feedback or questions feel free to contact us via the mail address, which is mentioned on my `Github profile`. If you have found any bugs or want to post a feature request please use the [bugtracker](https://github.com/khalilMejri/BIZspot/issues) to report them.
