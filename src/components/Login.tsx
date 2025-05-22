import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleNextDashboard = () => {
    navigate('/dashboard');
  }
  return (
    <section className="relative sm:max-w-xl outline m-auto outline-white" style={{ fontFamily: 'var(--font-roboto)' }}>
      <div className="bg-[#D9D9D9] h-[368px]"/>
      <img 
        className="absolute top-[302px] left-[30px] object-cover z-50 cursor-pointer"
        src="/account_circle.png"
        alt="imageUser"
      />
      <div className="bg-white h-[calc(100vh-368px)] px-10 pt-16">
        <h2 className="text-xl font-medium">Inicio de Sesión</h2>
        <div className="mt-4">
          <p className="text-sm font-medium pb-1">
            ID de estudiante
          </p>
          <input
            className="outline-none border-[#0000001A] border-1 py-2 rounded-[6px] w-full px-4"
            placeholder="Ingresa tu ID(ej: MX-2024-5678)" 
          />
        </div>
        <button onClick={handleNextDashboard} className="w-full border-2 mt-7 cursor-pointer bg-black text-white rounded-[6px] font-medium py-2">
          Ingresar
        </button>
      </div>
    </section>
  )
}
