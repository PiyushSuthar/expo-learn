import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Appbar, MD3Colors, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import * as expoSharing from 'expo-sharing'
import * as expoManipulator from 'expo-image-manipulator'

export default function App() {
  const [selectState, setSelectState] = useState({})
  
  let openImageAsync = async () =>{
    let pickerresult = await ImagePicker.launchImageLibraryAsync()
    if(pickerresult.cancelled === true) {
        return
    }
    setSelectState(pickerresult)
  }

    let shareImageAsync = async () => {
        let tempImg = await expoManipulator.manipulateAsync(selectState.uri)
        await expoSharing.shareAsync(tempImg.uri)
    }
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar animated style='auto' />
        <Image source={{ uri: selectState.uri ||"https://i.imgur.com/TkIrScD.png" }}
          style={{
              height: 350,
            width: 350,
            borderRadius: 10,
            margin: 10,
            resizeMode: "contain"
          }}
        />
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Button mode='contained-tonal' onPress={openImageAsync}>Pick Image</Button>
            <Button mode='contained-tonal' onPress={shareImageAsync}>Share</Button>
        </View>
          </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
