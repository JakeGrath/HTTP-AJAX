const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    name: 'Isabelle',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/2/26/Isabelle_AF.png',
    birthday: 'December 20th',
    species: 'Dog (Shih Tzu)',
  },
  {
    id: 2,
    name: 'Tom Nook',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/c/cf/TomNookNL.png',
    birthday: 'May 30th',
    species: 'Raccoon',
  },
  {
    id: 3,
    name: 'Gracie',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/c/cb/Gracie_NL.png',
    birthday: 'November 14th',
    species: 'Giraffe',
  },
  {
    id: 4,
    name: 'Ankha',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/6/68/Ankha_NewLeaf_Official.png',
    birthday: 'September 22nd',
    species: 'Cat',
  },
  {
    id: 5,
    name: 'Cyrus',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/1/19/Cyrus.png',
    birthday: 'January 26th',
    species: 'Alpaca',
  },
  {
    id: 6,
    name: 'Reese',
	image: 'https://vignette.wikia.nocookie.net/animalcrossing/images/8/84/Reese.png',
    birthday: 'July 5th',
    species: 'Alpaca',
  },
];

app.use(cors());
app.use(bodyParser.json());

app.get('/friends', (req, res) => {
  res.status(200).json(friends);
});

app.post('/friends', (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.put('/friends/:id', (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete('/friends/:id', (req, res) => {
	friends = friends.filter(friend => friend.id != req.params.id);
	res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
