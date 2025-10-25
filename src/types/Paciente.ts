export type Paciente = {
    id: string;
    nombre: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: Date;
}

export type FormularioProps = {
    cerrarModal: () => void;
    pacientes: Paciente[];
    paciente: Paciente | null;
    setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
    setPaciente: React.Dispatch<React.SetStateAction<Paciente | null>>;
}