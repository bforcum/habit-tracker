import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#f0f8fa',
    padding: 8,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 8,
    fontFamily: "Sans-Serif",
  },
  box: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#ecf0f1',
    fontFamily: "Sans-Serif",
    flexShrink: 1,
    padding: 12,
    borderRadius: 8
  },
  block: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 0
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    textAlign: 'left',
  },
  title: {
    margin: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  column: {
    gap: 20
  }
});