import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  //Obtener Ordenes
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false,
    },
  });
  res.status(200).json(ordenes);

  //Crear nuevas ordenes
  if (req.method === "POST") {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      }, //insertar en base de datos
    });
    res.status(200).json(orden);
  }
}

//GET: PARA VISITAR UN SITIO
// POST: PARA ENVIAR DATOS A UN SITIO
// PUT Y PATCH:  PARA ACTUALIZAR UN RECURSO
//DELETE: ELIMINAR DATOS
