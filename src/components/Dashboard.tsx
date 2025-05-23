import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fields } from '../data/fields';
import { transformCourses } from '../utils/courses';
import { postPrediction } from '../services/prediction';
import { useState } from 'react';

type FormData = {
  genero?: number;
  grado?: number;
  asignatura: string;
  manos_levantadas: number;
  recursos_visitados: number;
  dias_de_ausencia: number;
  participacion: number;
}
export type SendData = Omit<FormData, 'asignatura'> & {
  asignatura: number;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleGoBack = () => navigate('/');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const formattData = {
      genero: 0,
      grado: 10,
      asignatura: transformCourses(data.asignatura),
      manos_levantadas: Number(data.manos_levantadas),
      recursos_visitados: Number(data.recursos_visitados),
      participacion: Number(data.participacion),
      dias_de_ausencia: Number(data.dias_de_ausencia),
    }

    try {
      const getData = await postPrediction(formattData);
      if (getData) {
        navigate('/results', { state: getData });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      return;
    } finally {
      setIsLoading(false);
      reset();
    }

    const getData = await postPrediction(formattData);
    if (getData) {
      navigate('/results', { state: getData });
    }
    reset();
  };

  return (
    <section
      className="relative sm:max-w-xl outline m-auto bg-white min-h-screen"
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      {/* MODAL DE CARGA */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="loader mb-4 mx-auto border-4 border-gray-300 border-t-black rounded-full w-10 h-10 animate-spin" />
            <p className="font-semibold">Procesando predicción...</p>
          </div>
        </div>
      )}

      <div className='flex gap-2 items-center pt-6 pb-4 mx-7 px-3 border-b-2 border-[#0000001A] shadow-md'>
        <ChevronLeft onClick={handleGoBack} color="#000000B2" size={30} className='cursor-pointer' />
        <p className='text-xl font-medium'>Inicio</p>
      </div>
      <p className="px-7 text-xl mt-6 font-semibold">Formulario del Estudiante:</p>
      <div className='px-7 mt-5 flex gap-3'>
        <img
          className=" w-10 h-10 top-[302px] left-[30px] object-cover z-50 cursor-pointer"
          src="/Avatar.png"
          alt="imageUser"
        />
        <div className='flex flex-col'>
          <p className='font-medium'>Juan Pérez (varón)</p>
          <p className='text-xs text-[#00000080]'>Género: Femenino | Grado: 10</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div className='px-7 mt-3' key={index}>
            <p className='text-sm font-medium'>{field.label}</p>
            <input
              {...register(field.name as keyof FormData)}
              type={field.type}
              placeholder={field.placeholder}
              className="no-spinner outline-none border border-[#0000001A] text-sm py-2 my-1 rounded-[6px] w-full px-4"
            />
            <p className='text-[#00000080] text-xs'>{field.helperText}</p>
          </div>
        ))}

        <div className='flex gap-2 px-7'>
          <button
            type="submit"
            className='cursor-pointer w-full border-2 mt-7 bg-black text-white rounded-[6px] font-medium py-2'
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}
