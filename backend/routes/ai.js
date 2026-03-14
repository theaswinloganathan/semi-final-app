const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const router = express.Router();

module.exports = (upload) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  router.post('/ai-detection', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imagePath = req.file.path;
      const imageData = fs.readFileSync(imagePath);
      
      const parts = [
        { text: "Analyze this crop image. Identify the crop type, health status, and suggest a farming action. Format the output as JSON with keys: cropType, healthStatus, suggestedAction." },
        { inlineData: { data: imageData.toString('base64'), mimeType: req.file.mimetype } }
      ];

      const result = await model.generateContent(parts);
      const response = await result.response;
      let text = response.text();
      
      // Basic cleaning for JSON parsing if Gemini returns markdown tags
      text = text.replace(/```json|```/g, '').trim();
      
      try {
        const jsonResult = JSON.parse(text);
        res.json(jsonResult);
      } catch (parseErr) {
        // Fallback if parsing fails
        res.json({
          cropType: "Detected Plant",
          healthStatus: "Analysis complete",
          suggestedAction: text
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'AI analysis failed' });
    }
  });

  return router;
};
