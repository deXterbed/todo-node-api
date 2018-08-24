const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/notes', (req, res) => {
    db.collection('notes').find({}).toArray((err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    db.collection('notes').findOne({'_id': new ObjectID(req.params.id)}, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    db.collection('notes').update({'_id': new ObjectID(req.params.id)}, { text: req.body.body, title: req.body.title }, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    db.collection('notes').remove({'_id': new ObjectID(req.params.id)}, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send('Note ' + req.params.id + ' deleted!');
      }
    });
  });
};