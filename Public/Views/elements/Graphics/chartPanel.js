// require('Chart.js
var ctx = document.getElementById('balanceBuySale').getContext('2d');
var chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Ventas', 'Compras', 'Stock'],
        datasets: [{
            label: 'num datos',
            data: [10, 10, 10]
        }]
    }
})

var ctx = document.getElementById('balanceByProduct').getContext('2d');
var chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['col1', 'col2', 'col3'],
        datasets: [{
            label: 'num datos',
            data: [10, 10, 10]
        }]
    }
})

var ctx = document.getElementById('balanceCapital').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Sales',
            data: [2, 5, 10, 15, 5, 20, 30, 20, 50, 60, 65, 75, 55]
        },
        {
            label: 'Buys',
            data: [2, 5, 2, 10, 5, 0, 20, 22, 25, 30, 15, 31, 40]
        },
        {
            label: 'In Stock',
            data: [2, 5, 2, 0, 5, 5, 5, 7, 10, 11, 8, 9, 11]
        }]
    },
    options: {
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1.5,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
                min: 0,
                max: 100
            }
        }
    }
})