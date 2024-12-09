import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/llm", async (req, res) => {
  const anthropic = new Anthropic({
    apiKey: "ENTER YOUR KEY", // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Take this call transcript and do X`,
      },
    ],
  });

  console.log(msg);

  res.send("Claude response:", msg);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
