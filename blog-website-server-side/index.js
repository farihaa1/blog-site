const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://blog-website-server-side.vercel.app", "http://localhost:5173","http://localhost:5000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cd15p.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

// Main Function
async function run() {
  try {
    // await client.connect();

    const blogsCollection = client.db("blogSiteDb").collection("blogs");
    const wishlistCollection = client.db("blogSiteDb").collection("wishlist");
    const commentsCollection = client.db("blogSiteDb").collection("comments");
    const usersCollection = client.db("blogSiteDb").collection("users");

    // Auth related APIs
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: "Logged out successfully" });
    });

    app.post("/comments", async (req, res) => {
      const commentData = req.body;

      const result = await commentsCollection.insertOne(commentData);
      res.send(result);
    });

    app.get("/comments/:blogId", async (req, res) => {
      const { blogId } = req.params;
      const query = { blogId: blogId };
      const result = await commentsCollection
        .find(query)
        .sort({ createdAt: 1 })
        .toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const { search, category } = req.query;

      let query = {};

      if (search) {
        const regex = new RegExp(search.trim(), "i");
        query.$or = [{ title: { $regex: regex } }];
      }
      if (category && category !== "All") {
        query.category = category;
      }

      const blogs = await blogsCollection.find(query).toArray();
      res.send(blogs);
    });



    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });
   
    

    app.get("/recent-blogs", async (req, res) => {
  
      const blogs = await blogsCollection.find().toArray();
    
      const sortedBlogs = blogs
        .map((blog) => {
          const createdDateTime = new Date(`${blog.createDate} ${blog.createdTime}`);
          return { ...blog, createdDateTime }; 
        })
        .sort((a, b) => b.createdDateTime - a.createdDateTime);
      const recentBlogs = sortedBlogs.slice(0, 6).map(({
        createdDateTime, 
        ...rest 
      }) => rest);
  
      res.json(recentBlogs);
     
    });
    


    app.post("/blogs",verifyToken, async (req, res) => {
      const blogData = req.body;
      const result = await blogsCollection.insertOne(blogData);
      res.send(result);
    });

    app.put("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = req.body;
      const reviews = {
        $set: {
          title: updatedData.title,
          category: updatedData.category,
          shortDescription: updatedData.shortDescription,
          longDescription: updatedData.longDescription,
          imageUrl: updatedData.imageUrl,
          tags: updatedData.tags || [],
        },
      };
      const result = await blogsCollection.updateOne(filter, reviews, options);
      res.send(result);
    });

    app.post("/wishlist", verifyToken, async (req, res) => {
    
        const { userEmail, blogId } = req.body;
        if (!userEmail || !blogId) {
          return res
            .status(400)
            .json({ message: "userEmail and BlogId are required" });
        }

        const existingWishlistItem = await wishlistCollection.findOne({
          blogId,
          userEmail,
        });
        if (existingWishlistItem) {
          return res.send({ message: "Blog is already in the wishlist" });
        }

        const result = await wishlistCollection.insertOne({
          userEmail: userEmail,
          blogId,
        });
        res.send(result);
      
    });

    app.get("/wishlist/:userEmail", async (req, res) => {
      const { userEmail } = req.params;

      const wishlist = await wishlistCollection.find({ userEmail }).toArray();

      const blogIds = wishlist
        .filter((item) => item.blogId)
        .map((item) => item.blogId);
      const validBlogIds = blogIds.filter((id) => ObjectId.isValid(id));

      const blogs = await blogsCollection
        .find({
          _id: { $in: validBlogIds.map((id) => new ObjectId(id)) },
        })
        .toArray();

      res.send(blogs);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.get("/featured-blogs", async (req, res) => {
      const blogs = await blogsCollection.find().toArray();

      const sortedBlogs = blogs
        .map((blog) => ({
          ...blog,
          wordCount: blog.longDescription.split(" ").length,
        }))
        .sort((a, b) => b.wordCount - a.wordCount)
        .slice(0, 10);

      res.send(sortedBlogs);
    });

    app.delete("/wishlist", async (req, res) => {
      try {
        const { userEmail, blogId } = req.body;

        if (!userEmail || !blogId) {
          return res.send({ message: "userEmail and BlogId are required" });
        }

        const result = await wishlistCollection.deleteOne({
          userEmail,
          blogId,
        });

        if (result.deletedCount === 0) {
          return res.send({ message: "Wishlist item not found" });
        }

        res.send({ message: "Blog removed from wishlist" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Failed to delete from wishlist", error });
      }
    });

    // Test MongoDB Connection
    // await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Blog-site server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
