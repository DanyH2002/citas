import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formatearFecha } from '../helpers';


export default function Paciente({ item, setModalVisible, setPaciente, setModalPaciente }: any) {
    const { nombre, fecha, id } = item;
    return (
        <Pressable>
            <View>
                <Text>
                    Paciente:
                </Text>
                <Text>
                    {nombre}
                </Text>
                <Text>
                    {formatearFecha(fecha)}
                </Text>
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