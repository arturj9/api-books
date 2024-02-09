import { Router } from 'express';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { authRoutes } from './authRoutes';
import { bookRoutes } from './booksRoutes';
import { bookingRoutes } from './bookingsRoutes';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/books', bookRoutes /*
#swagger.tags = ['Book']
*/)
routes.use('/bookings', ensureAuthenticate, bookingRoutes /* 
#swagger.tags = ['Booking']
#swagger.security = [{
            "bearerAuth": []
    }]
*/)

export { routes };