const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware wajib agar web bisa ngobrol dengan mesin
app.use(cors());
app.use(express.json());

// Rute utama AI
app.post('/api/chat', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        
        // Memanggil Gemini AI menggunakan Kunci dari Vercel
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        
        // WAJIB: Membalas dengan format JSON agar web tidak error
        res.json({ reply: textResponse });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Sistem AI gagal merespons. Periksa Kunci API." });
    }
});

// WAJIB UNTUK VERCEL (Menyala tanpa perlu app.listen)
module.exports = app;

