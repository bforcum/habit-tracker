
import { Checkbox } from '@futurejj/react-native-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { styles } from '../consts';
import { Habit } from '../model/habit';

type HabitProps = {
  habit: Habit,
  mode: 'view' | 'edit',
  onChange: (value: Habit) => void,
}

export function HabitCard(props: HabitProps) {
  let habit: Habit = props.habit;
  let date = new Date()
  date.setHours(0, 0, 0, 0);


  const [status, setStatus] = useState(habit.timeCompleted.getTime() > date.getTime());
  const [currentName, setName] = useState(habit.habitName);
  function toggle() {
    let newHabit = new Habit(habit.uuid, habit.habitName, status ? new Date(0) : new Date())
    AsyncStorage.setItem("habit-" + newHabit.uuid, newHabit.toJSON());
    setStatus(!status);
    props.onChange(newHabit); 
  }
  function rename() {
    let newHabit = new Habit(habit.uuid, currentName, habit.timeCompleted)
    AsyncStorage.setItem("habit-" + newHabit.uuid, newHabit.toJSON());
    props.onChange(newHabit)
  }
  
  return (
    <Pressable onPress={props.mode == "view" ? toggle : null}>
      <Card key={habit.habitName} style={{padding: 20}}>
        <View style={[styles.row, {justifyContent: "space-between", alignItems: "center"}]}>
          {props.mode == "view" ? <Text>{habit.habitName}</Text> : <TextInput onEndEditing={rename} maxLength={30} style={{padding: 0}}value={currentName} onChangeText={setName}/>}
          <Checkbox color="#008844" status={status ? 'checked' : 'unchecked'} onPress={toggle} />
        </View>
      </Card>
    </Pressable>
  )
}