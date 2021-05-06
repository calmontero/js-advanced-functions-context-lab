/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employeeObj) {
    let employeeRecord = {
        firstName: employeeObj[0],
        familyName: employeeObj[1],
        title: employeeObj[2],
        payPerHour: employeeObj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arrayRecord) {
    let newRecord = arrayRecord.map(function(arrayEmployee){
      return createEmployeeRecord(arrayEmployee);
    })
    return newRecord;
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this;
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let dayIn = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let dayOut = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    let hoursWorked = (dayOut.hour - dayIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(dateStamp) {
    let payOwed = this.payPerHour * hoursWorkedOnDate.call(this,dateStamp);
    return parseFloat(payOwed.toString());
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray,firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName;
    })
}

function calculatePayroll(employeeObj) {
    let payRoll = employeeObj.reduce((count, pay) => count + allWagesFor.call(pay), 0);
    return payRoll;
}