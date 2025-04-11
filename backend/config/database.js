import { Sequelize } from "sequelize";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: `${__dirname}/../database.sqlite`,
    logging: false
});

export default sequelize