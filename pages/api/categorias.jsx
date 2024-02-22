//ESTA PARTE SIEMPRE SE EJECUTA DEL LADO DEL SERVIDOR
import { PrismaClient } from "@prisma/client"

//Cuando usar esta forma? La vas a usar cuando queras tener info que queras colocar en el state y queras tenerla disponible 
export default async function handler(req, res) {

  const prisma = new PrismaClient()

  const categorias = await prisma.categoria.findMany({//Traer datos que esten relacionados
      include:{
        productos: true,//Asi te traes los productos relacionados a una categoria.
      } 
  })

  res.status(200).json(categorias)

}
