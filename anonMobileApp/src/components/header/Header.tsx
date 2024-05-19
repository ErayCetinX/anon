import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import headerStyle from './HeaderStyle';
import {Icons} from '../items';

const Header = () => {
  return (
    <View style={headerStyle.header}>
      <TouchableOpacity activeOpacity={0.9} style={headerStyle.leftHeader}>
        <View style={headerStyle.profileImage} />
        <View>
          <Text style={headerStyle.username}>Username</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Icons name="settings" type="feather" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
