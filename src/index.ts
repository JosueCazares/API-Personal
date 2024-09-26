import { app } from './serve';
import {env} from './env'
//routes register

 import { router as personal } from './routes/personal';



app.use('/api/personal',personal);


app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})