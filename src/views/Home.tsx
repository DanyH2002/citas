import React, { useState } from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import Formulario from '../components/Formulario';

export const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const cerrarModal = () => {
        setModalVisible(false)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Administrador de Citas </Text>
            <Text style={styles.tituloBold}> Veterinaria </Text>
            <Pressable
                style={styles.btnNuevaCita}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.btnTextoNuevaCita}> Nueva Cita</Text>
            </Pressable>

            {modalVisible && (
                <Formulario cerrarModal={cerrarModal}></Formulario>
            )}
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