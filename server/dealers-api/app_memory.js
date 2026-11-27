const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8')).reviews;
const dealerships = JSON.parse(fs.readFileSync('data/dealerships.json', 'utf8')).dealerships;

app.get('/', (req, res) => {
  res.send('Welcome to the Dealerships API');
});

app.get('/fetchReviews', (req, res) => {
  res.json(reviews);
});

app.get('/fetchReviews/dealer/:id', (req, res) => {
  res.json(reviews.filter((r) => r.dealership === Number(req.params.id)));
});

app.get('/fetchDealers', (req, res) => {
  res.json(dealerships);
});

app.get('/fetchDealers/:state', (req, res) => {
  res.json(dealerships.filter((d) => d.state === req.params.state));
});

app.get('/fetchDealer/:id', (req, res) => {
  res.json(dealerships.filter((d) => d.id === Number(req.params.id)));
});

app.post('/insert_review', express.raw({ type: '*/*' }), (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const newId = reviews.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const review = {
      id: newId,
      name: data.name,
      dealership: Number(data.dealership),
      review: data.review,
      purchase: data.purchase,
      purchase_date: data.purchase_date,
      car_make: data.car_make,
      car_model: data.car_model,
      car_year: Number(data.car_year),
    };
    reviews.push(review);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});