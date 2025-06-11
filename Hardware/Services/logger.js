import winston from "winston";
import path from "path";
import fs from "fs";
import moment from "moment-timezone";

const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function createLogger(fileName) {
  return winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: () => moment().tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss"),
      }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({
        filename: path.join(logDirectory, `${fileName}.log`),
      }),
    ],
  });
}

export const logger = createLogger("general");
