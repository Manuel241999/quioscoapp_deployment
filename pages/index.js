import Layout from "../layout/Layout";
import Producto from "../components/Producto";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

export default function Home() {
  const { categoriaActual } = useQuiosco();
  return (
    //Ponerle el optional Chaning "?" esto hace que si no encontro los calores de categoriaActual.nombre y da error. LE DECIS DE QUE DE IGUAL FORMA NO TE TRUENE LA APP.
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
         Elige y personaliza tu pedido a continuación.
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  );
}
