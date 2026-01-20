
import { Checkbox } from '@futurejj/react-native-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { Habit } from '../model/habit';

type HabitProps = {
  habit: Habit,
  onToggle: (value: Habit) => void,
}

export function HabitCard(props: HabitProps) {
  let habit: Habit = props.habit;
  let date = new Date()
  date.setHours(0, 0, 0, 0);


  const [status, setStatus] = useState(habit.timeCompleted.getTime() > date.getTime());
  function toggle() {
    let newHabit = new Habit(habit.uuid, habit.habitName, status ? new Date(0) : new Date())
    AsyncStorage.setItem("habit-" + newHabit.uuid, newHabit.toJSON());
    setStatus(!status);
    props.onToggle(newHabit); 
  }
  
  return (
    <Pressable onPress={toggle}>
      <Card key={habit.habitName}>
        <Card.Title style={{ padding: 10 }} title={habit.habitName} right={
          () => <Checkbox color="#008844" status={status ? 'checked' : 'unchecked'} onPress={toggle} />} />
      </Card>
    </Pressable>
  )
}