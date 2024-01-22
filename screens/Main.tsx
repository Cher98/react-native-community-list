import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

const Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: '15%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='github' size={60} color={'black'} />
                <Text style={{ fontSize: 17, marginTop: 8, color: 'black', fontWeight: '700' }}>React Native Community</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TextInput placeholder='Search...' placeholderTextColor={'black'} style={{ backgroundColor: 'lightgrey', width: '90%', borderRadius: 10, marginVertical: 20, fontSize: 15 }} />
                <TouchableOpacity style={{ width: '95%', borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10 }}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#1f6feb', fontWeight: '700' }}>cli</Text>
                        <Text style={{ fontSize: 15, color: 'grey' }}>React Native command line tools</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Main;