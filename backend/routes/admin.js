const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Dashboard Statistics
router.get('/dashboard', async (req, res) => {
  try {
    const [trainees] = await pool.query('SELECT count(*) as count FROM trainees');
    const [tasks] = await pool.query("SELECT count(*) as count FROM farm_tasks WHERE status != 'Completed'");
    const [crops] = await pool.query('SELECT count(*) as count FROM crops');
    const [yieldSum] = await pool.query("SELECT SUM(JSON_EXTRACT(data, '$.yield')) as total_yield FROM reports WHERE type = 'production'");

    res.json({
      totalTrainees: trainees[0].count,
      activeTasks: tasks[0].count,
      cropsMonitored: crops[0].count,
      productionYield: yieldSum[0].total_yield || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trainees CRUD
router.get('/trainees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM trainees');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/trainees', async (req, res) => {
  const { name, group_name, efficiency, status } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO trainees (name, group_name, efficiency, status) VALUES (?, ?, ?, ?)', [name, group_name, efficiency, status]);
    res.json({ id: result.insertId, name, group_name, efficiency, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/trainees/:id', async (req, res) => {
  const { name, group_name, efficiency, status } = req.body;
  try {
    await pool.query('UPDATE trainees SET name = ?, group_name = ?, efficiency = ?, status = ? WHERE id = ?', [name, group_name, efficiency, status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/trainees/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM trainees WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Farm Tasks CRUD
router.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM farm_tasks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tasks', async (req, res) => {
  const { title, zone, urgency, status } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO farm_tasks (title, zone, urgency, status) VALUES (?, ?, ?, ?)', [title, zone, urgency, status]);
    res.json({ id: result.insertId, title, zone, urgency, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/tasks/:id', async (req, res) => {
  const { title, zone, urgency, status } = req.body;
  try {
    await pool.query('UPDATE farm_tasks SET title = ?, zone = ?, urgency = ?, status = ? WHERE id = ?', [title, zone, urgency, status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM farm_tasks WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crops
router.get('/crops', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM crops');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/crops', async (req, res) => {
  const { name, stage, health, type } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO crops (name, stage, health, type) VALUES (?, ?, ?, ?)', [name, stage, health, type]);
    res.json({ id: result.insertId, name, stage, health, type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance & Production
router.get('/attendance-production', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.date, COUNT(a.id) as attendance_count, SUM(IF(r.type = 'production', JSON_EXTRACT(r.data, '$.yield'), 0)) as total_yield
      FROM attendance a
      LEFT JOIN reports r ON DATE(a.date) = DATE(r.date)
      GROUP BY DATE(a.date)
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inventory CRUD
router.get('/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/inventory', async (req, res) => {
  const { item, category, stock, unit } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO inventory (item, category, stock, unit) VALUES (?, ?, ?, ?)', [item, category, stock, unit]);
    res.json({ id: result.insertId, item, category, stock, unit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reports
router.get('/reports', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
