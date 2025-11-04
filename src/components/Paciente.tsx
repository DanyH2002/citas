import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formatearFecha } from '../helpers';

export default function Paciente({ 
    item, 
    setModalVisible, 
    setPaciente, 
    setModalPaciente, 
    pacienteEliminar }: any) {
    const { nombre, fecha, id } = item;

    return (
        <Pressable
            onPress={() => {
                setPaciente(item);
                setModalPaciente(true)
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>
                    Paciente:
                </Text>
                <Text style={styles.texto}>
                    {nombre}
                </Text>
                <Text style={styles.fecha}>
                    {formatearFecha(fecha)}
                </Text>

                <View style={styles.contenedorBotones}>
                    <Pressable style={[styles.btn, styles.btnEditar]}
                        onPress={() => {
                            setPaciente(item)
                            setModalVisible(true)
                        }}
                    >
                        <Text style={styles.btnTexto}>
                            Editar
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.btn, styles.btnEliminar]}
                        onLongPress={() => { pacienteEliminar(id) }}
                    >
                        <Text style={styles.btnTexto}>
                            Eliminar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#FFF',
        padding: 20,
        borderBottomColor: '#94a3B8',
        borderBottomWidth: 1
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    texto: {
        color: '#6D28D9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    fecha: {
        color: '#374151'
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    btnEditar: {
        backgroundColor: '#F59E0B'
    },
    btnEliminar: {
        backgroundColor: '#EF4444'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }

})