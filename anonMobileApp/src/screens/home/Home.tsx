import React from 'react';
import Header from '../../components/header/Header';
import {View} from 'react-native';
import style from './HomeStyle';
import {useQuery} from '@apollo/client';
import {allQuestions} from '../../apollo/queries';
import {FlashList} from '@shopify/flash-list';
import QuestionCard from '../../components/card/questionCard/QuestionCard';
import Loading from '../../components/items/Loading';

const Home = () => {
  const {data, loading} = useQuery(allQuestions);
  return (
    <View style={style.container}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <FlashList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data?.allQuestions?.edges || []}
          renderItem={({
            item: {node},
          }: {
            item: {
              node: {
                answerCount: number;
                content: string;
                title: string;
                uuid: string;
              };
            };
          }) => (
            <QuestionCard
              answerCount={node.answerCount}
              content={node.content}
              title={node.title}
              uuid={node.uuid}
            />
          )}
          estimatedItemSize={200}
        />
      )}
    </View>
  );
};

export default Home;
