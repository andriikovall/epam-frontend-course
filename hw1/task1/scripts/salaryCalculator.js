function onCalculateSalary(e) {
    e.preventDefault();
    const currSalary = (parseInt(document.getElementById('salary').value) || 0);
    const newSalary = currSalary + currSalary * (Math.random() - 0.5);
    document.getElementById('result').value = newSalary.toFixed(2);
}