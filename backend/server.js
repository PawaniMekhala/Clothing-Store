import app from './app.js';
import Sequelize from './config/db.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await Sequelize.authenticate();
    await Sequelize.sync(); // use { force: true } to reset tables
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('DB connection failed:', error);
  }
})();
