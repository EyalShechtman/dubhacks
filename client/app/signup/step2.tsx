import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, PanResponder, Animated,Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
interface CustomSliderProps {
    value: number;
    onValueChange: (value: number) => void;
    minimumValue: number;
    maximumValue: number;
}
const CustomSlider: React.FC<CustomSliderProps> = ({ value, onValueChange, minimumValue, maximumValue }) => {
    const [sliderWidth, setSliderWidth] = useState(0);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newValue = (gestureState.moveX / sliderWidth) * (maximumValue - minimumValue) + minimumValue;
            onValueChange(Math.round(Math.max(minimumValue, Math.min(maximumValue, newValue))));
        },
    });

    return (
        <View
            style={styles.sliderContainer}
            onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
            {...panResponder.panHandlers}
        >
            <View style={styles.sliderTrack} />
            <View style={[styles.sliderFill, { width: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` }]} />
            <View style={[styles.sliderThumb, { left: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` }]} />
        </View>
    );
};

export default function SignupStep2() {
    const navigation = useNavigation();
    const [budgetValues, setBudgetValues] = useState([
        { category: 'Food', amount: 2500 },
        { category: 'Health', amount: 3500 },
        { category: 'Travel', amount: 750 },
        { category: 'Other', amount: 1000 }
    ]);
    const[loading,setLoading]=useState(true);
    const[updateing,setUpdating]=useState(false);
    const { authorize, getCredentials, getUser } = useAuth0();
    const buttonScale = useRef(new Animated.Value(1)).current;
    useEffect(()=>{
        async function getPredictedBudget(){
            try{
                setLoading(true);
                const user = await getUser();

                const email = user ? user.email : "";
                const response= await fetch('http://localhost:4000/perplexity_predict/perplexity_predict',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({email:email})
                });
                const result= await response.json();
                if(response.ok && result.budget){
                    const[food, health,travel,other]=result.budget.split('|').map(Number);
                    setBudgetValues([
                        { category: 'Food', amount: food },
                        { category: 'Health', amount: health },
                        { category: 'Travel', amount: travel },
                        { category: 'Other', amount: other }
                    ]);
                }else{
                    Alert.alert("Could not fetch predicted budgets");
                }
            }
            catch(error){
                console.error('Error fetching predicted budgets, ',error);
            }
            finally{
                setLoading(false);
            }
        }
        getPredictedBudget();
    },[]);
    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const navigateToStep = (step) => {
        animateButton();
        setTimeout(() => navigation.navigate(`signup/${step}`), 200);
    };

    const updateBudget = (index: number, newAmount: number) => {
        const updatedBudget = [...budgetValues];
        updatedBudget[index].amount = Math.min(Math.max(Math.round(newAmount), 0), 5000);
        setBudgetValues(updatedBudget);
    };
    const submitBudget = async () => {
        try {
            setUpdating(true);
            // Prepare data for POST request
            const budget = {
                food: { max: budgetValues[0].amount },
                health: { max: budgetValues[1].amount },
                travel: { max: budgetValues[2].amount },
                other: { max: budgetValues[3].amount }
            };

            const response = await fetch('http://localhost:4000/perplexity_predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, budget:budget }) 
            });

            if (response.ok) {
                navigation.navigate('step3');
            } else {
                Alert.alert('Failed to update budget.');
            }
        } catch (error) {
            console.error('Error updating budget:', error);
            Alert.alert('Error updating budget.');
        } finally {
            setUpdating(false);
        }
    };
    if (loading) {
        // Show a loading spinner or some message while fetching predicted budgets
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#66B13E" />
                <Text style={styles.loadingText}>Loading your budget...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                
                <View style={styles.dotsContainer}>
                    <TouchableOpacity onPress={() => navigateToStep('step1')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step2')}>
                        <View style={styles.dot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step3')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How is your budget?</Text>
                </View>
                
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {budgetValues.map((item, index) => (
                        <View key={index} style={styles.budgetItem}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.categoryText}>{item.category}</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    value={item.amount.toString()}
                                    onChangeText={(text) => updateBudget(index, parseInt(text) || 0)}
                                    keyboardType="number-pad"
                                    accessibilityLabel={`${item.category} budget amount`}
                                    maxLength={4}
                                />
                            </View>
                            <CustomSlider
                                minimumValue={0}
                                maximumValue={5000}
                                value={item.amount}
                                onValueChange={(value: number) => updateBudget(index, value)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <Animated.View style={[styles.continueButtonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity 
                        style={styles.continueButton} 
                        onPress={submitBudget}
                        accessibilityLabel="Continue to next step"
                    >
                        {updateing ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.continueButtonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
    dotsContainer: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
    dotInactive: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 4,
    },
    textContainer: {
        marginTop: 100,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    budgetItem: {
        marginBottom: 30,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#000000',
        fontWeight: '500',
    },
    amountInput: {
        width: 80,
        height: 40,
        borderColor: '#66B03E',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: 'right',
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    continueButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    continueButton: {
        backgroundColor: '#C0DFB0',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    continueButtonText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sliderContainer: {
        height: 30,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#EAEAEA',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 1,
        paddingHorizontal: 10, // Add padding to extend background
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#CCCCCC',
        borderRadius: 2,
        position: 'relative', // Add this to position the track
        width: '100%', // Ensure the track fills the container width
    },
    sliderFill: {
        height: 4,
        backgroundColor: '#66B03E',
        borderRadius: 2,
        position: 'absolute',
        left: 0, // Align to the left of the track
    },
    sliderThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#66B03E',
        position: 'absolute',
        top: 5,
        marginLeft: -10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
});
