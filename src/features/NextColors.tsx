import React from 'react';

import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Card, Title, useTheme } from 'react-native-paper';

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
  const { peekAllColors } = useColor();
  const theme = useTheme() as CustomTheme;
  const styles = makeStyles(theme);
  const nextColors: string[] = peekAllColors();

  const colorBlock: ListRenderItem<string> = ({ item }) => (
    <View
      style={{
        // Style is here because the background color needs to be dynamically set
        // and react native didn't like me merging styles from multiple places
        backgroundColor: item,
        aspectRatio: 1,
        width: theme.spacing * 6,
        marginTop: theme.spacing,
        marginBottom: theme.spacing,
      }}></View>
  );

  return (
    <Card elevation={0} style={styles.card}>
      <Title>Next Colors</Title>
      <FlatList
        contentContainerStyle={styles.list}
        data={nextColors}
        renderItem={colorBlock}
      />
    </Card>
  );
};

export default NextColors;
