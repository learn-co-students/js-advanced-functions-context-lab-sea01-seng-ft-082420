/* Your Code Here */
function createEmployeeRecord(a) {
    return {
        'firstName': a[0],
        'familyName': a[1],
        'title': a[2],
        'payPerHour': a[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(aOfA){
    let newArray = []
    aOfA.map( a => {
        newArray.push(createEmployeeRecord(a))
    })
    return newArray
}

function createTimeInEvent(date) {
    date = date.split(' ')
    this.timeInEvents.push ({
        'type': 'TimeIn',
        'hour': parseInt(date[1]),
        'date': date[0]
    })
    return this
}

function createTimeOutEvent(date) {
    date = date.split(' ')
    this.timeOutEvents.push ({
        'type': 'TimeOut',
        'hour': parseInt(date[1]),
        'date': date[0]
    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(e => e.date == date).hour
    let timeOut = this.timeOutEvents.find(e => e.date == date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(array, name) {
    return array.find(e => e.firstName == name)
}

function calculatePayroll(array) {
    let payRoll = 0
    array.forEach(person => {
        person.timeInEvents.forEach(e => {
            payRoll += wagesEarnedOnDate.call(person, e.date)
        })
    })
    return payRoll
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}