import Express from 'express';
import bodyParser from 'body-parser'; 
import productRouter from './routes/products';
import userRouter from './routes/users';
import orderRouter from './routes/orders';
const app = Express();
 
app.use(Express.json()); 

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
export default app; 