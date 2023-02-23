import { favoriteActions } from './../../client/src/redux/slices/favorite';
import Express from 'express';
import bodyParser from 'body-parser'; 
import productRouter from './routes/products';
import userRouter from './routes/users';
import orderRouter from './routes/orders';
import favoritesRouter from './routes/favorites'
import cartRouter from './routes/carts'
import passport from "passport";
import { jwtStrategy } from "./config/passport";
import cors from 'cors'
const app = Express();
 
app.use(cors());

app.use(Express.json());

app.use(passport.initialize())
passport.use(jwtStrategy)

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/favorites', favoritesRouter)
app.use('/cart', cartRouter)

export default app; 

