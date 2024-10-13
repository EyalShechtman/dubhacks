import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartComponent = () => {
    const screenWidth = Dimensions.get('window').width;

    // Dummy data showing growth
    const data = {
        // labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
        datasets: [
            {
                data: [100, 150, 200, 250, 300, 350],
                color: () => `#FFFFFF`, // White line color
            },
        ],
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#66B13E', margin: 10 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, marginBottom: -30 }}>
                Stock Growth Chart
            </Text>
            <LineChart
                data={data}
                width={screenWidth - 40} // Adjust width to fit the screen
                height={220}
                chartConfig={{
                    backgroundColor: '#66B13E', // Green background
                    backgroundGradientFrom: '#66B13E',
                    backgroundGradientTo: '#66B13E',
                    decimalPlaces: 2, // optional, defaults to 2 decimal places
                    color: () => `#FFFFFF`, // White line
                    labelColor: () => `#FFFFFF`, // White label
                    style: {
                        borderRadius: 16,
                    },
                }}
                bezier // Makes the line smooth
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default LineChartComponent;
