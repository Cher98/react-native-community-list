import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../actions';
import {RootState} from '../store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Main = () => {
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();
  const getData = () => dispatch({type: actions.FETCH_DATA_REQUEST});
  const data = useSelector((state: RootState) => state.reducer.data);
  useEffect(() => {
    dispatch({type: actions.FETCH_DATA_REQUEST});
    dispatch({type: actions.FETCH_REPO_MAIN});
  }, []);
  const repo = useSelector((state: RootState) => state.reducer);
  const loading = repo.loading;
  const endOfList = repo.endOfList;
  const filterRepo = repo.data.filter((r: any) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const Item = ({data}: {data: any}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {
          name: data.name,
          description: data.description,
          stars: data.stargazers_count,
          forks: data.forks_count,
          watchers: data.watchers_count,
          language: data.language,
          imgUrl: data.owner.avatar_url,
        });
      }}
      style={{
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 20, color: '#1f6feb', fontWeight: '700'}}>
          {data.name}
        </Text>
        <Text style={{fontSize: 15, color: 'grey'}}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const header = () => (
    <View
      style={{
        padding: 10,
        marginBottom: 20,
        marginTop: 10,
        width: '100%',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row'}}>
        {repo.data2?.avatar_url && (
          <Image
            source={{uri: repo.data2.avatar_url}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              objectFit: 'cover',
            }}
          />
        )}
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: '700',
            }}>
            {repo?.data2.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}>
            {repo?.data2.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{alignItems: 'center', flex: 1, backgroundColor: '#0a0e12'}}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 15,
            paddingBottom: 20,
            backgroundColor: '#010307',
          }}>
          <Icon name="github" size={30} color={'white'} />
          <TextInput
            onChangeText={e => setSearch(e)}
            placeholder="Search..."
            placeholderTextColor={'black'}
            style={{
              marginTop: 10,
              marginLeft: 5,
              backgroundColor: 'lightgrey',
              width: '90%',
              borderRadius: 10,
              fontSize: 15,
              height: 30,
              padding: 20,
            }}
          />
        </View>
        <View style={{flex: 1, width: '90%'}}>
          <FlatList
            style={{flex: 1}}
            data={filterRepo}
            ListHeaderComponent={header}
            renderItem={({item, index}: {item: any; index: number}) => (
              <Item key={index} data={item} />
            )}
            ListFooterComponent={() =>
              endOfList ? (
                <View style={{paddingBottom: 15}}>
                  <Text
                    style={{
                      color: 'white',
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    NO MORE TO SHOW.
                  </Text>
                </View>
              ) : (
                <>
                  {loading ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 15,
                      }}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        setItemsPerPage(itemsPerPage + 5);
                        dispatch({
                          type: actions.FETCH_MORE_DATA,
                          payload: {count: itemsPerPage},
                        });
                      }}
                      style={{
                        alignItems: 'center',
                        paddingBottom: 15,
                      }}>
                      <Text
                        style={{color: 'white', textAlignVertical: 'center'}}>
                        LOAD MORE
                      </Text>
                    </Pressable>
                  )}
                </>
              )
            }
            onEndReachedThreshold={0.3}
          />
        </View>
      </View>
    </View>
  );
};

export default Main;
