const form = document.getElementById('patientForm');
const tableBody = document.querySelector('#patientTable tbody');

let patientData = [];

const ctx = document.getElementById('admissionChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Admission Days',
            data: [],
            backgroundColor: 'rgba(30, 144, 255, 0.7)'
        }]
    },
    options: {
        scales: { y: { beginAtZero: true } }
    }
});

form.addEventListener('submit', function(e){
    e.preventDefault();

    const patientId = document.getElementById('patientId').value;
    const age = document.getElementById('age').value;
    const disease = document.getElementById('disease').value;
    const admissionDays = document.getElementById('admissionDays').value;

    const patient = { patientId, age, disease, admissionDays };
    patientData.push(patient);

    // Add row to table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${patientId}</td>
        <td>${age}</td>
        <td>${disease}</td>
        <td>${admissionDays}</td>
    `;
    tableBody.appendChild(newRow);

    // Update chart
    chart.data.labels.push(`P${patientId}`);
    chart.data.datasets[0].data.push(admissionDays);
    chart.update();

    form.reset();
});
