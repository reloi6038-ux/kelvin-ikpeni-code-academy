/**
 * Kelvin Ikpeni Code Academy — MongoDB & Mongoose exercises
 * Targeted seed: adds 15 new MongoDB/Mongoose exercises. Preserves all others.
 */
"use strict";

const Exercise = require("../models/Exercise");
const Course = require("../models/Course");

const mongoExercises = [
  {
    title: "MongoDB: Define a Schema",
    slug: "mongo-define-schema",
    description: "<p>Create a Mongoose schema for a <code>Book</code> with fields: <code>title</code> (string, required), <code>author</code> (string, required), <code>year</code> (number).</p>",
    difficulty: "beginner",
    language: "node",
    topic: "schemas",
    starterJs: 'const mongoose = require("mongoose");\n\n// Define the schema here\n',
    solutionJs: `const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number }
});`,
    hints: ["Use <code>new mongoose.Schema({...})</code>.", "Set required: true for title and author."],
    testCases: [
      { description: "Uses mongoose.Schema", pattern: "new\\s+mongoose\\.Schema" },
      { description: "Defines title field", pattern: "title\\s*:" },
      { description: "Title is required", pattern: "title[^}]*required\\s*:\\s*true" },
      { description: "Defines year as Number", pattern: "year[^}]*Number" }
    ],
    points: 20,
    order: 120
  },
  {
    title: "MongoDB: Create a Model",
    slug: "mongo-create-model",
    description: "<p>Export a Mongoose model named <code>Book</code> using the schema from the previous exercise.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "models",
    starterJs: 'const mongoose = require("mongoose");\nconst bookSchema = new mongoose.Schema({\n  title: String\n});\n\n// Export the Book model\n',
    solutionJs: `const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Book", bookSchema);`,
    hints: ["Use <code>mongoose.model('Name', schema)</code>.", "Model name is singular and capitalized."],
    testCases: [
      { description: "Uses mongoose.model", pattern: "mongoose\\.model\\(" },
      { description: "Model is named Book", pattern: "[\"']Book[\"']" },
      { description: "Passes the schema", pattern: "bookSchema" }
    ],
    points: 15,
    order: 121
  },
  {
    title: "MongoDB: Create Document",
    slug: "mongo-create-document",
    description: "<p>Use <code>Book.create()</code> to create a book with title 'Clean Code' and author 'Robert Martin'.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "crud",
    starterJs: 'const Book = require("./models/Book");\n\n// Create a new book\n',
    solutionJs: `const Book = require("./models/Book");

await Book.create({ title: "Clean Code", author: "Robert Martin" });`,
    hints: ["Use <code>Book.create({...})</code>.", "Wrap in an async function if needed."],
    testCases: [
      { description: "Uses Book.create", pattern: "Book\\.create\\(" },
      { description: "Sets title 'Clean Code'", expectText: "Clean Code" },
      { description: "Sets author 'Robert Martin'", expectText: "Robert Martin" }
    ],
    points: 15,
    order: 122
  },
  {
    title: "MongoDB: Find Documents",
    slug: "mongo-find-documents",
    description: "<p>Find all books where <code>author</code> equals 'Robert Martin'.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "crud",
    starterJs: 'const Book = require("./models/Book");\n\n// Find books by author\n',
    solutionJs: `const Book = require("./models/Book");

const books = await Book.find({ author: "Robert Martin" });`,
    hints: ["Use <code>Book.find({...})</code>.", "Pass an object with the filter."],
    testCases: [
      { description: "Uses Book.find", pattern: "Book\\.find\\(" },
      { description: "Filters by author", pattern: "author\\s*:\\s*[\"']Robert Martin[\"']" }
    ],
    points: 15,
    order: 123
  },
  {
    title: "MongoDB: Find by ID",
    slug: "mongo-find-by-id",
    description: "<p>Find a book by its <code>_id</code> using <code>findById</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "crud",
    starterJs: 'const Book = require("./models/Book");\n\n// Find book by ID\n',
    solutionJs: `const Book = require("./models/Book");

const book = await Book.findById(id);`,
    hints: ["Use <code>Book.findById(id)</code>.", "Returns null if not found."],
    testCases: [
      { description: "Uses Book.findById", pattern: "Book\\.findById\\(" }
    ],
    points: 10,
    order: 124
  },
  {
    title: "MongoDB: Update Document",
    slug: "mongo-update-document",
    description: "<p>Update a book by ID, setting <code>year</code> to 2008. Use <code>findByIdAndUpdate</code> with <code>new: true</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "crud",
    starterJs: 'const Book = require("./models/Book");\n\n// Update year by ID\n',
    solutionJs: `const Book = require("./models/Book");

const book = await Book.findByIdAndUpdate(
  id,
  { year: 2008 },
  { new: true }
);`,
    hints: ["Use <code>findByIdAndUpdate(id, update, options)</code>.", "Pass <code>{ new: true }</code> to return the updated doc."],
    testCases: [
      { description: "Uses findByIdAndUpdate", pattern: "findByIdAndUpdate" },
      { description: "Sets year to 2008", pattern: "year\\s*:\\s*2008" },
      { description: "Passes new: true", pattern: "new\\s*:\\s*true" }
    ],
    points: 20,
    order: 125
  },
  {
    title: "MongoDB: Delete Document",
    slug: "mongo-delete-document",
    description: "<p>Delete a book by ID using <code>findByIdAndDelete</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "crud",
    starterJs: 'const Book = require("./models/Book");\n\n// Delete book by ID\n',
    solutionJs: `const Book = require("./models/Book");

await Book.findByIdAndDelete(id);`,
    hints: ["Use <code>findByIdAndDelete(id)</code>."],
    testCases: [
      { description: "Uses findByIdAndDelete", pattern: "findByIdAndDelete" }
    ],
    points: 10,
    order: 126
  },
  {
    title: "MongoDB: Query with Operators",
    slug: "mongo-query-operators",
    description: "<p>Find all books published after 2000 (using the <code>$gt</code> operator on <code>year</code>).</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "queries",
    starterJs: 'const Book = require("./models/Book");\n\n// Find books published after 2000\n',
    solutionJs: `const Book = require("./models/Book");

const books = await Book.find({ year: { $gt: 2000 } });`,
    hints: ["Use <code>{ year: { $gt: 2000 } }</code>.", "$gt means greater than."],
    testCases: [
      { description: "Uses Book.find", pattern: "Book\\.find\\(" },
      { description: "Uses $gt", pattern: "\\$gt" },
      { description: "Compares against 2000", pattern: "2000" }
    ],
    points: 20,
    order: 127
  },
  {
    title: "MongoDB: Sort and Limit",
    slug: "mongo-sort-limit",
    description: "<p>Find the 5 newest books (sort by <code>year</code> descending, limit to 5).</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "queries",
    starterJs: 'const Book = require("./models/Book");\n\n// Find 5 newest books\n',
    solutionJs: `const Book = require("./models/Book");

const books = await Book.find().sort({ year: -1 }).limit(5);`,
    hints: ["Chain <code>.sort({ year: -1 })</code>.", "Chain <code>.limit(5)</code>."],
    testCases: [
      { description: "Uses .sort", pattern: "\\.sort\\(" },
      { description: "Sorts year descending", pattern: "year\\s*:\\s*-1" },
      { description: "Uses .limit(5)", pattern: "\\.limit\\(\\s*5\\s*\\)" }
    ],
    points: 20,
    order: 128
  },
  {
    title: "MongoDB: Pagination",
    slug: "mongo-pagination",
    description: "<p>Implement pagination: fetch page 2 of results, 10 per page. Use <code>.skip()</code> and <code>.limit()</code>.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "queries",
    starterJs: 'const Book = require("./models/Book");\nconst page = 2;\nconst limit = 10;\n\n// Fetch page 2\n',
    solutionJs: `const Book = require("./models/Book");
const page = 2;
const limit = 10;

const books = await Book.find()
  .skip((page - 1) * limit)
  .limit(limit);`,
    hints: ["Skip = (page - 1) * limit.", "Chain <code>.skip(n)</code> and <code>.limit(n)</code>."],
    testCases: [
      { description: "Uses .skip", pattern: "\\.skip\\(" },
      { description: "Uses .limit", pattern: "\\.limit\\(" },
      { description: "Computes (page - 1) * limit", pattern: "\\(\\s*page\\s*-\\s*1\\s*\\)\\s*\\*\\s*limit" }
    ],
    points: 25,
    order: 129
  },
  {
    title: "MongoDB: Required Validation",
    slug: "mongo-required-validation",
    description: "<p>Add <code>required: true</code> with a custom error message to the <code>email</code> field.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "validation",
    starterJs: 'const userSchema = new mongoose.Schema({\n  email: { type: String }\n});\n\n// Add required validation\n',
    solutionJs: `const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"]
  }
});`,
    hints: ["Use <code>required: [true, 'message']</code>.", "Array format lets you provide a custom message."],
    testCases: [
      { description: "Sets required", pattern: "required\\s*:" },
      { description: "Uses array syntax with message", pattern: "required\\s*:\\s*\\[" },
      { description: "Includes error message", pattern: "Email is required|required[^\\]]*[\"']" }
    ],
    points: 20,
    order: 130
  },
  {
    title: "MongoDB: Enum Validation",
    slug: "mongo-enum-validation",
    description: "<p>Add an <code>enum</code> validator to a <code>role</code> field allowing only <code>'student'</code> or <code>'admin'</code>.</p>",
    difficulty: "beginner",
    language: "node",
    topic: "validation",
    starterJs: 'const userSchema = new mongoose.Schema({\n  role: { type: String }\n});\n\n// Add enum validation\n',
    solutionJs: `const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["student", "admin"]
  }
});`,
    hints: ["Use <code>enum: [...]</code>.", "Values are case-sensitive."],
    testCases: [
      { description: "Uses enum", pattern: "enum\\s*:" },
      { description: "Allows student", expectText: "student" },
      { description: "Allows admin", expectText: "admin" }
    ],
    points: 20,
    order: 131
  },
  {
    title: "MongoDB: Reference Another Model",
    slug: "mongo-reference-model",
    description: "<p>Add an <code>author</code> field to a Post schema that references the User model using ObjectId.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "relationships",
    starterJs: 'const postSchema = new mongoose.Schema({\n  title: String\n});\n\n// Add author reference\n',
    solutionJs: `const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});`,
    hints: ["Use <code>mongoose.Schema.Types.ObjectId</code>.", "Set <code>ref: 'User'</code>."],
    testCases: [
      { description: "Uses ObjectId type", pattern: "ObjectId" },
      { description: "Sets ref: 'User'", pattern: "ref\\s*:\\s*[\"']User[\"']" }
    ],
    points: 25,
    order: 132
  },
  {
    title: "MongoDB: Populate",
    slug: "mongo-populate",
    description: "<p>Find all posts and populate the <code>author</code> field to include the author's name and email.</p>",
    difficulty: "intermediate",
    language: "node",
    topic: "relationships",
    starterJs: 'const Post = require("./models/Post");\n\n// Find posts and populate author\n',
    solutionJs: `const Post = require("./models/Post");

const posts = await Post.find().populate("author", "name email");`,
    hints: ["Use <code>.populate('author')</code>.", "Pass a second arg to select specific fields."],
    testCases: [
      { description: "Uses .populate", pattern: "\\.populate\\(" },
      { description: "Populates author", pattern: "populate\\(\\s*[\"']author[\"']" },
      { description: "Selects name and email", pattern: "[\"']name email[\"']|name\\s+email" }
    ],
    points: 25,
    order: 133
  },
  {
    title: "MongoDB: Aggregation Group",
    slug: "mongo-aggregation-group",
    description: "<p>Write an aggregation that groups books by <code>genre</code> and counts how many are in each genre.</p>",
    difficulty: "advanced",
    language: "node",
    topic: "aggregation",
    starterJs: 'const Book = require("./models/Book");\n\n// Group by genre and count\n',
    solutionJs: `const Book = require("./models/Book");

const result = await Book.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
]);`,
    hints: ["Use <code>Book.aggregate([...])</code>.", "Use <code>$group</code> with <code>_id: '$genre'</code>.", "Use <code>$sum: 1</code> to count."],
    testCases: [
      { description: "Uses .aggregate", pattern: "\\.aggregate\\(" },
      { description: "Uses $group", pattern: "\\$group" },
      { description: "Groups by genre", pattern: "\\$genre" },
      { description: "Uses $sum: 1", pattern: "\\$sum\\s*:\\s*1" }
    ],
    points: 30,
    order: 134
  }
];

async function seedMongoExercises() {
  const course = await Course.findOne({ slug: "mongodb-mongoose" });
  if (!course) {
    console.warn("⚠  Course not found: mongodb-mongoose");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const ex of mongoExercises) {
    const slug = ex.slug;
    const existing = await Exercise.findOne({ slug });
    const payload = { ...ex, slug, course: course._id };

    if (existing) {
      await Exercise.updateOne({ slug }, { $set: payload });
      updated++;
    } else {
      await Exercise.create(payload);
      created++;
    }
  }

  console.log(`   MongoDB exercises: ${created} created, ${updated} updated`);
  return { created, updated };
}

module.exports = { seedMongoExercises };