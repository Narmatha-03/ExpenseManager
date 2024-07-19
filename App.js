import React, { useState } from "react";
import {
 View,
 Text,
 Button,
 StyleSheet,
 TextInput,
 TouchableOpacity,
} from "react-native";
const ExpenseManager = () => {
 const [category, setCategory] = useState("Grocery");
 const [amount, setAmount] = useState("");
 const [income, setIncome] = useState("");
 const [expenses, setExpenses] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [weeklyIncome, setWeeklyIncome] = useState(0);
 
 const handleAddExpense = () => {
 const newExpense = {
 category,
 amount: parseFloat(amount), //amount must be converted to float because by default it is string
 };
 setExpenses([...expenses, newExpense]);//the ...expenses will add the new data with the old data.
 setAmount("");
 };
 const totalWeeklyIncome = () => {
 const a = parseFloat(income) + parseFloat(weeklyIncome);
 setWeeklyIncome(a);
 };
 const categoryExpenses = () => {
 const categoryExpenses = {};// array used to store all the category expenses
 expenses.forEach((expense) => {
 if (categoryExpenses[expense.category]) {
 categoryExpenses[expense.category] += expense.amount;
 } else {
 categoryExpenses[expense.category] = expense.amount;
 }
 });
 return categoryExpenses;
 };
 const toggleDropdown = () => {
 setShowDropdown(!showDropdown);
 };
 const selectCategory = (selectedCategory) => {
 setCategory(selectedCategory);
 setShowDropdown(false);
 };
 return (
 <View style={styles.container}>
 <Text style={styles.title}>Expense Manager</Text>
 <View style={styles.inputContainer}>
 <TextInput
 style={styles.input}
 value={income}
 onChangeText={setIncome}
 placeholder="Enter Today Income"
 keyboardType="numeric"
 />
 <Button title="Add Income" onPress={totalWeeklyIncome} />
 <TouchableOpacity
 style={styles.dropdownButton}
 onPress={toggleDropdown}
 >
 <Text style={styles.dropdownButtonText}>Category: {category}</Text>
 </TouchableOpacity>
 {showDropdown && (
 <View style={styles.dropdown}>
 <TouchableOpacity onPress={() => selectCategory("Grocery")}>
 <Text style={styles.dropdownOption}>Grocery</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => selectCategory("Utilities")}>
 <Text style={styles.dropdownOption}>Utilities</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => selectCategory("Transportation")}>
 <Text style={styles.dropdownOption}>Transportation</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => selectCategory("Entertainment")}>
 <Text style={styles.dropdownOption}>Entertainment</Text>
 </TouchableOpacity>
 </View>
 )}
 <TextInput
 style={styles.input}
 value={amount}
 onChangeText={setAmount}
 placeholder="Enter Expense Amount"
 keyboardType="numeric"
 />
 <Button title="Add Expense" onPress={handleAddExpense} />
 </View>
 <View style={styles.summaryContainer}>
 <View style={styles.summary}>
 <Text style={styles.summaryTitle}>Weekly Income:</Text>
 <Text style={styles.summaryValue}>Rs.{weeklyIncome}</Text>
 </View>
 <Text style={styles.summaryTitle}>Weekly Expense by Category:</Text>
 {Object.keys(categoryExpenses()).map((cat) => (
 <View key={cat} style={styles.summary}>
 <Text style={styles.summaryCategory}>{cat}:</Text>
 <Text style={styles.summaryValue}>
 Rs.{categoryExpenses()[cat]}
 </Text>
 </View>
 ))}
 </View>
 </View>
 );
};
const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 backgroundColor: "#f0f0f0",
 },
 inputContainer: {
 backgroundColor: "#fff",
 padding: 20,
 borderRadius: 10,
 marginBottom: 20,
 width: "90%",
 shadowColor: "#000",
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 elevation: 5,
 },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 marginBottom: 20,
 },
 input: {
 height: 40,
 borderColor: "gray",
 borderWidth: 1,
 marginBottom: 10,
 paddingHorizontal: 10,
 },
 dropdownButton: {
 height: 40,
 backgroundColor: "#e3e3e3",
 justifyContent: "center",
 alignItems: "center",
 marginBottom: 10,
 borderRadius: 5,
 marginTop: 10,
 },
 dropdownButtonText: {
 fontSize: 16,
 },
 dropdown: {
 backgroundColor: "#f9f9f9",
 borderColor: "gray",
 borderWidth: 1,
 borderRadius: 5,
 paddingHorizontal: 10,
 marginBottom: 10,
 },
 dropdownOption: {
 fontSize: 16,
 paddingVertical: 5,
 },
 summaryContainer: {
 backgroundColor: "#fff",
 padding: 20,
 borderRadius: 10,
 width: "90%",
 },
 summary: {
 flexDirection: "row",
 justifyContent: "space-between",
 marginBottom: 5,
 },
 summaryTitle: {
 fontSize: 16,
 fontWeight: "bold",
 },
 summaryCategory: {
 flex: 1,
 fontSize: 16,
 },
 summaryValue: {
 fontSize: 16,
 color: "#007bff",
 },
});
export default ExpenseManager;