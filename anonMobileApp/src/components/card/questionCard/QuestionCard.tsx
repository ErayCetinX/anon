import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './QuestionCardStyle';
import {useNavigation} from '@react-navigation/native';

interface Props {
  uuid: string;
  title: string;
  content: string;
  answerCount: number;
}

const QuestionCard: React.FC<Props> = ({answerCount, content, title, uuid}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Question', {uuid: uuid})}
      style={style.container}>
      <View style={style.pdg}>
        <View style={style.header}>
          <Text style={style.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={style.content}>
          <Text style={style.contentText} numberOfLines={4}>
            {content}
          </Text>
        </View>
        <View style={style.answerCount}>
          <Text style={style.answerCountText}>Answer: {answerCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionCard;
