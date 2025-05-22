import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fields } from '../data/fields';

type FormData = {
  asignatura: string;
  manosLevantadas: number;
  recursosBuscados: number;
  participacion: number;
  diasAusentes: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleGoBack = () => navigate('/');

  const onSubmit = (data: FormData) => {
    const cursosArray = data.asignatura.split(',').map(c => c.trim());

    const formattedData = {
      cursos: cursosArray,
      manosLevantadas: Number(data.manosLevantadas),
      recursosBuscados: Number(data.recursosBuscados),
      participacion: Number(data.participacion),
      diasAusentes: Number(data.diasAusentes),
    };

    console.log("Datos listos para enviar:", formattedData);
    reset();
  };

  return (
    <section
      className="relative sm:max-w-xl outline m-auto outline-white bg-white min-h-screen"
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      <div className='flex gap-2 items-center pt-6 pb-4 mx-7 px-3 border-b-2 border-[#0000001A] shadow-md'>
        <ChevronLeft onClick={handleGoBack} color="#000000B2" size={30} className='cursor-pointer' />
        <p className='text-xl font-medium'>Datos del estudiante</p>
      </div>

      <div className='px-7 mt-10 flex gap-3'>
        <span className='w-10 h-10 bg-[#0000001A] block rounded-full' />
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
            type="button"
            onClick={() => reset()}
            className='w-full border-2 mt-7 bg-white text-black rounded-[6px] font-medium py-2'
          >
            Cancelar
          </button>
          <button
            type="submit"
            className='w-full border-2 mt-7 bg-black text-white rounded-[6px] font-medium py-2'
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}
