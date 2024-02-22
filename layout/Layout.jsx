import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Pasos from "../components/Pasos";
import Modal from "react-modal";
import {ToastContainer} from 'react-toastify'//Este es para registrar el toast donde se va mostrar, por eso lo pongo en el layout
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hooks/useQuiosco";

import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next"); //acordate que con vite, cambia y seria #root

const Layout = ({ children, pagina }) => {
  const { modal } = useQuiosco(); //Necesito pasar el booleano para saber cuando se muetra y cuando no (esto se hizo en el componente de producto en el button)

  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <Pasos />
          <div className="p-10">{children}</div>
        </main>
      </div>
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto/>
        </Modal>
      )}
      <ToastContainer/>
    </>
  );
};

export default Layout;
