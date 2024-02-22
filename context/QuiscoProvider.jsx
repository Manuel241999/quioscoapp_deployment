import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify"; //Esta funcion nos permite llamar el toast en ciertos eventos
import { useRouter } from "next/router";

const QuiscoContext = createContext();

const QuiscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]); //Almacena las categorias de la API
  const [categoriaActual, setCategoriaActual] = useState({}); //Almacena la categoria escogida, como el café
  const [producto, setProducto] = useState({}); //Este almacena un producto en espesifico en un objeto y lo almacena para usarlo donde queras o mostrarlo
  const [modal, setModal] = useState(false); //Este solo es la bandera que muestra el modal del producto
  const [pedido, setPedido] = useState([]); //Pedido es el que va a almacenar el array de elementos que hayamos escogido comprar
  const [nombre, setNombre] = useState(""); //State para el nombre del Cliente.
  const [total, setTotal] = useState(0); //State para el total a pagar

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    //Esta onda se carga cuando es la primera vez que ingresas, le mandas asignado una categoria para que no quede en pantalla en blanco
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    //  productos duplicados
    if (pedido.some((produtoState) => produtoState.id === producto.id)) {
      //Actualizar la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      ); //Si el pedido es igual al id de producto, devolve producto(osea comete lo que ya habia), caso contrario, devolve lo que ya estaba en pedido.
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente");
    } else {
      //Nota:Aqui estamos agregando ya los pedido, pero el problema es que se esta pasando el atributo de imagen y categoria. POR ESO SE SACARON DOS ELEMENTOS Y SE RE COPIO EL OBJETO
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido");
    }
    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    //Extrallendo del pedido el producto seleccionado
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };
  const handleEliminarProducto = (id) => {
    const productoEliminado = pedido.filter((producto) => producto.id !== id);
    setPedido(productoEliminado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      /*const {data} =*/ await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      //Resetear la app despues de agregar una orden (OJO: TENEMOS QUE RESETEAR EL STATE PERO NO TODO!! NO ES BUENO RESETEAR CATEGORIAS(API) Porque va quitar recurso)
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Pedido Realiado Correctamente");
      
      setTimeout(() => {
        router.push("/");
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuiscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        pedido,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuiscoContext.Provider>
  );
};

export { QuiscoProvider };

export default QuiscoContext;
