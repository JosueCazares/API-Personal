import { app } from './serve';
import {env} from './env'
//routes register

 import { router as personal } from './routes/personal';
 import { router as areas } from './routes/areas';



app.use('/api/personal',personal);
app.use('/api/areas',areas);


app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})