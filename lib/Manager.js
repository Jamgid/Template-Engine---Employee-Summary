// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber;     
    }

    getofficeNumber() {
        return this.officeNumber
    }

    getRole() {
        return "Manager"
    }
}