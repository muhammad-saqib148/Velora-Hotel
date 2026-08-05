import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import emailHandler from './api/send-booking-email';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.post('/api/send-booking-email', async (req, res) => {
    await emailHandler(req, res);
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Velora Grand Hotel API' });
  });

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // If requesting html directly or fallback
      const reqPath = req.path;
      if (reqPath.endsWith('.html')) {
        res.sendFile(path.join(distPath, reqPath));
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
