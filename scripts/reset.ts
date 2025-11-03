import sequelize from "../src/config/database";

async function resetDatabase() {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();

    console.log("🗑️  Clearing database...");
    await sequelize.sync({ force: true });

    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("🔌 Database connection closed.");
    process.exit(0);
  }
}

// Execute the reset
if (require.main === module) {
  resetDatabase();
}

export default resetDatabase;
