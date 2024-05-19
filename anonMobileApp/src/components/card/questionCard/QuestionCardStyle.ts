import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 12,
  },
  pdg: {
    padding: 10,
    maxHeight: 200,
  },
  header: {
    marginBottom: 3,
  },
  content: {
    marginVertical: 5,
  },
  answerCount: {
    width: '100%',
    alignItems: 'flex-end',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  contentText: {
    color: '#636567',
    fontSize: 15,
    flexWrap: 'wrap',
  },
  answerCountText: {
    color: '#000',
    fontSize: 14,
    opacity: 0.5,
  },
});

export default style;
