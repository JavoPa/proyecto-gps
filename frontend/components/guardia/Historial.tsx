import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { getAllHistorial } from '@/services/historial.service';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

interface HistorialItem {
    _id: string;
    usuario: {
        nombre: string;
        apellido: string;
        rut: string;
    };
    entrada: string | null;
    salida: string | null;
}

const HistorialViewer: React.FC = () => {

    const getCurrentMonth = () => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    };

    const [historial, setHistorial] = useState<HistorialItem[]>([]);
    const [filteredHistorial, setFilteredHistorial] = useState<HistorialItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth()); // Format: YYYY-MM

    const getPastMonths = () => {
        const months = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const startYear = 2020;

        let year = currentYear;
        let month = today.getMonth();

        while (year >= startYear) {
            if (month < 0) {
                year--;
                month = 11;
            }

            const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
            if (year >= startYear) {
                months.push(yearMonth);
            }
            month--;
        }

        return months;
    };

    useFocusEffect(
        useCallback(() => {
            fetchHistorial();
        }, [])
    );

    const fetchHistorial = useCallback(async () => {
        try {
            const data = await getAllHistorial();
            setHistorial(data);
            setFilteredHistorial(data);
        } catch (error) {
            console.error('Error al obtener el historial:', error);
            Alert.alert('Error', 'No se pudo cargar el historial de accesos');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredHistorial(historial);
        } else {
            const filtered = historial.filter(item =>
                item.usuario.rut.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredHistorial(filtered);
        }
    };

    const getMonthlyData = (date: string) => {
        const [year, month] = date.split('-').map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();
        const dailyAccessCounts = Array(daysInMonth).fill(0);

        historial.forEach(item => {
            if (item.entrada) {
                const entryDate = new Date(item.entrada);
                if (entryDate.getMonth() === month - 1 && entryDate.getFullYear() === year) {
                    dailyAccessCounts[entryDate.getDate() - 1]++;
                }
            }
        });

        return dailyAccessCounts;
    };

    const chartData = {
        labels: Array.from({ length: new Date(selectedMonth + '-01').getDate() }, (_, i) => (i + 1).toString()),
        datasets: [
            {
                data: getMonthlyData(selectedMonth),
                color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    const renderItem = ({ item }: { item: HistorialItem }) => (
        <View style={styles.item}>
            <Text style={styles.text}>Rut: {item.usuario.rut}</Text>
            <Text style={styles.text}>Nombre: {item.usuario.nombre + " " + item.usuario.apellido}</Text>
            <Text style={styles.text}>Entrada: {item.entrada ? new Date(item.entrada).toLocaleString() : 'No registrada'}</Text>
            <Text style={styles.text}>Salida: {item.salida ? new Date(item.salida).toLocaleString() : 'No registrada'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, viewMode === 'list' && styles.activeButton]}
                    onPress={() => setViewMode('list')}
                >
                    <Text style={styles.buttonText}>Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, viewMode === 'chart' && styles.activeButton]}
                    onPress={() => setViewMode('chart')}
                >
                    <Text style={styles.buttonText}>Gráfico</Text>
                </TouchableOpacity>
            </View>

            {viewMode === 'list' && (
                <>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={handleSearch}
                        placeholder="Buscar por RUT"
                    />
                    {loading ? (
                        <Text>Cargando...</Text>
                    ) : (
                        <FlatList
                            data={filteredHistorial}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.list}
                        />
                    )}
                </>
            )}

            {viewMode === 'chart' && (
                <ScrollView horizontal contentContainerStyle={styles.chartContainer}>
                    <View style={styles.chartInnerContainer}>
                        <Text style={styles.pickerLabel}>Selecciona el Mes</Text>
                        <Picker
                            selectedValue={selectedMonth}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        >
                            {getPastMonths().map(month => {
                                const [year, monthNum] = month.split('-');
                                return (
                                    <Picker.Item
                                        key={month}
                                        label={`${monthNum}/${year}`}
                                        value={month}
                                    />
                                );
                            })}
                        </Picker>
                        <LineChart
                            data={chartData}
                            width={Dimensions.get('window').width * 1.5} // Ajusta el ancho para el gráfico
                            height={220} // Ajusta la altura del gráfico
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 4,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    item: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    chartInnerContainer: {
        width: Dimensions.get('window').width * 1.5, // Ajusta el ancho del contenedor del gráfico
        alignItems: 'center',
    },
    chart: {
        borderRadius: 16,
        marginVertical: 8,
    },
    pickerLabel: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 8,
        color: '#333',
    },
    picker: {
        textAlign: 'center',
        width: '50%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: '#fff',
        color: '#333',
    },
});

export default HistorialViewer;
