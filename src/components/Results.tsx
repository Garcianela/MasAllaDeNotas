import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { getCourseName } from "../utils/courses";
import { useEffect, useState } from "react";
import { messageRecommendations } from "../utils/recommendations";

export default function Results() {
  const [nivel, setNivel] = useState<string>("Bajo")
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state

  const handleGoBack = () => navigate('/dashboard');
  const calcParticipacion = (participacion: number) => {
    const participacionPorcentaje = (participacion / 80) * 100;
    return `${participacionPorcentaje.toFixed(1)}%`;
  }

  useEffect(() => {
    if (data?.desempeno_predicho) {
      const porcentaje = data.desempeno_predicho;
      if (porcentaje >= 0 && porcentaje <= 39) setNivel("Bajo");
      else if (porcentaje >= 40 && porcentaje <= 69) setNivel("Medio");
      else if (porcentaje >= 70) setNivel("Alto");
    }
  }, [data]);

  return (
    <section
      className="relative sm:max-w-xl outline m-auto outline-white bg-white min-h-screen"
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      <div className='flex gap-2 items-center pt-6 pb-4 mx-7 px-3 border-b-2 border-[#0000001A] shadow-md'>
        <ChevronLeft onClick={handleGoBack} color="#000000B2" size={30} className='cursor-pointer' />
        <p className='text-xl font-medium'>Formulario del Estudiante</p>
      </div>
      <p className="mt-10 mx-7 py-3 px-5 outline outline-gray-300">
        <span className="text-[#00000080] font-bold pr-2">Curso:</span>
        {getCourseName(data.datos_usados.cursos)}
      </p>
      <p className="px-7 text-lg mt-5 font-medium">Porcentaje de rendimiento</p>
      <div className={`${nivel === 'Bajo' ? 'bg-[#CC0B00] outline-[#F00]' : nivel === 'Medio' ? 'bg-[#f0b630] outline-[#f0b630]' : 'bg-[#40DA3B] outline-[#40DA3B]'}
          mt-2 ml-7 p-1 px-2 inline-flex gap-2.5 items-center outline-2 text-white rounded-lg
        `}>
        <p className="text-[32px]">{calcParticipacion(data.desempeno_predicho)}</p>
        <p className="text-2xl font-medium">{nivel}</p>
      </div>
      <h3 className="px-7 text-lg mt-3 font-medium">Resumen estadistíca</h3>
      <div className="flex flex-col gap-4">
        <div className="mt-4 flex px-7 gap-4">
          <div className="flex-1 outline outline-[#0000001A] rounded-[6px] p-3">
            <p className="text-[#00000080]">Asistencia a otros estudiantes</p>
            <p className="font-medium text-xl mt-1">{data.datos_usados.manosLevantadas}</p>
          </div>
          <div className="flex-1 outline outline-[#0000001A] rounded-[6px] p-3">
            <p className="text-[#00000080]">Participacion en clases</p>
            <p className="font-medium text-xl mt-1">{data.datos_usados.participacion}</p>
          </div>
        </div>
        <div className="flex px-7 gap-4">
          <div className="flex-1 outline outline-[#0000001A] rounded-[6px] p-3">
            <p className="text-[#00000080]">Autoaprendizaje</p>
            <p className="font-medium text-xl mt-1">{data.datos_usados.recursosBuscados}</p>
          </div>
          <div className="flex-1 outline outline-[#0000001A] rounded-[6px] p-3">
            <p className="text-[#00000080]">Dias Ausentes</p>
            <p className="font-medium text-xl mt-1">{data.datos_usados.diasAusentes}</p>
          </div>
        </div>
        <p className={`${nivel === 'Bajo' ? 'bg-[#CC0B00] outline-[#F00]' : nivel === 'Medio' ? 'bg-[#f0b630] outline-[#f0b630]' : 'bg-[#40DA3B] outline-[#40DA3B]'} p-4 py-6 rounded-xl mx-7 text-white font-semibold text-xl mt-8` 
        }>
          {messageRecommendations(nivel)}
        </p>
      </div>
    </section>
  )
}
