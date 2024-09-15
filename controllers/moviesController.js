const Movie = require("../models/movie");

exports.create = async (req, res) => {
  const { name, category, description } = req.body;
  const movie = Movie({ name, category, description });
  await movie.save();
  res.json({
    success: true,
    data: movie,
  });
};

exports.find = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).select("-reviews");
    if (!movie) return res.status(404).send();
    res.json({
      success: true,
      data: movie,
    });
  } catch (e) {
    res.send(e);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  await Movie.updateOne(
    { _id: id },
    {
      $set: { name, category, description },
    }
  );
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Movie.deleteOne({ _id: id });
  res.json({ success: true });
};

exports.list = async (req, res) => {
  const page = req.query?.page || 1;
  const limit = 2;
  const skip = (page - 1) * limit;
  const movies = await Movie.find().select("-reviews").skip(skip).limit(limit);
  const total = await Movie.countDocuments();
  count = Math.ceil(total / limit);
  res.json({
    success: true,
    pages: count,
    data: movies,
  });
};

exports.reviwes = async (req, res) => {
  const {id} = req.params
  const movie = await Movie.findById(id).select('-reviews._id').populate('reviews.user', 'name')
  if(!movie) res.status(404).send()
  res.json({
    success: true, 
    data: movie.reviews
  });
};

exports.addReviwes = async (req, res) => {
  const { id } = req.params;
  const { comment, rate } = req.body;
  const movie = await Movie.findById(id);
  if (!movie) res.status(404).send();
  const isRated = movie.reviews.findIndex((m) => m.user == req.userId);
  if (isRated > -1){
    res.status(403).send({ message: "Review is already added" });
  }else{const totalRate = movie.reviews.reduce((sum, reviwe) => sum + reviwe.rate, 0);
  const finalRate = (totalRate + rate) / (movie.reviews.length + 1);

  await Movie.updateOne(
    { _id: id },
    {
      $push: {
        reviews: {
          user: req.userId,
          comment,
          rate,
        },
      },
      $set: { rate: finalRate },
    }
  );
  }
  res.status(201).json({
    success: true,
  });
};
