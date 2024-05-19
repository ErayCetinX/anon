import {StyleSheet} from 'react-native';

const headerStyle = StyleSheet.create({
  header: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
  },
  leftHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: 'gray',
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  displayName: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '400',
    color: 'gray',
  },
});

export default headerStyle;
