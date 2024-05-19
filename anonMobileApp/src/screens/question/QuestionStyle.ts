import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  backBox: {
    padding: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  pdg: {
    padding: 10,
  },
  header: {
    marginVertical: 10,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
  },
  content: {
    marginVertical: 5,
  },
  contentText: {
    color: '#000',
    fontSize: 15,
  },
  answerCount: {
    width: '100%',
    alignItems: 'flex-end',
    right: 10,
  },
  answerCountText: {
    color: '#000',
    fontSize: 14,
    opacity: 0.5,
    fontWeight: '600',
  },
});

export default style;
