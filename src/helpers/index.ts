export const formatearFecha = (fecha: string | number | Date) => {
    const nuevFecha = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return nuevFecha.toLocaleDateString('es-Es', opciones)
}