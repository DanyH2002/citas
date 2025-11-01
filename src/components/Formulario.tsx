import React, { useState, useEffect } from 'react'
import { Modal, Pressable, ScrollView, Text, TextInput, View, StyleSheet, Button, Platform } from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FormularioProps, paciente } from '../types/Paciente';
import { formatearFecha } from '../helpers';

export default function Formulario({ cerrarModal, pacientes, paciente, setPacientes, setPaciente }: FormularioProps) {
    const [nombrePaciente, setNombrePaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    const insets = useSafeAreaInsets();

    function handleCita() {
        if ([nombrePaciente, propietario, email, telefono].includes('')) {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (paciente?.id) {
            const pacienteActualizado = pacientes.map(
                p => p.id === paciente.id ? {
                    ...p, nombre: nombrePaciente, propietario, email, telefono, fecha: date
                } : p
            )
            setPacientes(pacienteActualizado);
        } else {
            const nuevoPaciente = {
                id: Date.now().toString(),
                nombre: nombrePaciente,
                propietario,
                email,
                telefono,
                fecha: date,
            };
            setPacientes([nuevoPaciente, ...pacientes]);
        }
        limpiarFormulario();
        cerrarModal()
    }

    useEffect(() => {
        if (paciente?.id) {
            setNombrePaciente(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setTelefono(paciente.telefono);
            setDate(new Date(paciente.fecha));
        }
    }, [paciente])

    function limpiarFormulario() {
        setNombrePaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setDate(new Date());
        setPaciente({} as any);
    }

    return (
        <Modal animationType='slide' visible={true}>
            <ScrollView style={[styles.contenido, { padding: insets.top }]}>
                <Text style={styles.titulo}>{paciente?.id ? 'Editar Cita' : 'Nueva Cita'}</Text>
                <Pressable
                    onPress={() => {
                        limpiarFormulario(),
                        cerrarModal()
                    }
                    }
                    style={styles.btnCancelar}>
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>
                <View>
                    <Text style={styles.label}>Nombre Paciente</Text>
                    <TextInput style={styles.input}
                        placeholder='Nombre Paciente'
                        placeholderTextColor={'#666'}
                        value={nombrePaciente}
                        onChangeText={setNombrePaciente}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Nombre Propietario</Text>
                    <TextInput style={styles.input}
                        placeholder='Nombre Propietario'
                        placeholderTextColor={'#666'}
                        value={propietario}
                        onChangeText={setPropietario}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder='Email del Propietario'
                        placeholderTextColor={'#666'}
                        value={email}
                        keyboardType='email-address'
                        onChangeText={setEmail}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Telefono</Text>
                    <TextInput style={styles.input}
                        placeholder='Telefono del Propietario'
                        placeholderTextColor={'#666'}
                        value={telefono}
                        keyboardType='phone-pad'
                        onChangeText={setTelefono}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Fecha Cita</Text>
                    <View style={styles.fechaContenedor}>
                        {Platform.OS === 'web' && (
                            <View style={styles.campoWeb}>
                                <label htmlFor="fechaCita" style={styles.labelWeb}>
                                    Selecciona la fecha:
                                </label>
                                <input
                                    id="fechaCita"
                                    type="date"
                                    title="Selecciona una fecha"
                                    value={date.toISOString().split('T')[0]}
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                    className="input-fecha"
                                    style={styles.inputFecha}
                                />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <>
                                <Pressable style={styles.btnFecha} onPress={() => setShow(true)}>
                                    <Text style={styles.btnFechaTexto}>
                                        Seleccionar Fecha: {(date).toLocaleDateString()}
                                    </Text>
                                </Pressable>
                                {show && (
                                    <DatePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            const currentDate = selectedDate || date
                                            setShow(false)
                                            setDate(currentDate)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        {Platform.OS === 'ios' && (
                            <>
                                <Pressable style={styles.btnFecha} onPress={() => setShow(true)}>
                                    <Text style={styles.btnFechaTexto}>
                                        Seleccionar Fecha: {(date).toLocaleDateString()}
                                    </Text>
                                </Pressable>
                                {show && (
                                    <View style={styles.pickerContainer}>
                                        <DatePicker
                                            value={date}
                                            mode="date"
                                            display="spinner"
                                            onChange={(event, selectedDate) => {
                                                if (event.type === 'dismissed') {
                                                    setShow(false)
                                                    return
                                                }
                                                const currentDate = selectedDate || date
                                                setShow(false)
                                                setDate(currentDate)
                                            }}
                                        />
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </View>
                <Pressable
                    style={styles.btnNuevaCita}
                    onPress={handleCita}
                >
                    <Text style={styles.btnNuevaCitaTexto}>{paciente?.id ? 'Actualizar Cita' : 'Guardar Cita'}</Text>
                </Pressable>
            </ScrollView>
        </Modal>

    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    // campo: {
    //     marginTop: 10,
    //     marginHorizontal: 30,
    // },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    sintomasInput: {
        height: 100
    },
    fechaContenedor: {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campoWeb: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    labelWeb: {
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        fontSize: 16
    },
    inputFecha: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 16,
        color: '#333',
        fontFamily: 'System',
    },
    btnFecha: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center'
    },
    btnFechaTexto: {
        color: '#333',
        fontSize: 16,
        fontStyle: 'italic'
    },
    pickerContainer: {
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: '#FFF',   
        // overflow: 'hidden',
    },
    datePicker: {
        width: '100%',
    }
})