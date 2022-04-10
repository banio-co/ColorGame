import React from 'react';

import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import { CustomTheme } from '../util/LightTheme';

const makeStyles = (theme: CustomTheme) => StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: theme.colors.text,
    padding: theme.spacing,
  },
  list: {
    alignItems: 'center',
  },
});

const NextColors: React.FC = () => {
  const nextColors: string[] = [ '#F03834', '#2274A5', '#00916E' ];
  const theme = useTheme() as CustomTheme;
  const styles = makeStyles(theme);

  const colorBlock: ListRenderItem<string> = ({ item }) => (
    <View
      style={{
        aspectRatio: 1,
        width: theme.spacing * 6,
        marginTop: theme.spacing,
        marginBottom: theme.spacing,
        backgroundColor: item,
      }}></View>
  );

  return (
    <Card elevation={0} style={styles.card}>
      <Text>Next Colors</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={nextColors}
        renderItem={colorBlock}
      />
    </Card>
  );
};

export default NextColors;
