import express from 'express'
import cors from 'cors'

import {AddressInfo} from "net";
import { userRouter } from "./router/User.Router";
import { productRouter } from './router/Product.Router';
import { ClientRouter } from './router/Client.Rauter';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/clients", ClientRouter);

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});