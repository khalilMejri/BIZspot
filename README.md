[![Build Status](https://travis-ci.org/IBM/innovate-digital-bank.svg?branch=master)]("")

# Building A Local Business Recommendation Platform with Node.js, Loopback, MySQL, MongoDB & Angular

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

* [Component 1](https://console.bluemix.net/docs/containers/): Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
* [Component 2](https://www.ibm.com/us-en/marketplace/microclimate): Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
* [Component 3](https://www.ibm.com/cloud/watson-assistant/): Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam

## Featured technologies

* [Microservices](https://developer.ibm.com/technologies/microservices/): Collection of fine-grained, loosely coupled services using a lightweight protocol to provide building blocks in modern application composition in the cloud.
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Containers](https://developer.ibm.com/technologies/containers/): Virtual software objects that include all the elements that an app needs to run.
* [Databases](https://developer.ibm.com/technologies/databases/): Repository for storing and managing collections of data.
* [Hybrid Cloud](https://developer.ibm.com/depmodels/hybrid/): Enabling customers to draw on the capabilities of public cloud service providers while using private cloud deployment for sensitive applications and data.

## Watch the Video

[![](https://i.vimeocdn.com/video/825713314.webp?mw=1400&mh=787)](https://vimeo.com/368913922)

## Setup

You have multiple options to setup your own instance:

* [Run it locally](#run-locally)

## Run Locally

### 1. Clone the repo

Clone the `BIZspot App` repository locally. In a terminal, run:

```bash
$ git clone https://github.com/khalilmejri/bizspot.git
```

### 2. Create an Instance of MongoDB

This code pattern depends on MongoDB as a session and data store. From the [MongoDB Cloud catalog](https://cloud.ibm.com/catalog), find **Compose for MongoDB** and click create. Give it a name, choose a region, pick the standard pricing plan and click create.

**Get your mongo connection string. Almost all your microservices need it; keep it safe!**

### 3. Configure your environment variables
MongoDB
```bash
$ cp .env.example .env
```
### 4. Run

Finally, navigate to each microservice folder, and start it. Make sure you run the 3 microservice in 3 separate terminals.

```bash
$ npm start
```

You can now visit `localhost:3100` to access the portal
