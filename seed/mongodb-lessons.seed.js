/**
 * Kelvin Ikpeni Code Academy — MongoDB & Mongoose lessons
 * Targeted seed: updates ONLY the "mongodb-mongoose" course.
 */
"use strict";

const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const mongoLessons = [
  {
    title: "Introduction to MongoDB and NoSQL",
    contentHtml: `
      <h2>What is a database?</h2>
      <p>A <strong>database</strong> stores data persistently so it survives server restarts. Web apps use databases to store users, courses, orders, posts — anything that must outlive a single request.</p>
      <p>Two main families:</p>
      <ul>
        <li><strong>Relational</strong> (PostgreSQL, MySQL) — data in tables with strict rows and columns</li>
        <li><strong>NoSQL</strong> (MongoDB, Firebase) — data in flexible documents</li>
      </ul>

      <h2>What is MongoDB?</h2>
      <p><strong>MongoDB</strong> is a document-oriented NoSQL database. Instead of tables and rows, it stores <strong>documents</strong> in <strong>collections</strong>.</p>
      <ul>
        <li><strong>Database</strong> — a named container of collections</li>
        <li><strong>Collection</strong> — a group of related documents (like a table)</li>
        <li><strong>Document</strong> — a JSON-like object (like a row, but flexible)</li>
      </ul>

      <h2>Documents</h2>
      <p>A MongoDB document is a BSON object — a binary form of JSON:</p>
      <pre><code class="language-javascript">{
  "_id": ObjectId("650a..."),
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30,
  "roles": ["admin", "editor"],
  "address": {
    "city": "Lagos",
    "country": "Nigeria"
  },
  "createdAt": ISODate("2026-11-01T12:00:00Z")
}</code></pre>
      <p>Notice: documents can nest. An address is embedded. Roles are an array. This is normal in MongoDB.</p>

      <h2>NoSQL vs SQL</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid var(--color-border);">
          <th style="text-align:left;padding:8px;">Feature</th>
          <th style="text-align:left;padding:8px;">SQL</th>
          <th style="text-align:left;padding:8px;">MongoDB</th>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Structure</td>
          <td style="padding:8px;">Tables + rows</td>
          <td style="padding:8px;">Collections + documents</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Schema</td>
          <td style="padding:8px;">Strict, enforced</td>
          <td style="padding:8px;">Flexible (schema optional, or via Mongoose)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--color-border);">
          <td style="padding:8px;">Relationships</td>
          <td style="padding:8px;">Foreign keys + JOINs</td>
          <td style="padding:8px;">Embedded docs or references + populate</td>
        </tr>
        <tr>
          <td style="padding:8px;">Scaling</td>
          <td style="padding:8px;">Vertical (bigger server)</td>
          <td style="padding:8px;">Horizontal (more servers)</td>
        </tr>
      </table>

      <h2>When to use MongoDB</h2>
      <p>MongoDB shines when:</p>
      <ul>
        <li>Data shapes vary between records (e.g., different product categories)</li>
        <li>You have deeply nested data (e.g., a blog post with comments, tags, and metadata)</li>
        <li>You need horizontal scaling</li>
        <li>You want to move fast without migrations</li>
      </ul>
      <p>SQL shines when:</p>
      <ul>
        <li>Data is highly relational with strict integrity</li>
        <li>You need complex joins and transactions</li>
        <li>Schema stability matters (financial systems)</li>
      </ul>

      <h2>Your turn</h2>
      <p>Design document structures for:</p>
      <ul>
        <li><strong>users</strong> — name, email, role, createdAt</li>
        <li><strong>products</strong> — name, price, category, inStock, tags</li>
        <li><strong>posts</strong> — title, content, author, published, createdAt</li>
      </ul>
      <p>Write the shapes as JavaScript objects.</p>
    `,
    estimatedMinutes: 30,
    learningObjectives: [
      "Explain databases, collections, documents",
      "Compare SQL and NoSQL",
      "Design flexible document structures"
    ]
  },
  {
    title: "Setting Up MongoDB and Connecting to a Database",
    contentHtml: `
      <h2>Two ways to run MongoDB</h2>
      <ul>
        <li><strong>Locally</strong> — install MongoDB on your machine (great for development)</li>
        <li><strong>MongoDB Atlas</strong> — managed cloud database (recommended for production)</li>
      </ul>

      <h2>Setting up Atlas</h2>
      <ol>
        <li>Sign up at <strong>cloud.mongodb.com</strong></li>
        <li>Create a free M0 cluster</li>
        <li>Create a database user with a strong password</li>
        <li>Whitelist IP addresses (for local dev: <code>0.0.0.0/0</code>)</li>
        <li>Copy the connection string:
          <pre><code class="language-bash">mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/kica?retryWrites=true&amp;w=majority</code></pre>
        </li>
      </ol>

      <h2>Connection string anatomy</h2>
      <pre><code>mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?OPTIONS</code></pre>
      <ul>
        <li><strong>mongodb+srv</strong> — protocol (SRV discovers cluster nodes automatically)</li>
        <li><strong>USERNAME:PASSWORD</strong> — database user credentials</li>
        <li><strong>CLUSTER.mongodb.net</strong> — cluster hostname</li>
        <li><strong>DATABASE</strong> — the database name</li>
        <li><strong>OPTIONS</strong> — <code>retryWrites</code>, <code>w=majority</code> for reliability</li>
      </ul>

      <h2>Never hardcode credentials</h2>
      <pre><code class="language-javascript">// BAD — password in source
const uri = "mongodb+srv://user:pass@cluster.mongodb.net/kica";

// GOOD — from environment
const uri = process.env.MONGODB_URI;</code></pre>
      <p>Locally, set it in <code>.env</code> (never committed). In production, set it in Render's dashboard.</p>
      <pre><code class="language-bash"># .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kica</code></pre>
      <pre><code class="language-javascript">require("dotenv").config();</code></pre>

      <h2>Connecting with Mongoose</h2>
      <pre><code class="language-javascript">// config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };</code></pre>

      <h2>Using it in server.js</h2>
      <pre><code class="language-javascript">require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

async function main() {
  await connectDB();

  const app = express();
  app.use(express.json());

  app.listen(3000, () => console.log("http://localhost:3000"));
}

main();</code></pre>

      <h2>Connection events</h2>
      <pre><code class="language-javascript">mongoose.connection.on("connected", () => console.log("DB connected"));
mongoose.connection.on("disconnected", () => console.warn("DB disconnected"));
mongoose.connection.on("error", (err) => console.error("DB error:", err.message));</code></pre>

      <h2>Checking connection status</h2>
      <pre><code class="language-javascript">function isConnected() {
  return mongoose.connection.readyState === 1;
}

// Ready states:
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting</code></pre>

      <h2>Graceful shutdown</h2>
      <pre><code class="language-javascript">process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("DB closed");
  process.exit(0);
});</code></pre>

      <h2>Your turn</h2>
      <p>Create <code>config/db.js</code> with:</p>
      <ul>
        <li>A connection using <code>process.env.MONGODB_URI</code></li>
        <li>Retry logic on failure (2 retries with delay)</li>
        <li>A log on success</li>
      </ul>
    `,
    estimatedMinutes: 35,
    learningObjectives: [
      "Set up MongoDB Atlas",
      "Parse a connection string",
      "Connect with Mongoose safely using env vars"
    ]
  },
  {
    title: "Mongoose Schemas and Models",
    contentHtml: `
      <h2>What is Mongoose?</h2>
      <p><strong>Mongoose</strong> is an ODM (Object Data Modeling) library for MongoDB. It adds structure, validation, and convenience methods on top of the raw MongoDB driver.</p>
      <p>Without Mongoose, you'd write raw MongoDB queries. With Mongoose, you define <strong>schemas</strong> and interact with <strong>models</strong>.</p>

      <h2>Schema vs Model</h2>
      <ul>
        <li><strong>Schema</strong> — defines the shape of documents (fields, types, validation)</li>
        <li><strong>Model</strong> — a class created from a schema; used to query the collection</li>
      </ul>

      <h2>Your first schema</h2>
      <pre><code class="language-javascript">// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);</code></pre>
      <p>By convention, the model name is singular and capitalized. Mongoose creates a collection with the pluralized lowercase name — <code>"User"</code> becomes the <code>users</code> collection.</p>

      <h2>Common field types</h2>
      <ul>
        <li><code>String</code>, <code>Number</code>, <code>Boolean</code>, <code>Date</code></li>
        <li><code>Buffer</code> — binary data</li>
        <li><code>ObjectId</code> — reference to another document</li>
        <li><code>Array</code> — <code>[String]</code>, <code>[Number]</code>, <code>[ObjectId]</code></li>
        <li><code>Mixed</code> — anything (avoid)</li>
      </ul>

      <h2>Field options</h2>
      <pre><code class="language-javascript">{
  type: String,
  required: [true, "Name is required"],   // custom error message
  unique: true,                            // unique index
  lowercase: true,                         // auto-lowercase
  trim: true,                              // strip whitespace
  minlength: 2,
  maxlength: 80,
  default: "Unknown"
}</code></pre>

      <h2>Timestamps</h2>
      <p>Instead of manually managing createdAt/updatedAt:</p>
      <pre><code class="language-javascript">const userSchema = new mongoose.Schema({ ... }, {
  timestamps: true
});
// adds createdAt and updatedAt automatically</code></pre>

      <h2>Complete realistic schema</h2>
      <pre><code class="language-javascript">const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Invalid email"]
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);</code></pre>

      <h2>Hiding sensitive fields</h2>
      <pre><code class="language-javascript">passwordHash: {
  type: String,
  required: true,
  select: false   // exclude from queries by default
}</code></pre>
      <p>Use <code>.select("+passwordHash")</code> when you actually need it.</p>

      <h2>Virtuals</h2>
      <pre><code class="language-javascript">userSchema.virtual("initials").get(function () {
  return this.name.split(" ").map(w => w[0]).join("").toUpperCase();
});</code></pre>

      <h2>Indexes</h2>
      <pre><code class="language-javascript">userSchema.index({ email: 1 });
userSchema.index({ role: 1, createdAt: -1 });</code></pre>

      <h2>Your turn</h2>
      <p>Create a <code>Product</code> model with:</p>
      <ul>
        <li><code>name</code> (string, required, 2-100 chars)</li>
        <li><code>price</code> (number, required, min 0)</li>
        <li><code>category</code> (string, enum: electronics, clothing, food)</li>
        <li><code>inStock</code> (boolean, default true)</li>
        <li><code>tags</code> (array of strings)</li>
        <li>Timestamps</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Explain the difference between schemas and models",
      "Define fields with types, validation, and defaults",
      "Use timestamps, virtuals, and indexes"
    ]
  },
  {
    title: "CRUD Operations with MongoDB and Mongoose",
    contentHtml: `
      <h2>CRUD</h2>
      <p>CRUD is the foundation of any database app: <strong>Create</strong>, <strong>Read</strong>, <strong>Update</strong>, <strong>Delete</strong>.</p>

      <h2>Create — new document</h2>
      <pre><code class="language-javascript">const user = await User.create({
  name: "Alice",
  email: "alice@example.com"
});
console.log(user._id);</code></pre>
      <p><code>User.create()</code> returns the new document. Alternative:</p>
      <pre><code class="language-javascript">const user = new User({ name: "Alice", email: "alice@example.com" });
await user.save();</code></pre>

      <h2>Read — find documents</h2>
      <pre><code class="language-javascript">// All documents
const users = await User.find();

// With a filter
const admins = await User.find({ role: "admin" });

// One document (null if not found)
const user = await User.findOne({ email: "alice@example.com" });

// By _id (null if not found)
const user = await User.findById("650a...");

// Count
const total = await User.countDocuments({ role: "student" });

// Exists (boolean)
const exists = await User.exists({ email: "alice@example.com" });</code></pre>

      <h2>Update — modify documents</h2>
      <pre><code class="language-javascript">// Update one — returns result object
await User.updateOne(
  { email: "alice@example.com" },
  { $set: { role: "admin" } }
);

// Update and return the updated doc
const user = await User.findByIdAndUpdate(
  "650a...",
  { $set: { role: "admin" } },
  { new: true }   // returns the UPDATED document
);

// Atomically increment a field
await Post.updateOne({ _id: id }, { $inc: { views: 1 } });

// Push to array
await Post.updateOne({ _id: id }, { $push: { tags: "new-tag" } });

// Pull from array
await Post.updateOne({ _id: id }, { $pull: { tags: "old-tag" } });</code></pre>

      <h2>Update operators</h2>
      <ul>
        <li><code>$set</code> — set a field</li>
        <li><code>$unset</code> — remove a field</li>
        <li><code>$inc</code> — increment a number</li>
        <li><code>$push</code> — add to array</li>
        <li><code>$pull</code> — remove from array</li>
        <li><code>$addToSet</code> — add if not already present</li>
      </ul>

      <h2>Delete — remove documents</h2>
      <pre><code class="language-javascript">// Delete one
const result = await User.deleteOne({ email: "alice@example.com" });
console.log(result.deletedCount);   // 1

// Delete and return the deleted doc
const deleted = await User.findByIdAndDelete("650a...");

// Delete all matching
await User.deleteMany({ role: "guest" });</code></pre>

      <h2>Complete CRUD example</h2>
      <pre><code class="language-javascript">// Create
const product = await Product.create({
  name: "Laptop",
  price: 999,
  category: "electronics"
});

// Read
const products = await Product.find({ category: "electronics" });

// Update
const updated = await Product.findByIdAndUpdate(
  product._id,
  { price: 899 },
  { new: true, runValidators: true }
);

// Delete
await Product.findByIdAndDelete(product._id);</code></pre>

      <h2>Handling not-found</h2>
      <pre><code class="language-javascript">const user = await User.findById(id);
if (!user) {
  return res.status(404).json({ error: "User not found" });
}</code></pre>

      <h2>Your turn</h2>
      <p>Write functions that:</p>
      <ul>
        <li>Create a product</li>
        <li>List all products in a category</li>
        <li>Update a product's price</li>
        <li>Delete a product by ID</li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Create, read, update, and delete documents",
      "Use update operators like $set and $inc",
      "Handle not-found cases"
    ]
  },
  {
    title: "Querying, Filtering, Sorting, and Pagination",
    contentHtml: `
      <h2>Query filters</h2>
      <p><code>.find({...})</code> accepts a query object that filters results:</p>
      <pre><code class="language-javascript">await User.find({ role: "admin" });
await Product.find({ category: "electronics", inStock: true });
await Post.find({ author: "650a..." });</code></pre>

      <h2>Comparison operators</h2>
      <pre><code class="language-javascript">// $gt, $gte, $lt, $lte, $ne
await Product.find({ price: { $gte: 100, $lte: 500 } });
await Product.find({ price: { $gt: 999 } });
await User.find({ role: { $ne: "admin" } });

// $in, $nin
await User.find({ role: { $in: ["admin", "moderator"] } });

// $exists
await User.find({ avatar: { $exists: true } });</code></pre>

      <h2>Logical operators</h2>
      <pre><code class="language-javascript">await Product.find({
  $or: [{ category: "electronics" }, { price: { $lt: 50 } }]
});

await Product.find({
  $and: [{ inStock: true }, { price: { $gt: 100 } }]
});

await Product.find({
  $nor: [{ category: "clothing" }, { category: "food" }]
});</code></pre>

      <h2>Regular expression search</h2>
      <pre><code class="language-javascript">await Product.find({ name: /laptop/i });
await Post.find({ title: new RegExp(keyword, "i") });</code></pre>

      <h2>Projections — return only some fields</h2>
      <pre><code class="language-javascript">// Include only name and price (plus _id by default)
await Product.find({}, { name: 1, price: 1 });

// Exclude passwordHash
await User.find({}, { passwordHash: 0 });

// Explicitly exclude _id
await Product.find({}, { name: 1, price: 1, _id: 0 });</code></pre>

      <h2>Sorting</h2>
      <pre><code class="language-javascript">await Product.find().sort({ price: 1 });     // ascending
await Product.find().sort({ price: -1 });    // descending
await Post.find().sort({ createdAt: -1 });   // newest first
await Product.find().sort({ category: 1, price: -1 });  // multi-field</code></pre>

      <h2>Limiting and pagination</h2>
      <pre><code class="language-javascript">const page = 1;
const limit = 20;
const skip = (page - 1) * limit;

const products = await Product.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

const total = await Product.countDocuments();
const totalPages = Math.ceil(total / limit);</code></pre>

      <h2>Combining everything</h2>
      <pre><code class="language-javascript">async function getProducts({ category, minPrice, maxPrice, q, sort, page = 1, limit = 20 }) {
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (q) filter.name = new RegExp(q, "i");

  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "newest": { createdAt: -1 }
  };

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(sortMap[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter)
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}</code></pre>

      <h2>Your turn</h2>
      <p>Write a function that:</p>
      <ul>
        <li>Filters products by category</li>
        <li>Filters by min/max price</li>
        <li>Sorts by price ascending</li>
        <li>Returns 10 per page</li>
        <li>Includes total count</li>
      </ul>
    `,
    estimatedMinutes: 45,
    learningObjectives: [
      "Filter with comparison and logical operators",
      "Sort, limit, and paginate results",
      "Use projections to return only needed fields"
    ]
  },
  {
    title: "Schema Validation and Data Integrity",
    contentHtml: `
      <h2>Why validate?</h2>
      <p>Client-side validation can be bypassed. Request validation in Express catches most bad input. But schema validation at the <strong>database layer</strong> is your final safety net — it protects against bugs, direct DB access, and stale application code.</p>

      <h2>Built-in validators</h2>
      <pre><code class="language-javascript">const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be 2+ characters"],
    maxlength: 80
  },
  age: {
    type: Number,
    min: [13, "Must be 13 or older"],
    max: 120
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Invalid email"]
  },
  role: {
    type: String,
    enum: {
      values: ["student", "admin"],
      message: "{VALUE} is not a valid role"
    },
    default: "student"
  }
});</code></pre>

      <h2>Custom validators</h2>
      <pre><code class="language-javascript">const userSchema = new mongoose.Schema({
  password: {
    type: String,
    validate: {
      validator: (v) => v.length >= 8,
      message: "Password must be 8+ characters"
    }
  }
});

// Async validator
const usernameSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: async (v) => {
        const exists = await User.exists({ username: v });
        return !exists;
      },
      message: "Username taken"
    }
  }
});</code></pre>

      <h2>Unique is NOT a validator</h2>
      <p><code>unique: true</code> creates a database index — it does NOT run through Mongoose validation. It throws a specific error code <code>11000</code>:</p>
      <pre><code class="language-javascript">try {
  await User.create({ email: "existing@example.com" });
} catch (err) {
  if (err.code === 11000) {
    console.log("Email already exists");
  }
}</code></pre>

      <h2>Validation errors</h2>
      <pre><code class="language-javascript">try {
  await User.create({ name: "", age: 10 });
} catch (err) {
  if (err.name === "ValidationError") {
    console.log(err.errors);
    // {
    //   name: { message: "Name must be 2+ characters" },
    //   age: { message: "Must be 13 or older" }
    // }
  }
}</code></pre>

      <h2>runValidators on update</h2>
      <p>By default, <code>updateOne</code> skips validation. Pass <code>{ runValidators: true }</code>:</p>
      <pre><code class="language-javascript">await User.updateOne(
  { _id: id },
  { $set: { role: "invalid" } },
  { runValidators: true }
);</code></pre>

      <h2>Express + Mongoose validation</h2>
      <pre><code class="language-javascript">app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: Object.fromEntries(
          Object.entries(err.errors).map(([k, v]) => [k, v.message])
        )
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Email already in use"
      });
    }
    res.status(500).json({ status: "error", message: "Server error" });
  }
});</code></pre>

      <h2>Three-layer validation</h2>
      <ol>
        <li><strong>Client</strong> — UX (fast feedback)</li>
        <li><strong>Request</strong> — API validation in Express (rejects malformed data)</li>
        <li><strong>Schema</strong> — database layer (final guarantee)</li>
      </ol>
      <p>All three are important. None replaces the other.</p>

      <h2>Your turn</h2>
      <p>Add to a <code>Student</code> schema:</p>
      <ul>
        <li><code>email</code> — required, valid format, unique</li>
        <li><code>name</code> — required, 2+ chars</li>
        <li><code>role</code> — must be "student" or "prefect"</li>
        <li>Custom error messages for each</li>
      </ul>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Use built-in validators: required, enum, min, max, match",
      "Write custom validators",
      "Handle ValidationError and duplicate key errors"
    ]
  },
  {
    title: "Indexes and Query Performance",
    contentHtml: `
      <h2>What is an index?</h2>
      <p>An <strong>index</strong> is a data structure MongoDB keeps alongside your documents to make queries fast. Without an index, MongoDB scans every document in the collection — fine for 100 docs, catastrophic for 1 million.</p>

      <h2>Analogy</h2>
      <p>Think of a book. Without an index, finding "TLS" means reading every page. With the index at the back, you jump straight to page 142. MongoDB indexes work the same way — but on fields.</p>

      <h2>Single-field indexes</h2>
      <pre><code class="language-javascript">// In schema
userSchema.index({ email: 1 });

// Or programmatically
await User.collection.createIndex({ email: 1 });</code></pre>

      <h2>Compound indexes</h2>
      <p>Index multiple fields together:</p>
      <pre><code class="language-javascript">orderSchema.index({ customerId: 1, createdAt: -1 });</code></pre>
      <p>This helps queries like <code>find({ customerId: X }).sort({ createdAt: -1 })</code>.</p>

      <h2>Unique indexes</h2>
      <pre><code class="language-javascript">email: { type: String, unique: true }</code></pre>
      <p>Enforces uniqueness at the DB level. Duplicates fail with error code 11000.</p>

      <h2>Text indexes (full-text search)</h2>
      <pre><code class="language-javascript">postSchema.index({ title: "text", content: "text" });

await Post.find({ $text: { $search: "javascript async" } });</code></pre>
      <p>Enables fast full-text search across fields.</p>

      <h2>When indexes hurt</h2>
      <p>Every write (create/update/delete) must update the index. Too many indexes on write-heavy collections slow down inserts.</p>
      <p><strong>Rule</strong>: index fields you frequently query, filter, or sort by. Don't index everything.</p>

      <h2>explain() — inspect queries</h2>
      <pre><code class="language-javascript">const plan = await User.find({ email: "alice@example.com" }).explain("executionStats");
console.log(plan.executionStats);
// {
//   totalDocsExamined: 1,        ← with index
//   executionTimeMillis: 2,
//   ...
// }</code></pre>
      <p>Key metrics:</p>
      <ul>
        <li><strong>totalDocsExamined</strong> — how many docs MongoDB read</li>
        <li><strong>totalKeysExamined</strong> — how many index keys it checked</li>
        <li><strong>executionTimeMillis</strong> — how long it took</li>
        <li><strong>COLLSCAN</strong> — full collection scan (bad!)</li>
        <li><strong>IXSCAN</strong> — index scan (good)</li>
      </ul>

      <h2>Before/after comparison</h2>
      <pre><code class="language-javascript">// Before index
await Product.find({ category: "electronics" }).explain("executionStats");
// totalDocsExamined: 50000, stage: "COLLSCAN", time: 250ms

await Product.collection.createIndex({ category: 1 });

// After index
await Product.find({ category: "electronics" }).explain("executionStats");
// totalDocsExamined: 120, stage: "IXSCAN", time: 2ms</code></pre>
      <p>Over 100× faster.</p>

      <h2>Index types summary</h2>
      <ul>
        <li><strong>Single</strong> — one field, most common</li>
        <li><strong>Compound</strong> — multiple fields, order matters</li>
        <li><strong>Unique</strong> — enforces uniqueness</li>
        <li><strong>Text</strong> — full-text search</li>
        <li><strong>TTL</strong> — auto-delete documents after time</li>
      </ul>

      <h2>Your turn</h2>
      <p>For a products collection that's queried as <code>find({ category }).sort({ price: -1 })</code>, design the right index. Then write an <code>explain</code> query to verify it's used.</p>
    `,
    estimatedMinutes: 40,
    learningObjectives: [
      "Create single, compound, unique, and text indexes",
      "Understand when indexes help and hurt",
      "Use explain() to inspect query plans"
    ]
  },
  {
    title: "Relationships, References, and Population",
    contentHtml: `
      <h2>Two ways to model relationships</h2>
      <ul>
        <li><strong>Embedding</strong> — nest documents inside each other</li>
        <li><strong>Referencing</strong> — store the _id of another document</li>
      </ul>

      <h2>Embedding</h2>
      <p>Good when data belongs together and is always read together:</p>
      <pre><code class="language-javascript">const orderSchema = new mongoose.Schema({
  customer: { name: String, email: String },
  items: [
    { product: String, price: Number, quantity: Number }
  ],
  total: Number
});</code></pre>
      <p>Everything is in one document — one query, atomic updates.</p>

      <h2>Referencing</h2>
      <p>Good when data is shared or updated independently:</p>
      <pre><code class="language-javascript">const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});</code></pre>
      <p>The <code>ref</code> tells Mongoose which model to look up during <code>populate()</code>.</p>

      <h2>Populate — retrieve related documents</h2>
      <pre><code class="language-javascript">const posts = await Post.find().populate("author");
// Each post.author is now the full User document</code></pre>

      <p>Populate only specific fields:</p>
      <pre><code class="language-javascript">await Post.find().populate("author", "name email");</code></pre>

      <p>Populate nested references:</p>
      <pre><code class="language-javascript">await Post.find().populate({
  path: "author",
  populate: { path: "profile" }
});</code></pre>

      <h2>Common relationship shapes</h2>

      <p><strong>One-to-one</strong> (user → profile):</p>
      <pre><code class="language-javascript">const profileSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User", unique: true },
  bio: String
});</code></pre>

      <p><strong>One-to-many</strong> (user → posts):</p>
      <pre><code class="language-javascript">const postSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: "User" }
});</code></pre>
      <p>Each post points to one user. A user has many posts. Query with <code>Post.find({ author: userId })</code>.</p>

      <p><strong>Many-to-many</strong> (students ↔ courses):</p>
      <pre><code class="language-javascript">const studentSchema = new mongoose.Schema({
  name: String,
  courses: [{ type: ObjectId, ref: "Course" }]
});

const courseSchema = new mongoose.Schema({
  title: String,
  students: [{ type: ObjectId, ref: "Student" }]
});</code></pre>
      <p>Both sides store arrays of references.</p>

      <h2>Populating arrays</h2>
      <pre><code class="language-javascript">const student = await Student.findById(id).populate("courses");
// student.courses is now an array of full Course documents</code></pre>

      <h2>Reverse lookups (virtual populate)</h2>
      <pre><code class="language-javascript">userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author"
});

const user = await User.findById(id).populate("posts");</code></pre>
      <p>Now <code>user.posts</code> returns all posts authored by that user — even though there's no array on the User document.</p>

      <h2>Embedded vs referenced — decision guide</h2>
      <ul>
        <li><strong>Embed</strong> if the data is small, always read together, and rarely updated independently.</li>
        <li><strong>Reference</strong> if the data is large, shared, or updated independently.</li>
        <li><strong>Reference</strong> if you need to query the sub-data on its own (e.g., find all posts by a specific author).</li>
      </ul>

      <h2>Your turn</h2>
      <p>Model a blog with:</p>
      <ul>
        <li>Users with name and email</li>
        <li>Posts with title, content, and author reference</li>
        <li>A query that returns posts with populated author names</li>
      </ul>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Compare embedding and referencing",
      "Store ObjectId references",
      "Use populate and virtual populate for reverse lookups"
    ]
  },
  {
    title: "Aggregation and Advanced Data Operations",
    contentHtml: `
      <h2>What is aggregation?</h2>
      <p>The <strong>aggregation pipeline</strong> processes documents through a sequence of stages, transforming data at each step. It's MongoDB's equivalent of SQL's GROUP BY with more power.</p>

      <h2>Common stages</h2>
      <ul>
        <li><strong>$match</strong> — filter (like <code>WHERE</code>)</li>
        <li><strong>$group</strong> — group by a field and compute aggregates</li>
        <li><strong>$sort</strong> — order results</li>
        <li><strong>$project</strong> — select/transform fields (like <code>SELECT</code>)</li>
        <li><strong>$limit</strong> — cap results</li>
        <li><strong>$lookup</strong> — join another collection</li>
        <li><strong>$unwind</strong> — flatten arrays into multiple documents</li>
      </ul>

      <h2>Basic pipeline</h2>
      <pre><code class="language-javascript">const result = await Order.aggregate([
  { $match: { status: "paid" } },
  { $group: {
      _id: "$category",
      totalRevenue: { $sum: "$amount" },
      orderCount: { $sum: 1 }
  }},
  { $sort: { totalRevenue: -1 } }
]);</code></pre>

      <h2>Example data</h2>
      <p>Given orders:</p>
      <pre><code class="language-javascript">[
  { product: "A", category: "electronics", amount: 100, status: "paid" },
  { product: "B", category: "electronics", amount: 200, status: "paid" },
  { product: "C", category: "clothing", amount: 50, status: "paid" },
  { product: "D", category: "clothing", amount: 75, status: "pending" }
]</code></pre>

      <p>The pipeline above returns:</p>
      <pre><code class="language-javascript">[
  { _id: "electronics", totalRevenue: 300, orderCount: 2 },
  { _id: "clothing", totalRevenue: 50, orderCount: 1 }
]</code></pre>
      <p>Note: the pending clothing order is excluded by <code>$match</code>.</p>

      <h2>Group operators</h2>
      <ul>
        <li><code>$sum</code> — total of values</li>
        <li><code>$avg</code> — average</li>
        <li><code>$min</code> / <code>$max</code> — extremes</li>
        <li><code>$first</code> / <code>$last</code> — first/last value in group</li>
        <li><code>$push</code> — collect values into an array</li>
      </ul>

      <h2>Multi-stage example</h2>
      <pre><code class="language-javascript">const topCustomers = await Order.aggregate([
  { $match: { status: "paid" } },
  { $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 }
  }},
  { $match: { orderCount: { $gte: 3 } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
  { $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "customer"
  }},
  { $unwind: "$customer" },
  { $project: {
      _id: 0,
      name: "$customer.name",
      totalSpent: 1,
      orderCount: 1
  }}
]);</code></pre>

      <h2>$lookup — joins</h2>
      <pre><code class="language-javascript">{
  $lookup: {
    from: "users",              // collection to join
    localField: "author",        // field in this collection
    foreignField: "_id",         // field in other collection
    as: "authorInfo"             // output array
  }
}</code></pre>
      <p>Result: <code>authorInfo</code> is an array (usually one item). Use <code>$unwind</code> to flatten it into a single object.</p>

      <h2>$unwind</h2>
      <pre><code class="language-javascript">{ $unwind: "$tags" }</code></pre>
      <p>Turns <code>{ tags: ["a", "b"] }</code> into two documents: <code>{ tags: "a" }</code> and <code>{ tags: "b" }</code>.</p>

      <h2>Transactions</h2>
      <p>For atomic multi-document operations:</p>
      <pre><code class="language-javascript">const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: from }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: to }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}</code></pre>
      <p>Transactions require a replica set (Atlas M0+ includes them).</p>

      <h2>Aggregation tips</h2>
      <ul>
        <li>Put <code>$match</code> first — reduces documents processed by later stages</li>
        <li>Use <code>$project</code> before <code>$lookup</code> to reduce data</li>
        <li>Index fields used in <code>$match</code> and <code>$sort</code></li>
      </ul>

      <h2>Your turn</h2>
      <p>Given a <code>sales</code> collection with <code>category</code> and <code>amount</code>, write an aggregation that returns the total revenue and count of sales for each category, sorted by highest revenue.</p>
    `,
    estimatedMinutes: 50,
    learningObjectives: [
      "Build aggregation pipelines with $match, $group, $sort",
      "Use $lookup and $unwind for joins",
      "Understand basic transactions"
    ]
  },
  {
    title: "Practical Project: Build a Database-Backed REST API",
    contentHtml: `
      <h2>Project objective</h2>
      <p>Build a complete blog API using Node.js, Express.js, MongoDB, and Mongoose. Practice every skill from the course:</p>
      <ul>
        <li>Schemas, models, and relationships</li>
        <li>CRUD operations</li>
        <li>Validation</li>
        <li>Pagination and filtering</li>
        <li>Population of related records</li>
        <li>Centralized error handling</li>
      </ul>

      <h2>Requirements</h2>
      <ol>
        <li>Users and Posts collections</li>
        <li>Users have <code>name</code>, <code>email</code>, <code>role</code></li>
        <li>Posts have <code>title</code>, <code>content</code>, <code>author</code> (ref User), <code>published</code>, and timestamps</li>
        <li>Endpoints:
          <ul>
            <li><code>POST /api/users</code> — register</li>
            <li><code>GET /api/users</code> — list</li>
            <li><code>POST /api/posts</code> — create post (authorId in body)</li>
            <li><code>GET /api/posts</code> — paginated, filterable by <code>?author=</code> and <code>?published=</code></li>
            <li><code>GET /api/posts/:id</code> — single post with author populated</li>
            <li><code>PATCH /api/posts/:id</code> — update (validated)</li>
            <li><code>DELETE /api/posts/:id</code> — delete</li>
          </ul>
        </li>
        <li>Validation on all writes</li>
        <li>Consistent JSON responses</li>
        <li>Centralized error handling</li>
      </ol>

      <h2>models/User.js</h2>
      <pre><code class="language-javascript">const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be 2+ characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Invalid email"]
    },
    role: { type: String, enum: ["author", "admin"], default: "author" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);</code></pre>

      <h2>models/Post.js</h2>
      <pre><code class="language-javascript">const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: [true, "Content is required"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

postSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);</code></pre>

      <h2>controllers/userController.js</h2>
      <pre><code class="language-javascript">const User = require("../models/User");

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: Object.fromEntries(
          Object.entries(err.errors).map(([k, v]) => [k, v.message])
        )
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Email already in use"
      });
    }
    throw err;
  }
}

async function listUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 }).limit(100);
  res.json({ status: "success", count: users.length, data: users });
}

module.exports = { createUser, listUsers };</code></pre>

      <h2>controllers/postController.js</h2>
      <pre><code class="language-javascript">const Post = require("../models/Post");

async function createPost(req, res) {
  const post = await Post.create(req.body);
  res.status(201).json({ status: "success", data: post });
}

async function listPosts(req, res) {
  const { author, published, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (author) filter.author = author;
  if (published !== undefined) filter.published = published === "true";

  const posts = await Post.find(filter)
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Post.countDocuments(filter);

  res.json({
    status: "success",
    count: posts.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: posts
  });
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id).populate("author", "name email");
  if (!post) return res.status(404).json({ status: "error", message: "Post not found" });
  res.json({ status: "success", data: post });
}

async function updatePost(req, res) {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!post) return res.status(404).json({ status: "error", message: "Post not found" });
  res.json({ status: "success", data: post });
}

async function deletePost(req, res) {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ status: "error", message: "Post not found" });
  res.status(204).end();
}

module.exports = { createPost, listPosts, getPost, updatePost, deletePost };</code></pre>

      <h2>Test with curl</h2>
      <pre><code class="language-bash"># Create user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","email":"alice@example.com"}'

# Create post (use the user's _id)
curl -X POST http://localhost:3000/api/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title":"First Post","content":"Hello","author":"65f1..."}'

# List posts with pagination
curl "http://localhost:3000/api/posts?page=1&limit=10&published=true"

# Get one with author populated
curl http://localhost:3000/api/posts/65f2...

# Update
curl -X PATCH http://localhost:3000/api/posts/65f2... \\
  -H "Content-Type: application/json" \\
  -d '{"published":true}'

# Delete
curl -X DELETE http://localhost:3000/api/posts/65f2...
</code></pre>

      <h2>Bonus: aggregation endpoint</h2>
      <pre><code class="language-javascript">async function stats(req, res) {
  const [summary] = await Post.aggregate([
    { $group: {
        _id: null,
        total: { $sum: 1 },
        published: { $sum: { $cond: ["$published", 1, 0] } }
    }}
  ]);
  res.json({ status: "success", data: summary });
}

module.exports = { ..., stats };</code></pre>

      <h2>Your turn</h2>
      <p>Complete the API. Test:</p>
      <ul>
        <li>All 7 endpoints respond correctly</li>
        <li>Validation rejects bad input with 400</li>
        <li>Duplicate email returns 409</li>
        <li>Missing post returns 404</li>
        <li>Posts include populated author name</li>
        <li>Pagination works with <code>page</code>/<code>limit</code></li>
      </ul>
      <p>Submit the code when everything passes.</p>
    `,
    estimatedMinutes: 120,
    learningObjectives: [
      "Build a complete database-backed API",
      "Wire Mongoose models into Express routes",
      "Test CRUD, validation, pagination, and population"
    ]
  }
];

async function seedMongoLessons() {
  const course = await Course.findOne({ slug: "mongodb-mongoose" });
  if (!course) {
    console.warn("⚠  Course not found: mongodb-mongoose");
    return { created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  await Lesson.deleteMany({ course: course._id });

  for (let i = 0; i < mongoLessons.length; i++) {
    const l = mongoLessons[i];
    const lessonSlug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await Lesson.create({ ...l, slug: lessonSlug, order: i, course: course._id });
    created++;
  }

  await Course.updateOne(
    { _id: course._id },
    { $set: { lessonsCount: mongoLessons.length } }
  );

  console.log(`   MongoDB lessons: ${created} created (replaced all existing)`);
  return { created, updated };
}

module.exports = { seedMongoLessons };