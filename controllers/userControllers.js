// const User = require("../models/User");
// const Post = require("../models/Post");
// const PostLike = require("../models/PostLike");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Follow = require("../models/Follow");
// const { default: mongoose } = require("mongoose");

// const getUserDict = (token, user) => {
//   return {
//     token,
//     username: user.username,
//     userId: user._id,
//     isAdmin: user.isAdmin,
//   };
// };

// const buildToken = (user) => {
//   return {
//     userId: user._id,
//     isAdmin: user.isAdmin,
//   };
// };

// const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!(username && email && password)) {
//       throw new Error("All input required");
//     }

//     const normalizedEmail = email.toLowerCase();

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const existingUser = await User.findOne({
//       $or: [{ email: normalizedEmail }, { username }],
//     });

//     if (existingUser) {
//       throw new Error("Email and username must be unique");
//     }

//     const user = await User.create({
//       username,
//       email: normalizedEmail,
//       password: hashedPassword,
//     });

//     const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

//     return res.json(getUserDict(token, user));
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!(email && password)) {
//       throw new Error("All input required");
//     }

//     const normalizedEmail = email.toLowerCase();

//     const user = await User.findOne({ email: normalizedEmail });

//     if (!user) {
//       throw new Error("Email or password incorrect");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error("Email or password incorrect");
//     }

//     const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

//     return res.json(getUserDict(token, user));
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: err.message });
//   }
// };

// const follow = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const followingId = req.params.id;

//     const existingFollow = await Follow.find({ userId, followingId });

//     if (existingFollow) {
//       throw new Error("Already following this user");
//     }

//     const follow = await Follow.create({ userId, followingId });

//     return res.status(200).json({ data: follow });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { userId, biography } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       throw new Error("User does not exist");
//     }

//     if (typeof biography == "string") {
//       user.biography = biography;
//     }

//     await user.save();

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const unfollow = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const followingId = req.params.id;

//     const existingFollow = await Follow.find({ userId, followingId });

//     if (!existingFollow) {
//       throw new Error("Not already following user");
//     }

//     await existingFollow.remove();

//     return res.status(200).json({ data: existingFollow });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const getFollowers = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const followers = await Follow.find({ followingId: userId });

//     return res.status(200).json({ data: followers });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const getFollowing = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const following = await Follow.find({ userId });

//     return res.status(200).json({ data: following });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const username = req.params.username;

//     const user = await User.findOne({ username }).select("-password");

//     if (!user) {
//       throw new Error("User does not exist");
//     }

//     const posts = await Post.find({ poster: user._id })
//       .populate("poster")
//       .sort("-createdAt");

//     let likeCount = 0;

//     posts.forEach((post) => {
//       likeCount += post.likeCount;
//     });

//     const data = {
//       user,
//       posts: {
//         count: posts.length,
//         likeCount,
//         data: posts,
//       },
//     };

//     return res.status(200).json(data);
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// const getRandomUsers = async (req, res) => {
//   try {
//     let { size } = req.query;

//     const users = await User.find().select("-password");

//     const randomUsers = [];

//     if (size > users.length) {
//       size = users.length;
//     }

//     const randomIndices = getRandomIndices(size, users.length);

//     for (let i = 0; i < randomIndices.length; i++) {
//       const randomUser = users[randomIndices[i]];
//       randomUsers.push(randomUser);
//     }

//     return res.status(200).json(randomUsers);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: err.message });
//   }
// };

// const getRandomIndices = (size, sourceSize) => {
//   const randomIndices = [];
//   while (randomIndices.length < size) {
//     const randomNumber = Math.floor(Math.random() * sourceSize);
//     if (!randomIndices.includes(randomNumber)) {
//       randomIndices.push(randomNumber);
//     }
//   }
//   return randomIndices;
// };

// module.exports = {
//   register,
//   login,
//   follow,
//   unfollow,
//   getFollowers,
//   getFollowing,
//   getUser,
//   getRandomUsers,
//   updateUser,
// };
const User = require("../models/User");
const Post = require("../models/Post");
const PostLike = require("../models/PostLike");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Follow = require("../models/Follow");
const mongoose = require("mongoose");

// Generate User Token
const buildToken = (user) => ({
  userId: user._id,
  isAdmin: user.isAdmin,
});

// Return user data
const getUserDict = (token, user) => ({
  token,
  username: user.username,
  userId: user._id,
  isAdmin: user.isAdmin,
});

// ✅ Register User
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or username already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate Token
    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });

    return res.status(201).json(getUserDict(token, user));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json(getUserDict(token, user));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Follow User
const follow = async (req, res) => {
  try {
    const { userId } = req.body;
    const followingId = req.params.id;

    // Check if already following
    const existingFollow = await Follow.findOne({ userId, followingId });
    if (existingFollow) {
      return res.status(400).json({ error: "Already following this user" });
    }

    const follow = await Follow.create({ userId, followingId });
    return res.status(200).json({ data: follow });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Unfollow User
const unfollow = async (req, res) => {
  try {
    const { userId } = req.body;
    const followingId = req.params.id;

    // Check if following exists
    const existingFollow = await Follow.findOne({ userId, followingId });
    if (!existingFollow) {
      return res.status(400).json({ error: "Not following this user" });
    }

    // Remove follow record
    await Follow.deleteOne({ userId, followingId });

    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Get Followers
const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await Follow.find({ followingId: userId }).populate("userId");
    return res.status(200).json({ data: followers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Get Following
const getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;
    const following = await Follow.find({ userId }).populate("followingId");
    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Update User Profile
const updateUser = async (req, res) => {
  try {
    const { userId, biography } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (biography) {
      user.biography = biography;
    }

    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Get User Profile & Posts
const getUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ poster: user._id }).populate("poster").sort("-createdAt");

    const likeCount = posts.reduce((acc, post) => acc + post.likeCount, 0);

    return res.status(200).json({
      user,
      posts: {
        count: posts.length,
        likeCount,
        data: posts,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Get Random Users
const getRandomUsers = async (req, res) => {
  try {
    let { size } = req.query;
    size = parseInt(size) || 5;

    const users = await User.find().select("-password");

    if (size > users.length) {
      size = users.length;
    }

    const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, size);

    return res.status(200).json(randomUsers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getUser,
  getRandomUsers,
  updateUser,
};
