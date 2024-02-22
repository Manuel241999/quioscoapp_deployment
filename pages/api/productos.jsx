//ESTA PARTE SIEMPRE SE EJECUTA DEL LADO DEL SERVIDOR
import { PrismaClient } from "@prisma/client"

//Cuando usar esta forma? La vas a usar cuando queras tener info que queras colocar en el state y queras tenerla disponible 
export default async function handler(req, res) {

  const prisma = new PrismaClient()

  const productos = await prisma.producto.findMany({
    where: {
      categoriaId: 1,
    }
  })

  res.status(200).json(productos)
}
