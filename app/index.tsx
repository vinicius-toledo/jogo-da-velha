// app/index.tsx
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles"; // Assumindo que o arquivo styles.ts está na mesma pasta ou em pasta acessível

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Jogo da Velha!</Text>

            {/* O componente Link é a forma padrão de navegação do Expo Router */}
            <Link href="/screens/home" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Jogo</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}