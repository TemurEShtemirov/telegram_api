import Sequelize from 'sequelize';
const sequelize = new Sequelize('postgres://postgres:1015@localhost:5432/exam')
export default sequelize;
