import React from 'react';
import { Text, View } from 'react-native';


const CategoryButton = ({title}) => (
<View style={{ backgroundColor: "rgba(139,230,62,1)", padding: 4, borderRadius: 4, marginLeft: 15, marginTop: 2 }}>
    <Text style={{ fontFamily: 'OpenSans', fontWeight: '500',fontSize: 14, fontWeight: '300', color:'rgba(255,255,255,1)', fontWeight: "600", flexWrap: 'nowrap' }}>{title}</Text>
</View>
);

export default CategoryButton;
