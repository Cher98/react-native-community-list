import {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../actions';
import {RootState} from '../store';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => dispatch({type: actions.FETCH_DATA_REQUEST});
  const data = useSelector((state: RootState) => state.reducer.data);
  // console.log(data);

  const Item = ({name, description}: {name: string; description: string}) => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 20, color: '#1f6feb', fontWeight: '700'}}>
          {name}
        </Text>
        <Text style={{fontSize: 15, color: 'grey'}}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: '15%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="github" size={60} color={'black'} />
        <Text
          style={{
            fontSize: 17,
            marginTop: 8,
            color: 'black',
            fontWeight: '700',
          }}>
          React Native Community
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'black'}
          style={{
            backgroundColor: 'lightgrey',
            width: '90%',
            borderRadius: 10,
            marginVertical: 35,
            fontSize: 15,
          }}
        />
        <FlatList
          data={data}
          contentContainerStyle={{
            alignSelf: 'center',
            width: '90%',
            flexGrow: 1,
          }}
          renderItem={({item, index}: {item: any; index: number}) => (
            <Item key={index} name={item.name} description={item.description} />
          )}
        />
      </View>
    </View>
  );
};

export default Main;
