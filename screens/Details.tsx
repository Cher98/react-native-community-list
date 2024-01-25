import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Repo = {
  description: string;
  imgUrl: string;
  language: string;
  name: string;
  stars: number;
  watchers: number;
  forks: number;
};

const Details = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const {description, imgUrl, language, name, stars, watchers, forks} =
    route.params as Repo;
  return (
    <View style={{width: '100%', height: '100%', flex: 1, padding: 12}}>
      <View
        style={{
          flex: 1,
          //   borderWidth: 1,
          //   borderColor: 'white',
          //   borderRadius: 10,
          alignItems: 'center',
        }}>
        <Pressable
          style={{alignSelf: 'flex-start'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign
            name="arrowleft"
            size={25}
            color={'black'}
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 50,
              margin: 10,
              marginBottom: 0,
            }}
          />
        </Pressable>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 15,
          }}>
          <Image
            source={{uri: imgUrl}}
            style={{width: 200, height: 200, marginVertical: 20}}
          />
          <Text
            style={[
              styles.font,
              {fontSize: 28, fontWeight: '700', marginBottom: 10},
            ]}>
            {name}
          </Text>
          <Text style={[styles.font, {fontSize: 20}]}>{description}</Text>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <AntDesign name="star" size={40} color={'yellow'} />
            <Text style={[styles.font, styles.stats]}>{stars}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <AntDesign name="fork" size={40} color={'white'} />
            <Text style={[styles.font, styles.stats]}>{forks}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <AntDesign name="eyeo" size={40} color={'white'} />
            <Text style={[styles.font, styles.stats]}>{watchers}</Text>
          </View>
          <View
            style={{
              marginTop: 18,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 18,
            }}>
            <Text style={[styles.font, styles.stats]}>{language}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  font: {
    color: 'white',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  stats: {
    fontSize: 25,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
});
