# React Forms UI Demo

A demo app for [React Forms UI](https://github.com/ivos/react-forms-ui).

## 1. Demo

The [live demo](http://react-forms-ui.s3-website-us-east-1.amazonaws.com/app).

## 2. Setup

Execute:

	git clone https://github.com/ivos/react-forms-ui-demo.git
	cd react-forms-ui-demo
	npm install

## 3. Running

Execute:

	npm start

Navigate to [http://localhost:3000/app/](http://localhost:3000/app/).

## 4. Deploying

### 4.1 Setup

1. Create AWS S3 bucket to run the app from. Setup static website hosting on the bucket.

2. Execute:

		cp tools/config/template.json tools/config/production.json

3. Edit tools/config/production.json and set your AWS S3 details.


### 4.2 Build

Execute:

	npm run build

This builds the app in target/build and creates a zip file with deployment in target/.

### 4.3 Deploy

Execute:

	npm run deploy

This deploys the app runtime files into S3 bucket.

Navigate to URL defined by your AWS S3 bucket followed by /app/.
