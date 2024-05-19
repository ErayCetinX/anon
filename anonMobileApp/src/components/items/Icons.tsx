import React from 'react';
import {Icon, IconProps} from '@rneui/themed';

interface Props extends IconProps {
  name: string;
  size?: number | undefined;
  type?:
    | 'feather'
    | 'material'
    | 'material-community'
    | 'font-awesome'
    | 'font-awesome-5'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'simple-line-icon'
    | 'zocial'
    | 'entypo'
    | 'fontisto'
    | 'antdesign';
  color?: string;
}

const WhoollyIcon: React.FC<Props> = ({name, size, type, color, ...rest}) => {
  return <Icon name={name} size={size} type={type} color={color} {...rest} />;
};

export default WhoollyIcon;
