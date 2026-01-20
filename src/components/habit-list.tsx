import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component, ReactNode } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { styles } from '../consts';
import { Habit } from '../model/habit';
import { HabitCard } from './habit-card';

const saveHabit = async (habit: Habit) => {
	try {
		await AsyncStorage.setItem("habit-" + habit.uuid, habit.timeCompleted.getTime().toString());
	} catch (e) {
		return false;
	}
	return true;
}
const getHabits = async (): Promise<Habit[]> => {
	let prefKeys = await AsyncStorage.getAllKeys();
	let items: Array<Habit> = [];
	for (let prefKey in prefKeys) {
		if (prefKey.startsWith("habit-")) {
			let value: string = await AsyncStorage.getItem(prefKey) ?? "0";
			if (value != null) {
				items.push(Habit.fromJson(prefKey.substring(6), value));
			}
		}
	}
	return items;
}

// type modeType = 

type HabitListProps = {
	mode: 'view' | 'edit',
	onProgress: (value: number) => void,
}

type HabitListState = {
	habits: Habit[]
}

export class HabitList extends Component<HabitListProps, HabitListState> {
	state = {
		habits: []
	}
	componentDidMount(): void {
		getHabits().then((value) => this.setState({ habits: value }))
	}

	constructor(props: HabitListProps) {
		super(props);
	}

	updateProgress(habits: Habit[]) {
		let date  = new Date();
		date.setHours(0,0,0,0);
		let time = date.getTime();
		let progress = 0;
		for (let habit of habits) {
			if (habit.timeCompleted.getTime() > time) {
				console.log(habit.timeCompleted.getTime() - time);
				progress += 1
			}
		}
		console.log(progress)
		this.props.onProgress(progress / Math.max(habits.length, 1));
	}

	render(): ReactNode {

		let button = (this.props.mode == 'view') ? null : <Button buttonColor='#008844' textColor='#ddffdd' onPress={() => {
			let habit: Habit = new Habit(uuid.v4(), "Habit", new Date(0));
			saveHabit(habit);
			this.setState({ habits: [...this.state.habits, habit] });
			this.updateProgress([...this.state.habits, habit])
		}}>Add Habit</Button>

		return (
			<View style={[
				styles.column,
				{
					padding: 20,
					paddingBottom: 20,
				}
			]}>
				{this.state.habits.map((habit: Habit, index: number) => <HabitCard key={habit.uuid} habit={habit} onToggle={(newHabit) => {
					let newHabits = structuredClone(this.state.habits);
					newHabits[index] = newHabit;
					this.setState({habits: newHabits})
					this.updateProgress(newHabits)
				}}/>)}
				{button}
			</View>
		)
	}
}