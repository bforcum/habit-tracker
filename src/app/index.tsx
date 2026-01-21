
import React, { useState } from 'react';
import { View } from "react-native";
import { IconButton, ProgressBar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HabitList } from '../components/habit-list';
import { styles } from "../consts";

export default function Index() {
  const [progress, setProgress] = useState<number>(0);
  const [mode, setMode] = useState<"view" | "edit">("view")


  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <Text style={styles.title}>Habit Tracker</Text>
        <View style={styles.row}>
          <View style={{alignContent: "center"}}>
            <Text style={{margin: 10}}>Daily progress</Text>
            <ProgressBar color="#084" style={{margin: 10, flex: 0, maxWidth: 300}} progress={progress}></ProgressBar>
          </View>
          <IconButton icon="pencil" iconColor={mode == "view" ? "#444" : "#084"} onPress={() => setMode(mode == "view" ? "edit" : "view")}></IconButton>
        </View>

      </View>
      <HabitList mode={mode} onProgress={setProgress}/>
    </View>
  );
}