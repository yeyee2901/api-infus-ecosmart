import 'dotenv/config';
import express from 'express';
import notFound from './routes/not-found';
import InfusRoutes from './routes/infus';

const app = express();
const PORT = parseInt(process.env.SERVER_PORT as string) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send('Hellooo');
});

app.use('/api/infus', InfusRoutes);
app.use('*', notFound);
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
