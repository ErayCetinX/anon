import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {oneQuestion} from '../../apollo/queries';
import {Icons} from '../../components/items';
import style from './QuestionStyle';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/items/Loading';

interface Props {
  route?: {
    params: {
      uuid: string;
    };
  };
}

const Question: React.FC<Props> = ({route}) => {
  const {data, error, loading} = useQuery(oneQuestion, {
    variables: {uuid: route?.params.uuid},
  });
  const navigation = useNavigation();

  return (
    <>
      {error?.message ? (
        <View>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={style.backBox}>
              <Icons name="arrow-back" size={30} />
            </TouchableOpacity>
          </View>
          <View style={style.content}>
            <Text style={style.contentText}>something went wrong</Text>
          </View>
        </View>
      ) : loading ? (
        <View style={{flex: 1}}>
          <Loading />
        </View>
      ) : (
        <ScrollView style={style.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={style.backBox}>
            <Icons name="arrow-back" size={30} />
          </TouchableOpacity>
          <View style={style.pdg}>
            <View style={style.header}>
              <Text style={style.titleText}>
                {data?.oneQuestion?.node.title}
              </Text>
            </View>
            <View style={style.content}>
              <Text style={style.contentText}>
                {data.oneQuestion.node.content}
              </Text>
            </View>
            <View style={style.answerCount}>
              <Text style={style.answerCountText}>
                Answer: {data.oneQuestion.node.answerCount}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Question;
