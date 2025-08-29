
// require('dotenv').config();
// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const auth = require('./middleware/auth');

// const app = express();
// const port = 3000;
// // ADD THIS LINE TO DEBUG
// // console.log('My JWT Secret is:', process.env.JWT_SECRET);
// // Middleware
// // app.use(cors({
// //   origin: "https://note-sage-gamma.vercel.app",

// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   allowedHeaders: ["Content-Type", "x-auth-token"]
// // }));
// // A list of URLs that are allowed to make requests to your backend
// const allowedOrigins = [
//   'https://note-sage-gamma.vercel.app', // Your production URL
//   'http://localhost:5173'              // Your local development URL
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
    
//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "x-auth-token"]
// }));
// app.use(express.json());

// // MongoDB Connection
// const uri = process.env.MONGO_URI;
// if (!uri) {
//     throw new Error('MONGO_URI not found in .env file');
// }
// const client = new MongoClient(uri);
// let notesCollection;
// let usersCollection;

// async function connectDB() {
//     try {
//         await client.connect();
//         console.log("✅ Successfully connected to MongoDB Atlas!");
//         const database = client.db("notesApp");
//         notesCollection = database.collection("notes");
//         usersCollection = database.collection("users");
//     } catch (err) {
//         console.error("❌ Failed to connect to MongoDB", err);
//         process.exit(1);
//     }
// }

// // --- Auth Routes ---

// // Register User
// app.post('/api/auth/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await usersCollection.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = {
//             email,
//             password: hashedPassword,
//         };

//         const result = await usersCollection.insertOne(newUser);
//         const payload = {
//             user: {
//                 id: result.insertedId,
//             },
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: 3600 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // Login User
// app.post('/api/auth/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await usersCollection.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user._id,
//             },
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: 3600 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });


// // --- API Routes ---

// // GET all notes for a user
// app.get('/api/notes', auth, async (req, res) => {
//     try {
//         const notes = await notesCollection.find({ user: new ObjectId(req.user.id) }).sort({ timestamp: -1 }).toArray();
//         res.json(notes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // POST a new note
// app.post('/api/notes', auth, async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const newNote = {
//             user: new ObjectId(req.user.id),
//             title,
//             content,
//             timestamp: new Date()
//         };
//         const result = await notesCollection.insertOne(newNote);
//         res.status(201).json({ ...newNote, _id: result.insertedId });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating note" });
//     }
// });


// // PUT (update) a note
// app.put('/api/notes/:id', auth, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content } = req.body;
//         const note = await notesCollection.findOne({ _id: new ObjectId(id) });

//         if (!note) {
//             return res.status(404).json({ msg: 'Note not found' });
//         }

//         // Make sure user owns the note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'Not authorized' });
//         }

//         const result = await notesCollection.updateOne(
//             { _id: new ObjectId(id) },
//             { $set: { title, content, timestamp: new Date() } }
//         );
//         if (result.matchedCount === 0) return res.status(404).json({ message: "Note not found" });
//         res.status(200).json({ message: "Note updated" });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating note" });
//     }
// });

// // DELETE a note
// app.delete('/api/notes/:id', auth, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const note = await notesCollection.findOne({ _id: new ObjectId(id) });

//         if (!note) {
//             return res.status(404).json({ msg: 'Note not found' });
//         }

//         // Make sure user owns the note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'Not authorized' });
//         }
        
//         const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });
//         if (result.deletedCount === 0) return res.status(404).json({ message: "Note not found" });
//         res.status(200).json({ message: "Note deleted" });
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting note" });
//     }
// });


// // Start the server
// connectDB().then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
// });

require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const app = express();
const port = 3000;

// A list of URLs that are allowed to make requests to your backend
const allowedOrigins = [
  'https://note-sage-gamma.vercel.app', // Your production URL
  'http://localhost:5173'              // Your local development URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"]
}));

app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI not found in .env file');
}
const client = new MongoClient(uri);
let notesCollection;
let usersCollection;

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB Atlas!");
        const database = client.db("notesApp");
        notesCollection = database.collection("notes");
        usersCollection = database.collection("users");
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// --- Auth Routes ---

// Register User
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await usersCollection.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            email,
            password: hashedPassword,
        };

        const result = await usersCollection.insertOne(newUser);
        const payload = {
            user: {
                id: result.insertedId,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// --- API Routes ---

// GET all notes for a user
app.get('/api/notes', auth, async (req, res) => {
    try {
        const notes = await notesCollection.find({ user: new ObjectId(req.user.id) }).sort({ timestamp: -1 }).toArray();
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new note
app.post('/api/notes', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = {
            user: new ObjectId(req.user.id),
            title,
            content,
            timestamp: new Date()
        };
        const result = await notesCollection.insertOne(newNote);
        res.status(201).json({ ...newNote, _id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: "Error creating note" });
    }
});


// PUT (update) a note
app.put('/api/notes/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await notesCollection.findOne({ _id: new ObjectId(id) });

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const result = await notesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, content, timestamp: new Date() } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating note" });
    }
});

// DELETE a note
app.delete('/api/notes/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const note = await notesCollection.findOne({ _id: new ObjectId(id) });

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note" });
    }
});

// MODIFICATION FOR VERCEL DEPLOYMENT
// This block will only run the server if the file is executed directly (for local development)
// Vercel will handle starting the server in production.
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  });
}

// Export the app for Vercel
module.exports = app;