import React from 'react';

import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import { useColor } from '../shared/ColorProvider';
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
  const { getNextColor, getAllColors } = useColor();
  const theme = useTheme() as CustomTheme;
  const styles = makeStyles(theme);
  const nextColors: string[] = getAllColors();

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
