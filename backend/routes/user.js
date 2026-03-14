const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Attendance
router.get('/attendance', async (req, res) => {
  const userId = req.query.userId || 2; // Default to user 2 if not provided
  try {
    const [rows] = await pool.query('SELECT * FROM attendance WHERE user_id = ?', [userId]);
    const total = rows.length;
    const present = rows.filter(r => r.status === 'Present').length;
    const percentage = total > 0 ? (present / total * 100).toFixed(0) : 0;
    
    res.json({ records: rows, percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modules (Quiz)
router.get('/modules', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM modules');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/modules/submit', async (req, res) => {
  const { userId, answers } = req.body;
  // answers: [{ questionId: 1, selectedIndex: 2 }]
  try {
    const [questions] = await pool.query('SELECT id, correct_index FROM modules');
    let score = 0;
    answers.forEach(ans => {
      const q = questions.find(qItem => qItem.id === ans.questionId);
      if (q && q.correct_index === ans.selectedIndex) {
        score++;
      }
    });
    res.json({ score, total: questions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Settings
router.get('/settings', async (req, res) => {
  const userId = req.query.userId || 2;
  try {
    const [rows] = await pool.query('SELECT * FROM settings WHERE user_id = ?', [userId]);
    const settings = {};
    rows.forEach(r => settings[r.setting_key] = r.setting_value);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/settings', async (req, res) => {
  const { userId, settings } = req.body; 
  // settings: { key: value }
  try {
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO settings (user_id, setting_key, setting_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [userId, key, value, value]
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
