function calculateBMI() {
	var weight = parseFloat(document.getElementById('weight').value);
	var height = parseFloat(document.getElementById('height').value);
	
	if (weight && height) {
		var bmi = weight / ((height / 100) ** 2);
		document.getElementById('bmiResult').value = bmi.toFixed(2);
		
		var category = getBMICategory(bmi);
		document.getElementById('bmiCategory').value = category;
	}
}

function getBMICategory(bmi) {
	if (bmi < 18.5) {
		return "Underweight";
	} else if (bmi >= 18.5 && bmi < 25) {
		return "Normal weight";
	} else if (bmi >= 25 && bmi < 30) {
		return "Overweight";
	} else {
		return "Obese";
	}
}