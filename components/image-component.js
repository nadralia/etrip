import React from 'react';
import { Text, View, Image } from 'react-native';

const ImageComponent = ({ resizeMode = 'cover', source, borderRadius = 8, ...rest }) => (
	<Image resizeMode={resizeMode} source={source} style={{ flex: 1, width: undefined, height: undefined, borderRadius }} {...rest} />
);

export default ImageComponent;
