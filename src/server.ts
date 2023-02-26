import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = fastify();
app.register(appRoutes);

app.register(cors);

app.listen( {
  port: 3333,
}).then(()=> {
    console.log("Server is running on port 3333");
})