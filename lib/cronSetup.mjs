import cron from "node-cron";
import axios from "axios";

export const cronSetup = () => {
  cron.schedule("* * * * *", async () => {
    try {
      await axios.post("http://localhost:3000/api/email", {
        text: "hello",
      });
      console.log("POST request sent to the cron job endpoint");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  });
};
