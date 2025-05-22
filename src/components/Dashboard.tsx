import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleGoBack = () => { navigate('/'); };

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section className="relative sm:max-w-xl outline m-auto outline-white bg-white min-h-screen" style={{ fontFamily: 'var(--font-roboto)' }}>
      <div className='flex gap-2 items-center pt-6 pb-4 mx-7 px-3 border-b-2 border-[#0000001A] shadow-md'>
        <ChevronLeft onClick={handleGoBack} color="#000000B2" size={30} className='cursor-pointer' />
        <p className='text-xl font-medium'>Dashboard Principal</p>
      </div>
      <div className='px-7 mt-10 flex gap-3'>
        <span className='w-10 h-10 bg-[#0000001A] block rounded-full' />
        <div className='flex flex-col'>
          <p className='font-medium'>Juan Pérez (varón)</p>
          <p className='text-xs text-[#00000080]'>nivel secundario - 4to año</p>
        </div>
      </div>
      <div className='px-7 mt-8'>
        <p className='text-sm font-medium'>Asignatura</p>
        <input
          className="outline-none border-[#0000001A] text-sm border-1 py-2 my-2 rounded-[6px] w-full px-4"
          placeholder="Escribe aquí..."
        />
        <p className='text-[#00000080] text-xs'>Proporciona detalles sobre la actividad realizada.</p>
      </div>
      <div className='px-7 mt-8'>
        <p className='text-sm font-medium'>Grado de Estudio</p>
        <div className='flex gap-2 flex-wrap mt-2'>
          {grades.map((grade) => (
            <span key={grade} className='cursor-pointer inline-block bg-[#0000000D] px-4 rounded-[6px] py-1'>{grade}</span>
          ))}
        </div>
        <p className='text-[#00000080] text-xs mt-2'>Selecciona el grado de estudio de la actividad</p>
      </div>
      <div className='px-7 mt-8'>
        <p className='text-sm font-medium'>Días de ausencia</p>
        <input
          type='number'
          className="no-spinner outline-none border-[#0000001A] text-sm border-1 py-2 my-2 rounded-[6px] w-full px-4"
          placeholder="Escribe aquí..."
        />
        <p className='text-[#00000080] text-xs'>Comentarios y observaciones sobre el desempeño.</p>
      </div>
      <div className='flex gap-2 px-7'>
        <button className='w-full border-2 mt-7 cursor-pointer bg-white text-black rounded-[6px] font-medium py-2'>
          Cancelar
        </button>
        <button className='w-full border-2 mt-7 cursor-pointer bg-black text-white rounded-[6px] font-medium py-2'>
          Registrar Avance
        </button>
      </div>
    </section>
  )
}
