export type paciente = {
    id: string;
    nombre: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
}

export type FormularioProps = {
    cerrarModal: () => void;
    pacientes: paciente[];
    paciente: paciente | null;
    setPacientes: React.Dispatch<React.SetStateAction<paciente[]>>;
    setPaciente: React.Dispatch<React.SetStateAction<paciente | null>>;
}