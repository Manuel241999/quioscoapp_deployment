import {categorias} from './data/categorias'
import {productos} from './data/productos'
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    try {
        await prisma.categoria.createMany({
            data: categorias//Le metes todos los datos a la tabla categorias
        })
        await prisma.producto.createMany({
            data: productos//Le metes todos los datos a la tabla productos
        })
    } catch (error) {
        console.log(error);
        
    }
}
main()