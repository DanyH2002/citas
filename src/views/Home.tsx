import React, { useState } from 'react'
import { Pressable, Text, View, StyleSheet, Modal, FlatList } from 'react-native'
import Formulario from '../components/Formulario';
import type { paciente } from '../types/Paciente';
import InformacionPaciente from '../components/InformacionPaciente';
import Paciente from '../components/Paciente';

export const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pacientes, setPacientes] = useState<paciente[]>([]);
    const [paciente, setPaciente] = useState<paciente | null>(null);
    const [modalPaciente, setModalPaciente] = useState(false);

    const cerrarModal = () => {
        setModalVisible(false)
    }

    function pacienteEditar(id: string) {
        const pacienteSeleccionado = pacientes?.filter(paciente => paciente.id === id)[0];
        setPaciente(pacienteSeleccionado);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Administrador de Citas </Text>
            <Text style={styles.tituloBold}> Veterinaria </Text>
            {pacientes.length === 0 ? (
                <Text style={styles.noPacientes}> No hay pacientes aún </Text>
            ) : (
                <FlatList
                    style={styles.listado}
                    data={pacientes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Paciente
                                item={item}
                                setModalVisible={setModalVisible}
                                setPaciente={setPaciente}
                                setModalPaciente={setModalPaciente}
                                pacientes={pacientes}
                                setPacientes={setPacientes}
                            >
                            </Paciente>
                        )
                    }}
                >
                </FlatList>
            )}
            <Pressable
                style={styles.btnNuevaCita}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.btnTextoNuevaCita}> Nueva Cita</Text>
            </Pressable>

            {modalVisible && (
                <Formulario
                    cerrarModal={cerrarModal}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                ></Formulario>
            )}

            <Modal visible={modalPaciente} animationType='slide'>
                <InformacionPaciente
                    paciente={paciente}
                    setPaciente={setPaciente}
                    setModalPaciente={setModalPaciente}
                >
                </InformacionPaciente>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F6',
        flex: 1
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        color: '#374151',
        fontWeight: '600'
    },
    tituloBold: {
        fontWeight: '900',
        color: '#6D28D9',
    },
    btnNuevaCita: {
        backgroundColor: '#6D28D9',
        padding: 15,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    btnTextoNuevaCita: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    noPacientes: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600'
    },
    listado: {
        marginTop: 50,
        marginHorizontal: 30
    }
})