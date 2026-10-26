/**
 * Kelvin Ikpeni Code Academy — MongoDB & Mongoose quiz
 * Targeted seed: replaces ONLY the mongodb-mongoose quiz.
 */
"use strict";

const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const mongoQuiz = {
  title: "MongoDB & Mongoose Final Quiz",
  description: "Test your understanding of MongoDB and Mongoose — documents, schemas, CRUD, queries, validation, indexes, relationships, and aggregation. 15 questions covering the full course.",
  passPercent: 70,
  questions: [
    {
      question: "What is MongoDB?",
      options: [
        "A relational database with strict tables",
        "A document-oriented NoSQL database",
        "A CSS framework",
        "A frontend library"
      ],
      correctIndex: 1,
      explanation: "MongoDB stores data as flexible JSON-like documents in collections — not rows in tables. This makes it great for varied or nested data."
    },
    {
      question: "In MongoDB, what is a 'collection'?",
      options: [
        "A single JSON object",
        "A group of related documents (like a table in SQL)",
        "A database backup",
        "A query result"
      ],
      correctIndex: 1,
      explanation: "A collection groups related documents. A database contains multiple collections. Documents live inside collections."
    },
    {
      question: "Why should the MongoDB connection string never be hardcoded in source code?",
      options: [
        "It slows down the app",
        "It contains credentials that would be exposed in Git",
        "It's not allowed by Node.js",
        "It only works with localhost"
      ],
      correctIndex: 1,
      explanation: "The connection string includes username and password. Committing it to Git exposes your database to anyone with repo access. Always use process.env.MONGODB_URI."
    },
    {
      question: "What is the role of Mongoose?",
      options: [
        "It's the MongoDB driver only",
        "It's an ODM (Object Data Modeling) library that adds schemas and validation on top of MongoDB",
        "It replaces MongoDB",
        "It only handles authentication"
      ],
      correctIndex: 1,
      explanation: "Mongoose sits between your Node.js code and MongoDB. It provides schemas, models, validation, and convenient query methods."
    },
    {
      question: "What is the difference between a Mongoose schema and a model?",
      options: [
        "They are identical",
        "A schema defines the document shape; a model is the compiled class used to query the collection",
        "A model is written in JSON, a schema in JS",
        "A schema only works with SQL"
      ],
      correctIndex: 1,
      explanation: "You define a schema first, then call mongoose.model('Name', schema) to get a model — the actual interface you use to create, read, update, and delete documents."
    },
    {
      question: "What does `User.create({...})` do?",
      options: [
        "Creates the schema",
        "Creates and saves a new document in the collection",
        "Only validates data without saving",
        "Deletes all users"
      ],
      correctIndex: 1,
      explanation: "Model.create() is a shorthand for `new Model({...}).save()`. It validates and inserts the new document in one step, returning it as a Promise."
    },
    {
      question: "Which method returns the UPDATED document after a find-and-update?",
      options: [
        "findByIdAndUpdate(id, { $set: {...} })",
        "findByIdAndUpdate(id, { $set: {...} }, { new: true })",
        "findByIdAndUpdate(id, { $set: {...} }, { upsert: true })",
        "findById(id).update()"
      ],
      correctIndex: 1,
      explanation: "By default findByIdAndUpdate returns the OLD document. Pass `{ new: true }` in options to get the updated version."
    },
    {
      question: "Which query finds all products priced between 100 and 500 (inclusive)?",
      options: [
        "Product.find({ price: 100 })",
        "Product.find({ price: { $gt: 100, $lt: 500 } })",
        "Product.find({ price: { $gte: 100, $lte: 500 } })",
        "Product.find({ price: [100, 500] })"
      ],
      correctIndex: 2,
      explanation: "$gte means greater than or equal, $lte means less than or equal. Combine them for a range. $gt/$lt would be exclusive."
    },
    {
      question: "How do you sort results by price ascending in Mongoose?",
      options: [
        ".orderBy('price')",
        ".sort({ price: 1 })",
        ".sort({ price: 'asc' })",
        ".order('price ASC')"
      ],
      correctIndex: 1,
      explanation: "MongoDB sorts with numeric direction: 1 for ascending, -1 for descending. `.sort({ price: -1 })` sorts descending."
    },
    {
      question: "What is the correct way to paginate results (page 2, 10 per page)?",
      options: [
        "Product.find().limit(10)",
        "Product.find().skip(20).limit(10)",
        "Product.find().skip(10).limit(20)",
        "Product.find().page(2).size(10)"
      ],
      correctIndex: 1,
      explanation: "Skip = (page - 1) × limit. For page 2, limit 10: skip = 10, so `.skip(10).limit(10)`. Option B skips 20 (page 3)."
    },
    {
      question: "What does `required: [true, 'Email is required']` do in a schema?",
      options: [
        "Makes the field optional",
        "Makes the field required with a custom error message",
        "Sets a default value",
        "Adds an index"
      ],
      correctIndex: 1,
      explanation: "The array form `[true, 'message']` sets the validator to true AND provides a custom error message when validation fails."
    },
    {
      question: "Does `unique: true` prevent duplicate values?",
      options: [
        "No, it's just documentation",
        "Yes — it creates a unique index at the database level",
        "Only in SQL databases",
        "Only for _id fields"
      ],
      correctIndex: 1,
      explanation: "`unique: true` creates a MongoDB unique index. Inserting a duplicate throws error code 11000. It's enforced by the DB, not Mongoose validation."
    },
    {
      question: "What is the primary purpose of an index?",
      options: [
        "To sort documents permanently",
        "To speed up queries on the indexed fields",
        "To encrypt data",
        "To enforce schema validation"
      ],
      correctIndex: 1,
      explanation: "An index lets MongoDB find matching documents without scanning the whole collection. Great for queries and sorts on frequently accessed fields."
    },
    {
      question: "What does `populate('author')` do in Mongoose?",
      options: [
        "Deletes the author field",
        "Fetches the referenced document(s) and replaces the ObjectId with the full document",
        "Creates a new author",
        "Validates the author field"
      ],
      correctIndex: 1,
      explanation: "When a field stores an ObjectId with a ref, populate() looks up the referenced collection and replaces the reference with the actual document(s)."
    },
    {
      question: "Which aggregation stage groups documents and computes aggregates?",
      options: ["$match", "$group", "$sort", "$project"],
      correctIndex: 1,
      explanation: "$group collects documents with the same value (defined by _id) and computes aggregates like $sum, $avg, $min, $max on them. $match filters; $sort orders; $project selects fields."
    }
  ]
};

async function seedMongoQuiz() {
  const course = await Course.findOne({ slug: "mongodb-mongoose" });
  if (!course) {
    console.warn("⚠  Course not found: mongodb-mongoose");
    return { created: 0, updated: 0 };
  }

  const slug = Quiz.slugify(mongoQuiz.title);
  const existing = await Quiz.findOne({ slug });
  const payload = {
    ...mongoQuiz,
    slug,
    course: course._id,
    published: true
  };

  let created = 0;
  let updated = 0;

  if (existing) {
    await Quiz.updateOne({ slug }, { $set: payload });
    updated = 1;
  } else {
    await Quiz.create(payload);
    created = 1;
  }

  console.log(`   MongoDB quiz: ${created} created, ${updated} updated (15 questions)`);
  return { created, updated };
}

module.exports = { seedMongoQuiz };