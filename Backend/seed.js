const mongoose = require("mongoose");
require("dotenv").config();
const News = require("./models/News");

const dummyNews = [
  {
    title: "The Future of Artificial Intelligence: What to Expect in 2026",
    description: "Artificial Intelligence continues to evolve rapidly. From autonomous agents to highly creative generative models, the landscape is shifting daily. In this article, we explore how AI is integrating into our daily lives and transforming industries.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
  },
  {
    title: "Global Markets Rally as Inflation Hits New Lows",
    description: "In an unexpected turn of events, global stock markets saw a significant surge today. Tech stocks led the charge, but energy and consumer goods were not far behind. Economists suggest this could be the start of a sustained bull run.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
  {
    title: "New Breakthrough in Quantum Computing Achieved",
    description: "Researchers at a leading university have successfully demonstrated a new quantum error correction method, bringing us one step closer to commercially viable quantum computers that can solve complex problems in seconds.",
    category: "Science",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
  },
  {
    title: "10 Superfoods You Need to Include in Your Diet",
    description: "Nutritionists are highlighting the incredible benefits of these ten superfoods. From nutrient-dense berries to ancient grains, incorporating these into your daily meals can boost immunity and increase energy levels.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
  },
  {
    title: "Championship Finals: Underdog Team Secures Historic Victory",
    description: "In what will be remembered as one of the greatest upsets in sports history, the underdogs defied all odds to clinch the championship trophy. Fans poured into the streets to celebrate the spectacular performance.",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
  },
  {
    title: "Space Tourism: The Next Frontier Opens Up",
    description: "Several commercial spaceflight companies have announced their upcoming schedule for civilian trips to low Earth orbit. With prices slowly dropping, space tourism might soon become a reality for more people.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    title: "Top 5 Travel Destinations for Summer 2026",
    description: "Planning your summer getaway? These five destinations offer the perfect mix of pristine beaches, rich culture, and incredible cuisine. Find out where you should book your next flight.",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
  },
  {
    title: "Blockbuster Movie Breaks Box Office Records on Opening Weekend",
    description: "The highly anticipated sci-fi thriller has shattered all previous opening weekend records, bringing audiences back to theaters in massive numbers. Critics and fans alike are praising the stunning visual effects.",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"
  },
  {
    title: "Electric Vehicles Surpass Gas Cars in Quarterly Sales",
    description: "For the first time in history, EV sales have overtaken traditional internal combustion engine vehicles globally. This marks a monumental shift towards sustainable transportation and a greener future.",
    category: "Automotive",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?w=800&q=80"
  },
  {
    title: "Study Reveals the Best Ways to Improve Mental Well-being",
    description: "A comprehensive new study outlines practical, everyday habits that significantly boost mental health. Regular exercise, mindfulness, and limiting screen time are among the top recommendations.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ MongoDB connected for seeding...");
  
  // Clear existing data (optional, but good for a fresh start)
  // await News.deleteMany({});
  // console.log("🗑️ Cleared old news");

  // Insert dummy data
  await News.insertMany(dummyNews);
  console.log(`🌱 Successfully seeded ${dummyNews.length} news articles!`);
  
  mongoose.connection.close();
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
