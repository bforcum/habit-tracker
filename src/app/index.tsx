
import React, { useState } from 'react';
import { View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HabitList } from '../components/habit-list';
import { styles } from "../consts";

export default function Index() {
  const [progress, setProgress] = useState<number>(0);


  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <Text style={styles.title}>Habit Tracker</Text>
        <View style={[styles.row, {flex: 1}]}>
          <View style={styles.column}>
            <Text>Daily progress</Text>
            <ProgressBar progress={progress}></ProgressBar>
          </View>
        </View>
      </View>
      <HabitList mode="edit" onProgress={setProgress}/>
    </View>
  );
}