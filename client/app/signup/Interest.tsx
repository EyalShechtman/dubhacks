import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,Alert,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const InterestPage = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const[loading,setLoading]=useState(false);
  const navigation = useNavigation();
  const { authorize, getCredentials, getUser } = useAuth0();
  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput('');
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const submitInterests=async()=>{
    if(items.length==0){
      Alert.alert('No Interests added');
      return;
    }
    try{
      setLoading(true);

      const user = await getUser();

      const email = user ? user.email : "";
      const response=await fetch('http://localhost:4000/interest_update',{
        method:'POST',
        headers:{'Content-Type':'application/json',},
        body:JSON.stringify({email:email,interests:items})
      });

      if(response.ok){
        navigation.navigate('step3');
      }
      else{
        Alert.alert('Failed to update interests.')
      }
    }
    catch(error){
      console.error('Could not submit interests ',error);
      Alert.alert('Could not submit interests');
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>

        <Text style={styles.title}>What do you do on your vacations?</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="enter your favorite activites..."
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={addItem} // Submit on Enter/Done
            returnKeyType="done" // Makes keyboard display "Done" instead of "Next"
          />
        </View>

        <View style={styles.itemContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {loading ? (
                <ActivityIndicator size="large" color="#28A745" />
            ) : (
                <TouchableOpacity  onPress={()=>submitInterests()}style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit Interests</Text>
                </TouchableOpacity>
            )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home/Home')}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Link Credit Card</Text>
          </View>
        </TouchableOpacity>

      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#fff',
      width: '100%',
    },
    inputWrapper: {
      width: '75%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    itemBox: {
      flexDirection: 'row', // Align text and "X" horizontally
      alignItems: 'center', // Center text and "X"
      width: '28%', // Smaller width
      padding: 8, // Reduced padding
      backgroundColor: '#eee',
      borderRadius: 5,
      marginBottom: 10,
      marginHorizontal: '1.5%',
    },
    itemText: {
      fontSize: 14, // Smaller font size
      marginRight: 5, // Add spacing between text and "X"
    },
    removeButton: {
      backgroundColor: '#FF6347',
      padding: 3, // Smaller padding for "X" button
      borderRadius: 3,
    },
    removeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12, // Smaller "X"
    },
    button: {
      marginTop: 20,
      backgroundColor: '#FFFFFF',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 25,
      width: '80%',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#66B13E',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });
    
export default InterestPage;
