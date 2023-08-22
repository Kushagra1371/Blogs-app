const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/article');
const MONGOURL = `mongodb://user:Kushagrayadav1371@ac-1agpynz-shard-00-00.isayqdh.mongodb.net:27017,ac-1agpynz-shard-00-01.isayqdh.mongodb.net:27017,ac-1agpynz-shard-00-02.isayqdh.mongodb.net:27017/?ssl=true&replicaSet=atlas-arqn8y-shard-0&authSource=admin&retryWrites=true&w=majority`;
const methodOverride = require('method-override');
const app = express();

(async () => {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
})();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/articles', articleRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
