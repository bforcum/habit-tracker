export class Habit {
	uuid: string;
	habitName: string;
	timeCompleted: Date

	constructor (uuid: string, name: string, timeCompleted: Date) {
		this.uuid = uuid;
		this.habitName = name;
		this.timeCompleted = timeCompleted;
	}

	static fromJson (key: string, json: string) {
		let habitObj = JSON.parse(json);
		return new Habit(key, habitObj.name, habitObj.date);
	}

	toJSON(): string {
		return JSON.stringify({"name": this.habitName, "date": this.timeCompleted.getTime()})
	}

}